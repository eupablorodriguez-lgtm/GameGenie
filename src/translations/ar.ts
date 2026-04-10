import type { TranslationKeys } from './en';

export const ar: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'قارئ العقول النهائي',
  },
  intro: {
    summon: 'استدعِ الجني',
    challenge: 'تحدى أقوى ذكاء اصطناعي لقراءة الأفكار',
    step1Title: 'فكر في أي لعبة فيديو',
    step1Desc: 'من الكلاسيكيات إلى التحف الحديثة',
    step2Title: 'أجب على الأسئلة الغامضة',
    step2Desc: 'كن صادقاً مع إجاباتك',
    step3Title: 'شاهد الجني يقرأ عقلك!',
    step3Desc: 'دقة مثالية في كل مرة',
    startButton: 'أيقظ الجني',
  },
  genie: {
    idle: 'أنا الجني. فكر في أي لعبة. سأقرأ عقلك بدقة مطلقة.',
    thinking: 'أفكارك تصبح واضحة... الأنماط تظهر... أرى كل شيء...',
    guessing: 'الإجابة تتبلور... عقلك يكشف الحقيقة!',
    victory: 'الكمال! لقد قرأت أفكارك بشكل مثالي! الجني لا يفشل أبداً!',
    learn: 'علمني! لن أنسى أبداً...',
    ready: 'جاهز',
    analyzing: 'يحلل...',
    revealing: 'يكشف...',
    predicted: 'تنبأ!',
  },
  question: {
    yes: 'نعم',
    no: 'لا',
  },
  reveal: {
    title: 'قراءة العقل!',
    wasTheGame: 'اللعبة كانت',
    questionCount: 'سألت {{count}} سؤال لاكتشاف ذلك!',
    questionCountPlural: 'سألت {{count}} أسئلة لاكتشاف ذلك!',
    yesButton: 'نعم',
    noButton: 'لا',
    footer: 'الجني يتعلم ويتحسن دائماً!',
  },
  learn: {
    title: 'علمني!',
    gameLabel: 'ما هي اللعبة التي كنت تفكر فيها؟',
    gamePlaceholder: 'أدخل اسم اللعبة...',
    characteristicLabel: 'اكتب سؤال نعم/لا يكون صحيحاً لـ "{{correctGame}}" وليس لـ "{{wrongGame}}"',
    characteristicLabelEmpty: 'اكتب سؤال نعم/لا يكون صحيحاً للعبتك وليس لـ "{{wrongGame}}"',
    characteristicHint: 'اكتبه كسؤال كامل. مثال: "هل هي لعبة قتال؟"، "هل لها عالم مفتوح؟"، "هل هي لعبة ثنائية الأبعاد؟"',
    characteristicPlaceholder: 'مثال: "هل هي لعبة قتال؟"، "هل لها وضع متعدد اللاعبين؟"، "هل هي لعبة منصات ثنائية الأبعاد؟"',
    previewLabel: 'معاينة السؤال',
    submitButton: 'علم الجني',
    translating: 'جارٍ الترجمة...',
    footer: 'الجني لا ينسى أبداً! شكراً لتعليمي.',
  },
  footer: {
    text: 'GENIE GAME • قارئ العقول الذي لا يُهزم',
  },
};
