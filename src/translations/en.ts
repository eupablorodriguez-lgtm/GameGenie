export const en = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'Ultimate Mind Reader',
  },
  intro: {
    summon: 'SUMMON THE GENIE',
    challenge: 'Challenge the most powerful mind reading AI',
    step1Title: 'Think of ANY video game',
    step1Desc: 'From classics to modern masterpieces',
    step2Title: 'Answer the mystical questions',
    step2Desc: 'Be honest with your responses',
    step3Title: 'Watch the Genie read your mind!',
    step3Desc: 'Flawless accuracy, every single time',
    startButton: 'Awaken the Genie',
  },
  genie: {
    idle: 'I am the GENIE. Think of ANY game. I will read your mind with absolute precision.',
    thinking: 'Your thoughts become clear... The patterns emerge... I see it all...',
    guessing: 'The answer crystallizes... Your mind reveals the truth!',
    victory: 'PERFECTION! I have read your thoughts flawlessly! The Genie NEVER fails!',
    learn: 'Teach me! I will never forget...',
    ready: 'READY',
    analyzing: 'ANALYZING...',
    revealing: 'REVEALING...',
    predicted: 'PREDICTED!',
  },
  question: {
    yes: 'YES',
    no: 'NO',
  },
  reveal: {
    title: 'MIND READ!',
    wasTheGame: 'The game was',
    questionCount: 'I asked {{count}} question to find out!',
    questionCountPlural: 'I asked {{count}} questions to find out!',
    yesButton: 'YES',
    noButton: 'NO',
    footer: 'The Genie is always learning and improving!',
  },
  learn: {
    title: 'Teach me!',
    gameLabel: 'What game were you thinking of?',
    gamePlaceholder: 'Enter the game name...',
    characteristicLabel: 'Write a YES/NO question that is TRUE for "{{correctGame}}" but NOT for "{{wrongGame}}"',
    characteristicLabelEmpty: 'Write a YES/NO question that is TRUE for your game but NOT for "{{wrongGame}}"',
    characteristicHint: 'Write it as a complete question. e.g., "Is it a fighting game?", "Does it have open world?", "Is the game in 2D?"',
    characteristicPlaceholder: 'e.g., "Is it a fighting game?", "Does it have multiplayer?", "Is it a 2D platformer?"',
    previewLabel: 'Question preview',
    submitButton: 'Teach the Genie',
    translating: 'Translating...',
    footer: 'The Genie never forgets! Thank you for teaching me.',
  },
  footer: {
    text: 'GENIE GAME • Undefeated Mind Reader',
  },
};

export type TranslationKeys = typeof en;
