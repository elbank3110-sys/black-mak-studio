export type CaseStudy = {
  slug: string;
  cover: string;
  gallery: string[];
  behance?: string;
  en: {
    title: string;
    role: string;
    year: string;
    tags: string;
    summary: string;
    body: string[];
  };
  ar: {
    title: string;
    role: string;
    year: string;
    tags: string;
    summary: string;
    body: string[];
  };
};

export const CASES: CaseStudy[] = [
  {
    slug: "logos-vol-2",
    cover: "/images/work/vol2/vol2-02.jpg",
    gallery: [
      "/images/work/vol2/vol2-02.jpg",
      "/images/work/vol2/vol2-03.jpg",
      "/images/work/vol2/vol2-04.jpg",
      "/images/work/vol2/vol2-06.jpg",
      "/images/work/vol2/vol2-07.jpg",
    ],
    behance: "https://www.behance.net/gallery/181721153/LOGOS-VOL2",
    en: {
      title: "Logo Collection — Vol. II",
      role: "Logo Design · Logotype",
      year: "2023",
      tags: "Logo Design · Logotype · Identity",
      summary:
        "A second volume of marks exploring contrast, geometry, and editorial logotypes for brands across industries.",
      body: [
        "This collection pushes the language of the first volume further — tighter grids, bolder negative space, and logotypes engineered to stay legible from a favicon to a facade.",
        "Each mark begins as a question about the business it represents, then reduces until only the necessary remains.",
      ],
    },
    ar: {
      title: "مجموعة الشعارات — الجزء الثاني",
      role: "تصميم شعار · لوجوتايب",
      year: "2023",
      tags: "تصميم شعار · لوجوتايب · هوية",
      summary:
        "مجلد ثانٍ من العلامات يستكشف التباين والهندسة واللوجوتايب التحريري لعلامات عبر قطاعات متنوعة.",
      body: [
        "تدفع هذه المجموعة لغة المجلد الأول أبعد — شبكات أضيق، مساحات سلبية أجرأ، ولوجوتايب مصمَّم ليظل مقروءاً من أيقونة صغيرة إلى واجهة مبنى.",
        "كل علامة تبدأ بسؤال عن العمل الذي تمثّله، ثم تُختزل حتى يبقى الضروري فقط.",
      ],
    },
  },
  {
    slug: "logos-vol-1",
    cover: "/images/work/vol1/vol1-03.jpg",
    gallery: [
      "/images/work/vol1/vol1-01.jpg",
      "/images/work/vol1/vol1-02.jpg",
      "/images/work/vol1/vol1-03.jpg",
      "/images/work/vol1/vol1-04.jpg",
      "/images/work/vol1/vol1-05.jpg",
      "/images/work/vol1/vol1-06.jpg",
    ],
    behance: "https://www.behance.net/gallery/60219345/LOGOS-VOL-1",
    en: {
      title: "Logo Collection — Vol. I",
      role: "Logo Design",
      year: "2019",
      tags: "Logo Design · Logotype · Identity",
      summary:
        "Foundational studies in monogram, wordmark, and symbolic logo systems built for real-world use.",
      body: [
        "The first collection documents the studio's core method: research, sketch, then refine until the form carries the meaning on its own.",
        "These marks still anchor client identities today — proof that a clear concept outlasts trends.",
      ],
    },
    ar: {
      title: "مجموعة الشعارات — الجزء الأول",
      role: "تصميم شعار",
      year: "2019",
      tags: "تصميم شعار · لوجوتايب · هوية",
      summary:
        "دراسات أساسية في الرمز الأحادي واللوجوتايب وأنظمة الشعارات الرمزية المبنية للاستخدام الحقيقي.",
      body: [
        "يوثّق المجلد الأول منهج الاستوديو الأساسي: بحث، رسم، ثم صقل حتى يحمل الشكل المعنى بذاته.",
        "هذه العلامات ما زالت ترسو هويات العملاء اليوم — دليل أن المفهوم الواضح يصمد أمام الموضة.",
      ],
    },
  },
  {
    slug: "outdoor-advertising",
    cover: "/images/work/banners/ban-06.jpg",
    gallery: [
      "/images/work/banners/ban-01.jpg",
      "/images/work/banners/ban-02.jpg",
      "/images/work/banners/ban-03.jpg",
      "/images/work/banners/ban-04.jpg",
      "/images/work/banners/ban-05.jpg",
      "/images/work/banners/ban-06.jpg",
    ],
    behance: "https://www.behance.net/gallery/37676905/OUTDOOR-ADVERTISING-WORKS-BANNERS",
    en: {
      title: "Outdoor Advertising",
      role: "Applied Design · Campaigns",
      year: "2016 — 2019",
      tags: "Applied Design · Campaigns",
      summary:
        "Large-format signage and campaign visuals built for distance, speed, and street-level readability.",
      body: [
        "Years on retail chains across Egypt taught a simple rule: at 80km/h, only contrast and clarity survive.",
        "Every layout is engineered for the brief glance — bold type, restrained color, and a single readable idea.",
      ],
    },
    ar: {
      title: "الإعلانات الخارجية",
      role: "تصميم تطبيقي · حملات",
      year: "2016 — 2019",
      tags: "تصميم تطبيقي · حملات",
      summary:
        "لوحات كبيرة الحجم وحملات بصرية مصمَّمة للمسافة والسرعة والقراءة من الشارع.",
      body: [
        "سنوات مع سلاسل تجارية في أنحاء مصر علّمت قاعدة بسيطة: عند 80 كم/س، لا ينجو سوى التباين والوضوح.",
        "كل تخطيط مهندَس للنظرة السريعة — خط جريء، لون مُقيّد، وفكرة واحدة مقروءة.",
      ],
    },
  },
  {
    slug: "calligraphi-works",
    cover: "/images/work/calligraphi-work.jpg",
    gallery: ["/images/work/calligraphi-work.jpg"],
    behance: "https://www.behance.net/gallery/67494575/CALLIGRAPHI-WORKS",
    en: {
      title: "CALLIGRAPHY WORK",
      role: "Arabic Calligraphy",
      year: "2020",
      tags: "Arabic Calligraphy · Behance Collection",
      summary:
        "A study of Arabic letterforms — balance, rhythm, and contemporary calligraphic expression.",
      body: [
        "These pieces explore where tradition meets a modern grid: the stroke as both signal and ornament.",
        "Published as a Behance collection, they remain a reference library for the studio's Arabic work.",
      ],
    },
    ar: {
      title: "CALLIGRAPHY WORK",
      role: "خط عربي",
      year: "2020",
      tags: "خط عربي · مجموعة Behance",
      summary:
        "دراسة في الحروف العربية — التوازن والإيقاع والتعبير الخطي المعاصر.",
      body: [
        "تستكشف هذه الأعمال حيث يلتقي التراث بشبكة حديثة: الخط إشارة وزخرفة في آنٍ.",
        "نُشرت كمجموعة على Behance، وتبقى مكتبة مرجعية للأعمال العربية في الاستوديو.",
      ],
    },
  },
  {
    slug: "makeen",
    cover: "/images/work/makeen/makeen-calligraphy.jpg",
    gallery: [
      "/images/work/makeen/makeen-calligraphy.jpg",
      "/images/work/makeen/makeen-02.jpg",
    ],
    behance: "https://www.behance.net/gallery/224445345/MAKEEN",
    en: {
      title: "MAKEEN",
      role: "Arabic Calligraphy · Logotype",
      year: "2022",
      tags: "Arabic Calligraphy · Logotype",
      summary:
        "MAKEEN — a calligraphic identity where the word itself becomes the mark.",
      body: [
        "MAKEEN translates presence and poise; the identity treats the word as both meaning and logo.",
        "Drawn, then systematized, so it works as a stamp, a sign, and a screen.",
      ],
    },
    ar: {
      title: "MAKEEN",
      role: "خط عربي · لوجوتايب",
      year: "2022",
      tags: "خط عربي · لوجوتايب",
      summary:
        "MAKEEN — هوية خطية حيث تصبح الكلمة ذاتها العلامة.",
      body: [
        "MAKEEN تعني الحضور والثبات؛ وتعامل الهوية الكلمة كمعنى وشعار معاً.",
        "مُرسومة ثم مُنظَّمة لتعمل كختم ولافتة وشاشة.",
      ],
    },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
