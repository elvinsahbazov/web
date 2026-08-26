import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres'
});

async function run() {
  await client.connect();
  const res = await client.query("SELECT id, email, encrypted_password, email_confirmed_at FROM auth.users WHERE email = 'sahbazovelvin92@gmail.com'");
  console.log('User:', res.rows);
  const ident = await client.query("SELECT * FROM auth.identities WHERE email = 'sahbazovelvin92@gmail.com'");
  console.log('Identity:', ident.rows);
  await client.end();
}
run();
