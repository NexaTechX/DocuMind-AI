import * as PDFJS from 'pdfjs-dist';
import mammoth from 'mammoth';
import { supabase } from './supabase';

// Initialize PDF.js worker with a more reliable CDN URL
const PDFJS_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

// Initialize PDF.js worker once
if (typeof window !== 'undefined') {
  PDFJS.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
}

export async function parseDocument(file: File): Promise<{ content: string; preview: string }> {
  const fileType = file.type;
  let content = '';
  let preview = '';

  try {
    if (fileType === 'application/pdf') {
      const result = await parsePDF(file);
      content = result.content;
      preview = result.preview;
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      const result = await parseWord(file);
      content = result.content;
      preview = result.preview;
    } else if (fileType === 'text/plain') {
      const result = await parseText(file);
      content = result.content;
      preview = result.preview;
    } else {
      throw new Error('Unsupported file type');
    }

    return { content, preview };
  } catch (error) {
    console.error('Error parsing document:', error);
    throw error;
  }
}

async function parsePDF(file: File): Promise<{ content: string; preview: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    let previewText = '';

    // Get text from first 3 pages for preview
    const maxPreviewPages = Math.min(3, pdf.numPages);
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
        .trim();
      
      fullText += pageText + '\n';
      
      if (i <= maxPreviewPages) {
        previewText += pageText + '\n';
      }
    }

    return {
      content: fullText.trim(),
      preview: previewText.trim().substring(0, 500) + '...',
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}

async function parseWord(file: File): Promise<{ content: string; preview: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const content = result.value.trim();
    
    return {
      content,
      preview: content.substring(0, 500) + '...',
    };
  } catch (error) {
    console.error('Error parsing Word document:', error);
    throw new Error('Failed to parse Word document');
  }
}

async function parseText(file: File): Promise<{ content: string; preview: string }> {
  try {
    const text = await file.text();
    const content = text.trim();
    return {
      content,
      preview: content.substring(0, 500) + '...',
    };
  } catch (error) {
    console.error('Error parsing text file:', error);
    throw new Error('Failed to parse text file');
  }
}

export async function uploadDocument(file: File, userId: string) {
  try {
    const { content, preview } = await parseDocument(file);
    
    // Create document record in Supabase
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          user_id: userId,
          title: file.name,
          content: content,
          file_type: file.type,
          file_size: file.size,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, preview };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}