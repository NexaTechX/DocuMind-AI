/*
  # Add subscription fields to profiles table

  1. Changes
    - Add subscription_status field
    - Add subscription_period_start
    - Add subscription_period_end
    - Add stripe_customer_id
    - Add stripe_subscription_id
    - Add document_quota field
    - Add documents_used field

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_period_start timestamptz,
ADD COLUMN IF NOT EXISTS subscription_period_end timestamptz,
ADD COLUMN IF NOT EXISTS stripe_customer_id text,
ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
ADD COLUMN IF NOT EXISTS document_quota integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS documents_used integer DEFAULT 0;