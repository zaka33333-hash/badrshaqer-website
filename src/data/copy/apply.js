// Application form: "Build — The Paid Advisor Sprint".
// EN copy is verbatim from the owner's admissions doc (approved).
// AR is a faithful translation — pending owner (Badr) review.
//
// Submissions POST to FORM_ENDPOINT (a form service such as Formspree).
// Replace the placeholder with your real endpoint to go live — see /apply page.
export const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const en = {
  meta: {
    title: 'Apply · Build — The Paid Advisor Sprint · Badr Shaqer',
    description:
      'Apply for Build: a 6-week application-only sprint to turn your expertise into paid diagnosis calls and premium advisory clients.',
  },
  back: { label: 'Back to the program', href: 'programConsultant' },
  title: 'Apply for Build',
  lede: 'The Paid Advisor Sprint',
  subtitle:
    'Build is a 6-week, application-only sprint for credible experts, operators, freelancers, marketers, creators, service providers, coaches, and early consultants who want to turn their knowledge into paid diagnosis calls and premium advisory clients.',
  note: 'This isn’t here to judge whether you’re already a perfect consultant. Build is for people who have real experience, skill, proof, or trust — but haven’t yet turned it into a clear paid advisory offer. Takes about 5–8 minutes.',
  sections: [
    {
      title: 'Basic information',
      fields: [
        { id: 'name', type: 'text', label: 'Full name', required: true, autocomplete: 'name' },
        { id: 'email', type: 'email', label: 'Email address', required: true, autocomplete: 'email' },
        { id: 'whatsapp', type: 'tel', label: 'WhatsApp number', required: true, autocomplete: 'tel' },
        { id: 'location', type: 'text', label: 'Country / city', required: true },
        {
          id: 'links',
          type: 'text',
          label: 'Instagram / LinkedIn / Website',
          help: 'Add a link where we can understand your work, content, experience, or professional background.',
          required: true,
        },
      ],
    },
    {
      title: 'Who are you?',
      fields: [
        {
          id: 'describe',
          type: 'radio',
          label: 'What best describes you right now?',
          required: true,
          options: [
            'Freelancer / service provider',
            'Marketer',
            'Creator / educator',
            'Operator / manager',
            'Coach / consultant',
            'Business owner',
            'Technical specialist / expert',
            'Agency owner',
            'Employee with strong expertise',
            'Other',
          ],
        },
        {
          id: 'profession',
          type: 'textarea',
          label: 'What do you currently do professionally?',
          help: 'In 2–4 sentences: what you do, the field you work in, and the kind of experience you have.',
          required: true,
        },
      ],
    },
    {
      title: 'Proof & expertise',
      fields: [
        {
          id: 'proof',
          type: 'checkbox',
          label: 'What kind of proof do you already have?',
          help: 'Select all that apply.',
          options: [
            'I have helped clients before',
            'I have solved real problems in a professional role',
            'I have built or grown a business / project',
            'I have an audience, or people trust my content',
            'I have technical or specialist expertise',
            'People already ask me for advice',
            'I have personal experience solving a specific problem',
            'I don’t have clear proof yet',
          ],
        },
        {
          id: 'askedFor',
          type: 'textarea',
          label: 'What do people usually ask you for help with?',
          help: 'Advice, strategy, feedback, problem-solving, marketing, operations, sales, content, career, finance, systems, leadership — anything people trust you for. e.g. “Small business owners ask me how to fix their sales process.”',
          required: true,
        },
      ],
    },
    {
      title: 'Execution readiness',
      fields: [
        {
          id: 'buyers',
          type: 'radio',
          label: 'Are you willing to speak directly with potential buyers during the 6 weeks?',
          required: true,
          options: ['Yes', 'Yes, but I’m nervous', 'Maybe', 'No'],
        },
        {
          id: 'outreach',
          type: 'radio',
          label: 'Are you willing to send DMs, WhatsApp messages, warm outreach, or referral messages during the sprint?',
          required: true,
          options: ['Yes', 'Yes, but I need scripts and guidance', 'Maybe', 'No'],
        },
        {
          id: 'content',
          type: 'radio',
          label: 'Are you willing to publish authority content during the sprint?',
          required: true,
          options: ['Yes', 'Yes, but I need help with ideas and structure', 'Maybe', 'No'],
        },
        {
          id: 'commit',
          type: 'radio',
          label: 'Can you commit at least 5 hours per week during the 6 weeks?',
          required: true,
          options: ['Yes', 'Maybe', 'No'],
        },
      ],
    },
    {
      title: 'Your goal',
      fields: [
        {
          id: 'win',
          type: 'checkbox',
          label: 'What would make Build a win for you?',
          help: 'Select all that apply.',
          options: [
            'Build my first paid diagnosis offer',
            'Get my first paid advisory / consulting client',
            'Move from execution to strategy',
            'Package my expertise clearly',
            'Monetize my audience',
            'Learn how to charge for my advice',
            'Learn how to sell without feeling awkward',
            'Build confidence as an advisor',
            'Create a clear premium offer',
            'I’m not sure yet, but I know I have expertise I want to monetize',
          ],
        },
        {
          id: 'financial',
          type: 'radio',
          label: 'Are you financially ready to join if accepted?',
          required: true,
          options: ['Yes', 'Yes, with a payment plan', 'Maybe', 'Not now'],
        },
      ],
    },
    {
      title: 'Boardroom interest',
      fields: [
        {
          id: 'boardroom',
          type: 'radio',
          label: 'Are you interested in the Boardroom / VIP track?',
          required: true,
          options: ['Yes', 'Maybe', 'No', 'I want to understand the difference first'],
        },
        {
          id: 'boardroomWhy',
          type: 'textarea',
          label: 'If yes or maybe — why might Boardroom be useful for you?',
          help: 'Boardroom is for applicants who want deeper private review on positioning, paid diagnosis, offers, sales calls, proposals, and advisory delivery. Only answer if you’re seriously considering the higher-support track.',
        },
      ],
    },
  ],
  confirm:
    'I understand that Build is an execution sprint, not a passive course. If accepted, I’m expected to show up, complete assignments, speak to buyers, send messages, publish content, and test my offer in the market.',
  submit: 'Submit application',
  submitting: 'Sending…',
  success: {
    head: 'Application received.',
    body: 'Thank you — your application is in. We review carefully and only open a limited number of seats per cohort. If there’s a fit, you’ll hear from us by email or WhatsApp with the next step.',
  },
  error: 'Something went wrong sending your application. Please try again, or email badr@almobadir.com directly.',
};

const ar = {
  meta: {
    title: 'التقديم · بيلد — مسار المستشار المدفوع · بدر شاكر',
    description:
      'قدّم على بيلد: مسار مكثّف من 6 أسابيع بالقبول فقط، يحوّل خبرتك إلى جلسات تشخيص مدفوعة وعملاء استشارة بأسعار مرتفعة.',
  },
  back: { label: 'العودة إلى البرنامج', href: 'programConsultant' },
  title: 'قدّم على بيلد',
  lede: 'مسار المستشار المدفوع',
  subtitle:
    'بيلد مسار مكثّف من 6 أسابيع بالقبول فقط، موجّه للخبراء والمشغّلين والمستقلين والمسوّقين وصنّاع المحتوى ومقدّمي الخدمات والمدرّبين والمستشارين في بداياتهم ممّن يريدون تحويل معرفتهم إلى جلسات تشخيص مدفوعة وعملاء استشارة بأسعار مرتفعة.',
  note: 'هذا النموذج ليس هنا ليحكم إن كنت مستشارا مكتملا. بيلد لمن يملكون خبرة أو مهارة أو إثباتا أو ثقة حقيقية — لكنهم لم يحوّلوها بعد إلى عرض استشاري مدفوع وواضح. يستغرق التقديم نحو 5 إلى 8 دقائق.',
  sections: [
    {
      title: 'معلومات أساسية',
      fields: [
        { id: 'name', type: 'text', label: 'الاسم الكامل', required: true, autocomplete: 'name' },
        { id: 'email', type: 'email', label: 'البريد الإلكتروني', required: true, autocomplete: 'email' },
        { id: 'whatsapp', type: 'tel', label: 'رقم الواتساب', required: true, autocomplete: 'tel' },
        { id: 'location', type: 'text', label: 'الدولة / المدينة', required: true },
        {
          id: 'links',
          type: 'text',
          label: 'إنستغرام / لينكدإن / الموقع',
          help: 'أضف رابطا نفهم منه طبيعة عملك أو محتواك أو خبرتك أو خلفيتك المهنية.',
          required: true,
        },
      ],
    },
    {
      title: 'من أنت؟',
      fields: [
        {
          id: 'describe',
          type: 'radio',
          label: 'ما الوصف الأقرب إليك الآن؟',
          required: true,
          options: [
            'مستقل / مقدّم خدمة',
            'مسوّق',
            'صانع محتوى / مُعلّم',
            'مشغّل / مدير',
            'مدرّب / مستشار',
            'صاحب عمل',
            'متخصص تقني / خبير',
            'صاحب وكالة',
            'موظف بخبرة قوية',
            'غير ذلك',
          ],
        },
        {
          id: 'profession',
          type: 'textarea',
          label: 'ما الذي تعمله حاليا؟',
          help: 'في جملتين إلى أربع: ماذا تعمل، وفي أي مجال، وما نوع الخبرة التي تملكها.',
          required: true,
        },
      ],
    },
    {
      title: 'الإثبات والخبرة',
      fields: [
        {
          id: 'proof',
          type: 'checkbox',
          label: 'ما نوع الإثبات الذي تملكه فعلا؟',
          help: 'اختر كل ما ينطبق.',
          options: [
            'ساعدت عملاء من قبل',
            'حللت مشاكل حقيقية في دور مهني',
            'بنيت أو نمّيت مشروعا',
            'لديّ جمهور، أو يثق الناس بمحتواي',
            'لديّ خبرة تقنية أو تخصصية',
            'الناس يسألونني عن النصيحة بالفعل',
            'لديّ تجربة شخصية في حل مشكلة محددة',
            'ليس لديّ إثبات واضح بعد',
          ],
        },
        {
          id: 'askedFor',
          type: 'textarea',
          label: 'بأي شيء يستعين بك الناس عادة؟',
          help: 'نصيحة، استراتيجية، رأي، حل مشكلة، تسويق، عمليات، مبيعات، محتوى، مسار مهني، تمويل، أنظمة، قيادة — أي شيء يثق بك الناس فيه. مثال: «أصحاب المشاريع الصغيرة يسألونني كيف يصلحون عملية المبيعات.»',
          required: true,
        },
      ],
    },
    {
      title: 'الجاهزية للتنفيذ',
      fields: [
        {
          id: 'buyers',
          type: 'radio',
          label: 'هل أنت مستعد للتحدث مباشرة مع مشترين محتملين خلال الأسابيع الستة؟',
          required: true,
          options: ['نعم', 'نعم، لكنني متوتر', 'ربما', 'لا'],
        },
        {
          id: 'outreach',
          type: 'radio',
          label: 'هل أنت مستعد لإرسال رسائل مباشرة وواتساب وتواصل مع معارفك وطلبات ترشيح خلال المسار؟',
          required: true,
          options: ['نعم', 'نعم، لكنني أحتاج إلى نصوص وإرشاد', 'ربما', 'لا'],
        },
        {
          id: 'content',
          type: 'radio',
          label: 'هل أنت مستعد لنشر محتوى يبني سلطتك المهنية خلال المسار؟',
          required: true,
          options: ['نعم', 'نعم، لكنني أحتاج إلى مساعدة في الأفكار والبنية', 'ربما', 'لا'],
        },
        {
          id: 'commit',
          type: 'radio',
          label: 'هل تستطيع الالتزام بخمس ساعات أسبوعيا على الأقل خلال الأسابيع الستة؟',
          required: true,
          options: ['نعم', 'ربما', 'لا'],
        },
      ],
    },
    {
      title: 'هدفك',
      fields: [
        {
          id: 'win',
          type: 'checkbox',
          label: 'ما الذي يجعل بيلد نجاحا بالنسبة لك؟',
          help: 'اختر كل ما ينطبق.',
          options: [
            'أبني أول عرض تشخيص مدفوع لي',
            'أحصل على أول عميل استشارة مدفوع',
            'أنتقل من التنفيذ إلى الاستراتيجية',
            'أحزم خبرتي بوضوح',
            'أحقق دخلا من جمهوري',
            'أتعلم كيف أتقاضى مقابل نصيحتي',
            'أتعلم البيع دون إحراج',
            'أبني ثقتي كمستشار',
            'أصمّم عرضا مميزا وواضحا',
            'لست متأكدا بعد، لكني أعرف أن لديّ خبرة أريد تحقيق دخل منها',
          ],
        },
        {
          id: 'financial',
          type: 'radio',
          label: 'هل أنت مستعد ماليا للانضمام إذا قُبلت؟',
          required: true,
          options: ['نعم', 'نعم، مع خطة دفع', 'ربما', 'ليس الآن'],
        },
      ],
    },
    {
      title: 'الاهتمام بمسار Boardroom',
      fields: [
        {
          id: 'boardroom',
          type: 'radio',
          label: 'هل تهتم بمسار Boardroom (المتقدّم)؟',
          required: true,
          options: ['نعم', 'ربما', 'لا', 'أريد أن أفهم الفرق أولا'],
        },
        {
          id: 'boardroomWhy',
          type: 'textarea',
          label: 'إن كانت إجابتك نعم أو ربما — لماذا قد يفيدك Boardroom؟',
          help: 'Boardroom لمن يريد مراجعة خاصة أعمق للتموضع والتشخيص المدفوع والعروض ومكالمات البيع والعروض المكتوبة وتسليم الاستشارة. أجب فقط إن كنت تفكر جديا في المسار الأعلى دعما.',
        },
      ],
    },
  ],
  confirm:
    'أفهم أن بيلد مسار تنفيذي، لا دورة سلبية. إذا قُبلت، يُتوقع مني الحضور وإنجاز المهام والتحدث مع المشترين وإرسال الرسائل ونشر المحتوى واختبار عرضي في السوق.',
  submit: 'إرسال الطلب',
  submitting: 'جارٍ الإرسال…',
  success: {
    head: 'تم استلام طلبك.',
    body: 'شكرا لك — وصلنا طلبك. نراجع الطلبات بعناية ونفتح عددا محدودا من المقاعد في كل دفعة. إن كان هناك توافق، سنتواصل معك عبر البريد أو الواتساب بالخطوة التالية.',
  },
  error: 'حدث خطأ أثناء إرسال طلبك. حاول مرة أخرى، أو راسلنا مباشرة على badr@almobadir.com.',
};

export const apply = { ar, en };
