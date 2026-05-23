const fs = require('fs');
const files = ['index.html', 'about.html', 'services.html', 'recruitment.html', 'staffing.html', 'hire-train-deploy.html', 'hr-consulting.html', 'privacy-policy.html'];

files.forEach(f => {
    try {
        let html = fs.readFileSync(f, 'utf8');
        
        // This regex matches the `<nav ... id="navbar" ...>` and the following `<div ...>`
        const regex = /<nav[^>]*id="navbar"[^>]*>\s*<div[^>]*w-full[^>]*max-w-none[^>]*>/i;
        
        const replacement = `<nav class="fixed w-full z-50 transition-all duration-300 py-2 bg-white shadow-sm text-navy px-4 sm:px-6 lg:px-8" id="navbar">\n        <div class="max-w-7xl mx-auto w-full flex justify-between items-center">`;

        if (regex.test(html)) {
            html = html.replace(regex, replacement);
            fs.writeFileSync(f, html);
            console.log('Fixed ' + f);
        } else {
            console.log('No match in ' + f);
        }
    } catch (e) {
        console.error('Error with ' + f + ': ' + e);
    }
});
