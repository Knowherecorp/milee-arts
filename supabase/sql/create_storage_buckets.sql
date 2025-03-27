
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('product-images', 'product-images', true, 52428800, array['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]),
  ('banner-images', 'banner-images', true, 52428800, array['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]),
  ('testimonial-images', 'testimonial-images', true, 52428800, array['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create storage policies for public read access
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES
  ('Public Read Access', '(bucket_id = ''product-images''::text)', 'product-images'),
  ('Public Read Access', '(bucket_id = ''banner-images''::text)', 'banner-images'),
  ('Public Read Access', '(bucket_id = ''testimonial-images''::text)', 'testimonial-images')
ON CONFLICT DO NOTHING;
