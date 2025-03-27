
-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Allow public read access for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access for testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (true);

-- Allow admins to manage testimonials (this assumes you have admin authentication)
CREATE POLICY "Allow admin to manage testimonials" 
  ON public.testimonials 
  FOR ALL 
  USING (true); -- In a production app, add proper role-based conditions
