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
  "nav.cta": "Start a Project",
  "lang.toggle": "العربية",

  "hero.kicker": "BLACK-MAK® / LOGO & VISUAL IDENTITY",
  "hero.title": "Marks that work.<br/>Identities that last.",
  "hero.lede":
    "Logo and visual identity design for businesses that need to be recognized, remembered, and trusted — in Arabic, Latin, and every surface that matters.",
  "hero.work": "View selected work",
  "hero.cta": "Start a project",
  "hero.sideLabel": "The practice",
  "hero.sideTitle": "Strategy, craft & real-world application.",
  "hero.sideText":
    "Arabic & Latin typography, identity systems, and applied design — built to survive the street, not just the screen.",
  "hero.scroll": "Scroll to explore",
  "hero.cardLabel": "BLACK-MAK / DIRECT CONTACT",
  "hero.role": "Logo & Visual Identity Designer",
  "hero.location": "New Valley, Egypt",
  "hero.world": "Working worldwide",
  "hero.experience": "12+ years of practice",

  "signal.1": "01 / STRATEGY BEFORE SHAPE",
  "signal.2": "02 / BUILT FOR REAL SCALE",
  "signal.3": "03 / ARABIC + LATIN FLUENCY",
  "signal.4": "04 / WORLDWIDE COLLABORATION",

  "work.index": "01 / SELECTED WORK",
  "work.title": "Work that holds<br/><em>its own.</em>",
  "work.note":
    "A focused selection of logo design, typography, identity systems, and applied communication. Every project starts with a question: what should this mark make people feel?",
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
  "statement.cta": "Build your mark",

  "services.index": "02 / SERVICES",
  "services.title": "What I<br/><em>build.</em>",
  "services.note":
    "Focused services, deliberately few. Depth over breadth — from strategy to the final brand system.",
  "services.s1name": "Logo Design",
  "services.s1desc":
    "Distinctive marks engineered around your brand's story, built to work at any size, in any language.",
  "services.s2name": "Visual Identity Systems",
  "services.s2desc":
    "Logo, color, type, guidelines, and applications that keep a brand consistent across every touchpoint.",
  "services.s3name": "Arabic & Latin Typography",
  "services.s3desc":
    "Custom wordmarks, calligraphic letterforms, and bilingual lockups where typography becomes the identity.",
  "services.s4name": "Applied Design & Outdoor",
  "services.s4desc":
    "Signage, banners, print, and large-format applications — built for distance, readability, and real-world impact.",
  "services.s5name": "Custom Digital Brand Experience",
  "services.s5desc":
    "Brand microsites and digital portfolios designed around your visual identity — available for select projects.",

  "about.index": "03 / THE DESIGNER",
  "about.title": "Behind<br/><em>the mark.</em>",
  "about.note":
    "A designer with a street-level understanding of how identity behaves in the real world.",
  "about.lede":
    "I'm <strong>Muhamed Alaa Elbank</strong> — a Logo &amp; Visual Identity Designer who turns business visions into recognizable, memorable identities with clarity, character, and staying power.",
  "about.p1":
    "My background spans logo design, Arabic & Latin typography, brand identity systems, and outdoor advertising. Years on signs, streets, and large-format applications taught me that a good mark must survive the real world — not just a presentation board.",
  "about.p2":
    "I work locally in Egypt and worldwide, in Arabic and English, with an AI-augmented creative workflow that speeds up exploration without replacing the designer's judgment.",
  "about.stat1": "Years of practice",
  "about.stat2": "Logos delivered",
  "about.stat3": "Client satisfaction",
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
    "Deep dive into typographic logos and full brand systems. Published collections on Behance; clients across MENA and Europe.",
  "journey.4year": "2024 — Today",
  "journey.4title": "BLACK-MAK",
  "journey.4text":
    "A dedicated practice serving clients worldwide — Arabic & Latin marks, brand systems, and a creative workflow built for precision.",
  "journey.tool1": "Adobe Illustrator",
  "journey.tool2": "Adobe Photoshop",
  "journey.tool4": "AI-assisted",

  "process.index": "04 / PROCESS",
  "process.title": "From question<br/><em>to mark.</em>",
  "process.note":
    "A clear process keeps the work focused, collaborative, and moving forward — so you always know what's next.",
  "process.1title": "Discover",
  "process.1text":
    "We start with your business, audience, and goals. You share the brief, I ask the right questions — then we align on direction before any design begins.",
  "process.2title": "Concept",
  "process.2text":
    "Research, sketches, and multiple original directions — each rooted in strategy, not decoration. You review concepts and choose the strongest path.",
  "process.3title": "Refine",
  "process.3text":
    "The chosen direction is refined in form, proportion, color, and type. You see it applied across real formats — business cards, signage, packaging, digital.",
  "process.4title": "Deliver",
  "process.4text":
    "A complete package: editable files, print-ready formats, web assets, and a brand guideline document — everything you need to use the identity with confidence.",

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

  "pricing.index": "06 / INVESTMENT",
  "pricing.title": "Clear scope.<br/><em>Clear start.</em>",
  "pricing.note":
    "Projects from, not fixed packages. Every engagement is scoped to your specific needs — final quote after a short conversation.",
  "pricing.starting": "projects from",
  "pricing.featured": "MOST COMPLETE",
  "pricing.save": "",
  "pricing.offer": "LIMITED PROJECT CAPACITY",
  "pricing.endsIn": "Currently accepting",
  "pricing.1name": "Logo Design",
  "pricing.1a": "2–3 original concepts",
  "pricing.1b": "3 refinement rounds",
  "pricing.1c": "Editable AI · PDF · PNG · SVG",
  "pricing.1d": "1–2 weeks",
  "pricing.2name": "Typographic / Calligraphy Logo",
  "pricing.2a": "Custom-drawn letterforms",
  "pricing.2b": "Arabic & Latin lockups",
  "pricing.2c": "2 concepts + refinement",
  "pricing.2d": "1–2 weeks",
  "pricing.3name": "Full Visual Identity",
  "pricing.3a": "Logo system + color + type",
  "pricing.3b": "Brand guidelines document",
  "pricing.3c": "Applied design set",
  "pricing.3d": "3–4 weeks",
  "pricing.4name": "Outdoor & Applied Design",
  "pricing.4a": "Signage, banners, print",
  "pricing.4b": "Bold, distance-readable",
  "pricing.4c": "Print-ready production files",
  "pricing.4d": "1–2 weeks",

  "payment.index": "07 / PAYMENT",
  "payment.title": "Payment<br/><em>after approval.</em>",
  "payment.note":
    "After the proposal is approved, choose the payment method that suits you. Tap any value to copy it.",
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
  "faq.1q": "How long does a logo take?",
  "faq.1a":
    "A logo project typically runs 1–2 weeks; a full identity system 3–4 weeks. Rush delivery is possible when the schedule allows.",
  "faq.2q": "What do I receive?",
  "faq.2a":
    "A complete package: editable AI, print-ready PDF, web-optimized PNG/SVG, plus a short usage guide.",
  "faq.3q": "Do you work outside Egypt?",
  "faq.3a":
    "Yes. I work worldwide in Arabic and English with communication over WhatsApp or email.",

  "who.index": "05 / WHO I WORK WITH",
  "who.title": "Brands that<br/><em>mean it.</em>",
  "who.note":
    "I work with founders, startups, and businesses who need a real identity — not just a quick logo. Serious projects that require strategy, craft, and a mark that lasts.",
  "who.founders": "Founders",
  "who.startups": "Startups",
  "who.retail": "Retail & Food",
  "who.agencies": "Agencies",
  "who.restaurants": "Restaurants",
  "who.creative": "Creative Brands",
  "who.closing":
    "If your project needs an identity that works in the real world — on signage, packaging, digital, and everywhere your brand appears — let's talk.",

  "contact.index": "09 / START A PROJECT",
  "contact.title": "Tell me what<br/><em>you're building.</em>",
  "contact.note":
    "A short brief is enough to start. We discuss, I propose, then we begin.",
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
  "form.contact": "WhatsApp / preferred contact *",
  "form.contactPh": "+20 — or your preferred channel",
  "form.type": "Project type *",
  "form.opt1": "Logo Design",
  "form.opt2": "Visual Identity System",
  "form.opt3": "Arabic / Latin Typography",
  "form.opt4": "Applied Design / Outdoor",
  "form.opt5": "Custom Digital Experience",
  "form.budget": "Investment range",
  "form.budgetPh": "e.g. $500–$1,000",
  "form.budgetOpt1": "Under $300",
  "form.budgetOpt2": "$300–$600",
  "form.budgetOpt3": "$600–$1,500",
  "form.budgetOpt4": "$1,500+",
  "form.budgetOpt5": "Not sure yet",
  "form.msg": "Project brief *",
  "form.msgPh": "A sentence or two about the brand, the goal, and why now.",
  "form.submit": "Send inquiry",
  "form.sent": "Thanks — opening WhatsApp with your brief.",

  "footer.tagline": "A premium logo & visual identity practice by Muhamed Alaa Elbank.",
  "footer.end": "Designed with intent. New Valley, Egypt.",
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
  "nav.cta": "ابدأ مشروعك",
  "lang.toggle": "EN",

  "hero.kicker": "BLACK-MAK® / ممارسة تصميم",
  "hero.title": "علامات تحمل معنى.<br/>وهويات لها شخصية.",
  "hero.lede":
    "تصميم شعارات وهويات بصرية للأعمال التي تريد أن تُعرَف، وتُتذكّر، وتُؤخذ بجدية.",
  "hero.work": "استعرض الأعمال المختارة",
  "hero.cta": "ابدأ مشروعك",
  "hero.sideLabel": "الممارسة",
  "hero.sideTitle": "دقة، مفهوم وشخصية.",
  "hero.sideText":
    "شعارات عربية ولاتينية، وأنظمة هوية، وتصميم تطبيقي تشكّلها أكثر من 12 سنة في العالم الحقيقي.",
  "hero.scroll": "مرّر للاستكشاف",
  "hero.cardLabel": "BLACK-MAK / تواصل مباشر",
  "hero.role": "مصمم شعارات وهوية بصرية",
  "hero.location": "الوادي الجديد، مصر",
  "hero.world": "أعمل مع عملاء حول العالم",
  "hero.experience": "أكثر من 12 سنة خبرة",

  "signal.1": "01 / الاستراتيجية قبل الشكل",
  "signal.2": "02 / مصممة للمقاسات الحقيقية",
  "signal.3": "03 / خبرة عربية ولاتينية",
  "signal.4": "04 / تعاون حول العالم",

  "work.index": "01 / أعمال مختارة",
  "work.title": "أعمال تثبت<br/><em>حضورها.</em>",
  "work.note":
    "مختارات مركّزة من تصميم الشعارات، والتايبوغرافي، وأنظمة الهوية، والتواصل البصري التطبيقي. كل مشروع يبدأ بسؤال: ماذا يجب أن يجعل هذا الشعار الناس يشعرون؟",
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

  "services.index": "02 / الخدمات",
  "services.title": "ما الذي<br/><em>أبنيه.</em>",
  "services.note": "خدمات مركّزة وقِصَرُها مقصود. العمق قبل الاتساع — من الاستراتيجية إلى نظام الهوية الكامل.",
  "services.s1name": "تصميم شعار",
  "services.s1desc": "علامات مميّزة مبنية حول قصة علامتك التجارية، تعمل بكل مقاس وبأي لغة.",
  "services.s2name": "أنظمة الهوية البصرية",
  "services.s2desc": "شعار، ألوان، خط، دليل هوية وتطبيقات تحافظ على اتساق العلامة في كل لمسة.",
  "services.s3name": "الخط العربي واللاتيني",
  "services.s3desc": "كلمات مرسومة يدويًا وحروف خطّية وقفل ثنائي اللغة حيث يصبح الخط هو الهوية.",
  "services.s4name": "التصميم التطبيقي والخارجي",
  "services.s4desc": "لوحات، شعارات، مطبوعات وتطبيقات كبيرة الحجم — مصمّمة للمسافة والوضوح والأثر.",
  "services.s5name": "تجربة رقمية مخصّصة للعلامة",
  "services.s5desc": "مواقع ومحفّلات رقمية مصمّمة حول هويتك البصرية — متاحة للمشاريع المختارة.",

  "about.index": "03 / المصمم",
  "about.title": "وراء<br/><em>العلامة.</em>",
  "about.note": "مصمم بفهمٍ ميداني لكيفية تصرف الهوية في العالم الحقيقي.",
  "about.lede":
    "أنا <strong>محمد علاء البنك</strong> — مصمم شعارات وهوية بصرية يحوّل رؤى الأعمال إلى هويات يتعرّف عليها الناس ويثقون بها، بوضوح وشخصية وبقاء.",
  "about.p1":
    "خلفيتي تمتد بين تصميم الشعارات، الخط العربي واللاتيني، أنظمة الهوية التجارية، والإعلانات الخارجية. سنوات على اللوحات والشوارع والتطبيقات كبيرة الحجم علّمتني أن العلامة الجيدة يجب أن تنجو في العالم الحقيقي لا على لوحة العرض فقط.",
  "about.p2":
    "أعمل محليًا في مصر وحول العالم، بالعربية والإنجليزية، بأسلوب عمل إبداعي معزَّز بالذكاء الاصطناعي يسرّع الاستكشاف دون أن يحل محل حكم المصمم.",
  "about.stat1": "سنوات من الخبرة",
  "about.stat2": "شعار تم تسليمها",
  "about.stat3": "رضا العملاء",
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
    "غوص عميق في الشعارات التايبوغرافية وأنظمة الهوية الكاملة. مجموعات منشورة على Behance وعملاء في الشرق الأوسط وأوروبا.",
  "journey.4year": "2024 — اليوم",
  "journey.4title": "BLACK-MAK",
  "journey.4text":
    "ممارسة مخصّصة لخدمة العملاء حول العالم — علامات عربية ولاتينية، أنظمة هوية وأسلوب عمل إبداعي مبني للدقة.",
  "journey.tool1": "Adobe Illustrator",
  "journey.tool2": "Adobe Photoshop",
  "journey.tool4": "مدعوم بالذكاء الاصطناعي",

  "process.index": "04 / العملية",
  "process.title": "من سؤال<br/><em>إلى علامة.</em>",
  "process.note": "عملية واضحة تبقي العمل مركّزًا وتعاونيًا ومتقدّمًا — لتعرف دائمًا ما الخطوة التالية.",
  "process.1title": "اكتشاف",
  "process.1text": "نبدأ بعملك وجمهورك وأهدافك. تشارك البريف، وأطرح الأسئلة الصحيحة — ثم نتفق على الاتجاه قبل أي تصميم.",
  "process.2title": "مفهوم",
  "process.2text": "بحث، رسومات، واتجاهات أصلية متعددة — كل منها متجذر في استراتيجية لا زينة. تراجع المفاهيم وتختار أقوى مسار.",
  "process.3title": "صقل",
  "process.3text": "الاتجاه المختار يُنقّى في الشكل والنسبة واللون والخط. تراه مطبقًا على صيغ حقيقية: بطاقات عمل، لوحات، تغليف، رقمي.",
  "process.4title": "تسليم",
  "process.4text": "حزمة كاملة: ملفات قابلة للتعديل، صيغ جاهزة للطباعة، أصول رقمية، ووثيقة دليل هوية — كل ما تحتاجه لاستخدام الهوية بثقة.",

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

  "pricing.index": "06 / الاستثمار",
  "pricing.title": "نطاق واضح.<br/><em>بداية واضحة.</em>",
  "pricing.note": "مشاريع من، ليست باقات ثابتة. كل مشروع يُحدد حسب احتياجاته — عرض دقيق بعد حديث قصير.",
  "pricing.starting": "مشاريع من",
  "pricing.featured": "الأكثر اكتمالًا",
  "pricing.save": "",
  "pricing.offer": "سعة مشاريع محدودة",
  "pricing.endsIn": "نقبل حاليًا",
  "pricing.1name": "تصميم شعار",
  "pricing.1a": "2–3 مفاهيم أصلية",
  "pricing.1b": "3 جولات صقل",
  "pricing.1c": "ملفات قابلة للتعديل · PDF · PNG · SVG",
  "pricing.1d": "1–2 أسبوع",
  "pricing.2name": "شعار تايبوغرافي / خطي",
  "pricing.2a": "حرفات مرسومة يدويًا",
  "pricing.2b": "قفل عربي ولاتيني",
  "pricing.2c": "مفهومان + صقل",
  "pricing.2d": "1–2 أسبوع",
  "pricing.3name": "هوية بصرية كاملة",
  "pricing.3a": "نظام شعار + ألوان + خط",
  "pricing.3b": "وثيقة دليل الهوية",
  "pricing.3c": "مجموعة تطبيقات",
  "pricing.3d": "3–4 أسابيع",
  "pricing.4name": "التصميم التطبيقي والخارجي",
  "pricing.4a": "لوحات، شعارات، مطبوعات",
  "pricing.4b": "جريء ومقروء من بعيد",
  "pricing.4c": "ملفات إنتاج جاهزة",
  "pricing.4d": "1–2 أسبوع",

  "payment.index": "07 / الدفع",
  "payment.title": "الدفع<br/><em>بعد الموافقة.</em>",
  "payment.note": "بعد الموافقة على العرض، اختر وسيلة الدفع الأنسب لك. اضغط أي قيمة لنسخها.",
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
  "faq.1q": "كم يستغرق تصميم الشعار؟",
  "faq.1a":
    "مشروع الشعار عادةً 1–2 أسبوع؛ ونظام الهوية الكامل 3–4 أسابيع. التسليم العاجل ممكن حسب الجدول.",
  "faq.2q": "ماذا أستلم؟",
  "faq.2a":
    "حزمة كاملة: AI قابل للتحرير، PDF جاهز للطباعة، PNG/SVG محسّن للويب، مع دليل استخدام مختصر.",
  "faq.3q": "هل تعمل خارج مصر؟",
  "faq.3a": "نعم. أعمل حول العالم بالعربية والإنجليزية عبر واتساب أو البريد.",

  "who.index": "05 / لمن أعمل",
  "who.title": "علامات<br/><em>تقدّم negocioها.</em>",
  "who.note":
    "أعمل مع مؤسسين وشركات ومشاريع تحتاج هوية حقيقية — لا مجرد شعار سريع. مشاريع جادة تحتاج استراتيجية وحرفة وعلامة تدوم.",
  "who.founders": "مؤسّسون",
  "who.startups": "مشاريع ناشئة",
  "who.retail": "تجزئة ومطاعم",
  "who.agencies": "وكالات",
  "who.restaurants": "مطاعم",
  "who.creative": "علامات إبداعية",
  "who.closing":
    "إذا كان مشروعك يحتاج هوية تعمل في العالم الحقيقي — على لوحات وتغليف ورقمي وفي كل مكان تظهر فيه علامتك — لنتحدث.",

  "contact.index": "09 / ابدأ مشروعًا",
  "contact.title": "أخبرني عمّا<br/><em>تبنيه.</em>",
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
  "form.opt1": "تصميم شعار",
  "form.opt2": "نظام هوية بصرية",
  "form.opt3": "خط عربي / لاتيني",
  "form.opt4": "تصميم تطبيقي / خارجي",
  "form.opt5": "تجربة رقمية مخصّصة",
  "form.budget": "نطاق الاستثمار",
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
  "footer.end": "مصمَّم بهوية. الوادي الجديد، مصر.",
  "footer.rights": "© 2026 BLACK-MAK",

  "case.back": "العودة للأعمال",
  "case.behance": "شاهد على Behance",
  "case.startTitle": "عندك مشروع مشابه؟",
  "case.startHeading": "هيا نبني علامتك.",
  "case.startCta": "ابدأ مشروعك",
  "case.more": "مشاريع أخرى",
  "case.prev": "السابق",
  "case.next": "التالي",

  "wa.msg": "مرحبًا BLACK-MAK، أود بدء مشروع. إليك ملخّص موجز: ",
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
