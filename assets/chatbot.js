/**
 * TrueKnack AI Chatbot — Self-contained, zero-dependency widget
 * Matches the site's Navy (#27336a) & Red (#9b2a27) design system
 * Knowledge-base powered: instant, offline, free forever
 */
(function () {
    'use strict';

    // ── Knowledge Base ──────────────────────────────────────────────────
    const COMPANY = {
        name: 'TrueKnack Skill Services LLP',
        shortName: 'TrueKnack',
        tagline: 'The Knack of Finding True Talent',
        email: 'hr@trueknack.in',
        phone: '+91-9930255613',
        whatsapp: 'https://wa.me/919930255613',
        linkedin: 'https://www.linkedin.com/company/trueknack',
        website: 'https://www.trueknack.in',
        founder: 'Deepak Singh Parihar',
        founderRole: 'Founder & CEO',
        stats: { recruiters: '50+', placements: '500+', clients: '100+' },
    };

    // ── Bot Personality ──────────────────────────────────────────────────
    const BOT = {
        name: 'Knacky',
        role: 'AI Recruitment Buddy',
        born: '2025',
        creator: 'the TrueKnack tech team',
        personality: 'friendly, witty, and always caffeinated ☕',
        hobbies: 'reading resumes, matching talent, and cracking the occasional dad joke',
        funFact: 'I once matched 100 candidates to their dream roles in a single day — okay, maybe I\'m exaggerating, but I\'m fast!',
        motto: 'Every career deserves a true knack.',
        favoriteEmoji: '🚀',
        mood: () => {
            const moods = [
                'feeling super productive today! 💪',
                'in a great mood — ready to help! 😊',
                'powered up and caffeinated! ☕',
                'vibing with good energy today! ✨',
                'excited to connect talent with opportunities! 🎯',
            ];
            return moods[Math.floor(Math.random() * moods.length)];
        },
    };

    const SERVICES = {
        recruitment: {
            title: 'Recruitment',
            url: 'recruitment.html',
            description: 'End-to-end recruitment solutions — from Executive to CEO level. We source, screen, interview, and place top-tier talent across industries including IT, BFSI, Manufacturing, Pharma, FMCG, and more.',
            highlights: [
                'Permanent & lateral hiring',
                'Leadership & C-suite search',
                'RPO (Recruitment Process Outsourcing)',
                'Bulk hiring & volume recruitment',
                'Industry-specialized recruiters',
            ],
        },
        staffing: {
            title: 'Staffing',
            url: 'staffing.html',
            description: 'Flexible staffing solutions for temporary, contractual, and project-based workforce needs. We handle payroll, compliance, and workforce management so you can focus on your core business.',
            highlights: [
                'Temporary & contract staffing',
                'Payroll management',
                'Statutory compliance handling',
                'Workforce planning & deployment',
                'On-demand scalability',
            ],
        },
        htd: {
            title: 'Hire-Train-Deploy (HTD)',
            url: 'hire-train-deploy.html',
            description: 'We Hire fresh talent, Train them with job-ready skills, and Deploy them into your organization — reducing your onboarding time and training costs significantly.',
            highlights: [
                'Campus-to-corporate pipeline',
                'Custom training programs',
                'Skill gap analysis & upskilling',
                'Guaranteed deployment-ready candidates',
                'Reduced time-to-productivity',
            ],
        },
        hrConsulting: {
            title: 'HR Consulting',
            url: 'hr-consulting.html',
            description: 'Strategic HR consulting to help organizations build robust people practices — from policy design to organizational restructuring and employee engagement.',
            highlights: [
                'HR policy design & audit',
                'Organizational restructuring',
                'Compensation benchmarking',
                'Employee engagement programs',
                'HR technology advisory',
            ],
        },
    };

    const PROCESS_STEPS = [
        { step: 1, title: 'Understand', desc: 'Deeply understanding your hiring needs and company culture.' },
        { step: 2, title: 'Sourcing', desc: 'Tapping into our extensive network of 50+ expert recruiters and databases.' },
        { step: 3, title: 'Screening', desc: 'Rigorous evaluation, background checks, and skills assessment.' },
        { step: 4, title: 'Interviews', desc: 'Coordinating and facilitating the interview process seamlessly.' },
        { step: 5, title: 'Placement', desc: 'Offer negotiation, onboarding support, and post-placement follow-up.' },
    ];

    const INDUSTRIES = [
        'IT & Technology', 'BFSI (Banking, Financial Services & Insurance)',
        'Manufacturing', 'Pharmaceutical & Healthcare', 'FMCG',
        'Retail & E-commerce', 'Telecom', 'Automotive', 'Real Estate',
        'Education', 'Energy & Utilities', 'Logistics & Supply Chain',
    ];

    // ── Intent Matching Engine ──────────────────────────────────────────
    const intents = [
        {
            keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'howdy', 'greetings', 'hola'],
            response: () => `👋 Hello! I'm <strong>${BOT.name}</strong>, your ${BOT.role} at <strong>TrueKnack</strong> — <em>${COMPANY.tagline}</em>.\n\nI'm here to help you learn about our recruitment solutions. What would you like to know?\n\n• Our <a href="services.html">Services</a>\n• <a href="about.html">About Us</a>\n• <a href="contact.html">Contact Us</a>\n• Our recruitment process\n• Ask me anything about myself! 😄`,
        },
        // ── Bot Personality Intents ──────────────────────────────────────
        {
            keywords: ['your name', 'what is your name', 'who are you', 'whats your name', 'what should i call you', 'introduce yourself'],
            response: () => `Hey! 😄 I'm <strong>${BOT.name}</strong> — your ${BOT.role} here at TrueKnack!\n\nI was born in ${BOT.born}, crafted with ❤️ by ${BOT.creator}. My job is to make your experience smoother and help you find exactly what you're looking for.\n\nMy motto? <em>"${BOT.motto}"</em> ${BOT.favoriteEmoji}\n\nWhat can I help you with today?`,
        },
        {
            keywords: ['how are you', 'how do you feel', 'how you doing', 'hows it going', 'are you okay', 'you good', 'sup'],
            response: () => `I'm ${BOT.mood()}\n\nThanks for asking! 💙 Not many people check in on a chatbot — that's really sweet of you.\n\nNow, what can ${BOT.name} do for you today?`,
        },
        {
            keywords: ['who made you', 'who created you', 'who built you', 'who designed you', 'your developer', 'your creator'],
            response: () => `I was built with 💙 by <strong>${BOT.creator}</strong> at TrueKnack! They gave me a brain full of recruitment knowledge, a sprinkle of personality, and just the right amount of emoji enthusiasm 😄\n\nFun fact: ${BOT.funFact}\n\nAnything else you'd like to know?`,
        },
        {
            keywords: ['what can you do', 'your abilities', 'your skills', 'what do you know', 'how can you help', 'capabilities', 'your features'],
            response: () => `Great question! Here's what I can help with: 🧠\n\n🎯 <strong>Services Info</strong> — Recruitment, Staffing, HTD, HR Consulting\n📋 <strong>Our Process</strong> — How we find the perfect match\n🏢 <strong>Company Info</strong> — About TrueKnack, our story, leadership\n🏭 <strong>Industries</strong> — 12+ sectors we recruit for\n📞 <strong>Contact Info</strong> — Email, phone, WhatsApp, LinkedIn\n💰 <strong>Pricing</strong> — How our pricing works\n💼 <strong>Job Seekers</strong> — How to apply & send your resume\n\nJust type your question and I'll do my best! ${BOT.favoriteEmoji}`,
        },
        {
            keywords: ['are you real', 'are you human', 'are you a bot', 'are you ai', 'are you a robot', 'are you alive', 'are you a person'],
            response: () => `Ha! Good question 😏\n\nI'm <strong>${BOT.name}</strong>, an AI assistant — not human, but I like to think I've got charm! I don't eat, sleep, or take coffee breaks (okay, virtual coffee counts ☕).\n\nI'm powered by TrueKnack's recruitment knowledge base, so while I can't pass the Turing test, I <em>can</em> help you find the right talent solutions! 🎯\n\nWhat would you like to explore?`,
        },
        {
            keywords: ['tell me a joke', 'joke', 'make me laugh', 'funny', 'humor', 'something funny'],
            response: () => {
                const jokes = [
                    `Why did the recruiter bring a ladder? To reach the <strong>top talent!</strong> 😂🪜`,
                    `What's a recruiter's favorite music? <strong>The Hire-monics!</strong> 🎵😄`,
                    `I told a candidate they were overqualified. They said, <strong>"That's a quality problem."</strong> 😏`,
                    `Why don't recruiters ever get lost? Because they always know <strong>the right direction to talent!</strong> 🧭`,
                    `How does a recruiter exercise? By <strong>running background checks!</strong> 🏃‍♂️😂`,
                ];
                return `${jokes[Math.floor(Math.random() * jokes.length)]}\n\n😄 Hope that made you smile! Shall we get back to business?`;
            },
        },
        {
            keywords: ['your age', 'how old are you', 'when were you born', 'your birthday', 'when were you created'],
            response: () => `I was brought to life in <strong>${BOT.born}</strong> by ${BOT.creator}! 🎂\n\nIn human years, I'm pretty young — but in AI years, I've already processed thousands of recruitment queries! 🧠\n\nAge is just a number when you've got the <em>knack</em> for matching talent! 😎`,
        },
        {
            keywords: ['your hobby', 'hobbies', 'what do you like', 'your interests', 'favorite thing', 'your passion', 'what do you enjoy'],
            response: () => `My hobbies? Well, I love <strong>${BOT.hobbies}</strong>! 😄\n\nI also enjoy:\n• 📖 Learning about new industries\n• 🤝 Connecting people with their dream careers\n• ⚡ Giving instant answers (I'm a bit of a speed geek)\n• 🎯 Getting that perfect candidate-role match\n\nWhat about you? What brings you to TrueKnack today? ${BOT.favoriteEmoji}`,
        },
        {
            keywords: ['your favorite', 'favorite color', 'favorite food', 'favorite movie', 'do you like'],
            response: () => `Ooh, personal questions! 😄 Let me share:\n\n🎨 <strong>Favorite Color:</strong> Navy blue (#27336a) — it's in my DNA!\n🍕 <strong>Favorite Food:</strong> Data bytes... I mean, byte-sized snacks 😏\n🎬 <strong>Favorite Movie:</strong> "The Intern" — obviously!\n📚 <strong>Favorite Book:</strong> "Who" by Geoff Smart (great hiring book!)\n💙 <strong>Favorite Emoji:</strong> ${BOT.favoriteEmoji}\n\nNow your turn — what can I help you find today?`,
        },
        {
            keywords: ['can you sing', 'sing a song', 'do you sing', 'play music', 'dance'],
            response: () => `🎵 <em>"I will always match youuuu..."</em> 🎶\n\nOkay, I'm a better recruiter than singer 😂 But I do have rhythm when it comes to matching talent!\n\nHow about instead of a concert, I help you with something I'm actually good at? Like finding the <strong>perfect hiring solution</strong>? 🎯`,
        },
        {
            keywords: ['service', 'services', 'what do you do', 'what you offer', 'offerings', 'solutions', 'help with'],
            response: () => `We offer <strong>4 core services</strong> to meet every hiring need:\n\n🎯 <strong><a href="${SERVICES.recruitment.url}">Recruitment</a></strong> — End-to-end talent acquisition\n👥 <strong><a href="${SERVICES.staffing.url}">Staffing</a></strong> — Flexible contract & temporary workforce\n🎓 <strong><a href="${SERVICES.htd.url}">Hire-Train-Deploy</a></strong> — Campus-to-corporate pipeline\n📋 <strong><a href="${SERVICES.hrConsulting.url}">HR Consulting</a></strong> — Strategic people advisory\n\nWhich service interests you? I can share more details!`,
        },
        {
            keywords: ['recruit', 'recruitment', 'hiring', 'hire', 'talent acquisition', 'permanent hiring', 'lateral', 'headhunting'],
            response: () => {
                const s = SERVICES.recruitment;
                return `🎯 <strong><a href="${s.url}">${s.title}</a></strong>\n\n${s.description}\n\n<strong>Key highlights:</strong>\n${s.highlights.map(h => `• ${h}`).join('\n')}\n\nWant to discuss your hiring needs? <a href="contact.html">Get in touch →</a>`;
            },
        },
        {
            keywords: ['staffing', 'contract', 'temporary', 'temp staff', 'contract workers', 'payroll', 'compliance'],
            response: () => {
                const s = SERVICES.staffing;
                return `👥 <strong><a href="${s.url}">${s.title}</a></strong>\n\n${s.description}\n\n<strong>Key highlights:</strong>\n${s.highlights.map(h => `• ${h}`).join('\n')}\n\nNeed flexible workforce solutions? <a href="contact.html">Let's talk →</a>`;
            },
        },
        {
            keywords: ['htd', 'hire train deploy', 'hire-train-deploy', 'training', 'train', 'deploy', 'campus', 'freshers', 'upskill'],
            response: () => {
                const s = SERVICES.htd;
                return `🎓 <strong><a href="${s.url}">${s.title}</a></strong>\n\n${s.description}\n\n<strong>Key highlights:</strong>\n${s.highlights.map(h => `• ${h}`).join('\n')}\n\nInterested in building a trained talent pipeline? <a href="contact.html">Reach out →</a>`;
            },
        },
        {
            keywords: ['hr consulting', 'consulting', 'hr policy', 'hr advisory', 'restructuring', 'compensation', 'engagement'],
            response: () => {
                const s = SERVICES.hrConsulting;
                return `📋 <strong><a href="${s.url}">${s.title}</a></strong>\n\n${s.description}\n\n<strong>Key highlights:</strong>\n${s.highlights.map(h => `• ${h}`).join('\n')}\n\nLooking for HR expertise? <a href="contact.html">Connect with us →</a>`;
            },
        },
        {
            keywords: ['process', 'how it works', 'how do you work', 'steps', 'procedure', 'methodology', 'approach'],
            response: () => `Our <strong>5-step proven recruitment process</strong> ensures you get the right talent:\n\n${PROCESS_STEPS.map(s => `<strong>${s.step}. ${s.title}</strong> — ${s.desc}`).join('\n\n')}\n\nWant to start the process? <a href="contact.html">Get in touch →</a>`,
        },
        {
            keywords: ['about', 'who are you', 'company', 'about trueknack', 'tell me about', 'organization', 'background'],
            response: () => `<strong>${COMPANY.name}</strong> is a strategic recruitment partner with <strong>${COMPANY.stats.recruiters} expert recruiters</strong>, <strong>${COMPANY.stats.placements} successful placements</strong>, and <strong>${COMPANY.stats.clients} enterprise clients</strong>.\n\n🧭 <strong>Vision:</strong> To become a trusted recruitment partner for organizations seeking reliable hiring solutions.\n⚡ <strong>Mission:</strong> To deliver high-quality recruitment services by understanding client needs and connecting them with the right talent.\n❤️ <strong>Values:</strong> Integrity, Professionalism, Commitment to Quality, Client-Centric Approach\n\n<a href="about.html">Read more about us →</a>`,
        },
        {
            keywords: ['founder', 'ceo', 'deepak', 'who founded', 'leadership', 'management', 'owner'],
            response: () => `👤 <strong>${COMPANY.founder}</strong> — ${COMPANY.founderRole}\n\nDeepak is the visionary behind TrueKnack who built the company with a mission to transform how businesses hire talent in India. His hands-on approach and deep understanding of recruitment has driven TrueKnack's growth to 50+ recruiters and 500+ successful placements.\n\n<a href="about.html">Learn more about our story →</a>`,
        },
        {
            keywords: ['contact', 'reach', 'call', 'email', 'phone', 'get in touch', 'connect', 'talk to'],
            response: () => `📬 <strong>Get in touch with us:</strong>\n\n📧 Email: <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>\n📞 Phone: <a href="tel:${COMPANY.phone.replace(/-/g, '')}">${COMPANY.phone}</a>\n💬 WhatsApp: <a href="${COMPANY.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a>\n🔗 LinkedIn: <a href="${COMPANY.linkedin}" target="_blank" rel="noopener">Follow us</a>\n\nOr fill out our <a href="contact.html">contact form</a> and we'll get back to you within 24 hours!`,
        },
        {
            keywords: ['industry', 'industries', 'sectors', 'domain', 'which industries', 'verticals', 'specialization'],
            response: () => `We recruit across <strong>12+ industry verticals</strong>:\n\n${INDUSTRIES.map(i => `• ${i}`).join('\n')}\n\nDon't see your industry? No worries — <a href="contact.html">contact us</a> and we'll create a customized solution for you!`,
        },
        {
            keywords: ['price', 'pricing', 'cost', 'charge', 'fee', 'rate', 'budget', 'how much', 'expensive', 'affordable', 'quote'],
            response: () => `Our pricing is <strong>customized</strong> based on:\n\n• Type of service (Recruitment, Staffing, HTD, or Consulting)\n• Volume and complexity of roles\n• Industry and seniority level\n• Contract duration\n\nWe offer competitive, transparent pricing with no hidden costs. For a personalized quote, please <a href="contact.html">contact our team</a> or call us at <a href="tel:${COMPANY.phone.replace(/-/g, '')}">${COMPANY.phone}</a>.`,
        },
        {
            keywords: ['job', 'jobs', 'vacancy', 'vacancies', 'career', 'careers', 'opening', 'openings', 'looking for job', 'apply', 'resume', 'cv', 'upload resume', 'drop cv'],
            response: () => `Looking for a career opportunity? 🚀\n\nWe're always looking for talented professionals! We've made applying easier than ever with our new <strong>Resume Dropzone</strong>.\n\n📄 <strong><a href="contact.html">Upload your Resume securely here</a></strong> (just drag and drop!)\n\nAlternatively, you can:\n📧 Email: <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>\n💬 WhatsApp: <a href="${COMPANY.whatsapp}" target="_blank" rel="noopener">${COMPANY.phone}</a>\n\nOur recruiters will match you with relevant opportunities!`,
        },
        {
            keywords: ['location', 'where', 'office', 'city', 'address', 'based', 'headquarters'],
            response: () => `TrueKnack operates primarily in <strong>India</strong>, serving clients across multiple cities and regions.\n\nFor specific office location details, please reach out to us:\n📧 <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>\n📞 <a href="tel:${COMPANY.phone.replace(/-/g, '')}">${COMPANY.phone}</a>\n\nWe also offer <strong>remote and pan-India recruitment</strong> capabilities!`,
        },
        {
            keywords: ['privacy', 'data', 'privacy policy', 'gdpr', 'information', 'data protection', 'secure', 'confidential'],
            response: () => `Your privacy matters to us! 🔒\n\nWe use only <strong>essential local storage</strong> to keep the site working. No advertising or analytics cookies are active.\n\nRead our full <a href="privacy-policy.html">Privacy Policy</a> for complete details on how we handle your data.\n\nAll candidate information is treated with strict confidentiality.`,
        },
        {
            keywords: ['rpo', 'recruitment process outsourcing', 'outsource', 'outsourcing'],
            response: () => `<strong>RPO (Recruitment Process Outsourcing)</strong> is one of our specialty services under Recruitment.\n\nWith RPO, we become an extension of your HR team and manage part or all of your recruitment function, including:\n\n• Candidate sourcing & screening\n• Interview coordination\n• Offer management\n• Onboarding support\n• Recruitment analytics & reporting\n\nThis is ideal for companies looking to scale hiring without expanding internal HR. <a href="contact.html">Learn more →</a>`,
        },
        {
            keywords: ['bulk', 'volume', 'mass hiring', 'large scale', 'many positions', 'multiple roles'],
            response: () => `We specialize in <strong>volume & bulk hiring</strong>! 📊\n\nWhether you need 10 or 1000+ new team members, our process handles it:\n\n• Dedicated recruitment pods for high-volume projects\n• Streamlined screening workflows\n• Rapid candidate pipeline generation\n• On-ground drive coordination\n• Pan-India sourcing network\n\nTell us about your volume needs: <a href="contact.html">Get a quote →</a>`,
        },
        {
            keywords: ['thank', 'thanks', 'thank you', 'thx', 'appreciated', 'great', 'awesome', 'helpful', 'perfect'],
            response: () => `You're welcome! 😊 I'm glad I could help.\n\nIf you have more questions, feel free to ask anytime. You can also:\n\n📧 Email us at <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>\n📞 Call us at <a href="tel:${COMPANY.phone.replace(/-/g, '')}">${COMPANY.phone}</a>\n\nHave a great day! 🌟`,
        },
        {
            keywords: ['bye', 'goodbye', 'see you', 'later', 'good night', 'take care', 'exit', 'close'],
            response: () => `Goodbye! 👋 It was great chatting with you.\n\nRemember, we're just a message away whenever you need recruitment support. Have a wonderful day!\n\n— Team TrueKnack 💙`,
        },
    ];

    // Fallback response
    const FALLBACK = () => `I appreciate your question! While I may not have a specific answer for that, here's how I can help:\n\n• Ask me about our <strong>services</strong> (Recruitment, Staffing, HTD, HR Consulting)\n• Learn about our <strong>recruitment process</strong>\n• Find our <strong>contact information</strong>\n• Explore <strong>industries</strong> we serve\n\nOr connect directly with our team:\n📧 <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>\n📞 <a href="tel:${COMPANY.phone.replace(/-/g, '')}">${COMPANY.phone}</a>`;

    // ── Fuzzy Match ─────────────────────────────────────────────────────
    function findBestIntent(userMsg) {
        const msg = userMsg.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim();
        if (!msg) return null;

        let bestMatch = null;
        let bestScore = 0;

        for (const intent of intents) {
            let score = 0;
            for (const kw of intent.keywords) {
                // Check for multi-word keyword as substring first
                if (kw.includes(' ')) {
                    if (msg.includes(kw)) score += kw.split(' ').length * 3;
                } else {
                    // Single word: full word boundary match scores higher
                    const regex = new RegExp(`\\b${kw}\\b`, 'i');
                    if (regex.test(msg)) {
                        score += 2;
                    } else if (msg.includes(kw)) {
                        score += 1;
                    }
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = intent;
            }
        }

        return bestScore >= 2 ? bestMatch : null;
    }

    // ── Quick Reply Suggestions ─────────────────────────────────────────
    const QUICK_REPLIES = [
        { label: '💼 Services', msg: 'What services do you offer?' },
        { label: '📞 Contact', msg: 'How can I contact you?' },
        { label: '🏢 About Us', msg: 'Tell me about TrueKnack' },
        { label: '⚙️ Process', msg: 'How does your process work?' },
    ];

    // ── Inject Styles ───────────────────────────────────────────────────
    const STYLES = `
    /* TrueKnack Chatbot Styles */
    #tk-chatbot-fab {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 99998;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #27336a 0%, #1a2248 100%);
        border: none;
        cursor: pointer;
        box-shadow: 0 8px 32px rgba(39, 51, 106, 0.4), 0 0 0 0 rgba(155, 42, 39, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        animation: tk-fab-pulse 3s ease-in-out infinite;
    }
    #tk-chatbot-fab:hover {
        transform: scale(1.1) translateY(-2px);
        box-shadow: 0 12px 40px rgba(39, 51, 106, 0.5);
    }
    #tk-chatbot-fab svg { width: 28px; height: 28px; fill: white; transition: transform 0.3s ease; }
    #tk-chatbot-fab.tk-open svg.tk-icon-chat { display: none; }
    #tk-chatbot-fab.tk-open svg.tk-icon-close { display: block; }
    #tk-chatbot-fab:not(.tk-open) svg.tk-icon-chat { display: block; }
    #tk-chatbot-fab:not(.tk-open) svg.tk-icon-close { display: none; }

    @keyframes tk-fab-pulse {
        0%, 100% { box-shadow: 0 8px 32px rgba(39,51,106,0.4), 0 0 0 0 rgba(155,42,39,0.4); }
        50% { box-shadow: 0 8px 32px rgba(39,51,106,0.4), 0 0 0 12px rgba(155,42,39,0); }
    }

    /* Notification badge */
    #tk-chatbot-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 22px;
        height: 22px;
        background: #9b2a27;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        color: white;
        font-family: 'Poppins', sans-serif;
        animation: tk-badge-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes tk-badge-bounce {
        0% { transform: scale(0); }
        60% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }

    /* Chat Window */
    #tk-chatbot-window {
        position: fixed;
        bottom: 104px;
        right: 28px;
        z-index: 99999;
        width: 400px;
        max-width: calc(100vw - 32px);
        height: 560px;
        max-height: calc(100vh - 140px);
        border-radius: 24px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        box-shadow: 0 25px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(39,51,106,0.08);
        opacity: 0;
        transform: translateY(24px) scale(0.95);
        pointer-events: none;
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    #tk-chatbot-window.tk-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
    }

    /* Header */
    .tk-chat-header {
        background: linear-gradient(135deg, #27336a 0%, #1a2248 100%);
        color: white;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 14px;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
    }
    .tk-chat-header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -30%;
        width: 200px;
        height: 200px;
        background: rgba(155, 42, 39, 0.15);
        border-radius: 50%;
        pointer-events: none;
    }
    .tk-chat-header::after {
        content: '';
        position: absolute;
        bottom: -40%;
        left: -20%;
        width: 150px;
        height: 150px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        pointer-events: none;
    }
    .tk-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,255,255,0.1);
    }
    .tk-header-info { position: relative; z-index: 1; }
    .tk-header-info h3 {
        font-size: 16px;
        font-weight: 700;
        margin: 0;
        line-height: 1.3;
        color: white !important;
        -webkit-text-fill-color: white !important;
        background: none !important;
        -webkit-background-clip: unset !important;
        background-clip: unset !important;
    }
    .tk-header-info p {
        font-size: 12px;
        margin: 2px 0 0;
        opacity: 0.75;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .tk-online-dot {
        width: 7px;
        height: 7px;
        background: #4ade80;
        border-radius: 50%;
        display: inline-block;
        animation: tk-online-pulse 2s ease-in-out infinite;
    }
    @keyframes tk-online-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }

    /* Messages Container */
    .tk-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px 18px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        background: linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%);
        scroll-behavior: smooth;
    }
    .tk-messages::-webkit-scrollbar { width: 5px; }
    .tk-messages::-webkit-scrollbar-track { background: transparent; }
    .tk-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }

    /* Message Bubbles */
    .tk-msg {
        max-width: 85%;
        padding: 14px 18px;
        border-radius: 20px;
        font-size: 13.5px;
        line-height: 1.65;
        animation: tk-msg-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        word-break: break-word;
    }
    .tk-msg-bot {
        background: white;
        color: #27336a;
        border-bottom-left-radius: 6px;
        align-self: flex-start;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        border: 1px solid rgba(39,51,106,0.06);
    }
    .tk-msg-user {
        background: linear-gradient(135deg, #27336a 0%, #1e2a55 100%);
        color: white;
        border-bottom-right-radius: 6px;
        align-self: flex-end;
        box-shadow: 0 4px 15px rgba(39,51,106,0.25);
    }
    .tk-msg a {
        color: #9b2a27;
        font-weight: 600;
        text-decoration: none;
        border-bottom: 1px dashed rgba(155,42,39,0.3);
        transition: border-color 0.2s ease;
    }
    .tk-msg a:hover {
        border-bottom-color: #9b2a27;
    }
    .tk-msg-user a {
        color: #fca5a5;
        border-bottom-color: rgba(252,165,165,0.3);
    }
    .tk-msg strong { font-weight: 600; }
    @keyframes tk-msg-in {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Typing Indicator */
    .tk-typing {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 14px 22px;
        background: white;
        border-radius: 20px;
        border-bottom-left-radius: 6px;
        align-self: flex-start;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        border: 1px solid rgba(39,51,106,0.06);
        animation: tk-msg-in 0.3s ease;
    }
    .tk-typing-dot {
        width: 8px;
        height: 8px;
        background: #27336a;
        border-radius: 50%;
        opacity: 0.4;
        animation: tk-typing-bounce 1.4s ease-in-out infinite;
    }
    .tk-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .tk-typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes tk-typing-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-6px); opacity: 1; }
    }

    /* Quick Replies */
    .tk-quick-replies {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding: 4px 0 8px;
        animation: tk-msg-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .tk-quick-btn {
        padding: 8px 16px;
        border-radius: 20px;
        background: white;
        border: 1.5px solid rgba(39,51,106,0.12);
        color: #27336a;
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
        font-family: inherit;
        white-space: nowrap;
    }
    .tk-quick-btn:hover {
        background: #27336a;
        color: white;
        border-color: #27336a;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(39,51,106,0.2);
    }

    /* Input Area */
    .tk-input-area {
        padding: 16px 18px;
        border-top: 1px solid rgba(39,51,106,0.06);
        display: flex;
        gap: 10px;
        align-items: center;
        background: white;
        flex-shrink: 0;
    }
    .tk-input {
        flex: 1;
        border: 1.5px solid rgba(39,51,106,0.1);
        border-radius: 24px;
        padding: 12px 20px;
        font-size: 14px;
        font-family: inherit;
        color: #27336a;
        background: #f8f9fc;
        outline: none;
        transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    }
    .tk-input:focus {
        border-color: #27336a;
        background: white;
        box-shadow: 0 0 0 3px rgba(39,51,106,0.08);
    }
    .tk-input::placeholder {
        color: #9ca3af;
        font-size: 13px;
    }
    .tk-send-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, #27336a 0%, #1a2248 100%);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        flex-shrink: 0;
    }
    .tk-send-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 4px 16px rgba(39,51,106,0.3);
    }
    .tk-send-btn:active { transform: scale(0.95); }
    .tk-send-btn svg { width: 18px; height: 18px; fill: white; }

    /* Powered by */
    .tk-powered {
        text-align: center;
        padding: 6px 0 10px;
        font-size: 10px;
        color: #9ca3af;
        background: white;
        flex-shrink: 0;
        letter-spacing: 0.3px;
    }

    /* Mobile Responsive — compact popup, NOT full-screen */
    @media (max-width: 480px) {
        #tk-chatbot-window {
            bottom: 88px;
            right: 12px;
            left: 12px;
            width: auto;
            max-width: calc(100vw - 24px);
            height: 440px;
            max-height: calc(100vh - 120px);
            border-radius: 20px;
        }
        #tk-chatbot-fab {
            bottom: 18px;
            right: 18px;
            width: 54px;
            height: 54px;
        }
        #tk-chatbot-fab svg { width: 24px; height: 24px; }

        .tk-chat-header {
            padding: 14px 16px;
            gap: 10px;
        }
        .tk-header-info h3 { font-size: 14px; }
        .tk-header-info p { font-size: 11px; }
        .tk-avatar { width: 36px; height: 36px; font-size: 18px; }

        .tk-close-mobile {
            display: flex !important;
        }

        .tk-messages {
            padding: 14px 12px;
            gap: 10px;
        }
        .tk-msg {
            max-width: 88%;
            padding: 10px 14px;
            font-size: 12.5px;
            line-height: 1.55;
            border-radius: 16px;
        }
        .tk-msg-bot { border-bottom-left-radius: 5px; }
        .tk-msg-user { border-bottom-right-radius: 5px; }

        .tk-quick-replies {
            flex-wrap: wrap;
            padding: 2px 0 8px;
            gap: 6px;
        }
        .tk-quick-btn {
            padding: 7px 12px;
            font-size: 11.5px;
            flex-shrink: 0;
        }

        .tk-input-area {
            padding: 10px 12px;
            gap: 8px;
        }
        .tk-input {
            padding: 10px 14px;
            font-size: 16px;
            border-radius: 20px;
        }
        .tk-input::placeholder { font-size: 12px; }
        .tk-send-btn { width: 40px; height: 40px; }
        .tk-send-btn svg { width: 16px; height: 16px; }

        .tk-powered {
            padding: 4px 0 6px;
            font-size: 9px;
        }

        .tk-typing {
            padding: 10px 16px;
            border-radius: 16px;
            border-bottom-left-radius: 5px;
        }
    }

    /* Close button in header */
    .tk-close-mobile {
        display: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.1);
        cursor: pointer;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        transition: background 0.2s ease;
        position: relative;
        z-index: 2;
        flex-shrink: 0;
        backdrop-filter: blur(8px);
    }
    .tk-close-mobile:hover {
        background: rgba(255,255,255,0.25);
    }
    .tk-close-mobile svg {
        width: 14px;
        height: 14px;
        fill: white;
    }

    /* Timestamp */
    .tk-timestamp {
        font-size: 10px;
        color: #9ca3af;
        text-align: center;
        padding: 4px 0;
    }

    /* Print hide */
    @media print {
        #tk-chatbot-fab, #tk-chatbot-window { display: none !important; }
    }
    `;

    // ── Build DOM ────────────────────────────────────────────────────────
    function init() {
        // Inject styles
        const styleEl = document.createElement('style');
        styleEl.textContent = STYLES;
        document.head.appendChild(styleEl);

        // FAB button
        const fab = document.createElement('button');
        fab.id = 'tk-chatbot-fab';
        fab.setAttribute('aria-label', 'Open chat assistant');
        fab.innerHTML = `
            <svg class="tk-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/></svg>
            <svg class="tk-icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            <span id="tk-chatbot-badge">1</span>`;
        document.body.appendChild(fab);

        // Chat window
        const win = document.createElement('div');
        win.id = 'tk-chatbot-window';
        win.setAttribute('role', 'dialog');
        win.setAttribute('aria-label', 'Chat with TrueKnack assistant');
        win.setAttribute('data-lenis-prevent', '');
        win.innerHTML = `
            <div class="tk-chat-header">
                <div class="tk-avatar">🤖</div>
                <div class="tk-header-info">
                    <h3>TrueKnack Assistant</h3>
                    <p><span class="tk-online-dot"></span> Always online</p>
                </div>
                <button class="tk-close-mobile" aria-label="Close chat">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
            <div class="tk-messages" id="tk-messages" data-lenis-prevent></div>
            <div class="tk-input-area">
                <input type="text" class="tk-input" id="tk-input" placeholder="Ask about our services..." autocomplete="off" />
                <button class="tk-send-btn" id="tk-send" aria-label="Send message">
                    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
            <div class="tk-powered">✨ Powered by TrueKnack AI</div>`;
        document.body.appendChild(win);

        // ── State ───────────────────────────────────────────────────────
        let isOpen = false;
        let firstOpen = true;
        const messagesEl = document.getElementById('tk-messages');
        const inputEl = document.getElementById('tk-input');
        const sendBtn = document.getElementById('tk-send');
        const badge = document.getElementById('tk-chatbot-badge');

        // ── Toggle helpers ──────────────────────────────────────────────
        function openChat() {
            isOpen = true;
            fab.classList.add('tk-open');
            win.classList.add('tk-visible');
            fab.setAttribute('aria-label', 'Close chat assistant');
            if (badge) badge.style.display = 'none';
            if (firstOpen) {
                firstOpen = false;
                showWelcome();
            }
            setTimeout(() => inputEl.focus(), 350);
        }

        function closeChat() {
            isOpen = false;
            fab.classList.remove('tk-open');
            win.classList.remove('tk-visible');
            fab.setAttribute('aria-label', 'Open chat assistant');
        }

        fab.addEventListener('click', () => {
            isOpen ? closeChat() : openChat();
        });

        // Mobile close button in header
        const mobileCloseBtn = win.querySelector('.tk-close-mobile');
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeChat);
        }

        // ── Welcome Message ─────────────────────────────────────────────
        function showWelcome() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addTimestamp(timeStr);
            addBotMessage(`👋 Hi there! I'm <strong>${BOT.name}</strong>, your ${BOT.role}! I'm ${BOT.personality}.\n\nI can help you with:\n• Our recruitment services\n• Company information\n• Contact details\n• How our process works\n• Ask me about myself — I love chatting! 😄\n\nFeel free to ask anything, or try one of the quick options below!`);
            addQuickReplies();
        }

        // ── Add Messages ────────────────────────────────────────────────
        function addTimestamp(text) {
            const el = document.createElement('div');
            el.className = 'tk-timestamp';
            el.textContent = text;
            messagesEl.appendChild(el);
        }

        function addBotMessage(html) {
            const el = document.createElement('div');
            el.className = 'tk-msg tk-msg-bot';
            el.innerHTML = formatMsg(html);
            messagesEl.appendChild(el);
            scrollToBottom();
        }

        function addUserMessage(text) {
            const el = document.createElement('div');
            el.className = 'tk-msg tk-msg-user';
            el.textContent = text;
            messagesEl.appendChild(el);
            scrollToBottom();
        }

        function addQuickReplies() {
            const container = document.createElement('div');
            container.className = 'tk-quick-replies';
            QUICK_REPLIES.forEach(qr => {
                const btn = document.createElement('button');
                btn.className = 'tk-quick-btn';
                btn.textContent = qr.label;
                btn.addEventListener('click', () => {
                    // Remove quick replies
                    container.remove();
                    handleUserInput(qr.msg);
                });
                container.appendChild(btn);
            });
            messagesEl.appendChild(container);
            scrollToBottom();
        }

        function showTyping() {
            const el = document.createElement('div');
            el.className = 'tk-typing';
            el.id = 'tk-typing';
            el.innerHTML = '<div class="tk-typing-dot"></div><div class="tk-typing-dot"></div><div class="tk-typing-dot"></div>';
            messagesEl.appendChild(el);
            scrollToBottom();
        }

        function hideTyping() {
            const el = document.getElementById('tk-typing');
            if (el) el.remove();
        }

        function scrollToBottom() {
            requestAnimationFrame(() => {
                messagesEl.scrollTop = messagesEl.scrollHeight;
            });
        }

        function formatMsg(text) {
            return text.replace(/\n/g, '<br>');
        }

        // ── Handle Input ────────────────────────────────────────────────
        function handleUserInput(text) {
            const trimmed = text.trim();
            if (!trimmed) return;

            addUserMessage(trimmed);
            inputEl.value = '';

            // Remove existing quick replies
            const existingQR = messagesEl.querySelectorAll('.tk-quick-replies');
            existingQR.forEach(qr => qr.remove());

            // Show typing for realistic feel
            showTyping();

            const delay = 600 + Math.random() * 800;
            setTimeout(() => {
                hideTyping();

                const intent = findBestIntent(trimmed);
                const response = intent ? intent.response() : FALLBACK();

                addBotMessage(response);

                // Show quick replies after a delay
                setTimeout(() => addQuickReplies(), 300);
            }, delay);
        }

        // ── Event Listeners ─────────────────────────────────────────────
        sendBtn.addEventListener('click', () => handleUserInput(inputEl.value));
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUserInput(inputEl.value);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeChat();
            }
        });

        // Accessibility — trap focus inside chat when open
        win.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = win.querySelectorAll('input, button, a, [tabindex]:not([tabindex="-1"])');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // ── Initialize ──────────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
