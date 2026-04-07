import type { TranslationKeys } from './en';

export const it: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'Lettore di Menti Definitivo',
  },
  intro: {
    summon: 'EVOCA IL GENIO',
    challenge: 'Sfida l\'IA lettrice di menti più potente',
    step1Title: 'Pensa a QUALSIASI videogioco',
    step1Desc: 'Dai classici ai capolavori moderni',
    step2Title: 'Rispondi alle domande mistiche',
    step2Desc: 'Sii onesto con le tue risposte',
    step3Title: 'Guarda il Genio leggere la tua mente!',
    step3Desc: 'Precisione perfetta, ogni volta',
    startButton: 'Risveglia il Genio',
  },
  genie: {
    idle: 'Sono il GENIO. Pensa a qualsiasi gioco. Leggerò la tua mente con assoluta precisione.',
    thinking: 'I tuoi pensieri diventano chiari... I modelli emergono... Vedo tutto...',
    guessing: 'La risposta si cristallizza... La tua mente rivela la verità!',
    victory: 'PERFEZIONE! Ho letto i tuoi pensieri perfettamente! Il Genio non sbaglia MAI!',
    learn: 'Insegnami! Non dimenticherò mai...',
    ready: 'PRONTO',
    analyzing: 'ANALIZZANDO...',
    revealing: 'RIVELANDO...',
    predicted: 'PREVISTO!',
  },
  question: {
    yes: 'SÌ',
    no: 'NO',
  },
  reveal: {
    title: 'MENTE LETTA!',
    wasTheGame: 'Il gioco era',
    questionCount: 'Ho fatto {{count}} domanda per scoprirlo!',
    questionCountPlural: 'Ho fatto {{count}} domande per scoprirlo!',
    yesButton: 'SÌ',
    noButton: 'NO',
    footer: 'Il Genio sta sempre imparando e migliorando!',
  },
  learn: {
    title: 'Insegnami!',
    gameLabel: 'A quale gioco stavi pensando?',
    gamePlaceholder: 'Inserisci il nome del gioco...',
    characteristicLabel: 'Cosa ha {{correctGame}} che {{wrongGame}} non ha?',
    characteristicLabelEmpty: 'Cosa ha il tuo gioco che {{wrongGame}} non ha?',
    characteristicPlaceholder: 'Descrivi una caratteristica unica...',
    submitButton: 'Insegna al Genio',
    footer: 'Il Genio non dimentica mai! Grazie per avermi insegnato.',
  },
  footer: {
    text: 'GENIE GAME • Lettore di Menti Imbattuto',
  },
};
