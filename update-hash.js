import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres'
});

async function run() {
  await client.connect();
  // Using cost 10 which is default for GoTrue bcrypt
  await client.query("UPDATE auth.users SET encrypted_password = crypt('elvin000111sahbazov', gen_salt('bf', 10)) WHERE email = 'sahbazovelvin92@gmail.com'");
  console.log('Password hash updated with cost 10');
  
  const res = await client.query("SELECT encrypted_password FROM auth.users WHERE email = 'sahbazovelvin92@gmail.com'");
  console.log('New hash:', res.rows[0].encrypted_password);
  await client.end();
}
run();
