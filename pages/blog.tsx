import Link from 'next/link';
import { Header } from "@/components/layout/header";

const blogPosts = [
  {
    title: 'AI-Powered Document Analysis: A New Era',
    slug: 'ai-powered-document-analysis',
    excerpt: 'Discover how AI is transforming document analysis and unlocking new insights.',
  },
  {
    title: 'The Benefits of Semantic Search for Document Retrieval',
    slug: 'semantic-search-for-document-retrieval',
    excerpt: 'Learn how semantic search can help you find exactly what you need in your documents.',
  },
  {
    title: 'How to Extract Key Insights from Research Papers',
    slug: 'extract-key-insights-from-research-papers',
    excerpt: 'Get practical tips for extracting key insights from research papers using AI.',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-16 flex-grow">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Stay up-to-date with the latest news and insights on AI-powered document analysis.
        </p>
        <ul className="space-y-6">
          {blogPosts.map((post) => (
            <li key={post.slug} className="mb-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-muted/5">
              <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold hover:text-primary">
                {post.title}
              </Link>
              <p className="text-lg text-muted-foreground mt-2">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </main>
      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DocuMind AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
