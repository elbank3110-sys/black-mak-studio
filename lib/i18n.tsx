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

  "hero.kicker": "BLACK-MAK® / DESIGN PRACTICE",
  "hero.title": "Marks with meaning.<br/>Identities with character.",
  "hero.lede":
    "Logo and visual identity design for businesses that want to be recognized, remembered, and taken seriously.",
  "hero.work": "View selected work",
  "hero.cta": "Start a project",
  "hero.sideLabel": "The practice",
  "hero.sideTitle": "Precision, concept & character.",
  "hero.sideText":
    "Arabic & Latin marks, identity systems, and applied design shaped by 12+ years in the real world.",
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
    "Focused services, deliberately few. Depth over breadth — from the first sketch to the final file package.",
  "services.s1name": "Logo Design",
  "services.s1desc":
    "Distinctive marks engineered around your brand's story, built to work at any size.",
  "services.s2name": "Minimal Logo Design",
  "services.s2desc":
    "Reduction as a discipline: maximum meaning with minimum form.",
  "services.s3name": "Typographic Logo Design",
  "services.s3desc":
    "Custom-drawn wordmarks and letterforms where typography becomes the identity.",
  "services.s4name": "Brand & Visual Identity",
  "services.s4desc":
    "Logo, color, type, guidelines, and applications that keep a brand consistent everywhere.",
  "services.s5name": "Creative Visual Design",
  "services.s5desc":
    "Campaign visuals, covers, and applied design with a conceptual edge.",

  "about.index": "03 / THE DESIGNER",
  "about.title": "Behind<br/><em>the mark.</em>",
  "about.note":
    "A designer with a street-level understanding of how identity behaves in the real world.",
  "about.lede":
    "I'm <strong>Muhamed Alaa Elbank</strong> — a graphic logo designer who turns business visions into visual identities with clarity, character, and staying power.",
  "about.p1":
    "My background spans logo design, typography, brand identity, and outdoor advertising. Years on signs, streets, and large-format applications taught me that a good mark must survive the real world — not only a presentation board.",
  "about.p2":
    "I work locally in Egypt and worldwide, in Arabic and English, with an AI-assisted workflow that speeds up exploration without replacing the designer's judgment.",
  "about.stat1": "Years of practice",
  "about.stat2": "Logos designed",
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
    "A dedicated practice serving clients worldwide — Arabic & Latin marks, brand systems, and an AI-assisted workflow that speeds up precision work.",
  "journey.tool1": "Adobe Illustrator",
  "journey.tool2": "Adobe Photoshop",
  "journey.tool4": "AI-assisted",

  "process.index": "04 / PROCESS",
  "process.title": "From question<br/><em>to mark.</em>",
  "process.note":
    "A clear process keeps the work focused, collaborative, and moving forward.",
  "process.1title": "Discover",
  "process.1text":
    "Business, audience, ambition. Understanding comes before designing.",
  "process.2title": "Concept",
  "process.2text":
    "Research, sketches, and directions built on strategy — not decoration.",
  "process.3title": "Refine",
  "process.3text":
    "The chosen direction is perfected in form, proportion, and application.",
  "process.4title": "Deliver",
  "process.4text":
    "Every final format you need, with clear guidance to use the identity well.",

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

  "pricing.index": "05 / INVESTMENT",
  "pricing.title": "Clear scope.<br/><em>Clear start.</em>",
  "pricing.note":
    "Starting points, not walls. Every project gets a precise quote after a short conversation.",
  "pricing.starting": "starting from",
  "pricing.featured": "MOST COMPLETE",
  "pricing.save": "SAVE",
  "pricing.offer": "LAUNCH OFFER — LIMITED TIME",
  "pricing.endsIn": "Offer ends in",
  "pricing.1name": "Logo Design",
  "pricing.1a": "2–3 original concepts",
  "pricing.1b": "3 revision rounds",
  "pricing.1c": "AI · PDF · PNG · SVG",
  "pricing.1d": "1–2 weeks",
  "pricing.2name": "Typographic / Calligraphy Logo",
  "pricing.2a": "Custom-drawn letterforms",
  "pricing.2b": "Arabic & Latin lockups",
  "pricing.2c": "2 concepts + refinement",
  "pricing.2d": "1–2 weeks",
  "pricing.3name": "Full Visual Identity",
  "pricing.3a": "Logo system + color + type",
  "pricing.3b": "Brand guidelines",
  "pricing.3c": "Applied design set",
  "pricing.3d": "3–4 weeks",
  "pricing.4name": "Outdoor Advertising",
  "pricing.4a": "Banners & signage",
  "pricing.4b": "Bold, distance-readable",
  "pricing.4c": "Print-ready files",
  "pricing.4d": "1–2 weeks",

  "payment.index": "06 / PAYMENT",
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

  "faq.index": "07 / FAQ",
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

  "contact.index": "08 / START A PROJECT",
  "contact.title": "Tell me what<br/><em>you're building.</em>",
  "contact.note":
    "A short brief is enough to start. We discuss, I propose, then we begin.",
  "contact.wa": "WhatsApp",
  "contact.email": "Email",
  "contact.behance": "Behance",
  "contact.pdf": "Download portfolio (PDF)",
  "form.intro": "SERIOUS INQUIRIES / 01",
  "form.help": "Tell me enough to understand the shape of the problem.",
  "form.name": "Name *",
  "form.namePh": "Your name",
  "form.email": "Email *",
  "form.emailPh": "you@company.com",
  "form.contact": "WhatsApp / preferred contact *",
  "form.contactPh": "+20 — or your preferred channel",
  "form.type": "Project type *",
  "form.opt1": "Logo Design",
  "form.opt2": "Minimal Logo Design",
  "form.opt3": "Typographic Logo Design",
  "form.opt4": "Brand & Visual Identity",
  "form.opt5": "Creative Visual Design",
  "form.opt6": "Outdoor Advertising",
  "form.msg": "Project brief *",
  "form.msgPh": "A sentence or two about the brand and the goal.",
  "form.submit": "Send inquiry",
  "form.sent": "Thanks — opening WhatsApp with your brief.",

  "footer.tagline": "A premium visual design practice by Muhamed Alaa Elbank.",
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
  "services.note": "خدمات مركّزة وقِصَرُها مقصود. العمق قبل الاتساع.",
  "services.s1name": "تصميم شعار",
  "services.s1desc": "علامات مميّزة مبنية حول قصة علامتك التجارية، تعمل بكل مقاس.",
  "services.s2name": "تصميم شعار مينيمال",
  "services.s2desc": "الاختصار انضباط: أقصى معنى بأدنى شكل.",
  "services.s3name": "تصميم شعار تايبوغرافي",
  "services.s3desc": "كلمات وحروف مرسومة يدويًا حيث يصبح الخط هو الهوية.",
  "services.s4name": "هوية بصرية وتجارية",
  "services.s4desc": "شعار، ألوان، خط، دليل هوية وتطبيقات تحافظ على اتساق العلامة في كل مكان.",
  "services.s5name": "تصميم بصري إبداعي",
  "services.s5desc": "محتوى حملات، أغلفة وتصميم تطبيقي بلمسة مفاهيمية.",

  "about.index": "03 / المصمم",
  "about.title": "وراء<br/><em>العلامة.</em>",
  "about.note": "مصمم بفهمٍ ميداني لكيفية تصرف الهوية في العالم الحقيقي.",
  "about.lede":
    "أنا <strong>محمد علاء البنك</strong> — مصمم شعارات جرافيكي يحوّل رؤى الأعمال إلى هويات بصرية بوضوح وشخصية وبقاء.",
  "about.p1":
    "خلفيتي تمتد بين تصميم الشعارات، التايبوغرافي، الهوية التجارية، والإعلانات الخارجية. سنوات على اللوحات والشوارع والتطبيقات كبيرة الحجم علّمتني أن العلامة الجيدة يجب أن تنجو في العالم الحقيقي لا على لوحة العرض فقط.",
  "about.p2":
    "أعمل محليًا في مصر وحول العالم، بالعربية والإنجليزية، بأسلوب عمل مدعوم بالذكاء الاصطناعي يسرّع الاستكشاف دون أن يحل محل حكم المصمم.",
  "about.stat1": "سنوات من الخبرة",
  "about.stat2": "شعارًا صُمم",
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
    "ممارسة مخصّصة لخدمة العملاء حول العالم — علامات عربية ولاتينية، أنظمة هوية وأسلوب عمل مدعوم بالذكاء الاصطناعي يسرّع الدقة.",
  "journey.tool1": "Adobe Illustrator",
  "journey.tool2": "Adobe Photoshop",
  "journey.tool4": "مدعوم بالذكاء الاصطناعي",

  "process.index": "04 / العملية",
  "process.title": "من سؤال<br/><em>إلى علامة.</em>",
  "process.note": "عملية واضحة تبقي العمل مركّزًا وتعاونيًا ومتقدّمًا.",
  "process.1title": "اكتشاف",
  "process.1text": "العمل، الجمهور، الطموح. الفهم يسبق التصميم.",
  "process.2title": "مفهوم",
  "process.2text": "بحث، رسومات، واتجاهات مبنية على استراتيجية لا زينة.",
  "process.3title": "صقل",
  "process.3text": "تتقنُ الاتجاه المختار في الشكل والنسبة والتطبيق.",
  "process.4title": "تسليم",
  "process.4text": "كل صيغة نهائية تحتاجها مع دليل واضح لاستخدام الهوية جيدًا.",

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

  "pricing.index": "05 / الاستثمار",
  "pricing.title": "نطاق واضح.<br/><em>بداية واضحة.</em>",
  "pricing.note": "نقاط انطلاق لا جدران. كل مشروع يحصل على عرض دقيق بعد حديث قصير.",
  "pricing.starting": "تبدأ من",
  "pricing.featured": "الأكثر اكتمالًا",
  "pricing.save": "وفّر",
  "pricing.offer": "عرض إطلاق — لفترة محدودة",
  "pricing.endsIn": "ينتهي العرض خلال",
  "pricing.1name": "تصميم شعار",
  "pricing.1a": "2–3 مفاهيم أصلية",
  "pricing.1b": "3 جولات مراجعة",
  "pricing.1c": "AI · PDF · PNG · SVG",
  "pricing.1d": "1–2 أسبوع",
  "pricing.2name": "شعار تايبوغرافي / خطي",
  "pricing.2a": "حرفات مرسومة يدويًا",
  "pricing.2b": "قفل عربي ولاتيني",
  "pricing.2c": "مفهومان + صقل",
  "pricing.2d": "1–2 أسبوع",
  "pricing.3name": "هوية بصرية كاملة",
  "pricing.3a": "نظام شعار + ألوان + خط",
  "pricing.3b": "دليل هوية",
  "pricing.3c": "مجموعة تطبيقات",
  "pricing.3d": "3–4 أسابيع",
  "pricing.4name": "إعلانات خارجية",
  "pricing.4a": "لوحات وشعارات",
  "pricing.4b": "جريء ومقروء من بعيد",
  "pricing.4c": "ملفات جاهزة للطباعة",
  "pricing.4d": "1–2 أسبوع",

  "payment.index": "06 / الدفع",
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

  "faq.index": "07 / أسئلة",
  "faq.title": "قبل<br/><em>أن نبدأ.</em>",
  "faq.1q": "كم يستغرق تصميم الشعار؟",
  "faq.1a":
    "مشروع الشعار عادةً 1–2 أسبوع؛ ونظام الهوية الكامل 3–4 أسابيع. التسليم العاجل ممكن حسب الجدول.",
  "faq.2q": "ماذا أستلم؟",
  "faq.2a":
    "حزمة كاملة: AI قابل للتحرير، PDF جاهز للطباعة، PNG/SVG محسّن للويب، مع دليل استخدام مختصر.",
  "faq.3q": "هل تعمل خارج مصر؟",
  "faq.3a": "نعم. أعمل حول العالم بالعربية والإنجليزية عبر واتساب أو البريد.",

  "contact.index": "08 / ابدأ مشروعًا",
  "contact.title": "أخبرني عمّا<br/><em>تبنيه.</em>",
  "contact.note": "ملخّص موجز يكفي للبدء. نناقش، أقترح، ثم ننطلق.",
  "contact.wa": "واتساب",
  "contact.email": "البريد",
  "contact.pdf": "حمّل البروفايل (PDF)",
  "contact.behance": "Behance",
  "form.intro": "استفسارات جادّة / 01",
  "form.help": "أخبرني ما يكفي لفهم شكل المشكلة.",
  "form.name": "الاسم *",
  "form.namePh": "اسمك",
  "form.email": "البريد *",
  "form.emailPh": "you@company.com",
  "form.contact": "واتساب / وسيلة التواصل *",
  "form.contactPh": "+20 — أو قناتك المفضّلة",
  "form.type": "نوع المشروع *",
  "form.opt1": "تصميم شعار",
  "form.opt2": "تصميم شعار مينيمال",
  "form.opt3": "تصميم شعار تايبوغرافي",
  "form.opt4": "هوية بصرية وتجارية",
  "form.opt5": "تصميم بصري إبداعي",
  "form.opt6": "إعلانات خارجية",
  "form.msg": "ملخّص المشروع *",
  "form.msgPh": "جملة أو اثنتان عن العلامة والهدف.",
  "form.submit": "أرسل الاستفسار",
  "form.sent": "شكرًا — نفتح واتساب مع ملخّصك.",

  "footer.tagline": "ممارسة تصميم بصرية متميّزة بقيادة محمد علاء البنك.",
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
