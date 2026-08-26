import pkg from 'pg';
import { createClient } from '@supabase/supabase-js';
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres'
});

const supabase = createClient('https://aieaebcmgzicbuhgkcmj.supabase.co', 'sb_publishable_avK0gSMguLQCrHGV7InThA_NeNHd4HQ');

async function run() {
  await client.connect();
  
  // 1. Delete the manually created user from auth.users and auth.identities
  await client.query("DELETE FROM auth.identities WHERE email = 'sahbazovelvin92@gmail.com'");
  await client.query("DELETE FROM auth.users WHERE email = 'sahbazovelvin92@gmail.com'");
  console.log('Deleted old manual user');
  
  // 2. Use GoTrue to properly sign up
  const { data, error } = await supabase.auth.signUp({
    email: 'sahbazovelvin92@gmail.com',
    password: 'elvin000111sahbazov'
  });
  
  if (error) {
    console.error('SignUp Error:', error);
  } else {
    console.log('Signed up successfully via GoTrue!');
    
    // 3. Auto-confirm the email via SQL just in case email confirmations are on
    await client.query("UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = 'sahbazovelvin92@gmail.com'");
    console.log('Email confirmed via SQL.');
    
    // 4. Test login
    const login = await supabase.auth.signInWithPassword({
      email: 'sahbazovelvin92@gmail.com',
      password: 'elvin000111sahbazov'
    });
    console.log('Login Test:', login.error ? login.error : 'Success');
  }
  
  await client.end();
}
run();
