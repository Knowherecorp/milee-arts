
-- Create product images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'product-images', 'Product Images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images');

-- Create banner images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'banner-images', 'Banner Images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'banner-images');

-- Create testimonial images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'testimonial-images', 'Testimonial Images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'testimonial-images');

-- Create storage policies for public access
DO $$
BEGIN
  -- Product images policies
  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Read Access for product-images'
  ) THEN
    CREATE POLICY "Public Read Access for product-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'product-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Upload Access for product-images'
  ) THEN
    CREATE POLICY "Public Upload Access for product-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'product-images');
  END IF;

  -- Banner images policies
  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Read Access for banner-images'
  ) THEN
    CREATE POLICY "Public Read Access for banner-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'banner-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Upload Access for banner-images'
  ) THEN
    CREATE POLICY "Public Upload Access for banner-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'banner-images');
  END IF;

  -- Testimonial images policies
  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Read Access for testimonial-images'
  ) THEN
    CREATE POLICY "Public Read Access for testimonial-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'testimonial-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Upload Access for testimonial-images'
  ) THEN
    CREATE POLICY "Public Upload Access for testimonial-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'testimonial-images');
  END IF;
END
$$;
