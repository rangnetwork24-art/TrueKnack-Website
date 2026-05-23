const fs = require('fs');

const htmlFiles = [
    'index.html', 'about.html', 'services.html', 'contact.html',
    'recruitment.html', 'staffing.html', 'hire-train-deploy.html',
    'hr-consulting.html', 'privacy-policy.html'
];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace all instances of href="#contact" with href="contact.html"
    content = content.replace(/href="#contact"/g, 'href="contact.html"');
    
    // Replace all instances of href="index.html#contact" with href="contact.html"
    content = content.replace(/href="index\.html#contact"/g, 'href="contact.html"');
    
    // Also handle any potential href="#contact-form" (if I accidentally used that)
    content = content.replace(/href="#contact-form"/g, 'href="contact.html"');
    
    fs.writeFileSync(file, content);
    console.log('Updated links in ' + file);
});

// Update Chatbot JS
let chatbotJs = fs.readFileSync('assets/chatbot.js', 'utf8');
chatbotJs = chatbotJs.replace(/href="index\.html#contact"/g, 'href="contact.html"');
chatbotJs = chatbotJs.replace(/href="index\.html#contactForm"/g, 'href="contact.html"');
fs.writeFileSync('assets/chatbot.js', chatbotJs);
console.log('Updated links in chatbot.js');
