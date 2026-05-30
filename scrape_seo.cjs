const https = require('https');
const getHtml = (url) => new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => resolve(data));
    });
});

async function main() {
    const uniko = await getHtml('https://kazzas.com.br/imoveis/uniko-vila-olimpia/');
    const verus = await getHtml('https://verusincorporadora.com.br/verus-mackenzie/');

    console.log('UNIKO SEO:');
    console.log((uniko.match(/<title>.*?<\/title>|<meta[^>]+name=\"description\"[^>]*>|<meta[^>]+property=\"og:[^>]*/gi) || []).join('\n'));

    console.log('\nVERUS SEO:');
    console.log((verus.match(/<title>.*?<\/title>|<meta[^>]+name=\"description\"[^>]*>|<meta[^>]+property=\"og:[^>]*/gi) || []).join('\n'));
}

main();
