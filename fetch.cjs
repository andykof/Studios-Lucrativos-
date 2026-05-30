const https = require('https');
https.get('https://kazzas.com.br/imoveis/uniko-vila-olimpia/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const urls = [...data.matchAll(/https:\/\/[^\s\"\'\>]+\.(?:jpg|jpeg|png|webp)/g)].map(m => m[0]);
    // filter out resized images ending with like -300x149.jpg or -1024x508.jpg
    const filtered = urls.filter(url => !url.match(/-\d{2,}x\d{2,}\.(?:jpg|jpeg|png|webp)$/));
    const unique = [...new Set(filtered)];
    // also filter out icons and non-KALLAS images
    const kallasImages = unique.filter(url => url.includes('KALLAS'));
    if (kallasImages.length > 0) {
       console.log(kallasImages.join('\n'));
    } else {
       console.log(unique.slice(0, 30).join('\n'));
    }
  });
});
