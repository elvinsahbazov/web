import pkg from 'pg';
const { Client } = pkg;
import { blogs } from './src/data/blogs';

const connectionString = 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
});

async function migrate() {
  await client.connect();
  console.log('Connected to Supabase Postgres...');
  
  try {
    for (const blog of blogs) {
      const excerpt = blog.excerpt || blog.content.substring(0, 100);
      const query = `
        INSERT INTO posts (title, slug, excerpt, content, cover_image, published, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING
      `;
      const values = [
        blog.title,
        blog.slug,
        excerpt,
        blog.content,
        blog.cover_image,
        blog.published ?? true,
        blog.created_at || new Date().toISOString()
      ];
      await client.query(query, values);
      console.log(`Migrated: ${blog.title}`);
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed', error);
  } finally {
    await client.end();
  }
}

migrate();
