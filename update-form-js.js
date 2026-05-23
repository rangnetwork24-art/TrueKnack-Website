const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const contactJsReplacement = `
            // --- 6. Form Logic ---
            const form = document.getElementById('contactForm');
            const inputs = form.querySelectorAll('input:not([name="_gotcha"]):not([type="file"]), textarea');
            const fileInput = document.getElementById('resumeFile');
            const dropZone = document.getElementById('dropZone');
            const dropZoneContent = document.getElementById('dropZoneContent');
            const fileSelected = document.getElementById('fileSelected');
            const fileNameEl = document.getElementById('fileName');
            const fileSizeEl = document.getElementById('fileSize');
            const fileErrorEl = document.getElementById('file-error');

            const emailRegex = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
            const phoneRegex = /^[6-9][0-9]{9}$/;
            const formErrorEl = document.getElementById('form-error');
            const formErrorText = document.getElementById('form-error-text');
            // Changed from Formspree to Formsubmit
            const FORMSUBMIT_URL = 'https://formsubmit.co/hr@trueknack.in';

            const ALLOWED_TYPES = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            const MAX_SIZE = 5 * 1024 * 1024; // 5MB

            function formatSize(bytes) {
                if (bytes < 1024) return bytes + ' B';
                if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
                return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
            }

            function showFormError(msg) {
                formErrorText.textContent = msg || 'Something went wrong. Please try again or email us directly at hr@trueknack.in';
                formErrorEl.classList.remove('hidden');
                formErrorEl.classList.add('flex');
            }
            function hideFormError() {
                formErrorEl.classList.add('hidden');
                formErrorEl.classList.remove('flex');
            }
            function showFileError(msg) {
                fileErrorEl.textContent = msg;
                fileErrorEl.classList.remove('hidden');
            }
            function hideFileError() {
                fileErrorEl.classList.add('hidden');
            }

            function validateField(input) {
                let isValid = true;
                if (input.value.trim() === '') isValid = false;
                else if (input.type === 'email' && !emailRegex.test(input.value)) isValid = false;
                else if (input.type === 'tel') { const digits = input.value.replace(/\\D/g, ''); const normalizedPhone = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits; if (!phoneRegex.test(normalizedPhone)) isValid = false; }

                if (!isValid) {
                    input.classList.add('input-error');
                    input.setAttribute('aria-invalid', 'true');
                } else {
                    input.classList.remove('input-error');
                    input.setAttribute('aria-invalid', 'false');
                }
                return isValid;
            }

            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('input-error')) validateField(input);
                });
            });

            // File Validation
            function validateFile(file) {
                hideFileError();
                if (!file) return true; // Optional file
                if (!ALLOWED_TYPES.includes(file.type)) {
                    showFileError('Please upload a PDF, DOC, or DOCX file.');
                    resetDropZone();
                    return false;
                }
                if (file.size > MAX_SIZE) {
                    showFileError('File is too large. Maximum size is 5MB.');
                    resetDropZone();
                    return false;
                }
                return true;
            }

            function showFilePreview(file) {
                dropZoneContent.classList.add('hidden');
                fileSelected.classList.remove('hidden');
                fileNameEl.textContent = file.name;
                fileSizeEl.textContent = formatSize(file.size);
                dropZone.classList.add('border-green-400', 'bg-green-50/30');
                dropZone.classList.remove('border-navy/20');
            }

            function resetDropZone() {
                dropZoneContent.classList.remove('hidden');
                fileSelected.classList.add('hidden');
                dropZone.classList.remove('border-green-400', 'bg-green-50/30');
                dropZone.classList.add('border-navy/20');
                fileInput.value = '';
            }

            fileInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file && validateFile(file)) {
                    showFilePreview(file);
                }
            });

            ['dragenter', 'dragover'].forEach(evt => {
                dropZone.addEventListener(evt, (e) => {
                    e.preventDefault();
                    dropZone.classList.add('border-navy', 'bg-navy/[0.03]');
                });
            });
            ['dragleave', 'drop'].forEach(evt => {
                dropZone.addEventListener(evt, (e) => {
                    e.preventDefault();
                    dropZone.classList.remove('border-navy', 'bg-navy/[0.03]');
                });
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                hideFormError();
                hideFileError();

                let isFormValid = true;
                inputs.forEach(input => { if (!validateField(input)) isFormValid = false; });

                const file = fileInput.files[0];
                if (file && !validateFile(file)) {
                    isFormValid = false;
                }

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
                        const response = await fetch(FORMSUBMIT_URL, {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                        });

                        if (response.ok) {
                            const successOverlay = document.getElementById('form-success');
                            const successIcon = document.getElementById('success-icon');
                            successOverlay.classList.remove('pointer-events-none');
                            successOverlay.style.opacity = '1';
                            
                            setTimeout(() => {
                                successIcon.style.transform = 'scale(1)';
                                successIcon.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            }, 300);
                        } else {
                            throw new Error('Submission failed');
                        }
                    } catch (err) {
                        showFormError('Failed to send message. Please email us directly at hr@trueknack.in');
                        btnText.innerHTML = \`Send Message <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>\`;
                        btn.classList.remove('opacity-80', 'pointer-events-none');
                        btn.disabled = false;
                    }
                }
            });
`;

html = html.replace(/\/\/ --- 6\. Form Logic ---[\s\S]*?(?=\/\/ --- 7\. Reveal Animations ---)/i, contactJsReplacement);

fs.writeFileSync('index.html', html);
console.log('JS Updated');
