const fs = require('fs');

function fixFormSubmission(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const isIndex = filePath.includes('index.html');
    const label = isIndex ? 'index.html' : 'contact.html';

    // 1. Add hidden iframe right before the <form> tag
    if (!html.includes('id="formTarget"')) {
        html = html.replace(
            /<form id="contactForm"/,
            '<iframe name="formTarget" id="formTarget" style="display:none" aria-hidden="true"></iframe>\n' +
            '                <form id="contactForm" target="formTarget"'
        );
        console.log(`[${label}] Added hidden iframe target`);
    }

    // 2. Remove the _next hidden input (we don't want a redirect inside the iframe)
    // Actually keep it but point to a blank page or remove it
    html = html.replace(
        /<input type="hidden" name="_next" value="[^"]*">/,
        '<input type="hidden" name="_next" value="https://www.trueknack.in/">'
    );
    console.log(`[${label}] Fixed _next redirect`);

    // 3. Replace the entire submit handler with an iframe-based approach
    // For index.html:
    if (isIndex) {
        const oldSubmitBlock = `form.addEventListener('submit', async (e) => {
                e.preventDefault();
                hideFormError();
                let isFormValid = true;
                inputs.forEach(input => { if (!validateField(input)) isFormValid = false; });

                // Honeypot check — if filled, silently pretend success (bots)
                const honeypot = form.querySelector('[name="_gotcha"]');
                if (honeypot && honeypot.value) {
                    return;
                }

                if (isFormValid) {
                    const btn = document.getElementById('submitBtn');
                    const btnText = btn.querySelector('span');

                    btnText.innerHTML = \`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...\`;
                    btn.classList.add('opacity-80', 'pointer-events-none');
                    btn.disabled = true;

                    try {
                        const formData = new FormData(form);
                        const response = await fetch(form.action, { method: 'POST', body: formData });

                        if (response.ok || response.redirected) {
                            const successOverlay = document.getElementById('form-success');
                            const successIcon = document.getElementById('success-icon');
                            successOverlay.classList.remove('opacity-0', 'pointer-events-none');
                            gsap.to(successIcon, { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.2 });
                            form.reset();
                            resetDropZone();
                            resetBtn(btn, btnText);

                            setTimeout(() => {
                                gsap.to(successIcon, { scale: 0, duration: 0.3 });
                                successOverlay.classList.add('opacity-0', 'pointer-events-none');
                            }, 4000);
                        } else {
                            showFormError('Failed to send. Please email us directly at hr@trueknack.in');
                            resetBtn(btn, btnText);
                        }
                    } catch (networkErr) {
                        showFormError('Network error. Please check your connection and try again.');
                        resetBtn(btn, btnText);
                    }
                }
            });`;

        const newSubmitBlock = `form.addEventListener('submit', function(e) {
                hideFormError();
                let isFormValid = true;
                inputs.forEach(input => { if (!validateField(input)) isFormValid = false; });

                // Honeypot check
                const honeypot = form.querySelector('[name="_gotcha"]');
                if (honeypot && honeypot.value) { e.preventDefault(); return; }

                if (!isFormValid) {
                    e.preventDefault();
                    return;
                }

                // Form is valid — allow native submission to iframe
                const btn = document.getElementById('submitBtn');
                const btnText = btn.querySelector('span');
                btnText.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
                btn.classList.add('opacity-80', 'pointer-events-none');
                btn.disabled = true;

                // Listen for iframe load = submission complete
                const iframe = document.getElementById('formTarget');
                iframe.onload = function() {
                    const successOverlay = document.getElementById('form-success');
                    const successIcon = document.getElementById('success-icon');
                    successOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    if (typeof gsap !== 'undefined') gsap.to(successIcon, { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.2 });
                    form.reset();
                    resetDropZone();
                    resetBtn(btn, btnText);
                    setTimeout(function() {
                        if (typeof gsap !== 'undefined') gsap.to(successIcon, { scale: 0, duration: 0.3 });
                        successOverlay.classList.add('opacity-0', 'pointer-events-none');
                    }, 4000);
                    iframe.onload = null;
                };
            });`;

        if (html.includes(oldSubmitBlock)) {
            html = html.replace(oldSubmitBlock, newSubmitBlock);
            console.log(`[${label}] Replaced fetch-based submit with iframe-based submit`);
        } else {
            console.log(`[${label}] WARNING: Could not find old submit block to replace!`);
            // Try a more flexible approach - find and replace the form.addEventListener block
        }
    }

    // For contact.html:
    if (!isIndex) {
        // Find the submit handler in contact.html
        const oldContactSubmit = `form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideFormError(); hideFileError();
        let isFormValid = true;
        textInputs.forEach(input => { if (!validateField(input)) isFormValid = false; });
        const file = fileInput.files[0];
        if (file && !validateFile(file)) isFormValid = false;
        const honeypot = form.querySelector('[name="_gotcha"]');
        if (honeypot && honeypot.value) return;

        if (isFormValid) {
            const btn = document.getElementById('submitBtn');
            const btnText = document.getElementById('submitBtnText');`;

        const newContactSubmit = `form.addEventListener('submit', function(e) {
        hideFormError(); hideFileError();
        let isFormValid = true;
        textInputs.forEach(input => { if (!validateField(input)) isFormValid = false; });
        const file = fileInput.files[0];
        if (file && !validateFile(file)) isFormValid = false;
        const honeypot = form.querySelector('[name="_gotcha"]');
        if (honeypot && honeypot.value) { e.preventDefault(); return; }

        if (!isFormValid) {
            e.preventDefault();
            return;
        }

        // Form is valid — allow native submission to iframe
        {
            const btn = document.getElementById('submitBtn');
            const btnText = document.getElementById('submitBtnText');`;

        if (html.includes(oldContactSubmit)) {
            html = html.replace(oldContactSubmit, newContactSubmit);
            console.log(`[${label}] Replaced submit handler start`);
        } else {
            console.log(`[${label}] WARNING: Could not find old contact submit start!`);
        }

        // Replace the fetch call and its handling
        const oldFetch = `try {
                const formData = new FormData(form);
                const response = await fetch(form.action, { method: 'POST', body: formData });
                if (response.ok || response.status === 200 || response.redirected) {
                    const successOverlay = document.getElementById('form-success');
                    const successIcon = document.getElementById('success-icon');
                    successOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    gsap.to(successIcon, { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.2 });
                    form.reset(); resetDropZone();
                    btnText.innerHTML = 'Send Message <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';
                    btn.classList.remove('opacity-80', 'pointer-events-none'); btn.disabled = false;
                    setTimeout(() => {
                        gsap.to(successIcon, { scale: 0, duration: 0.3 });
                        successOverlay.classList.add('opacity-0', 'pointer-events-none');
                    }, 4000);
                } else { throw new Error('Submission failed'); }
            } catch (err) {
                showFormError('Failed to send. Please email us directly at hr@trueknack.in');`;

        const newFetch = `// Listen for iframe load = submission complete
            const iframe = document.getElementById('formTarget');
            iframe.onload = function() {
                    const successOverlay = document.getElementById('form-success');
                    const successIcon = document.getElementById('success-icon');
                    successOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    if (typeof gsap !== 'undefined') gsap.to(successIcon, { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.2 });
                    form.reset(); resetDropZone();
                    btnText.innerHTML = 'Send Message <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';
                    btn.classList.remove('opacity-80', 'pointer-events-none'); btn.disabled = false;
                    setTimeout(function() {
                        if (typeof gsap !== 'undefined') gsap.to(successIcon, { scale: 0, duration: 0.3 });
                        successOverlay.classList.add('opacity-0', 'pointer-events-none');
                    }, 4000);
                    iframe.onload = null;
            };
            // Show spinner while submitting
            {`;

        if (html.includes(oldFetch)) {
            html = html.replace(oldFetch, newFetch);
            console.log(`[${label}] Replaced fetch with iframe listener`);
        } else {
            console.log(`[${label}] WARNING: Could not find old fetch block!`);
        }

        // Clean up remaining fetch-related lines
        html = html.replace(
            `                btnText.innerHTML = 'Send Message <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';
                btn.classList.remove('opacity-80', 'pointer-events-none'); btn.disabled = false;
            }
        }
    });`,
            `            }
        }
    });`
        );
    }

    // 4. Remove e.preventDefault() that was before — the form now submits natively
    // Already handled above by changing from async (e) => { e.preventDefault() to function(e) { ... }

    fs.writeFileSync(filePath, html);
    console.log(`[${label}] DONE!\n`);
}

fixFormSubmission('index.html');
fixFormSubmission('contact.html');

console.log('=== All form submissions converted to iframe-based approach ===');
