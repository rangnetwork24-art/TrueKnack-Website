const fs = require('fs');

function fixIndexForm(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Remove FORMSPREE_URL
    html = html.replace(/const FORMSPREE_URL = 'https:\/\/formspree\.io\/f\/mlgzappn';\n\s*/g, '');

    // Replace fetch(FORMSPREE_URL with fetch(form.action
    html = html.replace(/fetch\(FORMSPREE_URL,/g, 'fetch(form.action,');

    fs.writeFileSync(filePath, html);
    console.log('Fixed fetch action in ' + filePath);
}

fixIndexForm('index.html');
