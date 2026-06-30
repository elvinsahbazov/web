-- 1. Site Settings Table
CREATE TABLE public.site_settings (
    id uuid default gen_random_uuid() primary key,
    key text not null unique,
    value text not null,
    description text
);

-- 2. Services Table
CREATE TABLE public.services (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text not null,
    icon text not null, -- e.g., 'fas fa-bullhorn'
    price text,
    order_index int default 0,
    published boolean default true
);

-- 3. Portfolio Table
CREATE TABLE public.portfolio (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text,
    image_url text not null,
    link_url text,
    category text,
    order_index int default 0,
    published boolean default true
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING ( true );
CREATE POLICY "Public read services" ON public.services FOR SELECT USING ( published = true );
CREATE POLICY "Public read portfolio" ON public.portfolio FOR SELECT USING ( published = true );

-- Allow all for admin logic (Temporary insecure policy for simple admin panel)
CREATE POLICY "Admin all site_settings" ON public.site_settings FOR ALL USING ( true );
CREATE POLICY "Admin all services" ON public.services FOR ALL USING ( true );
CREATE POLICY "Admin all portfolio" ON public.portfolio FOR ALL USING ( true );

-- Insert default settings
INSERT INTO public.site_settings (key, value, description) VALUES
('contact_phone', '+994 99 955 00 01', 'WhatsApp and Phone'),
('contact_email', 'elvinsahbazovv@gmail.com', 'Primary Email'),
('instagram', 'https://www.instagram.com/elvin_sahbazov', 'Instagram URL'),
('linkedin', 'https://www.linkedin.com/in/elvinsahbazov', 'LinkedIn URL'),
('bio', 'Digital Marketing & AI Automation Specialist', 'Short bio text');
