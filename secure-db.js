import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
});

const sql = `
-- Drop insecure anon policies
DROP POLICY IF EXISTS "Anon all posts" ON posts;
DROP POLICY IF EXISTS "Anon all services" ON services;
DROP POLICY IF EXISTS "Anon all portfolio" ON portfolio;
DROP POLICY IF EXISTS "Anon all site_content" ON site_content;
DROP POLICY IF EXISTS "Anon all contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anon all newsletter_subscribers" ON newsletter_subscribers;

-- Create secure policies for Authenticated users (Admin)
CREATE POLICY "Auth all posts" ON posts FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth all services" ON services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth all portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth all site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth all contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth all newsletter_subscribers" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create Admin User in Supabase Auth bypassing email confirmation
DO $$
DECLARE
  uid UUID := gen_random_uuid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'sahbazovelvin92@gmail.com') THEN
    INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at) 
    VALUES (uid, 'authenticated', 'authenticated', 'sahbazovelvin92@gmail.com', crypt('elvin000111sahbazov', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW());

    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), uid, format('{"sub":"%s","email":"%s"}', uid::text, 'sahbazovelvin92@gmail.com')::jsonb, 'email', 'sahbazovelvin92@gmail.com', NOW(), NOW(), NOW());
  ELSE
    UPDATE auth.users SET encrypted_password = crypt('elvin000111sahbazov', gen_salt('bf')) WHERE email = 'sahbazovelvin92@gmail.com';
  END IF;
END $$;
`;

async function secureDb() {
  try {
    await client.connect();
    console.log('Connected to Supabase Postgres...');
    
    await client.query(sql);
    console.log('Successfully secured tables with RLS and created Admin user!');
    
  } catch (err) {
    console.error('Error executing query', err);
  } finally {
    await client.end();
  }
}

secureDb();
