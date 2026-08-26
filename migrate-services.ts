import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
});

const services = [
  {
    icon: 'fas fa-bullhorn',
    title: 'Rəqəmsal Marketinq',
    color: '#2563EB',
    description: 'Meta, Google, TikTok, Yandex platformalarında ROI-a fokuslanmış reklam kampaniyalarının idarə edilməsi.\nMeta Ads (Facebook, Instagram, WhatsApp, Threads)\nGoogle Ads (Search, Display, YouTube)\nYandex Direct\nVK Ads\nLinkedIn Ads\nTikTok Ads\nX (Twitter) Ads',
  },
  {
    icon: 'fas fa-robot',
    title: 'Süni İntellektlə Biznes Avtomatlaşdırılması',
    color: '#2563EB',
    description: 'Müştəri xidmətləri, daxili əməliyyatlar və marketinq proseslərinin AI ilə tam avtomatlaşdırılması.\nAI Çatbotlar və 24/7 Səs Agentləri\nSənəd dövriyyəsinin avtomatlaşdırılması\nCRM və ERP İnteqrasiyası\nİş axınlarının sürətləndirilməsi və optimizasiyası',
  },
  {
    icon: 'fas fa-search',
    title: 'Veb Saytların Yaradılması və SEO',
    color: '#2563EB',
    description: 'Yüksək konversiyalı, sürətli korporativ və e-ticarət saytlarının yaradılması.\nMüasir UI/UX dizayn\nSürət və konversiya optimizasiyası\nTexniki SEO və Açar söz tədqiqatı\nAxtarış sistemlərində ön sıralara çıxarılma',
  },
  {
    icon: 'fas fa-network-wired',
    title: 'ERP və CRM-lərin Yaradılması',
    color: '#2563EB',
    description: 'Biznesinizin xüsusi ehtiyaclarına uyğun fərdi proqram təminatlarının sıfırdan yazılması.\nXüsusi Müştəri Münasibətləri İdarəetməsi (CRM)\nResursların Planlaşdırılması (ERP)\nKassa və Anbar uçotu sistemləri\nMövcud sistemlərinizə API inteqrasiyaları',
  }
];

async function migrate() {
  await client.connect();
  try {
    for (const srv of services) {
      await client.query(
        'INSERT INTO services (title, description, icon, color, published) VALUES ($1, $2, $3, $4, $5)',
        [srv.title, srv.description, srv.icon, srv.color, true]
      );
      console.log(`Migrated: ${srv.title}`);
    }
  } catch (error) {
    console.error('Migration failed', error);
  } finally {
    await client.end();
  }
}

migrate();
