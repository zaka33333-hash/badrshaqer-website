// Single source of truth for external links + site constants.
export const SITE = {
  domain: 'https://badrshaqer.com',
  email: 'badr@almobadir.com',
  calendly: 'https://calendly.com/badrshaqer_consulting',
  bookBuy: 'https://zaap.bio/badrshaqer/كيف-تبيع-كتاجر-المخدرات',
  almobadir: 'https://almobadir.com',
  instagram: 'https://instagram.com/badrshaqer',
  x: 'https://x.com/badrshaqer',
  tiktok: 'https://www.tiktok.com/@badrshaqer',
  year: 2026,
};

// Path map: every page exists in both languages. AR is canonical at root.
export const PATHS = {
  home: { ar: '/', en: '/en/' },
  story: { ar: '/story/', en: '/en/story/' },
  articles: { ar: '/articles/', en: '/en/articles/' },
  book: { ar: '/book/', en: '/en/book/' },
  consultation: { ar: '/consultation/', en: '/en/consultation/' },
  programConsultant: { ar: '/programs/become-a-consultant/', en: '/en/programs/become-a-consultant/' },
  programSystemize: { ar: '/programs/systemize-your-business/', en: '/en/programs/systemize-your-business/' },
};

export const other = (lang) => (lang === 'ar' ? 'en' : 'ar');
