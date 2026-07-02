const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    await page.goto('http://localhost:5175');
    await page.waitForTimeout(2000);
    console.log('SUCCESS');
  } catch (e) {
    console.log('NAV ERROR', e);
  }
  await browser.close();
}
test();
