const puppeteer = require('puppeteer-core');
async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERROR:', err));
  await page.goto('http://localhost:4173');
  await new Promise(r => setTimeout(r, 3000));
  await browser.close();
}
run();
