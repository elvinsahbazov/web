const https = require('https');
https.get('https://docs.google.com/forms/d/e/1FAIpQLSfD-P6RhwGioRtXPreb4P1FsHd5flsJKXvnh7pokAaR4zPhUw/viewform', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const regex = /data-params="([^"]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
        console.log(match[1].substring(0, 500));
    }
  });
});
