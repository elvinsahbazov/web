import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://postgres.aieaebcmgzicbuhgkcmj:elvin000111sahbazov@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres'
});

const blogs = [
  {
    title: 'Süni İntellekt və ChatGPT ilə Rəqəmsal Marketinqdə İnqilab',
    slug: 'suni-intellekt-chatgpt-reqemsal-marketinq',
    excerpt: 'Azərbaycan bazarında ChatGPT və AI alətlərindən istifadə edərək satışları necə artırmaq olar? Sirləri kəşf edin.',
    content: '<h2>Süni İntellektin Rəqəmsal Marketinqə Təsiri</h2><p>Müasir dövrdə rəqəmsal marketinq strategiyaları sürətlə dəyişir. Xüsusilə ChatGPT, Gemini və digər süni intellekt (AI) alətlərinin inkişafı ilə bizneslər müştərilərinə daha fərdiləşdirilmiş və çevik xidmətlər təklif edə bilirlər.</p><p>Azərbaycan bazarında rəqabətdən geri qalmamaq üçün AI dəstəkli məzmun yaradılışı və müştəri analizi artıq bir zərurətə çevrilib. Süni intellekt məlumatları saniyələr içində analiz edərək sizə ən ideal hədəf kütləsini tapmaqda kömək edir.</p><h3>Necə Başlamaq Lazımdır?</h3><ul><li>AI əsaslı chatbot-ların sayta inteqrasiyası.</li><li>Avtomatlaşdırılmış email marketinq kampaniyaları.</li><li>SEO yönümlü unikal məzmunların daha sürətli istehsalı.</li></ul>',
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    published: true
  },
  {
    title: 'Bakıda Yerli (Local) SEO Strategiyaları: Google-da Necə Önə Çıxmalı?',
    slug: 'baki-yerli-local-seo-strategiyalari',
    excerpt: 'Xəritələrdə və yerli axtarışlarda rəqiblərinizi geridə qoymaq üçün ən vacib SEO taktikaları.',
    content: '<h2>Local SEO Nədir və Niyə Vacibdir?</h2><p>Əgər Bakıda və ya Azərbaycanın istənilən digər bölgəsində lokal bir biznesiniz varsa, insanların sizi Google Xəritələrdə və axtarışlarda asanlıqla tapması şərtdir. "Yaxınlıqdakı kafelər" və ya "Bakıda marketinq agentliyi" kimi axtarışlarda ilk sıralarda çıxmaq sizə birbaşa isti müştəri qazandırır.</p><h3>Uğurlu Yerli SEO Üçün 3 Addım:</h3><ol><li><strong>Google My Business (GMB) Profilinin Tamamlanması:</strong> Bütün əlaqə məlumatlarınızı, iş saatlarını və real şəkilləri əlavə edin.</li><li><strong>Yerli Açar Sözlər:</strong> Vebsayt mətnlərinizdə (məs: "Bakıda SEO xidməti") geo-lokasiya bildirən sözlərdən istifadə edin.</li><li><strong>Müştəri Rəyləri:</strong> Mövcud müştərilərinizdən profilinizə rəy (review) yazmalarını xahiş edin. Yüksək reytinq axtarış nəticələrinə birbaşa təsir edir.</li></ol>',
    cover_image: 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?auto=format&fit=crop&q=80',
    published: true
  },
  {
    title: '2026-cı İldə Rəqəmsal Marketinq Trendləri: Biznesinizi Gələcəyə Hazırlayın',
    slug: '2026-reqemsal-marketinq-trendleri',
    excerpt: 'Süni intellektin rəqəmsal marketinqə təsiri və bu il diqqət yetirməli olduğunuz ən son trendlər.',
    content: '<h2>Gələcəyin Marketinq Trendləri</h2><p>Texnologiyanın sürətli inkişafı marketinq qaydalarını daima yeniləyir. 2026-cı ildə bizi nələr gözləyir?</p><ul><li><strong>Səslə Axtarışın (Voice Search) Optimizasiyası:</strong> İnsanlar artıq yazmaq əvəzinə səsli asistanlardan (Siri, Google Assistant) daha çox istifadə edirlər. Buna uyğun olaraq saytınız sual-cavab formatında optimallaşdırılmalıdır.</li><li><strong>Videoların Dominantlığı:</strong> Qısa və dinamik videolar (Shorts, Reels) məzmun marketinqinin ən güclü silahı olmağa davam edəcək.</li><li><strong>Hiper-Fərdiləşdirmə:</strong> Ümumi reklamlar əvəzinə, istifadəçinin şəxsi maraqlarına və əvvəlki hərəkətlərinə tam uyğunlaşdırılmış kampaniyalar daha çox uğur qazanacaq.</li></ul>',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    published: true
  },
  {
    title: 'Sosial Şəbəkələrdə (SMM) AI Algoritmləri Necə İşləyir?',
    slug: 'sosial-sebeke-ai-alqoritmleri',
    excerpt: 'Instagram, TikTok və LinkedIn alqoritmlərini başa düşərək daha çox müştəri cəlb etməyin yolları.',
    content: '<h2>Alqoritmləri Öz Xeyrinizə İşlədin</h2><p>Çox vaxt biznes sahibləri "postlarım bəyənilmir" deyə şikayət edirlər. Bunun əsas səbəbi sosial media platformalarının arxa planda işləyən AI alqoritmlərini başa düşməməkdir.</p><h3>Instagram və TikTok Alqoritminin Sirri</h3><p>Platformalar istifadəçini tətbiqdə daha çox saxlamaq istəyir. Buna görə də "Watch time" (İzlənmə müddəti) və "Engagement" (Qarşılıqlı əlaqə) ən vacib faktorlardır. Əgər istifadəçi videonuzu sonuna qədər izləyir və ya yadda saxlayırsa (save edirsə), alqoritm sizi daha çox insana göstərir.</p><p>Süni intellekt eyni zamanda postdakı mətnləri, vizualları və hətta videodakı səsi belə təhlil edərək onu hansı kütləyə göstərəcəyinə qərar verir. Məzmununuz hədəf kütlənizin maraqlarına tam uyğun olmalıdır.</p>',
    cover_image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    published: true
  },
  {
    title: 'Vebsayt Sürəti və Texniki SEO: UX-in Satışlara Təsiri',
    slug: 'vebsayt-sureti-texniki-seo',
    excerpt: 'Saytınızın sürətini artıraraq Google sıralamanızı necə yüksəltmək və müştəri itkisinin qarşısını almaq olar?',
    content: '<h2>Sürət Hər Şeydir</h2><p>Statistikalara görə, əgər bir vebsayt 3 saniyədən gec yüklənirsə, istifadəçilərin 50%-dən çoxu o saytı tərk edir. Bu həm potensial müştəri itkisi, həm də Google tərəfindən cəzalandırılmaq (axtarışda geriləmək) deməkdir.</p><h3>Texniki SEO-da Nələrə Diqqət Etməli?</h3><ul><li><strong>Şəkillərin Optimizasiyası:</strong> Böyük həcmli şəkillər (MB) əvəzinə WebP formatında sıxılmış şəkillərdən (KB) istifadə edin.</li><li><strong>Mobil Uyğunluq (Responsive Design):</strong> Axtarışların böyük əksəriyyəti mobil telefonlardan gəldiyi üçün saytınız telefonda qüsursuz işləməlidir.</li><li><strong>Təmiz Kod və Server (Hosting) Seçimi:</strong> Sürətli serverlər və artıq kodlardan təmizlənmiş sistem axtarış motorları tərəfindən daim sevilir.</li></ul>',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    published: true
  },
  {
    title: 'Məzmun Marketinqində ChatGPT-nin İnanılmaz Rolu',
    slug: 'mezmun-marketinq-chatgpt-rolu',
    excerpt: 'Unikal və cəlbedici SEO məzmunlar yaratmaq üçün süni intellektdən effektiv istifadə yolları.',
    content: '<h2>Məzmun Kraldır, Süni İntellekt isə Onun Ordusu</h2><p>Yüksək keyfiyyətli bloq postları, sosial media mətnləri və sayt kopyaları yazmaq çox vaxt və resurs tələb edir. Lakin ChatGPT kimi dil modelləri bu prosesi tamamilə dəyişib.</p><h3>Süni İntellektdən Necə Düzgün İstifadə Edək?</h3><p>ChatGPT-yə sadəcə "mənə məqalə yaz" demək kifayət deyil. Onunla bir komanda yoldaşı kimi işləməlisiniz. Doğru **Prompt** (təlimat) verərək axtarış həcmi yüksək olan açar sözləri (keywords) mətnə daxil etməsini, xüsusi oxucu kütləsi (məs: yalnız Gənclər üçün) üçün səs tonu (Tone of voice) seçməsini tələb edə bilərsiniz.</p><p>Süni intellekt məzmun yaradıcılığında köməkçi bir vasitədir, son toxunuşları və insan hissini mətnə əlavə etmək isə sizin peşəkarlığınızdan asılıdır.</p>',
    cover_image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80',
    published: true
  }
];

const services = [
  {
    title: 'AI Dəstəkli SEO Optimizasiyası',
    description: 'Vebsaytınızı ən son süni intellekt alətləri (ChatGPT, Gemini) ilə analiz edərək, axtarış sistemlərində yüksək sıralara qaldırırıq.',
    icon: 'fas fa-search-plus',
    published: true
  },
  {
    title: 'Geo-Targeting və PPC Reklamları',
    description: 'Biznesinizə uyğun dəqiq hədəf kütləsini müəyyən edərək, yerli və qlobal bazarda yüksək dönüşümlü reklam kampaniyalarının qurulması.',
    icon: 'fas fa-map-marked-alt',
    published: true
  },
  {
    title: 'Məzmun Yaradılışı və AI Kopiraytinq',
    description: 'Sektora uyğun, SEO yönümlü və cəlbedici məzmunların süni intellekt köməyi ilə peşəkar səviyyədə hazırlanması.',
    icon: 'fas fa-pen-nib',
    published: true
  },
  {
    title: 'SMM və Avtomatlaşdırılmış İdarəetmə',
    description: 'Sosial şəbəkə hesablarınızın trendlərə uyğun, süni intellekt tərəfindən dəstəklənən sistemlərlə avtomatlaşdırılmış şəkildə idarəedilməsi.',
    icon: 'fas fa-share-alt',
    published: true
  },
  {
    title: 'Rəqəmsal Strategiya və Konsaltinq',
    description: 'Biznesinizin rəqəmsal dünyada böyüməsi üçün tam təfərrüatlı, böyük dataya əsaslanan fərdi inkişaf və marketinq planının hazırlanması.',
    icon: 'fas fa-chess-knight',
    published: true
  },
  {
    title: 'Veb Analitika və Konversiya (CRO)',
    description: 'Saytınızın ziyarətçi davranışlarını analiz edərək, onların real müştəriyə çevrilmə faizini xeyli artıracaq texniki optimizasiyalar.',
    icon: 'fas fa-chart-line',
    published: true
  }
];

async function run() {
  await client.connect();
  
  // Clear existing items if any to avoid duplicates when running this script multiple times
  // We'll just insert directly. If they have IDs generated automatically, it's fine.
  
  console.log('Inserting 6 Blog Posts...');
  for (const b of blogs) {
    await client.query(`
      INSERT INTO posts (title, slug, excerpt, content, cover_image, published)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE 
      SET title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content, cover_image = EXCLUDED.cover_image
    `, [b.title, b.slug, b.excerpt, b.content, b.cover_image, b.published]);
  }
  
  console.log('Inserting 6 Services...');
  for (const s of services) {
    // Delete service with same title to avoid duplicate
    await client.query(`DELETE FROM services WHERE title = $1`, [s.title]);
    await client.query(`
      INSERT INTO services (title, description, icon, published)
      VALUES ($1, $2, $3, $4)
    `, [s.title, s.description, s.icon, s.published]);
  }
  
  console.log('Successfully inserted all content!');
  await client.end();
}
run();
