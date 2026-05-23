const fs = require('fs');

// Read about.html as the gold-standard template
const about = fs.readFileSync('about.html', 'utf8');

// Extract reusable parts from about.html
const headEnd = about.indexOf('</head>');
const headContent = about.substring(0, headEnd);

// Extract footer from about.html
const footerStart = about.indexOf('<footer');
const footerEnd = about.indexOf('</footer>') + '</footer>'.length;
const footer = about.substring(footerStart, footerEnd);

// Extract the script block from about.html (after footer)
const scriptStart = about.indexOf('<script>', footerEnd);
const scriptEnd = about.indexOf('</script>', scriptStart) + '</script>'.length;
const aboutScript = about.substring(scriptStart, scriptEnd);

// Build the new head
let newHead = headContent
    .replace(/<title>.*?<\/title>/, '<title>Contact Us | TrueKnack - The Knack of Finding True Talent</title>')
    .replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Get in touch with TrueKnack. Reach out for recruitment, staffing, HR consulting needs or drop your resume for career opportunities.">')
    .replace(/<link rel="canonical" href=".*?">/, '<link rel="canonical" href="https://www.trueknack.in/contact.html">')
    .replace(/<meta property="og:url" content=".*?">/, '<meta property="og:url" content="https://www.trueknack.in/contact.html">')
    .replace(/<meta property="og:title" content=".*?">/, '<meta property="og:title" content="Contact Us | TrueKnack - The Knack of Finding True Talent">')
    .replace(/<meta property="og:description"[^>]*content=".*?">/, '<meta property="og:description" content="Get in touch with TrueKnack for recruitment, staffing, and HR consulting.">')
    .replace(/<meta name="twitter:title" content=".*?">/, '<meta name="twitter:title" content="Contact Us | TrueKnack - The Knack of Finding True Talent">')
    .replace(/<meta name="twitter:description"[^>]*content=".*?">/, '<meta name="twitter:description" content="Get in touch with TrueKnack for recruitment, staffing, and HR consulting.">')
    // Fix structured data
    .replace(/"@id":"https:\/\/www\.trueknack\.in\/about\.html#webpage"/, '"@id":"https://www.trueknack.in/contact.html#webpage"')
    .replace(/"url":"https:\/\/www\.trueknack\.in\/about\.html"/, '"url":"https://www.trueknack.in/contact.html"')
    .replace(/"name":"About Us \| TrueKnack[^"]*"/, '"name":"Contact Us | TrueKnack - The Knack of Finding True Talent"')
    .replace(/"description":"Learn about TrueKnack[^"]*"/, '"description":"Get in touch with TrueKnack for recruitment, staffing, and HR consulting."')
    .replace(/"@id":"https:\/\/www\.trueknack\.in\/about\.html#breadcrumb"/, '"@id":"https://www.trueknack.in/contact.html#breadcrumb"')
    .replace(/"name":"About Us","item":"https:\/\/www\.trueknack\.in\/about\.html"/, '"name":"Contact Us","item":"https://www.trueknack.in/contact.html"');

// Extract nav from about.html
const navStart = about.indexOf('<nav');
const navEnd = about.indexOf('</nav>') + '</nav>'.length;
let nav = about.substring(navStart, navEnd);
// Remove active state from "About Us" link
nav = nav.replace('class="nav-link hover-target whitespace-nowrap text-red font-semibold" aria-current="page">About Us', 'class="nav-link hover-target whitespace-nowrap">About Us');

// Extract mobile menu from about.html
const mobileMenuStart = about.indexOf('<!-- Mobile Menu -->');
const mobileMenuEnd = about.indexOf('<!-- Hero Banner -->');
let mobileMenu = about.substring(mobileMenuStart, mobileMenuEnd);
// Remove active state from "About Us" in mobile menu  
mobileMenu = mobileMenu.replace('class="mobile-link text-red" aria-current="page">About Us', 'class="mobile-link hover:text-red transition-colors">About Us');

// Extract preloader from about.html
const preloaderStart = about.indexOf('<!-- SKELETON PRELOADER -->');
const preloaderEnd = about.indexOf('<!-- Navigation -->');
const preloader = about.substring(preloaderStart, preloaderEnd);

// Extract skip link + cursor from about.html
const skipStart = about.indexOf('<a href="#main-content"');
const skipEnd = about.indexOf('<!-- SKELETON PRELOADER -->');
const skipAndCursor = about.substring(skipStart, skipEnd);

// Build the contact page content
const contactContent = `
    <!-- Hero Banner -->
    <main id="main-content">
    <header class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div class="absolute inset-0 bg-navy z-0"></div>
        <img src="assets/indian_corporate_office.webp" alt="Contact TrueKnack" class="absolute inset-0 w-full h-full object-cover z-0 opacity-20 kenburns-img" width="1600" height="900" decoding="async" loading="eager" fetchpriority="high" referrerpolicy="no-referrer">
        <div class="absolute inset-0 z-0 opacity-10">
            <div class="absolute top-0 right-0 w-[37.5rem] h-[37.5rem] bg-red rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[25rem] h-[25rem] bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
        </div>
        <div class="absolute top-0 right-0 w-full h-full overflow-hidden z-0 opacity-[0.06]">
            <div class="absolute -top-20 -right-20 w-[31.25rem] h-[31.25rem] border-2 border-white rotate-45"></div>
            <div class="absolute top-20 right-40 w-[18.75rem] h-[18.75rem] border border-white rotate-12"></div>
            <div class="absolute bottom-10 left-20 w-[12.5rem] h-[12.5rem] border border-white -rotate-12"></div>
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 text-white">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wide mb-6 fade-up-hero">
                <span class="inline-block w-2 h-2 bg-red rounded-full mr-2"></span>Get in Touch
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight !leading-snug mb-6 fade-up-hero">Contact Us</h1>
            <p class="text-lg md:text-xl text-white/80 max-w-2xl font-light fade-up-hero">
                Whether you're looking to&nbsp;fill a&nbsp;critical role or&nbsp;your next career move,<br class="hidden xl:block">
                our team is&nbsp;ready to&nbsp;assist you.
            </p>
        </div>
    </header>

    <!-- Contact Form Section -->
    <section id="contact" class="py-24 md:py-32 bg-graylight px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Info -->
            <div class="space-y-10 flex flex-col justify-between">
                <div>
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red/5 text-red font-semibold text-sm mb-4 reveal-left">
                        <div class="w-1.5 h-1.5 rounded-full bg-red"></div>Ready to&nbsp;Build Your Dream Team?
                    </div>
                    <h3 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 reveal-left">Let's Start the Conversation.</h3>
                    <p class="text-navy/70 text-lg max-w-md reveal-left">
                        Whether you're looking to&nbsp;fill a&nbsp;single critical role or build an&nbsp;entire department,<br class="hidden xl:block">
                        TrueKnack is&nbsp;ready to&nbsp;be your trusted recruitment partner.
                    </p>
                </div>

                <div class="space-y-6 fade-up">
                    <div class="flex items-center gap-4 group">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-red group-hover:text-white transition-colors duration-300 shadow-sm">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-navy/50 font-medium">Call Us</p>
                            <a href="tel:9930255613" class="text-xl font-bold hover:text-red transition-colors hover-target">99302 55613</a>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 group">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-red group-hover:text-white transition-colors duration-300 shadow-sm">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-navy/50 font-medium">Email Us</p>
                            <a href="mailto:hr@trueknack.in" class="text-xl font-bold hover:text-red transition-colors hover-target">hr@trueknack.in</a>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 group">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-navy/50 font-medium">WhatsApp</p>
                            <a href="https://wa.me/919930255613" target="_blank" rel="noopener noreferrer" class="text-xl font-bold hover:text-green-500 transition-colors hover-target">Chat with&nbsp;Us</a>
                        </div>
                    </div>
                </div>

                <div class="relative h-48 w-full rounded-2xl overflow-hidden mt-8 fade-up shadow-md group">
                    <img src="assets/indian_team_collaboration.webp" alt="TrueKnack Team" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" width="800" height="400" decoding="async" loading="lazy" referrerpolicy="no-referrer">
                    <div class="absolute inset-0 bg-navy/20 mix-blend-multiply"></div>
                </div>
            </div>

            <!-- Form -->
            <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl fade-up relative overflow-hidden border border-gray-100">
                <!-- Success State Overlay -->
                <div id="form-success" role="status" aria-live="polite" class="absolute inset-0 bg-navy z-20 flex flex-col items-center justify-center text-white opacity-0 pointer-events-none transition-opacity duration-500">
                    <div class="w-20 h-20 bg-red rounded-full flex items-center justify-center mb-6 scale-0" id="success-icon">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-3xl font-bold mb-2">Message Sent!</h3>
                    <p class="text-white/70 text-center px-6">Thank you for&nbsp;reaching out. A&nbsp;TrueKnack expert will contact you shortly.</p>
                </div>

                <!-- Form Error State -->
                <div id="form-error" role="alert" aria-live="assertive" class="hidden items-center gap-3 bg-red/10 border border-red/30 text-red rounded-xl px-4 py-3 text-sm font-medium mb-4">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span id="form-error-text">Something went wrong. Please try again or email Us&nbsp;directly.</span>
                </div>

                <form id="contactForm" action="https://formsubmit.co/hr@trueknack.in" method="POST" enctype="multipart/form-data" class="space-y-6 relative z-10" novalidate>
                    <!-- Formsubmit.co config -->
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_subject" value="New Contact Form Submission — TrueKnack Website">
                    <input type="hidden" name="_template" value="table">
                    <input type="hidden" name="_next" value="https://www.trueknack.in/contact.html">

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="relative">
                            <label for="firstName" class="block text-sm font-medium text-navy/70 mb-2">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required autocomplete="given-name" aria-describedby="firstName-error" aria-invalid="false" class="w-full bg-graylight border border-transparent focus:border-navy focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-all hover-target" placeholder="John">
                            <span id="firstName-error" class="error-message">First name is&nbsp;required.</span>
                        </div>
                        <div class="relative">
                            <label for="lastName" class="block text-sm font-medium text-navy/70 mb-2">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required autocomplete="family-name" aria-describedby="lastName-error" aria-invalid="false" class="w-full bg-graylight border border-transparent focus:border-navy focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-all hover-target" placeholder="Doe">
                            <span id="lastName-error" class="error-message">Last name is&nbsp;required.</span>
                        </div>
                    </div>

                    <div class="relative">
                        <label for="email" class="block text-sm font-medium text-navy/70 mb-2">Business Email *</label>
                        <input type="email" id="email" name="email" required autocomplete="email" aria-describedby="email-error" aria-invalid="false" class="w-full bg-graylight border border-transparent focus:border-navy focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-all hover-target" placeholder="john@company.com">
                        <span id="email-error" class="error-message">Please enter a&nbsp;valid email address.</span>
                    </div>

                    <div class="relative">
                        <label for="phone" class="block text-sm font-medium text-navy/70 mb-2">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required autocomplete="tel" inputmode="tel" aria-describedby="phone-error" aria-invalid="false" class="w-full bg-graylight border border-transparent focus:border-navy focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-all hover-target" placeholder="10-digit mobile number">
                        <span id="phone-error" class="error-message">Please enter a&nbsp;valid Indian mobile number.</span>
                    </div>

                    <div class="relative">
                        <label for="message" class="block text-sm font-medium text-navy/70 mb-2">How can We&nbsp;help you? *</label>
                        <textarea id="message" name="message" rows="4" required autocomplete="off" aria-describedby="message-error" aria-invalid="false" class="w-full bg-graylight border border-transparent focus:border-navy focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-all resize-none hover-target" placeholder="Tell us about your hiring needs..."></textarea>
                        <span id="message-error" class="error-message">Message cannot be empty.</span>
                    </div>

                    <!-- Drag & Drop Zone (Optional Resume) -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-navy/70 mb-2">Upload Resume (Optional)</label>
                        <div id="dropZone" class="relative border-2 border-dashed border-navy/20 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-navy/40 hover:bg-navy/[0.02] group">
                            <input type="file" id="resumeFile" name="attachment" accept=".pdf,.doc,.docx" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
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

                    <!-- Honeypot field for bot protection -->
                    <div class="hidden" aria-hidden="true">
                        <label for="_gotcha">Do not fill this out</label>
                        <input type="text" id="_gotcha" name="_gotcha" tabindex="-1" autocomplete="off">
                    </div>

                    <div class="magnetic-wrap w-full mt-4">
                        <button type="submit" id="submitBtn" class="hover-target magnetic-item w-full py-4 bg-navy text-white rounded-xl font-bold text-lg hover:bg-navy/90 transition-colors flex items-center justify-center relative overflow-hidden group">
                            <span class="relative z-10 flex items-center" id="submitBtnText">
                                Send Message
                                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                            <div class="absolute inset-0 bg-red scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Map / CTA Section -->
    <section class="py-16 md:py-20 bg-white px-6">
        <div class="max-w-7xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red/5 text-red font-semibold text-sm mb-6 fade-up">
                <div class="w-1.5 h-1.5 rounded-full bg-red"></div>Pan-India Reach
            </div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 reveal-scale !leading-snug">We Operate Across India</h2>
            <p class="text-navy/70 max-w-2xl mx-auto mb-12 fade-up">
                With a&nbsp;network of&nbsp;50+ expert recruiters, we serve clients in&nbsp;every major city and&nbsp;industry vertical. Our remote-first approach means we can source talent from&nbsp;anywhere in&nbsp;the country.
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-grid">
                <div class="stagger-item group hover-target cursor-pointer bg-graylight rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center">
                    <div class="w-12 h-12 mx-auto bg-navy text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-red transition-colors duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <h4 class="font-bold text-navy">Mumbai</h4>
                    <p class="text-navy/50 text-sm mt-1">HQ & Operations</p>
                </div>
                <div class="stagger-item group hover-target cursor-pointer bg-graylight rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center">
                    <div class="w-12 h-12 mx-auto bg-navy text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-red transition-colors duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <h4 class="font-bold text-navy">Bangalore</h4>
                    <p class="text-navy/50 text-sm mt-1">Tech & IT Hub</p>
                </div>
                <div class="stagger-item group hover-target cursor-pointer bg-graylight rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center">
                    <div class="w-12 h-12 mx-auto bg-navy text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-red transition-colors duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <h4 class="font-bold text-navy">Delhi NCR</h4>
                    <p class="text-navy/50 text-sm mt-1">North India</p>
                </div>
                <div class="stagger-item group hover-target cursor-pointer bg-graylight rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center">
                    <div class="w-12 h-12 mx-auto bg-navy text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-red transition-colors duration-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h4 class="font-bold text-navy">Pan-India</h4>
                    <p class="text-navy/50 text-sm mt-1">Remote Coverage</p>
                </div>
            </div>
        </div>
    </section>

    </main>
`;

// Build the contact page script (clean, purpose-built)
const contactScript = `<script>
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const revealWithoutAnimation = () => {
        document.querySelectorAll('#preloader, #skeleton-loader').forEach(l => { l.style.display = 'none'; });
        document.querySelectorAll('.fade-up-hero, .fade-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    };
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis) { revealWithoutAnimation(); return; }
    gsap.config({ nullTargetWarn: false });
    gsap.registerPlugin(ScrollTrigger);

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const cursorText = document.getElementById('cursor-text');
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
        window.addEventListener('mousemove', e => {
            const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
            mouseX = e.clientX / zoom; mouseY = e.clientY / zoom;
        });
        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            gsap.set(cursor, { x: cursorX, y: cursorY });
        });
        document.querySelectorAll('.hover-target').forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorText.textContent = target.getAttribute('data-cursor-text') || '';
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorText.textContent = '';
            });
        });
    }

    // --- Lenis Smooth Scrolling ---
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const lenis = isDesktop ? new Lenis({
        duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical', gestureDirection: 'vertical', smooth: true,
        mouseMultiplier: 1, smoothTouch: false, touchMultiplier: 2, infinite: false,
    }) : { stop:()=>{}, start:()=>{}, scrollTo:(tgt)=>{if(tgt===0)window.scrollTo({top:0,behavior:'smooth'});else document.querySelector(tgt)?.scrollIntoView({behavior:'smooth'});}, on:()=>{}, raf:()=>{} };
    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    if (isDesktop) { function raf(time) { lenis.raf(time); requestAnimationFrame(raf); } requestAnimationFrame(raf); }

    // --- Magnetic Buttons ---
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        const item = wrap.querySelector('.magnetic-item');
        if (!item) return;
        const xTo = gsap.quickTo(item, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(item, "y", { duration: 0.4, ease: "power3.out" });
        wrap.addEventListener('mousemove', (e) => {
            const pos = wrap.getBoundingClientRect();
            xTo((e.clientX - pos.left - pos.width / 2) * 0.3);
            yTo((e.clientY - pos.top - pos.height / 2) * 0.3);
        });
        wrap.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });

    // --- ScrollTrigger Animations ---
    function animateItems(selector, from, to) {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.set(el, from);
            ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(el, { ...to, overwrite: true }) });
        });
    }
    animateItems('.fade-up', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' });
    animateItems('.reveal-left', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out' });
    animateItems('.reveal-right', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out' });
    animateItems('.reveal-scale', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' });
    gsap.utils.toArray('.stagger-grid').forEach(grid => {
        const items = grid.querySelectorAll('.stagger-item');
        if (!items.length) return;
        gsap.set(items, { y: 60, opacity: 0 });
        ScrollTrigger.create({ trigger: grid, start: 'top 85%', once: true, onEnter: () => gsap.to(items, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }) });
    });

    // --- Navbar ---
    const navbar = document.getElementById('navbar');
    function checkNavScroll() {
        if (window.scrollY > 50) { navbar.classList.add('py-1', 'shadow-md'); navbar.classList.remove('py-2'); }
        else { navbar.classList.remove('py-1', 'shadow-md'); navbar.classList.add('py-2'); }
    }
    window.addEventListener('scroll', checkNavScroll);
    checkNavScroll();

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.setAttribute('aria-expanded', String(isMenuOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isMenuOpen));
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            gsap.to(spans[0], { y: 4, rotate: 45, duration: 0.3 });
            gsap.to(spans[1], { y: -4, rotate: -45, duration: 0.3 });
            gsap.fromTo(mobileLinks, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.2 });
            lenis.stop();
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            gsap.to(spans[0], { y: 0, rotate: 0, duration: 0.3 });
            gsap.to(spans[1], { y: 0, rotate: 0, duration: 0.3 });
            lenis.start();
        }
    }
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => { toggleMenu(); });
    });

    // --- Form Logic with Dropzone ---
    const form = document.getElementById('contactForm');
    const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    const fileInput = document.getElementById('resumeFile');
    const dropZone = document.getElementById('dropZone');
    const dropZoneContent = document.getElementById('dropZoneContent');
    const fileSelectedEl = document.getElementById('fileSelected');
    const fileNameEl = document.getElementById('fileName');
    const fileSizeEl = document.getElementById('fileSize');
    const fileErrorEl = document.getElementById('file-error');
    const formErrorEl = document.getElementById('form-error');
    const formErrorText = document.getElementById('form-error-text');

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;
    const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const MAX_SIZE = 5 * 1024 * 1024;

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    function showFormError(msg) {
        formErrorText.textContent = msg || 'Something went wrong. Please try again or email us directly at hr@trueknack.in';
        formErrorEl.classList.remove('hidden'); formErrorEl.classList.add('flex');
    }
    function hideFormError() { formErrorEl.classList.add('hidden'); formErrorEl.classList.remove('flex'); }
    function showFileError(msg) { fileErrorEl.textContent = msg; fileErrorEl.classList.remove('hidden'); }
    function hideFileError() { fileErrorEl.classList.add('hidden'); }

    function validateField(input) {
        let isValid = true;
        if (input.value.trim() === '') isValid = false;
        else if (input.type === 'email' && !emailRegex.test(input.value)) isValid = false;
        else if (input.type === 'tel') {
            const digits = input.value.replace(/\\D/g, '');
            const norm = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
            if (!phoneRegex.test(norm)) isValid = false;
        }
        if (!isValid) { input.classList.add('input-error'); input.setAttribute('aria-invalid', 'true'); }
        else { input.classList.remove('input-error'); input.setAttribute('aria-invalid', 'false'); }
        return isValid;
    }
    textInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => { if (input.classList.contains('input-error')) validateField(input); });
    });

    function validateFile(file) {
        hideFileError();
        if (!file) return true;
        if (!ALLOWED_TYPES.includes(file.type)) { showFileError('Please upload a PDF, DOC, or DOCX file.'); resetDropZone(); return false; }
        if (file.size > MAX_SIZE) { showFileError('File is too large. Maximum size is 5MB.'); resetDropZone(); return false; }
        return true;
    }
    function showFilePreview(file) {
        dropZoneContent.classList.add('hidden');
        fileSelectedEl.classList.remove('hidden');
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatSize(file.size);
        dropZone.classList.add('border-green-400', 'bg-green-50/30');
        dropZone.classList.remove('border-navy/20');
    }
    function resetDropZone() {
        dropZoneContent.classList.remove('hidden');
        fileSelectedEl.classList.add('hidden');
        dropZone.classList.remove('border-green-400', 'bg-green-50/30');
        dropZone.classList.add('border-navy/20');
        fileInput.value = '';
    }
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file && validateFile(file)) showFilePreview(file);
    });
    ['dragenter', 'dragover'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.add('border-navy', 'bg-navy/[0.03]'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.remove('border-navy', 'bg-navy/[0.03]'); });
    });

    form.addEventListener('submit', async (e) => {
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
            const btnText = document.getElementById('submitBtnText');
            btnText.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
            btn.classList.add('opacity-80', 'pointer-events-none');
            btn.disabled = true;
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                if (response.ok) {
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
                showFormError('Failed to send. Please email us directly at hr@trueknack.in');
                btnText.innerHTML = 'Send Message <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';
                btn.classList.remove('opacity-80', 'pointer-events-none'); btn.disabled = false;
            }
        }
    });

    // --- Cookie Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    try {
        const cc = localStorage.getItem('trueknack_cookies_consent');
        if (!cc) setTimeout(() => { cookieBanner.classList.remove('translate-y-full'); }, 2000);
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('trueknack_cookies_consent', 'essential');
            cookieBanner.classList.add('translate-y-full');
        });
    } catch (e) {}

    // --- Preloader ---
    gsap.set('.fade-up-hero', { y: 40, opacity: 0 });
    const hideLoader = () => {
        const loader = document.getElementById('preloader');
        if (!loader || loader.dataset.hidden) return;
        loader.dataset.hidden = 'true';
        gsap.to(loader, {
            opacity: 0, duration: 0.6,
            onComplete: () => {
                loader.style.display = 'none';
                lenis.start();
                gsap.to('.fade-up-hero', { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out' });
                ScrollTrigger.refresh();
            }
        });
    };
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 2500);
});
</script>`;

// Assemble the full page
const fullPage = newHead + '</head>\n' +
    '<body class="antialiased selection:bg-red selection:text-white relative">\n' +
    '    ' + skipAndCursor + '\n' +
    '    ' + preloader + '\n' +
    '    <!-- Navigation -->\n' +
    '    ' + nav + '\n\n' +
    '    ' + mobileMenu + '\n' +
    contactContent + '\n' +
    '    ' + footer + '\n\n' +
    '    ' + contactScript + '\n' +
    '    <script src="assets/chatbot.js" defer></script>\n' +
    '</body>\n</html>\n';

fs.writeFileSync('contact.html', fullPage);
console.log('contact.html rebuilt successfully!');
