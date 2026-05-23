const fs = require('fs');

const f = fs.readFileSync('index.html', 'utf8');
console.log('=== INDEX.HTML CHECKS ===');
console.log('Has error-message CSS:', f.includes('.error-message {'));
console.log('Has input-error CSS:', f.includes('.input-error {'));
console.log('Has input-error+error-message CSS:', f.includes('.input-error + .error-message'));
console.log('Phone regex lenient:', f.includes('/^[0-9]{10,15}$/'));
console.log('No strict Indian regex:', !f.includes('/^[6-9][0-9]{9}$/'));
console.log('Has dropzone JS:', f.includes("fileInput.addEventListener('change'"));
console.log('No FORMSPREE_URL:', !f.includes('FORMSPREE_URL'));
console.log('Uses form.action:', f.includes('fetch(form.action'));
console.log('Has response.redirected:', f.includes('response.redirected'));
console.log('No response.json crash:', !f.includes('response.json()'));
console.log('Has error spans:', f.includes('phone-error'));

const c = fs.readFileSync('contact.html', 'utf8');
console.log('\n=== CONTACT.HTML CHECKS ===');
console.log('Has error-message CSS:', c.includes('.error-message {'));
console.log('Has input-error CSS:', c.includes('.input-error {'));
console.log('Phone regex lenient:', c.includes('/^[0-9]{10,15}$/'));
console.log('No strict Indian regex:', !c.includes('/^[6-9][0-9]{9}$/'));
console.log('Has dropzone JS:', c.includes("fileInput.addEventListener('change'"));
console.log('Uses form.action:', c.includes('fetch(form.action'));
console.log('Has response.redirected:', c.includes('response.redirected'));
