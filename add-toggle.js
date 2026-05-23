const fs = require('fs');

function addToggleToForm(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Inject the Toggle HTML right after the hidden inputs
    const hiddenInputsEndRegex = /(<input type="hidden" name="_next" value="[^"]*">)/;
    const toggleHtml = `
                        <!-- Form Type Toggle -->
                        <div class="flex p-1.5 bg-graylight border border-navy/10 rounded-2xl w-full max-w-md mx-auto mb-8 relative">
                            <div class="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-out" id="formToggleBg"></div>
                            <button type="button" class="form-toggle-btn active flex-1 py-3 text-sm font-bold text-navy z-10 transition-colors" data-type="employer">I'm an Employer</button>
                            <button type="button" class="form-toggle-btn flex-1 py-3 text-sm font-bold text-navy/50 z-10 transition-colors hover:text-navy/80" data-type="employee">I'm a Job Seeker</button>
                        </div>
                        <input type="hidden" name="Inquiry_Type" id="inquiryType" value="Employer">
    `;
    
    // Check if already injected
    if (!html.includes('id="formToggleBg"')) {
        html = html.replace(hiddenInputsEndRegex, '$1\n' + toggleHtml);
    }

    // 2. Wrap the Resume Dropzone in a div with id="resumeWrapper" and hide it initially
    const resumeStartRegex = /(<!-- Drag & Drop Zone \(Optional Resume\) -->\s*<div class="relative)/;
    if (html.includes('<!-- Drag & Drop Zone (Optional Resume) -->') && !html.includes('id="resumeWrapper"')) {
        html = html.replace(resumeStartRegex, '<div id="resumeWrapper" style="display: none;">\n                        $1');
        
        // Find the end of the resume section (it's right before the honeypot)
        const resumeEndRegex = /(<!-- Honeypot field for bot protection -->)/;
        html = html.replace(resumeEndRegex, '</div>\n\n                    $1');
    }

    // 3. Add IDs to the message label for dynamic text
    if (!html.includes('id="messageLabel"')) {
        html = html.replace('<label for="message" class="block text-sm font-medium text-navy/70 mb-2">How can We&nbsp;help you? *</label>', 
                            '<label for="message" id="messageLabel" class="block text-sm font-medium text-navy/70 mb-2">How can We&nbsp;help you? *</label>');
    }

    // 4. Inject the JS Logic into the main script block
    const jsLogic = `
    // --- Form Type Toggle Logic ---
    const toggleBtns = document.querySelectorAll('.form-toggle-btn');
    const toggleBg = document.getElementById('formToggleBg');
    const inquiryTypeInput = document.getElementById('inquiryType');
    const resumeWrapper = document.getElementById('resumeWrapper');
    const messageLabel = document.getElementById('messageLabel');
    const messageInput = document.getElementById('message');
    const subjectInput = document.querySelector('input[name="_subject"]');

    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active classes
                toggleBtns.forEach(b => {
                    b.classList.remove('active', 'text-navy');
                    b.classList.add('text-navy/50');
                });
                btn.classList.add('active', 'text-navy');
                btn.classList.remove('text-navy/50');

                const type = btn.getAttribute('data-type');
                
                if (type === 'employer') {
                    inquiryTypeInput.value = 'Employer';
                    toggleBg.style.transform = 'translateX(0)';
                    resumeWrapper.style.display = 'none';
                    if (messageLabel) messageLabel.innerHTML = 'How can We&nbsp;help you? *';
                    if (messageInput) messageInput.placeholder = 'Tell us about your hiring needs...';
                    if (subjectInput) subjectInput.value = 'New Employer Inquiry — TrueKnack Website';
                } else {
                    inquiryTypeInput.value = 'Job Seeker';
                    toggleBg.style.transform = 'translateX(100%)';
                    
                    // Animate resume wrapper in
                    resumeWrapper.style.display = 'block';
                    resumeWrapper.style.opacity = '0';
                    resumeWrapper.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        resumeWrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        resumeWrapper.style.opacity = '1';
                        resumeWrapper.style.transform = 'translateY(0)';
                    }, 10);
                    
                    if (messageLabel) messageLabel.innerHTML = 'Tell us about yourself *';
                    if (messageInput) messageInput.placeholder = 'What role are you looking for?';
                    if (subjectInput) subjectInput.value = 'New Job Seeker Application — TrueKnack Website';
                }
            });
        });
    }
    `;

    // Inject into the end of the script before the final `});` of DOMContentLoaded
    const scriptEndRegex = /(}\);\n\s*<\/script>)/;
    if (!html.includes('Form Type Toggle Logic')) {
        html = html.replace(scriptEndRegex, jsLogic + '\n$1');
    }

    fs.writeFileSync(filePath, html);
    console.log('Added toggle to ' + filePath);
}

addToggleToForm('index.html');
addToggleToForm('contact.html');
