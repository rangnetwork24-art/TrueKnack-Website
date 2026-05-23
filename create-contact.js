const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');

// Extract head, nav, footer, and scripts
const headMatch = html.match(/<!DOCTYPE html>[\s\S]*?<\/head>/i);
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
const contactMatch = html.match(/<section id="contact"[\s\S]*?<\/section>/i);
const footerMatch = html.match(/<footer[\s\S]*?<\/html>/i);

if (!headMatch || !navMatch || !contactMatch || !footerMatch) {
    console.error("Failed to match one or more sections");
    process.exit(1);
}

const head = headMatch[0];
const nav = navMatch[0];
const contactSection = contactMatch[0];
const endPart = footerMatch[0];

// Update the head title and meta description
let newHead = head
    .replace(/<title>.*?<\/title>/, '<title>Contact Us — TrueKnack Skill Services</title>')
    .replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Get in touch with TrueKnack. We are here to help you with your recruitment, staffing, and HR consulting needs.">')
    .replace(/<link rel="canonical" href="https:\/\/www\.trueknack\.in\/" \/>/, '<link rel="canonical" href="https://www.trueknack.in/contact.html" />');

// Build the contact page hero
const contactHero = `
    <main class="pt-24 pb-0 lg:pt-28">
        <!-- Page Header -->
        <section class="relative pt-20 pb-12 px-6 overflow-hidden bg-navy text-white">
            <div class="absolute inset-0 bg-[url('assets/grid.svg')] opacity-10"></div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div class="max-w-7xl mx-auto relative z-10 text-center">
                <span class="inline-block px-4 py-1.5 bg-red/20 text-red-100 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">Get in Touch</span>
                <h1 class="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
                <p class="text-xl text-white/80 max-w-2xl mx-auto">Whether you're looking for top talent or your next career move, our team is ready to assist you.</p>
            </div>
        </section>
`;

// Remove the `id="contact"` from the section so internal links to #contact on the new page don't just jump halfway down the page
// Actually, it's fine, but let's change `id="contact"` to `id="contact-form"` to avoid anchor jumps hiding the hero.
const modifiedContactSection = contactSection.replace('<section id="contact"', '<section id="contact-form"');

// Build the final HTML
let newHtml = newHead + '\n<body class="font-sans text-navy antialiased selection:bg-red selection:text-white overflow-x-hidden">\n' +
    '    <!-- Custom Cursor -->\n    <div class="cursor-dot hidden md:block"></div>\n    <div class="cursor-outline hidden md:block"></div>\n\n' +
    nav + '\n' + contactHero + '\n' + modifiedContactSection + '\n    </main>\n' + endPart;

// Make sure the nav links point to contact.html instead of #contact
// For mobile links
newHtml = newHtml.replace(/href="#contact" class="mobile-link/g, 'href="contact.html" class="mobile-link');
// For desktop links
newHtml = newHtml.replace(/href="#contact" class="px-5 py-2\.5/g, 'href="contact.html" class="px-5 py-2.5');

// Update all nav links to remove active styling from 'Home' and put it nowhere (since Contact isn't in the main nav list, just a button)
newHtml = newHtml.replace(/class="text-red font-semibold"/g, 'class="text-navy/70 hover:text-red font-medium transition-colors"');

fs.writeFileSync('contact.html', newHtml);
console.log('Created contact.html');

// Now, update navigation across ALL files to link to contact.html instead of #contact (except maybe index.html, but the user said "let that bottom one stay as well", meaning they want the contact.html page to exist. Usually, nav bars are updated to point to the new page so users can reach it from everywhere).
// Actually, it's safer to leave `index.html` nav pointing to `#contact` for smooth scroll on the homepage, but other pages like `about.html`, `services.html` should point to `contact.html` instead of `index.html#contact`.
// Let's update all files to point the "Contact Us" nav button to `contact.html`.

const files = ['index.html', 'about.html', 'services.html', 'recruitment.html', 'staffing.html', 'hire-train-deploy.html', 'hr-consulting.html', 'privacy-policy.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Desktop Nav Button
    content = content.replace(/href="(?:index\.html)?#contact" class="px-5 py-2\.5/g, 'href="contact.html" class="px-5 py-2.5');
    
    // Mobile Nav Button
    content = content.replace(/href="(?:index\.html)?#contact" class="mobile-link/g, 'href="contact.html" class="mobile-link');
    
    // Footer Link
    content = content.replace(/href="(?:index\.html)?#contact" class="text-white\/70/g, 'href="contact.html" class="text-white/70');
    
    // Any other buttons inside content that say "Contact Us" or similar
    content = content.replace(/href="index\.html#contact"/g, 'href="contact.html"');
    
    fs.writeFileSync(file, content);
    console.log('Updated links in ' + file);
});
