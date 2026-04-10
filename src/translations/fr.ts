import type { TranslationKeys } from './en';

export const fr: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'Lecteur d\'Esprit Ultime',
  },
  intro: {
    summon: 'INVOQUEZ LE GÉNIE',
    challenge: 'Défiez l\'IA lectrice d\'esprit la plus puissante',
    step1Title: 'Pensez à N\'IMPORTE QUEL jeu vidéo',
    step1Desc: 'Des classiques aux chefs-d\'œuvre modernes',
    step2Title: 'Répondez aux questions mystiques',
    step2Desc: 'Soyez honnête avec vos réponses',
    step3Title: 'Regardez le Génie lire votre esprit!',
    step3Desc: 'Précision parfaite, à chaque fois',
    startButton: 'Réveiller le Génie',
  },
  genie: {
    idle: 'Je suis le GÉNIE. Pensez à n\'importe quel jeu. Je lirai votre esprit avec une précision absolue.',
    thinking: 'Vos pensées deviennent claires... Les motifs émergent... Je vois tout...',
    guessing: 'La réponse se cristallise... Votre esprit révèle la vérité!',
    victory: 'PERFECTION! J\'ai lu vos pensées parfaitement! Le Génie ne se trompe JAMAIS!',
    learn: 'Apprenez-moi! Je n\'oublierai jamais...',
    ready: 'PRÊT',
    analyzing: 'ANALYSE...',
    revealing: 'RÉVÉLATION...',
    predicted: 'PRÉDIT!',
  },
  question: {
    yes: 'OUI',
    no: 'NON',
  },
  reveal: {
    title: 'ESPRIT LU!',
    wasTheGame: 'Le jeu était',
    questionCount: 'J\'ai posé {{count}} question pour le découvrir!',
    questionCountPlural: 'J\'ai posé {{count}} questions pour le découvrir!',
    yesButton: 'OUI',
    noButton: 'NON',
    footer: 'Le Génie apprend et s\'améliore toujours!',
  },
  learn: {
    title: 'Apprenez-moi!',
    gameLabel: 'À quel jeu pensiez-vous?',
    gamePlaceholder: 'Entrez le nom du jeu...',
    characteristicLabel: 'Écrivez une question OUI/NON qui est VRAIE pour "{{correctGame}}" mais PAS pour "{{wrongGame}}"',
    characteristicLabelEmpty: 'Écrivez une question OUI/NON qui est VRAIE pour votre jeu mais PAS pour "{{wrongGame}}"',
    characteristicHint: 'Écrivez-la comme une question complète. Ex: "Est-ce un jeu de combat?", "A-t-il un monde ouvert?", "Est-ce un jeu 2D?"',
    characteristicPlaceholder: 'Ex: "Est-ce un jeu de combat?", "A-t-il un mode multijoueur?", "Est-ce un jeu de plateforme 2D?"',
    previewLabel: 'Aperçu de la question',
    submitButton: 'Enseigner au Génie',
    translating: 'Traduction...',
    footer: 'Le Génie n\'oublie jamais! Merci de m\'avoir appris.',
  },
  footer: {
    text: 'GENIE GAME • Lecteur d\'Esprit Invaincu',
  },
};
