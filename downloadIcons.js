const https = require('https');
const fs = require('fs');

const icons = [
    { url: 'https://img.icons8.com/color/192/sun--v1.png', name: 'icon-192.png' },
    { url: 'https://img.icons8.com/color/512/sun--v1.png', name: 'icon-512.png' }
];

icons.forEach(icon => {
    https.get(icon.url, (res) => {
        const path = `./${icon.name}`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish', () => {
            filePath.close();
            console.log(`Baixado: ${icon.name}`);
        });
    }).on('error', (err) => {
        console.error(`Erro ao baixar ${icon.name}:`, err.message);
    });
});
