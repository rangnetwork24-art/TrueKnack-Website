const fs = require('fs');

// ===== FIX 1: Add missing CSS for error-message and input-error to BOTH files =====
const errorCSS = `
        /* Form validation styles */
        .error-message {
            display: none;
            color: #9b2a27;
            font-size: 0.75rem;
            font-weight: 500;
            margin-top: 0.375rem;
        }
        .input-error {
            border-color: #9b2a27 !important;
            background-color: #fef2f2 !important;
        }
        .input-error + .error-message {
            display: block;
        }
`;

function fixFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    let changes = [];

    // 1. Inject error CSS if missing — right before </style>
    if (!html.includes('.error-message {')) {
        // Find the last </style> before </head>
        const headEnd = html.indexOf('</head>');
        const lastStyleEnd = html.lastIndexOf('</style>', headEnd);
        if (lastStyleEnd !== -1) {
            html = html.substring(0, lastStyleEnd) + errorCSS + html.substring(lastStyleEnd);
            changes.push('Added error-message + input-error CSS');
        }
    }

    // 2. Fix phone validation — accept any 10+ digit number, be lenient
    // Replace the strict Indian-only regex with a lenient one
    html = html.replace(
        /const phoneRegex = \/\^\[6-9\]\[0-9\]\{9\}\$\/;/g,
        "const phoneRegex = /^[0-9]{10,15}$/;"
    );
    // Also fix the normalization that strips +91
    html = html.replace(
        /const digits = input\.value\.replace\(\/\\D\/g, ''\);\s*const normalizedPhone = digits\.length === 12 && digits\.startsWith\('91'\) \? digits\.slice\(2\) : digits;\s*if \(!phoneRegex\.test\(normalizedPhone\)\) isValid = false;/g,
        "const digits = input.value.replace(/\\D/g, ''); if (!phoneRegex.test(digits)) isValid = false;"
    );
    // Fix same pattern in contact.html (slightly different variable name)
    html = html.replace(
        /const digits = input\.value\.replace\(\/\\D\/g, ''\);\s*const norm = digits\.length === 12 && digits\.startsWith\('91'\) \? digits\.slice\(2\) : digits;\s*if \(!phoneRegex\.test\(norm\)\) isValid = false;/g,
        "const digits = input.value.replace(/\\D/g, ''); if (!phoneRegex.test(digits)) isValid = false;"
    );
    changes.push('Fixed phone validation to accept any 10-15 digit number');

    // 3. Remove the Accept: application/json header — Formsubmit doesn't support JSON responses on free tier
    // Instead, let the form submit natively for maximum reliability with file uploads
    // We'll replace the fetch-based submit with native form.submit() approach
    
    // For contact.html — replace the fetch call
    if (filePath.includes('contact.html')) {
        const oldFetch = `const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                if (response.ok) {`;
        const newFetch = `const response = await fetch(form.action, { method: 'POST', body: formData });
                if (response.ok || response.status === 200 || response.redirected) {`;
        html = html.replace(oldFetch, newFetch);
        changes.push('Fixed fetch headers for Formsubmit compatibility');
    }
    
    // For index.html — replace the fetch call
    if (filePath.includes('index.html') && !filePath.includes('dist')) {
        html = html.replace(
            /const response = await fetch\(form\.action, \{\s*method: 'POST',\s*body: formData,\s*headers: \{ 'Accept': 'application\/json' \}\s*\}\);/g,
            "const response = await fetch(form.action, { method: 'POST', body: formData });"
        );
        changes.push('Fixed fetch headers for Formsubmit compatibility');
    }

    // 4. For index.html — add the missing dropzone JS if it doesn't have file handling
    if (filePath.includes('index.html') && !filePath.includes('dist')) {
        if (!html.includes("fileInput.addEventListener('change'") && !html.includes('fileInput.addEventListener("change"')) {
            const dropzoneJS = `
            // --- File Upload / Dropzone Logic (index.html) ---
            const fileInput = document.getElementById('resumeFile');
            const dropZone = document.getElementById('dropZone');
            const dropZoneContent = document.getElementById('dropZoneContent');
            const fileSelectedEl = document.getElementById('fileSelected');
            const fileNameEl = document.getElementById('fileName');
            const fileSizeEl = document.getElementById('fileSize');
            const fileErrorEl = document.getElementById('file-error');
            const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const MAX_FILE_SIZE = 5 * 1024 * 1024;

            function formatFileSize(bytes) {
                if (bytes < 1024) return bytes + ' B';
                if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
                return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
            }
            function showFileError(msg) { if (fileErrorEl) { fileErrorEl.textContent = msg; fileErrorEl.classList.remove('hidden'); } }
            function hideFileError() { if (fileErrorEl) { fileErrorEl.classList.add('hidden'); } }
            function validateFile(file) {
                hideFileError();
                if (!file) return true;
                if (!ALLOWED_TYPES.includes(file.type)) { showFileError('Please upload a PDF, DOC, or DOCX file.'); resetDropZone(); return false; }
                if (file.size > MAX_FILE_SIZE) { showFileError('File is too large. Max 5MB.'); resetDropZone(); return false; }
                return true;
            }
            function showFilePreview(file) {
                if (dropZoneContent) dropZoneContent.classList.add('hidden');
                if (fileSelectedEl) fileSelectedEl.classList.remove('hidden');
                if (fileNameEl) fileNameEl.textContent = file.name;
                if (fileSizeEl) fileSizeEl.textContent = formatFileSize(file.size);
                if (dropZone) { dropZone.classList.add('border-green-400', 'bg-green-50/30'); dropZone.classList.remove('border-navy/20'); }
            }
            function resetDropZone() {
                if (dropZoneContent) dropZoneContent.classList.remove('hidden');
                if (fileSelectedEl) fileSelectedEl.classList.add('hidden');
                if (dropZone) { dropZone.classList.remove('border-green-400', 'bg-green-50/30'); dropZone.classList.add('border-navy/20'); }
                if (fileInput) fileInput.value = '';
            }
            if (fileInput) {
                fileInput.addEventListener('change', function() {
                    const file = this.files[0];
                    if (file && validateFile(file)) showFilePreview(file);
                });
            }
            if (dropZone) {
                ['dragenter', 'dragover'].forEach(evt => {
                    dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.add('border-navy', 'bg-navy/[0.03]'); });
                });
                ['dragleave', 'drop'].forEach(evt => {
                    dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.remove('border-navy', 'bg-navy/[0.03]'); });
                });
            }
`;
            // Insert before "// --- 6. Form Logic ---"
            const insertPoint = html.indexOf("// --- 6. Form Logic ---");
            if (insertPoint !== -1) {
                html = html.substring(0, insertPoint) + dropzoneJS + '\n            ' + html.substring(insertPoint);
                changes.push('Added missing dropzone JS to index.html');
            }

            // Also add resetDropZone() to form.reset() in submit handler
            html = html.replace(
                'form.reset();\n                            resetBtn(btn, btnText);',
                'form.reset();\n                            resetDropZone();\n                            resetBtn(btn, btnText);'
            );
        }
    }

    // 5. Fix the phone error message to be less restrictive
    html = html.replace(
        /Please enter a&nbsp;valid Indian mobile\s*\n?\s*number\./g,
        'Please enter a valid phone number.'
    );
    html = html.replace(
        /Please enter a&nbsp;valid Indian mobile number\./g,
        'Please enter a valid phone number.'
    );

    fs.writeFileSync(filePath, html);
    console.log(`Fixed ${filePath}: ${changes.join(', ')}`);
}

fixFile('index.html');
fixFile('contact.html');

console.log('\nAll fixes applied!');
