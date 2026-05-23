const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const formsubmitInputs = `
                        <!-- Formsubmit.co config -->
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_subject" value="New Submission (with potential Resume) — TrueKnack Website">
                        <input type="hidden" name="_template" value="table">
                        <input type="hidden" name="_next" value="https://www.trueknack.in/index.html#contact">
`;

const dropZoneHtml = `
                        <!-- Drag & Drop Zone (Optional Resume) -->
                        <div class="relative mt-4">
                            <label class="block text-sm font-medium text-navy/70 mb-2">Upload Resume (Optional)</label>
                            <div id="dropZone"
                                class="relative border-2 border-dashed border-navy/20 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-navy/40 hover:bg-navy/[0.02] group">
                                <input type="file" id="resumeFile" name="attachment"
                                    accept=".pdf,.doc,.docx"
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                                <div id="dropZoneContent" class="pointer-events-none">
                                    <div class="w-16 h-16 mx-auto mb-4 bg-navy/5 rounded-2xl flex items-center justify-center group-hover:bg-navy/10 transition-colors">
                                        <svg class="w-8 h-8 text-navy/40 group-hover:text-navy/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                    </div>
                                    <p class="text-navy/70 font-medium mb-1">Drag & drop your resume here</p>
                                    <p class="text-navy/40 text-sm">or <span class="text-red font-semibold underline">browse files</span></p>
                                    <p class="text-navy/30 text-xs mt-2">PDF, DOC, DOCX — Max 5MB</p>
                                </div>
                                <!-- File selected state -->
                                <div id="fileSelected" class="hidden pointer-events-none">
                                    <div class="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-2xl flex items-center justify-center">
                                        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <p class="text-navy font-semibold mb-1" id="fileName">file.pdf</p>
                                    <p class="text-navy/40 text-sm" id="fileSize">0 KB</p>
                                </div>
                            </div>
                            <span id="file-error" class="error-message hidden text-red text-sm mt-2"></span>
                        </div>
`;

// 1. Add enctype and action to form, and insert hidden config
html = html.replace(
    '<form id="contactForm" class="space-y-6 relative z-10" novalidate>', 
    '<form id="contactForm" action="https://formsubmit.co/hr@trueknack.in" method="POST" enctype="multipart/form-data" class="space-y-6 relative z-10" novalidate>\n' + formsubmitInputs
);

// 2. Insert dropzone right before the honeypot in contact form
html = html.replace(
    '<!-- Honeypot field for bot protection -->',
    dropZoneHtml + '\n                        <!-- Honeypot field for bot protection -->'
);

// 3. Remove the entire resume-upload section
html = html.replace(/<!-- Resume Upload Dropzone Section -->[\s\S]*?<!-- Footer -->/i, '<!-- Footer -->');

fs.writeFileSync('index.html', html);
console.log('HTML updated');
