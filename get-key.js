const res = await fetch('https://elvinsahbazov.com/');
const text = await res.text();
const match = text.match(/src="(\/assets\/index-[^"]+\.js)"/);
if (match) {
  const jsRes = await fetch('https://elvinsahbazov.com' + match[1]);
  const jsText = await jsRes.text();
  const keys = jsText.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+/g);
  console.log('Keys:', keys);
}
