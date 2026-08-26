import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://aieaebcmgzicbuhgkcmj.supabase.co', 'sb_publishable_avK0gSMguLQCrHGV7InThA_NeNHd4HQ');

async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'sahbazovelvin92@gmail.com',
    password: 'elvin000111sahbazov'
  });
  console.log('Error:', error);
  console.log('Session:', data.session ? 'Success' : 'Fail');
}
test();
