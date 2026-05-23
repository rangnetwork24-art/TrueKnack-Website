const fs = require('fs');

function fixValidation(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Fix the selector to ONLY grab visible text, email, tel, and textarea fields that are NOT honeypot
    // This ignores hidden fields, file inputs, and radio/checkboxes.
    html = html.replace(
        /const inputs = form\.querySelectorAll\('input:not\(\[name="_gotcha"\]\), textarea'\);/g,
        "const inputs = form.querySelectorAll('input[type=\"text\"]:not([name=\"_gotcha\"]), input[type=\"email\"], input[type=\"tel\"], textarea');"
    );

    html = html.replace(
        /const textInputs = form\.querySelectorAll\('input\[type="text"\], input\[type="email"\], input\[type="tel"\], textarea'\);/g,
        "const textInputs = form.querySelectorAll('input[type=\"text\"]:not([name=\"_gotcha\"]), input[type=\"email\"], input[type=\"tel\"], textarea');"
    );
    
    // We also need to fix the submit event loops in contact.html if they use textInputs
    html = html.replace(
        /textInputs\.forEach/g,
        "textInputs.forEach"
    );
    
    // Also, inside index.html, the validation array might be called `inputs`
    // Let's replace the loop in index.html to use inputs correctly
    // Nothing to do if it's already using `inputs.forEach`

    fs.writeFileSync(filePath, html);
    console.log('Fixed validation bug in ' + filePath);
}

fixValidation('index.html');
fixValidation('contact.html');
