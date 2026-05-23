const fs = require('fs');
const files = ['index.html', 'about.html', 'services.html', 'recruitment.html', 'staffing.html', 'hire-train-deploy.html', 'hr-consulting.html', 'privacy-policy.html'];

const gaCode = `
    <!-- Google Analytics (Placeholder) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    </script>
`;

files.forEach(f => {
    try {
        let html = fs.readFileSync(f, 'utf8');
        
        // Skip if already added
        if (html.includes('G-XXXXXXXXXX')) {
            console.log('Skipping ' + f + ' (already has GA)');
            return;
        }

        // Insert just before the closing </head> tag
        html = html.replace('</head>', gaCode + '</head>');
        
        fs.writeFileSync(f, html);
        console.log('Added GA to ' + f);
    } catch (e) {
        console.error('Error with ' + f + ': ' + e);
    }
});
