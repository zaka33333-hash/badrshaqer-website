// JSON-LD builders for page-specific structured data.
import { SITE, PATHS } from './site.js';

const PERSON_ID = `${SITE.domain}/#badr`;

export const bookLd = (lang) => ({
  '@type': 'Book',
  name: lang === 'ar' ? 'كيف تبيع كتاجر المخدرات' : 'How to Sell Like a Drug Dealer (كيف تبيع كتاجر المخدرات)',
  author: { '@id': PERSON_ID },
  inLanguage: 'ar',
  datePublished: '2025',
  url: SITE.domain + PATHS.book[lang],
  offers: { '@type': 'Offer', url: SITE.bookBuy, availability: 'https://schema.org/InStock' },
});

export const courseLd = (lang, program) => ({
  '@type': 'Course',
  name:
    program === 'consultant'
      ? lang === 'ar' ? 'برنامج: كن مستشارا' : 'Program: Become a Consultant'
      : lang === 'ar' ? 'برنامج: نظم شركتك' : 'Program: Systemize Your Business',
  description:
    program === 'consultant'
      ? lang === 'ar'
        ? 'حول خبرتك إلى مشروع استشاري له عرض وسعر وعملاء.'
        : 'Turn your expertise into a consulting business with an offer, a price, and clients.'
      : lang === 'ar'
        ? 'ابن الأنظمة التي تجعل شركتك تعمل بدونك.'
        : 'Build the systems that let your company run without you.',
  provider: { '@type': 'Person', '@id': PERSON_ID },
  inLanguage: lang,
});

export const profileLd = (lang) => ({
  '@type': 'ProfilePage',
  mainEntity: { '@id': PERSON_ID },
  inLanguage: lang,
  url: SITE.domain + PATHS.story[lang],
});

export const collectionLd = (lang) => ({
  '@type': 'CollectionPage',
  name: lang === 'ar' ? 'المقالات · بدر شاكر' : 'Articles · Badr Shaqer',
  about: { '@id': PERSON_ID },
  inLanguage: lang,
  url: SITE.domain + PATHS.articles[lang],
});

export const serviceLd = (lang) => ({
  '@type': 'Service',
  name: lang === 'ar' ? 'استشارة أعمال 1 لـ 1' : '1:1 Business Consulting',
  provider: { '@id': PERSON_ID },
  serviceType: lang === 'ar' ? 'استشارات أعمال' : 'Business consulting',
  url: SITE.domain + PATHS.consultation[lang],
  offers: { '@type': 'Offer', url: SITE.calendly },
});

// Almobadir — the publication Badr founds/writes; declared once so the
// Person node has a credible organizational anchor.
export const orgLd = () => ({
  '@type': 'Organization',
  '@id': `${SITE.domain}/#almobadir`,
  name: 'Almobadir · المبادر',
  url: SITE.almobadir,
  founder: { '@id': PERSON_ID },
  sameAs: [SITE.instagram, SITE.x, SITE.tiktok],
});

// FAQPage from a program's "questions this answers" pillars (head = question,
// body = answer) — eligible for FAQ rich results.
export const faqLd = (pillars) => ({
  '@type': 'FAQPage',
  mainEntity: pillars.map((p) => ({
    '@type': 'Question',
    name: p.head,
    acceptedAnswer: { '@type': 'Answer', text: p.body },
  })),
});
