const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The duplicate script is between <!-- Resume Dropzone JS --> and <script src="assets/chatbot.js" defer></script>
const scriptStart = html.indexOf('<!-- Resume Dropzone JS -->');
if (scriptStart !== -1) {
    const nextScript = html.indexOf('<script src="assets/chatbot.js" defer></script>', scriptStart);
    if (nextScript !== -1) {
        // Remove the block
        html = html.substring(0, scriptStart) + html.substring(nextScript);
        fs.writeFileSync('index.html', html);
        console.log('Removed orphaned resume script from index.html');
    }
}
