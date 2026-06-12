// Inner pages copy — Story, Articles, Book, Consultation, Programs.
// Grounded ONLY in approved facts (degrees, years, numbers, book, method).
// Blocks marked OWNER-TODO need the owner's facts before launch; they are
// designed to read complete without inventing claims.
import { PATHS, SITE } from '../site.js';

export const inner = {
  /* ════════════════ STORY ════════════════ */
  story: {
    ar: {
      meta: {
        title: 'قصتي · بدر شاكر',
        description: 'من مقاعد إدارة الأعمال إلى 200+ جلسة استشارية مع مؤسسين في كل المنطقة العربية. هذه القصة كما حدثت، بلا تجميل.',
      },
      hero: {
        overline: 'قصتي',
        head: [
          { text: 'لم أتعلم البيع في قاعة.', em: false, br: true },
          { text: 'تعلمته حيث يحدث.', em: true },
        ],
        deck: 'بكالوريوس إدارة أعمال، ماجستير تسويق، وعشر سنوات بين المؤسسين وأرقامهم. الشهادات أعطتني اللغة. السوق أعطاني الجمل التي تستحق أن تقال.',
      },
      chapters: [
        {
          num: '01',
          title: 'البداية: اللغة قبل السوق',
          body: 'درست إدارة الأعمال، ثم أكملت ماجستير التسويق. خرجت من الجامعة وأنا أحمل المصطلحات كلها: الشريحة المستهدفة، رحلة العميل، القمع التسويقي. ثم قابلت أول مؤسس حقيقي، فاكتشفت أن شركته لا تقرأ الكتب التي قرأتها.',
          pull: 'النظرية تشرح السوق للسوق. المؤسس يحتاج من يشرح شركته له.',
        },
        {
          num: '02',
          title: 'عشر سنوات داخل المشاكل',
          body: 'من يومها وأنا في نفس الغرفة: مؤسس، أرقام، وعائق لا يتحرك. ضباب ما قبل الإطلاق، ضغط المليون الأول، التوسع متعدد الأسواق. في كل المنطقة العربية، من الخليج إلى شمال إفريقيا. بعد أول مئة جلسة يصير النمط مملا: الأولويات السيئة تكلف أكثر من الأفكار السيئة.',
          pull: 'أكثر من 200 مؤسس جلسوا قبالتي. المشاكل تتغير أسماؤها ولا تتغير جذورها.',
        },
        {
          num: '03',
          title: 'الكتاب والمبادر: العمل العلني',
          body: 'كتبت «كيف تبيع كتاجر المخدرات» لأن أصدق درس في فهم الطلب لا يأتي من حملة إعلانية. وبنيت «المبادر» منشورا شهريا للعالم العربي: ثلاثة ملايين قارئ عبر الشبكة، وخمسة آلاف مشترك في النشرة. الكتابة هي عملي العلني. الاستشارة هي الغرفة الخاصة.',
          pull: 'المبادر هو العمل العلني. هذه الصفحة هي الغرفة الخاصة.',
        },
        {
          num: '04',
          title: 'اليوم: طريقة واحدة، بلا تنميق',
          body: 'اليوم أعمل بطريقة واحدة: أدرس الشركة قبل الجلسة، نهجم على أكبر عائق في تسعين دقيقة، يصلك ملخص مكتوب خلال 24 ساعة، ثم نراجع التنفيذ بعد ثلاثين يوما. تخرج بأولويات، لا بخيارات. هذا كل شيء، وهذا يكفي.',
          pull: null,
        },
      ],
      credBand: {
        label: 'بطاقة التعريف',
        items: [
          { k: 'الدراسة', v: 'بكالوريوس إدارة أعمال · ماجستير تسويق' },
          { k: 'الخبرة', v: '+10 سنوات مع المؤسسين' },
          { k: 'الجلسات', v: '+200 مؤسس · 1 لـ 1' },
          { k: 'الكتابة', v: 'كتاب + منشور المبادر' },
        ],
      },
      cta: {
        head: 'القصة الأهم هي قصة شركتك.',
        sub: 'تسعون دقيقة، ونعرف أين تذهب إيراداتك.',
        primary: { label: 'احجز جلسة استشارية', href: SITE.calendly },
        secondary: { label: 'اقرأ الكتاب', href: PATHS.book.ar },
      },
    },
    en: {
      meta: {
        title: 'My Story · Badr Shaqer',
        description: 'From business school to 200+ one-on-one sessions with founders across MENA. The story as it happened, without polish.',
      },
      hero: {
        overline: 'My story',
        head: [
          { text: "I didn't learn selling in a lecture hall.", em: false, br: true },
          { text: 'I learned it where it happens.', em: true },
        ],
        deck: 'A BBA, an MA in Marketing, and ten years between founders and their numbers. The degrees gave me the language. The market gave me the sentences worth saying.',
      },
      chapters: [
        {
          num: '01',
          title: 'The start: language before market',
          body: 'I studied business administration, then finished a master\'s in marketing. I left university carrying all the vocabulary: target segments, customer journeys, funnels. Then I met my first real founder and discovered his company doesn\'t read the books I read.',
          pull: 'Theory explains the market to the market. A founder needs someone to explain his company to him.',
        },
        {
          num: '02',
          title: 'Ten years inside the problems',
          body: 'Since then I\'ve been in the same room: a founder, the numbers, and a constraint that won\'t move. Pre-launch fog, first-million pressure, multi-market expansion. Across MENA, from the Gulf to North Africa. After the first hundred sessions the pattern gets boring: bad priorities cost more than bad ideas.',
          pull: 'More than 200 founders have sat across from me. The problems change names, never roots.',
        },
        {
          num: '03',
          title: 'The book and Almobadir: the public work',
          body: 'I wrote "How to Sell Like a Drug Dealer" because the most honest lesson in understanding demand doesn\'t come from an ad campaign. And I built Almobadir, a monthly publication for the Arab world: three million readers via the network, five thousand newsletter subscribers. Writing is my public work. Consulting is the private room.',
          pull: 'Almobadir is the public work. This page is the private room.',
        },
        {
          num: '04',
          title: 'Today: one method, no varnish',
          body: 'Today I work one way: I read the company before the session, we attack the biggest constraint for ninety minutes, a written summary lands within 24 hours, then we review execution after thirty days. You leave with priorities, not options. That\'s everything, and it\'s enough.',
          pull: null,
        },
      ],
      credBand: {
        label: 'The card',
        items: [
          { k: 'Education', v: 'BBA · MA Marketing' },
          { k: 'Experience', v: '10+ years with founders' },
          { k: 'Sessions', v: '200+ founders · 1:1' },
          { k: 'Writing', v: 'A book + Almobadir' },
        ],
      },
      cta: {
        head: 'The story that matters is your company\'s.',
        sub: 'Ninety minutes, and we know where your revenue goes.',
        primary: { label: 'Book a consulting call', href: SITE.calendly },
        secondary: { label: 'Read the book', href: PATHS.book.en },
      },
    },
  },

  /* ════════════════ ARTICLES ════════════════ */
  articles: {
    ar: {
      meta: {
        title: 'المقالات · بدر شاكر',
        description: '150+ مقال في بيع الخبرات، بناء المشاريع الاستشارية، وفهم الطلب. الأرشيف الكامل قادم إلى هنا — والجديد ينشر في المبادر.',
      },
      hero: {
        overline: 'المقالات',
        head: [
          { text: '150+ مقال في ', em: false },
          { text: 'بيع الخبرات.', em: true },
        ],
        deck: 'عشر سنوات من الكتابة عن البيع، والاستشارة، وفهم الطلب. الأرشيف الكامل ينتقل إلى هذه الصفحة تدريجيا — والجديد ينشر أولا في المبادر.',
      },
      comingTag: 'قريبا هنا',
      readOnAlmobadir: { label: 'اقرأ الجديد في المبادر', href: SITE.almobadir },
      note: 'الأرشيف قيد النقل. حتى يكتمل، كل مقال جديد ينشر في المبادر وفي النشرة الأسبوعية.',
      cta: {
        head: 'لا تنتظر الأرشيف.',
        sub: 'المشكلة التي تقرأ عنها الآن، نحلها في جلسة واحدة.',
        primary: { label: 'احجز جلسة استشارية', href: SITE.calendly },
        secondary: { label: 'اقرأ في المبادر', href: SITE.almobadir },
      },
    },
    en: {
      meta: {
        title: 'Articles · Badr Shaqer',
        description: '150+ articles on selling expertise, building consulting businesses, and understanding demand. Full archive coming here — new work publishes on Almobadir.',
      },
      hero: {
        overline: 'Articles',
        head: [
          { text: '150+ articles on ', em: false },
          { text: 'selling expertise.', em: true },
        ],
        deck: 'Ten years of writing on selling, consulting, and understanding demand. The full archive is moving to this page — new work publishes first on Almobadir.',
      },
      comingTag: 'Coming here',
      readOnAlmobadir: { label: 'Read the latest on Almobadir', href: SITE.almobadir },
      note: 'The archive is in transit. Until it lands, every new piece publishes on Almobadir and in the weekly newsletter.',
      cta: {
        head: "Don't wait for the archive.",
        sub: 'The problem you came to read about — we solve it in one session.',
        primary: { label: 'Book a consulting call', href: SITE.calendly },
        secondary: { label: 'Read on Almobadir', href: SITE.almobadir },
      },
    },
  },

  /* ════════════════ BOOK ════════════════ */
  book: {
    ar: {
      meta: {
        title: 'كيف تبيع كتاجر المخدرات · كتاب بدر شاكر',
        description: 'البيع يصير سهلا يوم تتوقف عن عبادة الحملات وتبدأ بفهم الطلب. كتاب في فهم الطلب، الندرة، وشبكات التوزيع. الفصل الأول مجانا.',
      },
      hero: {
        overline: 'الكتاب · 2025',
        head: [
          { text: 'كيف ', em: false },
          { text: 'تبيع', em: true },
          { text: ' كتاجر المخدرات.', em: false },
        ],
        deck: 'البيع يصير سهلا يوم تتوقف عن عبادة الحملات وتبدأ بفهم الطلب.',
        cta: { label: 'احصل على نسختك', href: SITE.bookBuy },
        sample: { label: 'الفصل الأول مجانا', href: SITE.bookBuy },
      },
      whyLabel: 'لماذا هذا الكتاب',
      whyHead: [
        { text: 'الدرس يأتي من ', em: false },
        { text: 'أصدق سوق في العالم.', em: true },
      ],
      reasons: [
        {
          head: 'لا ميزانية، لا فريق، لا عرض تقديمي',
          body: 'التاجر لا يملك ميزانية تسويق، ولا فريق مبيعات، ولا عرضا تقديميا · ومع ذلك يفهم الطلب أكثر من أكثر المؤسسين الذين يملكون الثلاثة.',
        },
        {
          head: 'نفس الآلة، بزينة مختلفة',
          body: 'الندرة والإدمان وشبكات التوزيع هي ما يحرك سوق الشارع. وأكبر الماركات في العالم تدور على نفس الآلة، بزينة مختلفة.',
        },
        {
          head: 'نهاية الأعذار',
          body: 'بعد هذا الكتاب، سيصير لوم وكالة التسويق على أرقام مبيعاتك تصرفا طفوليا.',
        },
      ],
      forLabel: 'لمن هذا الكتاب',
      forItems: [
        'لمن يبيع منتجا حقيقيا ويريد فهم لماذا يشترى منه — أو لا يشترى.',
        'لمن تعب من تأجير فهم الطلب لوكالة خارجية.',
        'لمن يبني خبرة ويريد أن تباع كما تباع الأشياء النادرة.',
      ],
      sampleBand: {
        head: 'اقرأ الفصل الأول مجانا.',
        sub: 'إن لم يغير طريقة نظرتك للبيع، لا تشتر الباقي.',
        cta: { label: 'احصل على نسختك', href: SITE.bookBuy },
      },
      noteLang: 'الكتاب منشور بالعربية',
    },
    en: {
      meta: {
        title: 'How to Sell Like a Drug Dealer · A book by Badr Shaqer',
        description: 'Selling gets simple the day you stop worshipping campaigns and start understanding demand. A book on demand, scarcity, and distribution. First chapter free. Published in Arabic.',
      },
      hero: {
        overline: 'The Book · 2025',
        head: [
          { text: 'How to ', em: false },
          { text: 'sell', em: true },
          { text: ' like a drug dealer.', em: false },
        ],
        deck: 'Selling gets simple the day you stop worshipping campaigns and start understanding demand.',
        cta: { label: 'Get your copy', href: SITE.bookBuy },
        sample: { label: 'First chapter free', href: SITE.bookBuy },
      },
      whyLabel: 'Why this book',
      whyHead: [
        { text: 'The lesson comes from ', em: false },
        { text: "the world's most honest market.", em: true },
      ],
      reasons: [
        {
          head: 'No budget, no team, no pitch deck',
          body: 'A dealer has no marketing budget, no sales team, no pitch deck · and still understands demand better than most founders who have all three.',
        },
        {
          head: 'Same machinery, dressed up',
          body: 'Scarcity, addiction, and distribution networks run the street market. The biggest brands in the world run on the same machinery, dressed up.',
        },
        {
          head: 'The end of excuses',
          body: 'After this book, blaming the agency for your sales numbers will feel childish.',
        },
      ],
      forLabel: 'Who this book is for',
      forItems: [
        'For anyone selling a real product who wants to understand why people buy — or don\'t.',
        'For anyone tired of renting their understanding of demand from an agency.',
        'For anyone building expertise who wants it to sell the way scarce things sell.',
      ],
      sampleBand: {
        head: 'Read the first chapter free.',
        sub: "If it doesn't change how you look at selling, don't buy the rest.",
        cta: { label: 'Get your copy', href: SITE.bookBuy },
      },
      noteLang: 'Published in Arabic',
    },
  },

  /* ════════════════ CONSULTATION ════════════════ */
  consultation: {
    ar: {
      meta: {
        title: 'استشارة أعمال 1 لـ 1 · بدر شاكر',
        description: 'تسعون دقيقة على Zoom: نفكك أكبر عائق في شركتك، ويصلك ملخص مكتوب بالأولويات خلال 24 ساعة، ومتابعة بعد 30 يوما.',
      },
      hero: {
        overline: 'استشارة أعمال · 1 لـ 1',
        head: [
          { text: 'للمؤسسين الذين ملوا ', em: false },
          { text: 'التخمين.', em: true },
        ],
        deck: 'أحضر شركتك، أرقامك، والجزء القبيح. تسعون دقيقة معي على Zoom: نفكك العائق بلا تنميق. خلال 24 ساعة، يصلك الملخص المكتوب بالأولويات.',
        deckStrong: 'طبقه يوم الإثنين.',
      },
      forLabel: 'هذه الجلسة لك إذا',
      forItems: [
        'عندك شركة تعمل، وإيرادات تتحرك، وعائق لا يتحرك.',
        'تعبت من تسمية الأعراض وتريد من يسمي المرض.',
        'تريد أولويات مكتوبة تنفذها، لا خيارات تتأملها.',
      ],
      notForLabel: 'وليست لك إذا',
      notForItems: [
        'ما زلت تخطط للبدء — اقرأ المبادر أولا، وسيوفر عليك الكثير.',
        'تبحث عمن يقول لك إن كل شيء على ما يرام.',
      ],
      cta: {
        head: 'الجلسة القادمة قد تكون أهم 90 دقيقة في سنتك.',
        sub: 'التقويم مفتوح. اختر وقتك.',
        primary: { label: 'احجز جلستك الآن', href: SITE.calendly },
        secondary: { label: 'اقرأ قصتي أولا', href: PATHS.story.ar },
      },
    },
    en: {
      meta: {
        title: '1:1 Business Consulting · Badr Shaqer',
        description: 'Ninety minutes on Zoom: we break down the biggest constraint in your company. Written priorities within 24 hours, follow-up after 30 days.',
      },
      hero: {
        overline: 'Consulting · 1 to 1',
        head: [
          { text: 'For founders ', em: false },
          { text: 'tired of guessing.', em: true },
        ],
        deck: 'Bring the company, the numbers, and the ugly part. Ninety minutes with me on Zoom: we break the constraint down in plain English. Within twenty-four hours, the written priorities land in your inbox.',
        deckStrong: 'Use them Monday.',
      },
      forLabel: 'This session is for you if',
      forItems: [
        'You have a working company, moving revenue, and a constraint that won\'t move.',
        'You\'re tired of naming symptoms and want someone to name the disease.',
        'You want written priorities to execute, not options to contemplate.',
      ],
      notForLabel: "And it isn't if",
      notForItems: [
        'You\'re still planning to start — read Almobadir first; it will save you a lot.',
        'You\'re looking for someone to tell you everything is fine.',
      ],
      cta: {
        head: 'The next session might be the most important 90 minutes of your year.',
        sub: 'The calendar is open. Pick your time.',
        primary: { label: 'Book your call now', href: SITE.calendly },
        secondary: { label: 'Read my story first', href: PATHS.story.en },
      },
    },
  },

  /* ════════════════ PROGRAMS ════════════════ */
  programs: {
    consultant: {
      ar: {
        meta: {
          title: 'برنامج: كن مستشارا · بدر شاكر',
          description: 'حول خبرتك إلى مشروع استشاري يدفع له السوق. برنامج من بدر شاكر، مستشار في بناء المشاريع الاستشارية والتدريبية.',
        },
        hero: {
          overline: 'بيلد · مسار المستشار المدفوع',
          head: [
            { text: 'كن ', em: false },
            { text: 'مستشارا.', em: true },
          ],
          deck: 'بيلد مسار مكثّف من 6 أسابيع بالقبول فقط، يحوّل خبرتك إلى جلسات تشخيص مدفوعة وعملاء استشارة بأسعار مرتفعة. ليس دورة سلبية — بل تنفيذ حقيقي في السوق.',
        },
        pillarsLabel: 'الأسئلة التي يجيب عنها البرنامج',
        pillars: [
          { head: 'ما الذي تبيعه فعلا؟', body: 'تحديد الخبرة التي يدفع السوق لها، وفصلها عما تجيده ولا يشترى.' },
          { head: 'كيف تسعر بلا خجل؟', body: 'بناء عرض وسعر يعكسان قيمة النتيجة، لا عدد الساعات.' },
          { head: 'من أين يأتي العملاء؟', body: 'نظام واضح لجذب طلبات الاستشارة بدل انتظارها.' },
        ],
        tracks: {
          label: 'مساران للانضمام',
          intro: 'بيلد بالقبول فقط. اختر المسار الأقرب إلى وضعك — والتقديم يستغرق دقائق.',
          items: [
            {
              name: 'Core',
              price: '$2,497',
              tagline: 'نظام بيلد الكامل.',
              points: [
                'مسار تنفيذي من 6 أسابيع',
                'حزم خبرتك في عرض تشخيص مدفوع',
                'بناء عرض استشاري مميز، ونظام تواصل ونصوص',
                'مكالمات بيع، وعروض مكتوبة، وبنية تسليم',
                'إرشاد جماعي ومجتمع',
              ],
            },
            {
              name: 'Boardroom',
              price: '$4,997',
              tagline: 'كل ما في Core، مع مراجعة استراتيجية خاصة.',
              points: [
                'كل ما في Core',
                'مراجعة خاصة للتموضع والعروض والمقترحات',
                'ملاحظات مباشرة على مكالمات البيع وتسليم الاستشارة',
                'دعم بأولوية',
              ],
              featured: true,
            },
          ],
        },
        cta: {
          head: 'خبرتك تستحق أن تباع كما تباع الخبرات.',
          sub: 'التقديم مفتوح للدفعة القادمة. المقاعد محدودة.',
          primary: { label: 'قدّم على بيلد', href: PATHS.apply.ar },
          secondary: { label: 'أو احجز جلسة أولا', href: SITE.calendly },
        },
        crossLink: { label: 'البرنامج الثاني: نظم شركتك', href: PATHS.programSystemize.ar },
      },
      en: {
        meta: {
          title: 'Program: Become a Consultant · Badr Shaqer',
          description: 'Turn your expertise into a consulting business the market pays for. A program by Badr Shaqer, consultant in building consulting and training businesses.',
        },
        hero: {
          overline: 'Build · The Paid Advisor Sprint',
          head: [
            { text: 'Become a ', em: false },
            { text: 'consultant.', em: true },
          ],
          deck: 'Build is a 6-week, application-only sprint that turns your expertise into paid diagnosis calls and premium advisory clients. Not a passive course — real execution in the market.',
        },
        pillarsLabel: 'The questions this program answers',
        pillars: [
          { head: 'What are you actually selling?', body: 'Isolating the expertise the market pays for, and separating it from what you\'re good at that doesn\'t sell.' },
          { head: 'How do you price without flinching?', body: 'Building an offer and a price that reflect the value of the outcome, not the hours.' },
          { head: 'Where do clients come from?', body: 'A clear system for attracting consulting requests instead of waiting for them.' },
        ],
        tracks: {
          label: 'Two ways in',
          intro: 'Build is application-only. Pick the track closest to where you are — applying takes a few minutes.',
          items: [
            {
              name: 'Core',
              price: '$2,497',
              tagline: 'The full Build system.',
              points: [
                '6-week execution sprint',
                'Package your expertise into a paid diagnosis offer',
                'Build a premium advisory offer, outreach system & scripts',
                'Sales calls, proposals & delivery structure',
                'Group coaching + community',
              ],
            },
            {
              name: 'Boardroom',
              price: '$4,997',
              tagline: 'Core + private strategic review.',
              points: [
                'Everything in Core',
                'Private review on positioning, offers & proposals',
                'Direct feedback on your sales calls & advisory delivery',
                'Priority support',
              ],
              featured: true,
            },
          ],
        },
        cta: {
          head: 'Your expertise deserves to sell the way expertise sells.',
          sub: 'Applications are open for the next cohort. Seats are limited.',
          primary: { label: 'Apply for Build', href: PATHS.apply.en },
          secondary: { label: 'Or book a session first', href: SITE.calendly },
        },
        crossLink: { label: 'Program 02: Systemize Your Business', href: PATHS.programSystemize.en },
      },
    },
    systemize: {
      ar: {
        meta: {
          title: 'برنامج: نظم شركتك · بدر شاكر',
          description: 'أخرج نفسك من العمليات اليومية. برنامج لبناء الأنظمة التي تجعل شركتك تعمل بدونك — من بدر شاكر.',
        },
        hero: {
          overline: 'برنامج · 02',
          head: [
            { text: 'نظم ', em: false },
            { text: 'شركتك.', em: true },
          ],
          deck: 'إذا توقفت الشركة حين تتوقف أنت، فأنت لا تملك شركة — تملك وظيفة غالية. هذا البرنامج يبني الأنظمة التي تجعل العمل يمشي بدونك.',
        },
        pillarsLabel: 'الأسئلة التي يجيب عنها البرنامج',
        pillars: [
          { head: 'أين أنت العائق؟', body: 'تحديد القرارات التي ما زالت تمر بك ولا يجب أن تمر.' },
          { head: 'ما الذي يوثق وما الذي يفوض؟', body: 'تحويل ما في رأسك إلى عمليات يستطيع فريقك تشغيلها.' },
          { head: 'كيف تقيس بلا حضور؟', body: 'لوحة أرقام تخبرك بصحة الشركة وأنت خارجها.' },
        ],
        pending: {
          label: 'تفاصيل البرنامج',
          note: 'المنهج الكامل، المدة، والاستثمار — تصلك التفاصيل عند التواصل. المقاعد محدودة في كل دفعة.',
        },
        cta: {
          head: 'شركتك يجب أن تعمل. أنت يجب أن تقود.',
          sub: 'اسأل عن الدفعة القادمة.',
          primary: { label: 'اسأل عن البرنامج', href: `mailto:${SITE.email}?subject=${encodeURIComponent('برنامج: نظم شركتك')}` },
          secondary: { label: 'أو احجز جلسة أولا', href: SITE.calendly },
        },
        crossLink: { label: 'البرنامج الأول: كن مستشارا', href: PATHS.programConsultant.ar },
      },
      en: {
        meta: {
          title: 'Program: Systemize Your Business · Badr Shaqer',
          description: 'Get yourself out of daily operations. A program for building the systems that let your company run without you — by Badr Shaqer.',
        },
        hero: {
          overline: 'Program · 02',
          head: [
            { text: 'Systemize ', em: false },
            { text: 'your business.', em: true },
          ],
          deck: "If the company stops when you stop, you don't own a company — you own an expensive job. This program builds the systems that keep the work moving without you.",
        },
        pillarsLabel: 'The questions this program answers',
        pillars: [
          { head: 'Where are you the constraint?', body: 'Identifying the decisions that still route through you and shouldn\'t.' },
          { head: 'What gets documented, what gets delegated?', body: 'Turning what lives in your head into operations your team can run.' },
          { head: 'How do you measure without being present?', body: 'A numbers dashboard that tells you the company\'s health from outside it.' },
        ],
        pending: {
          label: 'Program details',
          note: 'Full curriculum, duration, and investment — details on request. Seats are limited per cohort.',
        },
        cta: {
          head: 'Your company should run. You should lead.',
          sub: 'Ask about the next cohort.',
          primary: { label: 'Ask about the program', href: `mailto:${SITE.email}?subject=${encodeURIComponent('Program: Systemize Your Business')}` },
          secondary: { label: 'Or book a session first', href: SITE.calendly },
        },
        crossLink: { label: 'Program 01: Become a Consultant', href: PATHS.programConsultant.en },
      },
    },
  },
};

/* Articles index placeholders — OWNER-TODO: replace with the real archive
   (titles, slugs, dates, body source). These are unlinked "coming soon"
   topic cards; no article bodies are published. */
export const articleTeasers = {
  ar: [
    { title: 'لماذا يشتري الناس الخبرة ولا يشترون النصيحة', tag: 'بيع الخبرات' },
    { title: 'سعرك ليس رقما. سعرك قصة', tag: 'التسعير' },
    { title: 'العميل الذي يساومك ليس عميلك', tag: 'المبيعات' },
    { title: 'كيف تعرف أن مشكلتك ليست تسويقية', tag: 'التشخيص' },
    { title: 'المستشار الذي يقبل كل مشروع لا يثق به أحد', tag: 'الاستشارة' },
    { title: 'الندرة ليست خدعة. الندرة صدق التوزيع', tag: 'فهم الطلب' },
  ],
  en: [
    { title: 'Why people buy expertise and not advice', tag: 'Selling expertise' },
    { title: 'Your price isn\'t a number. Your price is a story', tag: 'Pricing' },
    { title: 'The client who haggles isn\'t your client', tag: 'Sales' },
    { title: 'How to know your problem isn\'t a marketing problem', tag: 'Diagnosis' },
    { title: 'The consultant who takes every project earns no trust', tag: 'Consulting' },
    { title: 'Scarcity isn\'t a trick. Scarcity is honest distribution', tag: 'Demand' },
  ],
};
