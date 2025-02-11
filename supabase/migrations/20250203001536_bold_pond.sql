/*
  # Add document sharing functionality

  1. New Tables
    - `document_shares`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references documents)
      - `shared_with` (uuid, references profiles)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `document_shares` table
    - Add policies for document sharing
*/

-- Create document shares table
CREATE TABLE IF NOT EXISTS document_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  shared_with uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(document_id, shared_with)
);

-- Enable RLS
ALTER TABLE document_shares ENABLE ROW LEVEL SECURITY;

-- Policies for document shares
CREATE POLICY "Users can view documents shared with them"
  ON documents FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT document_id
      FROM document_shares
      WHERE shared_with = auth.uid()
    )
  );

CREATE POLICY "Users can view their shared documents"
  ON document_shares FOR SELECT
  TO authenticated
  USING (
    shared_with = auth.uid() OR
    document_id IN (
      SELECT id
      FROM documents
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can share their own documents"
  ON document_shares FOR INSERT
  TO authenticated
  WITH CHECK (
    document_id IN (
      SELECT id
      FROM documents
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove their document shares"
  ON document_shares FOR DELETE
  TO authenticated
  USING (
    document_id IN (
      SELECT id
      FROM documents
      WHERE user_id = auth.uid()
    )
  );