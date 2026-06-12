// Home page copy. Blocks marked APPROVED are verbatim from the live site
// and must not be edited. New strings follow the same operator register.
import { PATHS, SITE } from '../site.js';

export const home = {
  ar: {
    meta: {
      title: 'بدر شاكر · مستشار المؤسسين',
      description:
        'بدر شاكر · مستشار المؤسسين. أفكك شركتك حتى أرى أين تضيع الإيرادات، ثم أعطيك خطة واضحة للوصول إلى مليونك الأول. استشارة أعمال 1 لـ 1 · كتاب.',
    },

    // 02 — statement (light)
    statement: {
      eyebrow: 'عشر سنوات · حقيقة واحدة',
      head: [
        { text: '10 سنوات وأنا أجعل ', em: false },
        { text: 'المؤسسين الأثرياء', em: true, cursor: 'VIEW', hoverReveal: '/assets/portrait-1.webp' },
        { text: ' أكثر ثراء.', em: false },
      ],
      deck: 'ليس تسويقا أعلى صوتا، بل أولويات أوضح. الجزء الممل هو حيث يختبئ المال.',
    },

    // 03 — promise (dark) · APPROVED
    promise: {
      overline: 'بدر شاكر · مستشار المؤسسين',
      head: [
        { text: 'من ', em: false },
        { text: 'الصفر', em: true },
        { text: ' إلى ', em: false, br: true },
        { text: 'مليونك الأول.', em: true },
      ],
      body: 'أفكك شركتك حتى أرى أين تضيع الإيرادات. بعدها أعطيك خطة واضحة، وترتيب الأولويات، ومتابعة تبقيك على الطريق إلى مليونك الأول.',
      credentials: ['بكالوريوس إدارة أعمال', 'ماجستير تسويق', '+10 سنوات'],
      ctaBook: { label: 'احجز جلسة استشارية', href: SITE.calendly },
      ctaRead: { label: 'اقرأ الكتاب', href: PATHS.book.ar },
      storyLink: { label: 'قصتي', href: PATHS.story.ar },
    },

    // 04 — services hub (dark)
    services: {
      headPrimary: 'أنظمة مجربة تنقلك من حيث أنت إلى حيث تريد أن تصل.',
      deck: 'مستشار في بناء المشاريع الاستشارية والتدريبية · رائد أعمال وكاتب.',
      cards: [
        {
          tag: 'ابدأ معي',
          label: 'احجز استشارة',
          href: PATHS.consultation.ar,
          dot: 'available',
          cursor: 'BOOK',
        },
        {
          tag: 'المقالات',
          label: '150+ مقال في بيع الخبرات',
          href: PATHS.articles.ar,
          cursor: 'READ',
        },
        {
          tag: 'اعمل معي',
          label: 'خدماتي والباقات',
          href: PATHS.programConsultant.ar,
          cursor: 'VIEW',
        },
      ],
    },

    // 05 — proof (light) · APPROVED
    proof: {
      head: [
        { text: 'الأرقام التي بناها ', em: false },
        { text: 'الذين عملوا معي.', em: true },
      ],
      deck: 'عشر سنوات داخل مشاكل المؤسسين في كل المنطقة العربية. ضباب ما قبل الإطلاق، ضغط المليون الأول، التوسع متعدد الأسواق. النمط ممل حين تراه: الأولويات السيئة تكلفك أكثر من الأفكار السيئة.',
      numbers: [
        { value: 200, suffix: '+', label: 'مؤسس استشرته 1:1' },
        { value: 3000000, suffix: '+', label: 'قارئ عبر الشبكة' },
        { value: 5000, suffix: '+', label: 'مشترك في النشرة' },
        { value: 10, suffix: '+', label: 'سنوات خبرة' },
      ],
    },

    // 06 — testimonials (light) · APPROVED
    testimonials: {
      label: 'شهادات · بدون أسماء، باتفاق',
      head: 'ماذا يقول الذين عملوا معي؟',
      quotes: [
        {
          text: 'جلسة واحدة مع بدر فككت ستة أشهر من الحيرة. خرجت بأولويات مكتوبة، طبقتها ثلاثة أسابيع، فضاعفنا الإيرادات.',
          name: 'مؤسس · شركة SaaS',
          role: 'الرياض · 2024',
        },
        {
          text: 'قرأت كتاب بدر بجلسة واحدة. غير فهمي للبيع من جذوره. لست أحتاج وكالة تسويق بعد اليوم.',
          name: 'مؤسسة · علامة تجزئة',
          role: 'دبي · 2025',
        },
        {
          text: 'بدر لا يبيعك الحلم. يريك كيف يباع فعلا. هذا بالضبط ما كنت أحتاجه. وفر علي سنوات من الأخطاء.',
          name: 'مؤسس · منصة محتوى',
          role: 'القاهرة · 2024',
        },
      ],
    },

    // 07 — consulting overview (light) · APPROVED
    consulting: {
      head: [
        { text: 'للمؤسسين الذين ملوا ', em: false },
        { text: 'التخمين.', em: true },
      ],
      deck: 'أحضر شركتك، أرقامك، والجزء القبيح. تسعون دقيقة معي على Zoom: نفكك العائق بلا تنميق. خلال 24 ساعة، يصلك الملخص المكتوب بالأولويات.',
      deckStrong: 'طبقه يوم الإثنين.',
      steps: [
        { head: 'تشخيص قبل الجلسة', body: 'ترسل أرقامك، نموذج عملك، والجزء الذي توقف عن العمل. أدرسه كاملا قبل أن نلتقي.' },
        { head: '90 دقيقة على Zoom', body: 'نهجم على أكبر عائق في شركتك. كل إجابة تكشف الطبقة التالية. تخرج بأولويات، لا بخيارات.' },
        { head: 'خلاصة مكتوبة', body: 'خلال 24 ساعة من الجلسة، يصلك ملخص مكتوب: ما اتفقنا عليه، والخطوات، وترتيب تنفيذها.' },
        { head: 'متابعة بعد 30 يوما', body: 'جلسة قصيرة (30 دقيقة) لننظر في التنفيذ ونصحح ما انحرف منه.' },
      ],
      card: {
        tag: 'استشارة أعمال · 1 لـ 1',
        head: 'أدرس الشركة قبل الجلسة. ثم نتعامل مع المشكلة الحقيقية.',
        deck: 'المؤسسون يهدرون شهورا في تسمية الأعراض. أنا أنظر إلى النموذج، السوق، والعائق، ثم أقول لك أيها يستحق الانتباه أولا.',
        meta: [
          { k: 'المدة', v: '90 دقيقة' },
          { k: 'المنصة', v: 'Zoom' },
          { k: 'اللغة', v: 'العربية / الإنجليزية' },
          { k: 'المتابعة', v: '30 يوما' },
        ],
        cta: { label: 'احجز جلستك الآن', href: SITE.calendly },
        more: { label: 'تفاصيل الاستشارة كاملة', href: PATHS.consultation.ar },
      },
    },

    // 08 — book teaser (light) · APPROVED
    book: {
      label: 'الكتاب',
      head: [
        { text: 'كيف ', em: false },
        { text: 'تبيع', em: true },
        { text: ' كتاجر المخدرات.', em: false },
      ],
      subtitle: 'البيع يصير سهلا يوم تتوقف عن عبادة الحملات وتبدأ بفهم الطلب.',
      reasons: [
        'لأن التاجر لا يملك ميزانية تسويق، ولا فريق مبيعات، ولا عرضا تقديميا · ومع ذلك يفهم الطلب أكثر من أكثر المؤسسين الذين يملكون الثلاثة.',
        'لأن الندرة والإدمان وشبكات التوزيع هي ما يحرك سوق الشارع. وأكبر الماركات في العالم تدور على نفس الآلة، بزينة مختلفة.',
        'لأنك بعد هذا الكتاب، سيصير لوم وكالة التسويق على أرقام مبيعاتك تصرفا طفوليا.',
      ],
      cta: { label: 'احصل على نسختك', href: PATHS.book.ar },
      coverTop: ['بدر شاكر', '2025'],
      coverTitle: 'كيف تبيع كتاجر المخدرات.',
      coverBottom: ['كتاب', 'الفصل الأول مجانا'],
    },

    // 09 — why me (full-bleed dark)
    whyMe: {
      intro: 'الشركات تختار العمل معي بسبب',
      head: ['نظرتي', '+ حدسي الحاد'],
      bullets: [
        'أقرأ الشركة قبل أن أتكلم. التشخيص قبل الوصفة.',
        'تخرج من جلستي بأولويات، لا بخيارات.',
        '10 سنوات داخل مشاكل المؤسسين في كل المنطقة العربية.',
      ],
      cta: { label: 'اقرأ قصتي', href: PATHS.story.ar },
    },

    // 10 — almobadir cross-link · APPROVED
    publication: {
      label: 'ما الذي أبنيه حاليا',
      head: [
        { text: 'المبادر · ', em: false },
        { text: 'منشور الأعمال والمال', em: true },
        { text: ' في العالم العربي.', em: false },
      ],
      body: 'المبادر منشوري الشهري للعالم العربي. أكتب لمن يحمل الرواتب، والمخاطر، والقرارات · لا للجمهور الذي ما زال يخطط للبدء.',
      bodyStrong: 'الشبكة: ثلاثة ملايين قارئ، خمسة آلاف مشترك في النشرة الأسبوعية.',
      cta: { label: 'اقرأ العدد الأخير', href: SITE.almobadir },
      stats: ['+3M قارئ', '+5K مشترك'],
    },
  },

  en: {
    meta: {
      title: 'Badr Shaqer · Founder Advisor',
      description:
        'Badr Shaqer · Founder advisor. I take real companies apart until the revenue problem shows itself, then hand the founder a clear plan to seven figures. 1:1 business consulting · a book.',
    },

    statement: {
      eyebrow: 'Ten years · one truth',
      head: [
        { text: '10 years making ', em: false },
        { text: 'rich founders', em: true, cursor: 'VIEW', hoverReveal: '/assets/portrait-1.webp' },
        { text: ' richer.', em: false },
      ],
      deck: 'Not louder marketing — sharper priorities. The boring part is where the money hides.',
    },

    promise: {
      overline: 'Badr Shaqer · Founder Advisor',
      head: [
        { text: 'From ', em: false },
        { text: 'zero', em: true },
        { text: ' to ', em: false, br: true },
        { text: 'seven figures.', em: true },
      ],
      body: 'I take real companies apart until the revenue problem shows itself. Then I give the founder the moves, the order, and the pressure required to get to seven figures.',
      credentials: ['BBA', 'MA Marketing', '10+ years'],
      ctaBook: { label: 'Book a consulting call', href: SITE.calendly },
      ctaRead: { label: 'Read the book', href: PATHS.book.en },
      storyLink: { label: 'my story', href: PATHS.story.en },
    },

    services: {
      headPrimary: "Close the gap between where you are and where you want to be with Badr Shaqer's proven systems.",
      deck: 'Consultant in advisory & training ventures · entrepreneur & writer.',
      cards: [
        { tag: 'Start here', label: 'Book a consultation', href: PATHS.consultation.en, dot: 'available', cursor: 'BOOK' },
        { tag: 'Articles', label: '150+ articles on selling expertise', href: PATHS.articles.en, cursor: 'READ' },
        { tag: 'Work with me', label: 'Services & packages', href: PATHS.programConsultant.en, cursor: 'VIEW' },
      ],
    },

    proof: {
      head: [
        { text: 'The numbers built by ', em: false },
        { text: 'founders who worked with me.', em: true },
      ],
      deck: 'Ten years inside founder problems across MENA. Pre-launch fog, first-million pressure, multi-market expansion. The pattern gets boring once you see it: bad priorities cost more than bad ideas.',
      numbers: [
        { value: 200, suffix: '+', label: 'Founders advised 1:1' },
        { value: 3000000, suffix: '+', label: 'Readers via network' },
        { value: 5000, suffix: '+', label: 'Newsletter subscribers' },
        { value: 10, suffix: '+', label: 'Years experience' },
      ],
    },

    testimonials: {
      label: 'Testimonials · NDA-safe',
      head: 'What founders say after the call.',
      quotes: [
        {
          text: 'One session with Badr cleared up six months of confusion. I left with written priorities, ran them for three weeks, doubled revenue.',
          name: 'Founder · SaaS company',
          role: 'Riyadh · 2024',
        },
        {
          text: "I read Badr's book in one sitting. It changed how I understand selling at the root. I don't need a marketing agency anymore.",
          name: 'Founder · Retail brand',
          role: 'Dubai · 2025',
        },
        {
          text: "Badr doesn't sell you the dream. He shows you the mechanics. That's exactly what I needed. He saved me years of mistakes.",
          name: 'Founder · Content platform',
          role: 'Cairo · 2024',
        },
      ],
    },

    consulting: {
      head: [
        { text: 'For founders ', em: false },
        { text: 'tired of guessing.', em: true },
      ],
      deck: 'Bring the company, the numbers, and the ugly part. Ninety minutes with me on Zoom: we break the constraint down in plain English. Within twenty-four hours, the written priorities land in your inbox.',
      deckStrong: 'Use them Monday.',
      steps: [
        { head: 'Pre-session diagnostic', body: "You send your numbers, your business model, and the part that's stuck. I read all of it before we meet." },
        { head: '90 minutes on Zoom', body: 'We attack the biggest constraint in your company. Each answer exposes the next layer. You leave with priorities, not options.' },
        { head: 'Written roadmap', body: 'Within 24 hours of the call, a written summary lands: what we agreed, the next moves, the order to run them in.' },
        { head: '30-day follow-up', body: 'A short follow-up (30 minutes) to look at execution and correct course where it slipped.' },
      ],
      card: {
        tag: 'Consulting · 1 to 1',
        head: 'I read the business before the call. Then we deal with the real problem.',
        deck: 'Founders waste months naming symptoms. I look at the model, the market, and the blockage, then tell you what deserves attention first.',
        meta: [
          { k: 'Duration', v: '90 min' },
          { k: 'Platform', v: 'Zoom' },
          { k: 'Language', v: 'EN / AR' },
          { k: 'Follow-up', v: '30 days' },
        ],
        cta: { label: 'Book your call now', href: SITE.calendly },
        more: { label: 'Full consultation details', href: PATHS.consultation.en },
      },
    },

    book: {
      label: 'The Book',
      head: [
        { text: 'How to ', em: false },
        { text: 'sell', em: true },
        { text: ' like a drug dealer.', em: false },
      ],
      subtitle: 'Selling gets simple the day you stop worshipping campaigns and start understanding demand.',
      reasons: [
        'Because a dealer has no marketing budget, no sales team, no pitch deck · and still understands demand better than most founders who have all three.',
        'Because scarcity, addiction, and distribution networks run the street market. The biggest brands in the world run on the same machinery, dressed up.',
        'Because after this book, blaming the agency for your sales numbers will feel childish.',
      ],
      cta: { label: 'Get your copy', href: PATHS.book.en },
      note: 'Published in Arabic',
      coverTop: ['Badr Shaqer', '2025'],
      coverTitle: 'How to sell like a drug dealer.',
      coverBottom: ['Book', 'First chapter free'],
    },

    whyMe: {
      intro: 'Companies partner with me because of my',
      head: ['perspective', '+ sharp instincts'],
      bullets: [
        'I read the company before I speak. Diagnosis before prescription.',
        'You leave with priorities, not options.',
        'Ten years inside founder problems across MENA.',
      ],
      cta: { label: 'Read my story', href: PATHS.story.en },
    },

    publication: {
      label: "What I'm building",
      head: [
        { text: 'Almobadir · ', em: false },
        { text: 'a publication of business and finance', em: true },
        { text: ' for the Arab world.', em: false },
      ],
      body: "Almobadir is my monthly publication for the Arab world. I write for people already carrying payroll, risk, and decisions · not the audience that's still planning to start.",
      bodyStrong: 'The network: three million readers, five thousand newsletter subscribers.',
      cta: { label: 'Read the latest issue', href: SITE.almobadir },
      stats: ['3M+ readers', '5K+ subscribers'],
    },
  },
};
