const fs = require('fs');

function updateEmail(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace the Formsubmit action URL
    html = html.replace(
        /action="https:\/\/formsubmit\.co\/hr@trueknack\.in"/g,
        'action="https://formsubmit.co/irbfshareddrive@gmail.com"'
    );

    fs.writeFileSync(filePath, html);
    console.log('Updated Formsubmit email in ' + filePath);
}

updateEmail('index.html');
updateEmail('contact.html');
