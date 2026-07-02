const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE LOG ERROR:', msg.text());
    } else {
      console.log('PAGE LOG:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  try {
    await page.goto('http://127.0.0.1:5174', { waitUntil: 'networkidle2' });
  } catch(e) {
    console.log('NAV ERROR', e);
  }
  
  await browser.close();
})();
