-- Blog Posts Table
CREATE TABLE public.posts (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    slug text not null unique,
    excerpt text,
    content text not null,
    cover_image text,
    published boolean default false
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.posts FOR SELECT
  USING ( true );

-- Allow all for now
CREATE POLICY "Allow all for now"
  ON public.posts FOR ALL
  USING ( true );
