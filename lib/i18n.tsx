"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Dict = Record<string, string>;

const EN: Dict = {
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.about": "About",
  "nav.pricing": "Pricing",
  "nav.cv": "CV",
  "nav.cta": "Start a Brand Project",
  "lang.toggle": "العربية",

  "hero.kicker": "BLACK-MAK® / LOGO & VISUAL IDENTITY",
  "hero.title": "Logo & Visual Identity Design<br/><em>for brands that want to be recognized.</em>",
  "hero.lede":
    "Distinctive identities built around strategy, calligraphy, and real-world application — in Arabic, Latin, and everything in between.",
  "hero.work": "View Selected Work",
  "hero.cta": "Start a Brand Project",
  "hero.sideLabel": "The practice",
  "hero.sideTitle": "Strategy, craft & real-world application.",
  "hero.sideText":
    "Arabic & Latin calligraphy, identity systems, and applied design — built to survive the street, not just the screen.",
  "hero.scroll": "Scroll to explore",
  "hero.cardLabel": "BLACK-MAK / DIRECT CONTACT",
  "hero.role": "Logo & Visual Identity Designer",
  "hero.location": "Egypt",
  "hero.world": "Working worldwide",
  "hero.experience": "12+ years of practice",

  "signal.1": "01 / STRATEGY BEFORE SHAPE",
  "signal.2": "02 / BUILT FOR REAL SCALE",
  "signal.3": "03 / BILINGUAL CALLIGRAPHY",
  "signal.4": "04 / WORLDWIDE COLLABORATION",

  "work.index": "01 / SELECTED WORK",
  "work.moreIndex": "MORE WORK",
  "work.moreTitle": "More<br/><em>work.</em>",
  "work.title": "Work that holds<br/><em>its own.</em>",
  "work.note":
    "A focused selection of logo design, calligraphy, identity systems, and applied communication. Every project starts with a question: what should this mark make people feel?",
  "work.p1title": "Logo Collection — Vol. II",
  "work.p1tags": "Logo Design · Logotype · Identity",
  "work.p2title": "Logo Collection — Vol. I",
  "work.p2tags": "Logo Design · Logotype · Identity",
  "work.p3title": "Outdoor Advertising",
  "work.p3tags": "Applied Design · Campaigns",
  "work.p4title": "MAKEEN",
  "work.p4tags": "Arabic Calligraphy · Logotype",
  "work.p5title": "CALLIGRAPHY WORK",
  "work.p5tags": "Arabic Calligraphy · Behance Collection",
  "work.footer":
    "Years of designing for print, distance, and the street — experience that makes every mark work beyond the screen.",
  "work.archive": "View full archive on Behance",

  "statement.index": "THE POINT",
  "statement.title":
    "A logo is not decoration.<br/><em>It is the shortest expression of who you are.</em>",
  "statement.cta": "Start a Brand Project",

  "work.cta.line": "Like what you see?<br/><em>Your brand deserves the same level of thinking.</em>",
  "work.cta.btn": "Start a Brand Project",

  "services.index": "03 / SERVICES",
  "services.incLabel": "WHAT'S INCLUDED —",
  "services.title": "What I<br/><em>build.</em>",
  "services.note":
    "An independent design practice focused on logos, visual identities, calligraphy, and distinctive brand systems.",
  "services.s1name": "Logo Design",
  "services.s1desc":
    "Distinctive marks built to be recognized, remembered, and used everywhere.",
  "services.s2name": "Visual Identity",
  "services.s2desc":
    "A complete visual system built around your logo, typography, color, and brand behavior.",
  "services.s3name": "Arabic & Latin Calligraphy",
  "services.s3desc":
    "Freestyle calligraphy, custom-drawn wordmarks, and bilingual calligraphic systems designed as one visual language.",
  "services.s4name": "Brand Applications",
  "services.s4desc":
    "Applications of an existing identity — signage, print, and large-format use, built for distance and clarity.",
  "services.s5name": "Digital Brand Experiences",
  "services.s5desc":
    "Custom portfolio and brand microsites designed around the identity — not generic templates dressed in a logo. This studio itself is an example of the digital brand experiences I build. Available as an extension of selected branding projects or as a standalone digital identity experience.",
  "services.s1inc": "Concepts · Refinement rounds · Final files (AI · PDF · PNG · SVG)",
  "services.s2inc": "Logo system · Color & type · Guidelines · Applications",
  "services.s3inc": "Freestyle calligraphy · Bilingual lockups · Calligraphic system",
  "services.s4inc": "Signage · Print · Large-format",
  "services.s5inc": "Custom microsite · Visual direction · Interactive sections · Conversion content",
  "services.s6inc": "Identity audit · New direction · Transition system",
  "services.portTitle": "NEED A PORTFOLIO LIKE THIS FOR YOUR OWN WORK?",
  "services.portText":
    "I also build custom portfolio microsites for designers, photographers, creative professionals, and brands.",
  "services.portCta": "Request a Digital Project",
  "services.built": "Built by BLACK-MAK — Art Direction · Interface Design · Interaction · Conversion Architecture",
  "services.s6name": "Rebrand",
  "services.s6desc":
    "For businesses that have outgrown their current identity and need a clearer, more distinctive visual direction.",

  "about.index": "04 / THE DESIGNER",
  "about.title": "Behind<br/><em>the mark.</em>",
  "about.note":
    "A designer with a street-level understanding of how identity behaves in the real world.",
  "about.lede":
    "I'm <strong>Muhamed Alaa Elbank</strong> — a Logo &amp; Visual Identity Designer who turns business visions into recognizable, memorable identities with clarity, character, and staying power.",
  "about.p1":
    "My background spans logo design, Arabic & Latin calligraphy, and brand identity systems. Years of outdoor and large-format work shaped the conviction that a good mark must survive the real world — not just a presentation board.",
  "about.p2":
    "I work locally in Egypt and worldwide, in Arabic and English, with an AI-augmented creative workflow that speeds up exploration without replacing the designer's judgment. The practice is built on long-term client relationships, repeat work, and referrals.",
  "about.stat1": "Years of Practice",
  "about.stat2": "Logos & Identities Delivered",
  "about.stat3": "Bilingual Identities — One System",
  "about.cv": "View CV",
  "cv.index": "CURRICULUM VITÆ",
  "cv.title": "Muhamed Alaa — CV",
  "cv.pdf": "PDF",
  "cv.ats": "ATS",
  "cv.jpg": "JPG",
  "cv.pdfDesc": "Designed, print-ready résumé. Best for a full look at layout and detail.",
  "cv.atsDesc": "Plain, recruiter-friendly text version — parses cleanly in applicant tracking systems.",
  "cv.jpgDesc": "Quick image preview — open or save in one tap, no reader needed.",
  "cv.download": "Download",
  "cv.openTab": "Open in tab",
  "cv.close": "Close",
  "cv.live": "Interactive CV",
  "cv.liveDesc": "Open the full interactive online CV",
  "cv.liveBanner": "Prefer the full experience? Explore the interactive online CV",
  "cv.liveCta": "Open interactive CV",
  "about.behance": "Behance",

  "journey.index": "THE JOURNEY",
  "journey.title": "The work behind the mark.",
  "journey.note":
    "A timeline of the places, pressures, and practice that shaped BLACK-MAK.",
  "journey.1title": "The Beginning",
  "journey.1text":
    "First steps into graphic design and my first professional logo commissions — learning that every mark carries a business, not just a shape.",
  "journey.2title": "Outdoor Advertising Years",
  "journey.2text":
    "Signage, banners and campaign work for retail chains across Egypt. Design learned on the street: bold, readable, built for distance.",
  "journey.3title": "Identity Focus",
  "journey.3text":
    "Deep dive into calligraphy-led logotypes and full brand systems. Published collections on Behance; selected work across MENA and Europe.",
  "journey.4year": "2024 — Today",
  "journey.4title": "BLACK-MAK",
  "journey.4text":
    "A dedicated practice serving clients worldwide — Arabic & Latin marks, brand systems, and a creative workflow built for precision.",
  "journey.tool1": "Adobe Illustrator",
  "journey.tool2": "Adobe Photoshop",
  "journey.tool4": "AI-assisted",

  "process.index": "05 / PROCESS",
  "process.title": "From question<br/><em>to identity.</em>",
  "process.note":
    "A managed process keeps the work focused, collaborative, and moving forward — you always know what's next.",
  "process.1title": "Discover",
  "process.1text":
    "Understand the business, audience, positioning, and visual problem before drawing anything.",
  "process.2title": "Define",
  "process.2text":
    "Build the creative direction, visual territory, and strategic foundation for the identity.",
  "process.3title": "Design",
  "process.3text":
    "Develop the mark, typography, proportions, and visual system through focused exploration.",
  "process.4title": "Refine",
  "process.4text":
    "Test, challenge, and refine the strongest direction until every detail earns its place.",
  "process.5title": "Deliver",
  "process.5text":
    "Package the final identity into a practical system ready for real-world use.",

  "proof.index": "05 / PROOF",
  "proof.title": "Good work<br/><em>travels.</em>",
  "proof.note":
    "Real feedback from people who needed a mark to do more than look good.",
  "proof.1quote":
    "Muhamed asked about our story before he opened Illustrator. Three concepts, all usable — we chose ours in the first round and it still fits us two years later.",
  "proof.1role": "Founder, specialty coffee roastery — Cairo",
  "proof.2quote":
    "Clear process, honest timeline, zero drama. The wordmark he drew now carries our entire packaging line.",
  "proof.2role": "Skincare brand founder — Dubai",
  "proof.3quote":
    "Responsive, professional, and patient with revisions. Delivered exactly what he promised, on time.",
  "proof.3role": "Restaurant owner — USA",

  "pricing.index": "07 / INVESTMENT",
  "pricing.title": "Clear scope.<br/><em>Clear start.</em>",
  "pricing.note":
    "Projects from, not fixed packages. Every engagement is scoped individually — final quote after a short conversation.",
  "pricing.starting": "Projects from",
  "pricing.featured": "MOST COMPLETE",
  "pricing.offer": "LIMITED PROJECT CAPACITY",
  "pricing.disclaimer":
    "All projects are scoped individually. Final pricing depends on the complexity, number of deliverables, and level of strategic involvement required.",
  "pricing.microcopy":
    "Every project starts with understanding the problem before defining the deliverables.",
  "pricing.1name": "Focused Logo Project",
  "pricing.1desc": "For focused logo projects where the mark is the primary deliverable — scope is defined after the brief.",
  "pricing.1a": "2–3 original concepts",
  "pricing.1b": "3 refinement rounds",
  "pricing.1c": "Editable AI · PDF · PNG · SVG",
  "pricing.1d": "1–2 weeks",
  "pricing.2name": "Calligraphic Identity",
  "pricing.2desc": "Custom wordmarks and calligraphy-led identities built around free-drawn letterforms.",
  "pricing.2a": "Custom-drawn letterforms",
  "pricing.2b": "Arabic & Latin calligraphic lockups",
  "pricing.2c": "2 concepts + refinement",
  "pricing.2d": "1–2 weeks",
  "pricing.3name": "Full Visual Identity",
  "pricing.3desc": "For brands that need a complete visual system rather than a standalone mark — covering the logo, typography, color, and essential brand applications.",
  "pricing.3a": "Logo system + color + type",
  "pricing.3b": "Brand guidelines document",
  "pricing.3c": "Applied design set",
  "pricing.3d": "3–4 weeks",
  "pricing.upsellQ": "Need the identity translated into digital?",
  "pricing.upsellA": "Extend the system into a custom digital brand experience.",
  "pricing.upsellCta": "Explore Digital Brand Experiences",
  "pricing.ctaQ": "Know what you need? Send the brief. I'll take it from there.",
  "pricing.ctaBtn": "Request a Project Estimate",

  "payment.index": "09 / PAYMENT",
  "payment.title": "Payment<br/><em>after approval.</em>",
  "payment.note":
    "After the proposal is approved, choose your preferred payment method and copy the details securely.",
  "payment.label": "PAYMENT — AFTER PROPOSAL APPROVAL",
  "payment.vodafone": "EGYPT — VODAFONE CASH",
  "payment.instapay": "EGYPT — INSTAPAY",
  "payment.paypal": "INTERNATIONAL — PAYPAL",
  "payment.copy": "Copy",
  "payment.copied": "Copied",
  "payment.footnote":
    "Tap any value to copy it, transfer via the method that suits you, then send the transfer confirmation on WhatsApp — your project is confirmed and scheduled the same day.",

  "faq.index": "08 / FAQ",
  "faq.title": "Before<br/><em>we begin.</em>",
  "faq.1q": "How long does a project take?",
  "faq.1a":
    "Most focused logo projects take approximately 1–2 weeks. Full visual identity projects typically require 2–4 weeks depending on scope and feedback cycles.",
  "faq.2q": "What do I receive?",
  "faq.2a":
    "Final logo files, required variations, typography and color specifications, and the agreed identity assets based on the project scope.",
  "faq.3q": "What happens after I send an inquiry?",
  "faq.3a":
    "I review the brief, ask only the questions needed to understand the project, then send a clear recommendation and project estimate. If we're a fit, we schedule the start and move into the first stage.",
  "faq.4q": "What counts as a revision round?",
  "faq.4a":
    "A revision round refines the chosen direction — adjusting proportions, weights, spacing, and color. It does not restart the concept from scratch; concept exploration happens earlier in the process.",
  "faq.5q": "What isn't included?",
  "faq.5a":
    "Services beyond the agreed scope — such as social media kits, packaging production, copywriting, or web development — are quoted separately based on the project's needs.",
  "faq.6q": "Do you work internationally?",
  "faq.6a":
    "Yes. BLACK-MAK works with clients worldwide in both Arabic and English.",

  "who.index": "06 / WHO I WORK WITH",
  "who.title": "Who I<br/><em>work with.</em>",
  "who.note":
    "I work with founders, businesses, professionals, and creative teams who need a distinctive identity — not a logo produced in isolation.",
  "who.fit": "Best suited for new brands, rebrands, businesses entering new markets, and brands ready to professionalize their visual presence.",
  "who.fitTitle": "Best suited for",
  "who.closing":
    "Not every project needs a full identity. Not every business needs a new logo. I'll tell you what your project actually needs — even when the answer is less work.",
  "who.refreshTitle": "YOU MAY NEED AN IDENTITY REFRESH IF…",
  "who.r1": "Your business has outgrown its current look.",
  "who.r2": "Your logo no longer reflects your positioning.",
  "who.r3": "You're entering a new market.",
  "who.r4": "Your Arabic and Latin identities feel disconnected.",
  "who.r5": "Your brand looks inconsistent across touchpoints.",
  "who.founders": "Founders",
  "who.startups": "Startups",
  "who.retail": "Retail & Food",
  "who.agencies": "Agencies",
  "who.restaurants": "Restaurants",
  "who.creative": "Creative Brands",

  "why.index": "02 / WHY BLACK-MAK",
  "why.title": "What makes<br/><em>BLACK-MAK different.</em>",
  "why.note":
    "12+ years of designing marks that have to work in the real world — from identity systems and calligraphy to signage and large-format applications.",
  "why.p1title": "Specialized in Identity",
  "why.p1text":
    "Logo and visual identity are the core practice — not one service among dozens.",
  "why.p1proof": "50+ logos & identities delivered",
  "why.p2title": "Arabic + Latin Calligraphy",
  "why.p2text":
    "Bilingual calligraphy is designed as one coherent visual language — not two separate systems.",
  "why.p2proof": "Bilingual systems designed as one language",
  "why.p3title": "Real-world Thinking",
  "why.p3text":
    "Every mark is considered for scale, reproduction, signage, print, and digital use.",
  "why.p3proof": "Outdoor & large-format experience",
  "why.p4title": "12+ Years of Practice",
  "why.p4text":
    "A process shaped by years of actual client work, not just presentation projects.",
  "why.p4proof": "Practice since 2014",

  "phil.index": "DESIGN PHILOSOPHY",
  "phil.title": "A logo is not decoration.<br/><em>It is a recognition device.</em>",
  "phil.text":
    "The goal is not to make a mark look impressive in a presentation. The goal is to create something distinctive enough to be recognized, flexible enough to be used everywhere, and meaningful enough to belong to the business behind it.",

  "biling.index": "ARABIC + LATIN",
  "biling.title": "Built for Arabic.<br/>Built for Latin.<br/><em>Built to work together.</em>",
  "biling.text":
    "I design bilingual identities where Arabic and Latin calligraphy feel like one coherent visual language — not two separate systems.",

  "bts.index": "DESIGNED BEYOND THE SCREEN",
  "bts.title": "A strong identity has to survive more than a presentation mockup.",
  "bts.text":
    "It has to work at 24px, on packaging, on signage, in monochrome, and from a distance. Years of outdoor and large-format work built that instinct into every mark I draw.",

  "contact.index": "10 / START A BRAND PROJECT",
  "contact.title": "Have a brand worth building?",
  "contact.titleEm": "Let's give it an identity that can carry it forward.",
  "contact.note":
    "A short brief is enough to start. We discuss, I propose, then we begin.",
  "contact.pricingCta": "Know what you need? Send the brief. I'll take it from there.",
  "contact.qual": "BLACK-MAK is built for focused, collaborative projects and clients who value thoughtful design.",
  "contact.qualTitle": "A note on project fit",
  "contact.fitTitle": "A good fit if you:",
  "contact.fit1": "Have a real business or serious project",
  "contact.fit2": "Value distinctive design",
  "contact.fit3": "Are ready to collaborate",
  "contact.fit4": "Need an identity that can scale",
  "contact.notFit": "Not ideal for one-hour logo requests or template-based branding.",
  "contact.wa": "WhatsApp",
  "contact.email": "Email",
  "contact.behance": "Behance",
  "contact.pdf": "Download portfolio (PDF)",
  "form.intro": "PROJECT INQUIRY",
  "form.help": "Tell me enough to understand the shape of the problem.",
  "form.name": "Name *",
  "form.namePh": "Your name",
  "form.email": "Email *",
  "form.emailPh": "you@company.com",
  "form.contact": "WhatsApp *",
  "form.contactPh": "+20 — or your preferred channel",
  "form.company": "Company / Brand",
  "form.companyPh": "Your business or brand name",
  "form.type": "Project Type *",
  "form.opt1": "Logo",
  "form.opt2": "Visual Identity",
  "form.opt3": "Arabic / Latin Calligraphy",
  "form.opt4": "Rebrand",
  "form.opt5": "Digital Brand Experience",
  "form.opt6": "Other",
  "form.budget": "Estimated Investment",
  "form.budgetLead": "I'm ready to invest in a professional identity",
  "form.budgetOpt1": "Under $300",
  "form.budgetOpt2": "$300–$600",
  "form.budgetOpt3": "$600–$1,500",
  "form.budgetOpt4": "$1,500+",
  "form.budgetOpt5": "Not sure yet — let's discuss",
  "form.msg": "Brief *",
  "form.msgPh": "A sentence or two about the brand, the goal, and why now.",
  "form.submit": "Send inquiry",
  "form.sent": "Thanks — opening WhatsApp with your brief.",

  "footer.tagline": "A premium logo & visual identity practice by Muhamed Alaa Elbank.",
  "footer.sig": "Marks with meaning. Identities with character.",
  "footer.end": "Designed with intent. Egypt · Working Worldwide.",
  "footer.rights": "© 2026 BLACK-MAK",

  "case.back": "Back to work",
  "case.behance": "View on Behance",
  "case.startTitle": "Have a project like this?",
  "case.startHeading": "Let's build your mark.",
  "case.startCta": "Start a Project",
  "case.more": "More work",
  "case.prev": "Previous",
  "case.next": "Next",

  "wa.msg":
    "Hello BLACK-MAK, I'd like to start a project. Here's a short brief: ",
};

const AR: Dict = {
  "nav.work": "الأعمال",
  "nav.services": "الخدمات",
  "nav.about": "عنّي",
  "nav.pricing": "الأسعار",
  "nav.cv": "السيرة",
  "nav.cta": "ابدأ مشروع علامة",
  "lang.toggle": "EN",

  "hero.kicker": "BLACK-MAK® / شعارات وهوية بصرية",
  "hero.title": "تصميم شعارات وهوية بصرية<br/><em>للعلامات التي تريد أن تُعرَف.</em>",
  "hero.lede":
    "هويات مميزة مبنية على الاستراتيجية والكاليجرافي والتطبيق الواقعي — بالعربية واللاتينية وكل ما بينهما.",
  "hero.work": "استعرض الأعمال المختارة",
  "hero.cta": "ابدأ مشروع علامة",
  "hero.sideLabel": "الممارسة",
  "hero.sideTitle": "دقة، مفهوم وشخصية.",
  "hero.sideText":
    "كاليجرافي عربي ولاتيني، وأنظمة هوية، وتصميم تطبيقي تشكّله أكثر من 12 سنة في العالم الحقيقي.",
  "hero.scroll": "مرّر للاستكشاف",
  "hero.cardLabel": "BLACK-MAK / تواصل مباشر",
  "hero.role": "مصمم شعارات وهوية بصرية",
  "hero.location": "مصر",
  "hero.world": "أعمل مع عملاء حول العالم",
  "hero.experience": "أكثر من 12 سنة خبرة",

  "signal.1": "01 / الاستراتيجية قبل الشكل",
  "signal.2": "02 / مصممة للمقاسات الحقيقية",
  "signal.3": "03 / كاليجرافي ثنائي اللغة",
  "signal.4": "04 / تعاون حول العالم",

  "work.index": "01 / أعمال مختارة",
  "work.moreIndex": "أعمال أخرى",
  "work.moreTitle": "أعمال<br/><em>أخرى.</em>",
  "work.title": "أعمال تثبت<br/><em>حضورها.</em>",
  "work.note":
    "مختارات مركّزة من تصميم الشعارات، والكاليجرافي، وأنظمة الهوية، والتواصل البصري التطبيقي. كل مشروع يبدأ بسؤال واحد: ما الذي يجب أن تُشعر به هذه العلامة الناس؟",
  "work.p1title": "مجموعة الشعارات — الجزء الثاني",
  "work.p1tags": "تصميم شعار · لوجوتايب · هوية",
  "work.p2title": "مجموعة الشعارات — الجزء الأول",
  "work.p2tags": "تصميم شعار · لوجوتايب · هوية",
  "work.p3title": "إعلانات خارجية",
  "work.p3tags": "تصميم تطبيقي · حملات",
  "work.p4title": "MAKEEN",
  "work.p4tags": "خط عربي · لوجوتايب",
  "work.p5title": "أعمال الخط العربي",
  "work.p5tags": "خط عربي · مجموعة Behance",
  "work.footer":
    "سنوات من التصميم للطباعة، والمسافات، والشارع — خبرة تجعل كل علامة تعمل خارج الشاشة أيضًا.",
  "work.archive": "شاهد الأرشيف الكامل على Behance",

  "statement.index": "الفكرة",
"statement.title":
    "الشعار ليس زينة.<br/><em>إنه أقصر تعبير ممكن عن من أنت.</em>",
  "statement.cta": "ابنِ علامتك",

  "services.index": "03 / الخدمات",
  "services.incLabel": "ما يشمله —",
  "services.title": "ما الذي<br/><em>أبنيه.</em>",
  "services.note": "ممارسة تصميم مستقلة متخصصة في الشعارات والهويات البصرية والكاليجرافي وأنظمة العلامات المميزة.",
  "services.s1name": "تصميم شعار",
  "services.s1desc": "علامات مميزة مصممة ليتعرّف عليها الناس ويتذكروها ويستخدموها في كل مكان.",
  "services.s2name": "الهوية البصرية",
  "services.s2desc": "نظام بصري كامل مبني حول شعارك والتايبوغرافي والألوان وسلوك العلامة.",
  "services.s3name": "الكاليجرافي العربي واللاتيني",
  "services.s3desc": "كاليجرافي حر وحروف مرسومة يدويًا وأنظمة خطّية ثنائية اللغة مصممة كلغة بصرية واحدة.",
  "services.s4name": "تطبيقات العلامة",
  "services.s4desc": "تطبيقات لهوية قائمة بالفعل — لوحات ومطبوعات وصيغ كبيرة، مبنية للمسافة والوضوح.",
  "services.s5name": "تجارب رقمية للعلامة",
  "services.s5desc": "مواقع بورتفوليو وبراند مايكروسايت مصممة حول الهوية — لا قوالب عامة بملبس شعار. هذا الاستوديو نفسه مثال على التجارب الرقمية التي أبنيها. متاحة كامتداد لمشاريع الهوية المختارة أو كتجربة رقمية مستقلة.",
  "services.s1inc": "مفاهيم · جولات صقل · ملفات نهائية (AI · PDF · PNG · SVG)",
  "services.s2inc": "نظام الشعار · اللون والخط · الدليل · التطبيقات",
  "services.s3inc": "كاليجرافي حر · قفل ثنائي اللغة · نظام كاليجرافي",
  "services.s4inc": "لوحات · مطبوعات · صيغ كبيرة",
  "services.s5inc": "مايكروسايت مخصص · اتجاه بصري · أقسام تفاعلية · محتوى تحويلي",
  "services.s6inc": "تدقيق الهوية · اتجاه جديد · نظام انتقال",
  "services.portTitle": "تحتاج بورتفوليو مثل هذا لعملك أنت؟",
  "services.portText": "أبني أيضًا مواقع بورتفوليو مخصصة للمصممين والمصورين والمهنيين الإبداعيين والعلامات.",
  "services.portCta": "اطلب مشروعًا رقميًا",
  "services.built": "بُني بواسطة BLACK-MAK — إدارة فنية · تصميم واجهات · تفاعل · هندسة تحويل",
  "services.s6name": "إعادة تصميم الهوية",
  "services.s6desc": "للأعمال التي تجاوزت هويتها الحالية وتحتاج اتجاهًا بصريًا أوضح وأكثر تميزًا.",

  "about.index": "04 / المصمم",
  "about.title": "وراء<br/><em>العلامة.</em>",
  "about.note": "مصمم بفهمٍ ميداني لكيفية تصرف الهوية في العالم الحقيقي.",
  "about.lede":
    "أنا <strong>محمد علاء البنك</strong> — مصمم شعارات وهوية بصرية يحوّل رؤى الأعمال إلى هويات يتعرّف عليها الناس ويثقون بها، بوضوح وشخصية وبقاء.",
  "about.p1":
    "خلفيتي تمتد بين تصميم الشعارات، الكاليجرافي العربي واللاتيني، وأنظمة الهوية التجارية. سنوات العمل الخارجي والصيغ الكبيرة صاغت قناعتي أن العلامة الجيدة يجب أن تنجو في العالم الحقيقي — لا على لوحة العرض فقط.",
  "about.p2":
    "أعمل محليًا في مصر وحول العالم، بالعربية والإنجليزية، بأسلوب عمل إبداعي معزَّز بالذكاء الاصطناعي يسرّع الاستكشاف دون أن يحل محل حكم المصمم. الممارسة مبنية على علاقات عملاء طويلة الأمد وعمل متكرر وإحالات.",
  "about.stat1": "سنوات من الخبرة",
  "about.stat2": "شعارًا وهويةً تم تسليمها",
  "about.stat3": "هويات ثنائية اللغة — نظام واحد",
  "about.cv": "عرض السيرة",
  "cv.index": "السيرة الذاتية",
  "cv.title": "محمد علاء — السيرة الذاتية",
  "cv.pdf": "PDF",
  "cv.ats": "ATS",
  "cv.jpg": "JPG",
  "cv.pdfDesc": "نسخة مصمّمة جاهزة للطباعة. الأفضل لرؤية التصميم والتفاصيل كاملة.",
  "cv.atsDesc": "نسخة نصية بسيطة وملائمة للموظفين — تُقرأ بدقة في أنظمة تتبّع المتقدمين (ATS).",
  "cv.jpgDesc": "معاينة صورة سريعة — افتحها أو احفظها بضغطة واحدة دون برنامج قارئ.",
  "cv.download": "تحميل",
  "cv.openTab": "فتح في تبويب",
  "cv.close": "إغلاق",
  "cv.live": "السيرة التفاعلية",
  "cv.liveDesc": "افتح السيرة الذاتية التفاعلية كاملة",
  "cv.liveBanner": "تفضّل التجربة الكاملة؟ استكشف السيرة الذاتية التفاعلية",
  "cv.liveCta": "افتح السيرة التفاعلية",
  "about.behance": "Behance",

  "journey.index": "الرحلة",
  "journey.title": "العمل خلف العلامة.",
  "journey.note": "خط زمني للأماكن والضغوط والممارسة التي صاغت BLACK-MAK.",
  "journey.1title": "البداية",
  "journey.1text":
    "أولى خطواتي في التصميم الجرافيكي وأولى عمولات الشعارات الاحترافية — تعلمت أن كل علامة تحمل عملًا لا مجرد شكل.",
  "journey.2title": "سنوات الإعلانات الخارجية",
  "journey.2text":
    "لوحات وشعارات وحملات لسلاسل تجارية في أنحاء مصر. تصميمٌ تعلّمه في الشارع: جريء، مقروء، مصمّم للمسافة.",
  "journey.3title": "التركيز على الهوية",
  "journey.3text":
    "غوص عميق في اللوجوتايبات الكاليجرافية وأنظمة الهوية الكاملة. مجموعات منشورة على Behance وأعمال مختارة في الشرق الأوسط وأوروبا.",
  "journey.4year": "2024 — اليوم",
  "journey.4title": "BLACK-MAK",
  "journey.4text":
    "ممارسة مخصّصة لخدمة العملاء حول العالم — علامات عربية ولاتينية، أنظمة هوية وأسلوب عمل إبداعي مبني للدقة.",
  "journey.tool1": "Adobe Illustrator",
  "journey.tool2": "Adobe Photoshop",
  "journey.tool4": "مدعوم بالذكاء الاصطناعي",

  "process.index": "05 / العملية",
  "process.title": "من سؤال<br/><em>إلى هوية.</em>",
  "process.note": "عملية مُدارة تبقي العمل مركّزًا وتعاونيًا ومتقدمًا — تعرف دائمًا ما الخطوة التالية.",
  "process.1title": "اكتشاف",
  "process.1text": "فهم النشاط والجمهور والتموضع والمشكلة البصرية قبل رسم أي شيء.",
  "process.2title": "تحديد",
  "process.2text": "بناء الاتجاه الإبداعي والمنطقة البصرية والأساس الاستراتيجي للهوية.",
  "process.3title": "تصميم",
  "process.3text": "تطوير العلامة والتايبوغرافي والنسب والنظام البصري عبر استكشاف مركّز.",
  "process.4title": "صقل",
  "process.4text": "اختبار وتحدي وتنقيح أقوى اتجاه حتى يستحق كل تفصيل مكانه.",
  "process.5title": "تسليم",
  "process.5text": "تغليف الهوية النهائية في نظام عملي جاهز للاستخدام في العالم الحقيقي.",

  "proof.index": "05 / إثبات",
  "proof.title": "العمل الجيد<br/><em>يسافر.</em>",
  "proof.note": "تغذية راجعة حقيقية ممن احتاجوا علامة تفعل أكثر من أن تبدو جيدة.",
  "proof.1quote":
    "سألني محمد عن قصتنا قبل أن يفتح إليستريتور. ثلاثة مفاهيم الكلّ usable — اخترنا ours في الجولة الأولى وما زالت تناسبنا بعد سنتين.",
  "proof.1role": "مؤسس محمصة قهوة مختصة — القاهرة",
  "proof.2quote":
    "عملية واضحة، جدول زمني صادق، صفر دراما. الكلمة التي رسمها تحمل الآن خط إنتاجنا بالكامل.",
  "proof.2role": "مؤسسة علامة عناية بالبشرة — دبي",
  "proof.3quote":
    "متجاوب، احترافي، وصبور مع المراجعات. سلّم بالضبط ما وعد به، في موعده.",
  "proof.3role": "صاحب مطعم — أمريكا",

  "pricing.index": "07 / الاستثمار",
  "pricing.title": "نطاق واضح.<br/><em>بداية واضحة.</em>",
  "pricing.note": "مشاريع من، لا باقات ثابتة. كل مشروع يُحدد فرديًا — عرض نهائي بعد حديث قصير.",
  "pricing.disclaimer":
    "كل المشاريع تُحدد فرديًا. السعر النهائي يعتمد على التعقيد وعدد المخرجات ومستوى المشاركة الاستراتيجية المطلوبة.",
  "pricing.microcopy":
    "كل مشروع يبدأ بفهم المشكلة قبل تحديد المخرجات.",
  "pricing.starting": "مشاريع من",
  "pricing.featured": "الأكثر اكتمالًا",
  "pricing.save": "",
  "pricing.offer": "سعة مشاريع محدودة",
  "pricing.endsIn": "نقبل حاليًا",
  "pricing.1name": "مشروع شعار مركّز",
  "pricing.1desc": "لمشاريع الشعار المركّزة حيث تكون العلامة هي المخرج الأساسي — يُحدد النطاق بعد البريف.",
  "pricing.1a": "2–3 مفاهيم أصلية",
  "pricing.1b": "3 جولات صقل",
  "pricing.1c": "ملفات قابلة للتعديل · PDF · PNG · SVG",
  "pricing.1d": "1–2 أسبوع",
  "pricing.2name": "هوية كاليجرافية",
  "pricing.2desc": "كلمات وهويات يقودها الكاليجرافي، مبنية حول حروف مرسومة بحرية.",
  "pricing.2a": "حرفات مرسومة يدويًا",
  "pricing.2b": "قفل كاليجرافي عربي ولاتيني",
  "pricing.2c": "مفهومان + صقل",
  "pricing.2d": "1–2 أسبوع",
  "pricing.3name": "هوية بصرية كاملة",
  "pricing.3desc": "للعلامات التي تحتاج نظامًا بصريًا متكاملًا لا مجرد شعار منفرد — يغطي الشعار والتايبوغرافي والألوان وتطبيقات العلامة الأساسية.",
  "pricing.3a": "نظام شعار + ألوان + خط",
  "pricing.3b": "وثيقة دليل الهوية",
  "pricing.3c": "مجموعة تطبيقات",
  "pricing.3d": "3–4 أسابيع",
  "pricing.upsellQ": "تحتاج الهوية مترجمة إلى الرقمي؟",
  "pricing.upsellA": "امتد النظام إلى تجربة رقمية مخصصة للعلامة.",
  "pricing.upsellCta": "استكشف التجارب الرقمية للعلامة",
  "pricing.ctaQ": "تعرف ما تحتاجه؟ أرسل البريف وأنا أكمل من هناك.",
  "pricing.ctaBtn": "اطلب عرض مشروع",
  "pricing.4name": "التصميم التطبيقي والخارجي",
  "pricing.4a": "لوحات، شعارات، مطبوعات",
  "pricing.4b": "جريء ومقروء من بعيد",
  "pricing.4c": "ملفات إنتاج جاهزة",
  "pricing.4d": "1–2 أسبوع",

  "payment.index": "09 / الدفع",
  "payment.title": "الدفع<br/><em>بعد الموافقة.</em>",
  "payment.note": "بعد الموافقة على العرض، اختر وسيلة الدفع المفضلة لديك وانسخ التفاصيل بأمان.",
  "payment.label": "الدفع — بعد موافقة العرض",
  "payment.vodafone": "مصر — فودافون كاش",
  "payment.instapay": "مصر — إنستاباي",
  "payment.paypal": "دولي — باي بال",
  "payment.copy": "نسخ",
  "payment.copied": "تم النسخ",
  "payment.footnote":
    "اضغط أي قيمة لنسخها، حوّل عبر الوسيلة الأنسب لك، ثم أرسل إيصال التحويل على واتساب — يُؤكّد مشروعك ويُجدول في نفس اليوم.",

  "faq.index": "08 / أسئلة",
  "faq.title": "قبل<br/><em>أن نبدأ.</em>",
  "faq.1q": "كم يستغرق المشروع؟",
  "faq.1a":
    "معظم مشاريع الشعار المركّزة تستغرق 1–2 أسبوع تقريبًا. مشاريع الهوية الكاملة عادة تحتاج 2–4 أسابيع حسب النطاق ودورات الملاحظات.",
  "faq.2q": "ماذا أستلم؟",
  "faq.2a":
    "ملفات الشعار النهائية والصيغ المطلوبة ومواصفات التايبوغرافي والألوان وأصول الهوية المتفق عليها حسب نطاق المشروع.",
  "faq.3q": "ماذا يحدث بعد إرسال الاستفسار؟",
  "faq.3a":
    "أراجع البريف وأطرح فقط الأسئلة اللازمة لفهم المشروع، ثم أرسل توصية واضحة وعرضًا تقديريًا. إذا كنا مناسبين نحدد موعد البدء وننتقل إلى المرحلة الأولى.",
  "faq.4q": "ما الذي يُحتسب كجولة تعديل؟",
  "faq.4a":
    "جولة التعديل تُصقل الاتجاه المختار — النسب والأوزان والمسافات واللون. لا تعيد المفهوم من الصفر؛ استكشاف المفاهيم يحدث في مرحلة سابقة من العملية.",
  "faq.5q": "ما الذي غير متضمن؟",
  "faq.5a":
    "الخدمات خارج النطاق المتفق عليه — مثل حزم السوشيال ميديا وإنتاج التغليف وكتابة المحتوى وتطوير الويب — تُسعَّر منفصلًا حسب احتياجات المشروع.",
  "faq.6q": "هل تعمل دوليًا؟",
  "faq.6a": "نعم. BLACK-MAK يعمل مع عملاء حول العالم بالعربية والإنجليزية.",

  "who.index": "06 / لمن أعمل",
  "who.title": "لمن<br/><em>أعمل.</em>",
  "who.note":
    "أعمل مع مؤسسين وأعمال ومهنيين وفرق إبداعية تحتاج هوية مميزة — لا شعارًا يُصنع معزولًا.",
  "who.fit": "الأنسب للعلامات الجديدة، وإعادة التصميم، والأعمال الداخلة أسواقًا جديدة، والعلامات الجاهزة لمِهننة حضورها البصري.",
  "who.fitTitle": "الأنسب لمن:",
  "who.founders": "مؤسّسون",
  "who.startups": "مشاريع ناشئة",
  "who.retail": "تجزئة ومطاعم",
  "who.agencies": "وكالات",
  "who.restaurants": "مطاعم",
  "who.creative": "علامات إبداعية",
  "who.closing":
    "ليست كل الأعمال تحتاج هويةً كاملة، وليست كل علامة تحتاج شعارًا جديدًا. سأرشدك إلى ما يناسب مشروعك فعلًا — وإن كان ذلك يعني نطاقًا أصغر.",
  "who.refreshTitle": "قد تحتاج تجديد هوية إذا…",
  "who.r1": "نشاطك تجاوز شكله الحالي.",
  "who.r2": "شعارك لم يعد يعكس تموضعك.",
  "who.r3": "أنت تدخل سوقًا جديدة.",
  "who.r4": "هويتك العربية واللاتينية تبدو منفصلة.",
  "who.r5": "علامتك تبدو غير متسقة عبر نقاط التواصل.",

  "contact.index": "10 / ابدأ مشروعًا",
  "contact.title": "عندك علامة تستحق البناء؟",
  "contact.titleEm": "لنمنحها هوية تستطيع حملها للأمام.",
  "contact.note": "ملخّص موجز يكفي للبدء. نناقش، أقترح، ثم ننطلق.",
  "contact.wa": "واتساب",
  "contact.email": "البريد",
  "contact.pdf": "حمّل البروفايل (PDF)",
  "contact.behance": "Behance",
  "form.intro": "استفسار مشروع",
  "form.help": "أخبرني ما يكفي لفهم شكل المشكلة.",
  "form.name": "الاسم *",
  "form.namePh": "اسمك",
  "form.email": "البريد *",
  "form.emailPh": "you@company.com",
  "form.contact": "واتساب / وسيلة التواصل *",
  "form.contactPh": "+20 — أو قناتك المفضّلة",
  "form.type": "نوع المشروع *",
  "contact.qualTitle": "ملاحظة عن ملاءمة المشروع",
  "contact.qual": "BLACK-MAK مبني لمشاريع مركزة وتعاونية، ولعملاء يقدّرون التصميم المدروس.",
  "contact.fitTitle": "مناسب لك إذا:",
  "contact.fit1": "لديك نشاط حقيقي أو مشروع جاد",
  "contact.fit2": "تقدّر التصميم المميز",
  "contact.fit3": "أنت مستعد للتعاون",
  "contact.fit4": "تحتاج هوية قادرة على النمو",
  "contact.notFit": "غير مناسب لطلبات الشعار السريعة أو الهوية القالبية.",
  "contact.pricingCta": "تعرف ما تحتاجه؟ أرسل البريف وأنا أكمل من هناك.",
  "form.company": "الشركة / العلامة",
  "form.companyPh": "اسم نشاطك أو علامتك",
  "form.opt1": "شعار",
  "form.opt2": "هوية بصرية",
  "form.opt3": "كاليجرافي عربي / لاتيني",
  "form.opt4": "إعادة تصميم",
  "form.opt5": "تجربة رقمية للعلامة",
  "form.opt6": "أخرى",
  "form.budget": "الاستثمار المتوقع",
  "form.budgetLead": "أنا مستعد للاستثمار في هوية احترافية",
  "form.budgetPh": "مثلاً $500–$1,000",
  "form.budgetOpt1": "أقل من $300",
  "form.budgetOpt2": "$300–$600",
  "form.budgetOpt3": "$600–$1,500",
  "form.budgetOpt4": "$1,500+",
  "form.budgetOpt5": "لا أعرف بعد",
  "form.msg": "ملخّص المشروع *",
  "form.msgPh": "جملة أو اثنتان عن العلامة والهدف ولماذا الآن.",
  "form.submit": "أرسل الاستفسار",
  "form.sent": "شكرًا — نفتح واتساب مع ملخّصك.",

  "footer.tagline": "ممارسة شعارات وهوية بصرية متميّزة بقيادة محمد علاء البنك.",
  "footer.sig": "علامات تحمل معنى. هويات لها شخصية.",
  "footer.end": "مصمَّم بهوية. مصر · أعمل حول العالم.",
  "footer.rights": "© 2026 BLACK-MAK",

  "case.back": "العودة للأعمال",
  "case.behance": "شاهد على Behance",
  "case.startTitle": "عندك مشروع مشابه؟",
  "case.startHeading": "هيا نبني علامتك.",
  "case.startCta": "ابدأ مشروعك",
  "case.more": "مشاريع أخرى",
  "case.prev": "السابق",
  "case.next": "التالي",

  "wa.msg": "مرحبًا محمد، وجدت BLACK-MAK وأود مناقشة مشروع علامة. إليك ملخص موجز: ",

  "why.index": "02 / لماذا BLACK-MAK",
  "why.title": "ما يجعل<br/><em>BLACK-MAK مختلفًا.</em>",
  "why.note":
    "أكثر من 12 سنة في تصميم علامات يجب أن تعمل في العالم الحقيقي — من أنظمة الهوية والكاليجرافي إلى اللوحات والتطبيقات الكبيرة.",
  "why.p1title": "متخصص في الهوية",
  "why.p1text": "الشعار والهوية البصرية هما جوهر الممارسة — لا خدمة واحدة بين عشرات.",
  "why.p2title": "كاليجرافي عربي + لاتيني",
  "why.p2text": "الكاليجرافي الثنائي يُصمم كلغة بصرية واحدة متماسكة — لا نظامين منفصلين.",
  "why.p3title": "تفكير واقعي",
  "why.p3text": "كل علامة تُدرس من حيث الحجم وإعادة الإنتاج واللوحات والطباعة والاستخدام الرقمي.",
  "why.p4title": "أكثر من 12 سنة ممارسة",
  "why.p4text": "عملية صاغها سنوات من عمل العملاء الفعلي — لا مشاريع عروض فقط.",
  "why.p1proof": "أكثر من 50 شعارًا وهوية تم تسليمها",
  "why.p2proof": "أنظمة ثنائية اللغة مصممة كلغة واحدة",
  "why.p3proof": "خبرة اللوحات والصيغ الكبيرة",
  "why.p4proof": "ممارسة منذ 2014",

  "phil.index": "فلسفة التصميم",
  "phil.title": "الشعار ليس زينة.<br/><em>إنه أداة تعريف.</em>",
  "phil.text":
    "الهدف ليس أن تبدو العلامة مبهرة في عرض تقديمي. الهدف هو خلق شيء مميز بما يكفي ليُتعرف عليه، ومرن بما يكفي ليُستخدم في كل مكان، وذو معنى بما يكفي لينتمي إلى العمل الذي يقف خلفه.",

  "biling.index": "عربي + لاتيني",
  "biling.title": "مبني للعربية.<br/>مبني للاتينية.<br/><em>مبني ليعملا معًا.</em>",
  "biling.text":
    "أصمم هويات ثنائية اللغة حيث يبدو الكاليجرافي العربي واللاتيني لغة بصرية واحدة متماسكة — لا نظامين منفصلين.",

  "bts.index": "مصمم ما وراء الشاشة",
  "bts.title": "الهوية القوية يجب أن تنجو من أكثر من موك-أب عرض.",
  "bts.text":
    "يجب أن تعمل على 24 بكسل، وعلى التغليف، وعلى اللوحات، وبأحادي اللون، ومن مسافة. سنوات العمل الخارجي والصيغ الكبيرة بنت هذا الحسّ في كل علامة أرسمها.",

  "work.cta.line": "أعجبك ما ترى؟<br/><em>علامتك تستحق نفس مستوى التفكير.</em>",
  "work.cta.btn": "ابدأ مشروع علامة",
};

type Lang = "en" | "ar";

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => EN[k] ?? k });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("bm-lang") as Lang | null;
    if (saved === "ar" || saved === "en") {
      setLangState(saved);
    } else {
      const n = (navigator.language || "en").toLowerCase();
      const detected: Lang = n.indexOf("ar") === 0 ? "ar" : "en";
      setLangState(detected);
      try {
        localStorage.setItem("bm-lang", detected);
      } catch {}
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("bm-lang", l);
    } catch {}
  }, []);

  const t = useCallback((k: string) => (lang === "ar" ? AR[k] ?? EN[k] ?? k : EN[k] ?? k), [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
