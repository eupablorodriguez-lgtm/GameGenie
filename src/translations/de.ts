import type { TranslationKeys } from './en';

export const de: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'Ultimativer Gedankenleser',
  },
  intro: {
    summon: 'BESCHWÖRE DEN DSCHINN',
    challenge: 'Fordere die mächtigste gedankenlesende KI heraus',
    step1Title: 'Denke an IRGENDEIN Videospiel',
    step1Desc: 'Von Klassikern bis zu modernen Meisterwerken',
    step2Title: 'Beantworte die mystischen Fragen',
    step2Desc: 'Sei ehrlich mit deinen Antworten',
    step3Title: 'Sieh zu, wie der Dschinn deine Gedanken liest!',
    step3Desc: 'Perfekte Genauigkeit, jedes Mal',
    startButton: 'Erwecke den Dschinn',
  },
  genie: {
    idle: 'Ich bin der DSCHINN. Denke an irgendein Spiel. Ich werde deine Gedanken mit absoluter Präzision lesen.',
    thinking: 'Deine Gedanken werden klar... Die Muster entstehen... Ich sehe alles...',
    guessing: 'Die Antwort kristallisiert sich heraus... Dein Geist offenbart die Wahrheit!',
    victory: 'PERFEKTION! Ich habe deine Gedanken fehlerfrei gelesen! Der Dschinn versagt NIE!',
    learn: 'Lehre mich! Ich werde es nie vergessen...',
    ready: 'BEREIT',
    analyzing: 'ANALYSIERE...',
    revealing: 'ENTHÜLLE...',
    predicted: 'VORHERGESAGT!',
  },
  question: {
    yes: 'JA',
    no: 'NEIN',
  },
  reveal: {
    title: 'GEDANKEN GELESEN!',
    wasTheGame: 'Das Spiel war',
    questionCount: 'Ich habe {{count}} Frage gestellt, um es herauszufinden!',
    questionCountPlural: 'Ich habe {{count}} Fragen gestellt, um es herauszufinden!',
    yesButton: 'JA',
    noButton: 'NEIN',
    footer: 'Der Dschinn lernt und verbessert sich ständig!',
  },
  learn: {
    title: 'Lehre mich!',
    gameLabel: 'An welches Spiel hast du gedacht?',
    gamePlaceholder: 'Gib den Spielnamen ein...',
    characteristicLabel: 'Was hat {{correctGame}}, das {{wrongGame}} nicht hat?',
    characteristicLabelEmpty: 'Was hat dein Spiel, das {{wrongGame}} nicht hat?',
    characteristicPlaceholder: 'Beschreibe ein einzigartiges Merkmal...',
    submitButton: 'Lehre den Dschinn',
    footer: 'Der Dschinn vergisst nie! Danke, dass du mich gelehrt hast.',
  },
  footer: {
    text: 'GENIE GAME • Unbesiegter Gedankenleser',
  },
};
