// Single source of truth for external links + site constants.
// NOTE: domain + BASE follow the current deploy target. For the GitHub Pages
// preview these point at the project sub-path; to launch on badrshaqer.com,
// set domain back to 'https://badrshaqer.com' and base to '/' in astro.config.
export const SITE = {
  domain: 'https://zaka33333-hash.github.io',
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
// Paths carry the deploy base (import.meta.env.BASE_URL, e.g. '/badrshaqer-website/'
// on Pages or '/' at root) so links work wherever the site is hosted.
const B = import.meta.env.BASE_URL; // ends with '/'
export const PATHS = {
  home: { ar: B, en: `${B}en/` },
  story: { ar: `${B}story/`, en: `${B}en/story/` },
  articles: { ar: `${B}articles/`, en: `${B}en/articles/` },
  book: { ar: `${B}book/`, en: `${B}en/book/` },
  consultation: { ar: `${B}consultation/`, en: `${B}en/consultation/` },
  programConsultant: { ar: `${B}programs/become-a-consultant/`, en: `${B}en/programs/become-a-consultant/` },
  programSystemize: { ar: `${B}programs/systemize-your-business/`, en: `${B}en/programs/systemize-your-business/` },
  apply: { ar: `${B}apply/`, en: `${B}en/apply/` },
};

export const other = (lang) => (lang === 'ar' ? 'en' : 'ar');
