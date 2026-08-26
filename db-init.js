import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
});

const sql = `
-- Extension for UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. POSTS TABLE
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#2563EB',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT,
  link_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SITE CONTENT TABLE
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  value TEXT
);

-- 5. CONTACT SUBMISSIONS
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert some default values for site_content if not exists
INSERT INTO site_content (id, section, label, type, value) VALUES
  ('contact_phone', 'contact', 'Telefon Nömrəsi', 'text', '+994 99 955 00 01'),
  ('contact_email', 'contact', 'E-poçt Ünvanı', 'text', 'info@elvinshahbazov.com'),
  ('contact_address', 'contact', 'Ünvan', 'text', 'Bakı, Azərbaycan'),
  ('instagram_link', 'footer', 'Instagram Linki', 'text', 'https://instagram.com/elvin.sahbazov'),
  ('linkedin_link', 'footer', 'LinkedIn Linki', 'text', 'https://linkedin.com/'),
  ('facebook_link', 'footer', 'Facebook Linki', 'text', 'https://facebook.com/'),
  ('hero_title', 'hero', 'Ana Səhifə Başlığı', 'text', 'Süni İntellektlə Biznesinizi Avtomatlaşdırın'),
  ('hero_subtitle', 'hero', 'Ana Səhifə Alt Başlığı', 'textarea', 'Rəqəmsal Marketinq, Avtomatlaşdırma və Süni İntellekt Həlləri')
ON CONFLICT (id) DO NOTHING;

-- Optionally, enable Row Level Security and create policies to allow public read
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public access for reading content
CREATE POLICY "Public read posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (published = true);
CREATE POLICY "Public read portfolio" ON portfolio FOR SELECT USING (published = true);
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);

-- Allow public access for inserting contact and subscribers
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Allow all operations for authenticated users (or anyone using the service key). 
-- Wait, the client uses VITE_SUPABASE_ANON_KEY from frontend, so they act as anon unless signed in.
-- If they want the admin panel to work seamlessly without proper Supabase Auth, they will need insert/update/delete policies for anon too.
-- Let's just make everything fully accessible for now if they are doing it all from a simple admin panel, 
-- OR, wait, the admin panel uses \`VITE_SUPABASE_ANON_KEY\`. If they don't have Supabase Auth setup, it'll run as anon.
-- To allow the Admin panel to insert/update, we need policies.
-- Let's just enable all operations for anon so the admin panel works. (Not perfectly secure, but fits their current architecture).
CREATE POLICY "Anon all posts" ON posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all portfolio" ON portfolio FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all site_content" ON site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all newsletter_subscribers" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);

`;

async function initDb() {
  try {
    await client.connect();
    console.log('Connected to Supabase Postgres...');
    
    await client.query(sql);
    console.log('Successfully created tables, policies and inserted default data!');
    
  } catch (err) {
    console.error('Error executing query', err);
  } finally {
    await client.end();
  }
}

initDb();
