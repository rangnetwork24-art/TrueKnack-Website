const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets');

fs.readdir(dir, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg')) {
            const inputPath = path.join(dir, file);
            const ext = path.extname(file);
            const webpName = file.replace(ext, '.webp');
            const outputPath = path.join(dir, webpName);

            console.log(`Converting ${file} to ${webpName}...`);
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath)
                .catch(err => console.error(`Error converting ${file}:`, err));
        }
    }
    console.log('Conversion complete!');
});
