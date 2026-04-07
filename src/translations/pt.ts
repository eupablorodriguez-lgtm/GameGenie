import type { TranslationKeys } from './en';

export const pt: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'Leitor de Mentes Supremo',
  },
  intro: {
    summon: 'INVOQUE O GÊNIO',
    challenge: 'Desafie a IA leitora de mentes mais poderosa',
    step1Title: 'Pense em QUALQUER jogo',
    step1Desc: 'De clássicos a obras-primas modernas',
    step2Title: 'Responda as perguntas místicas',
    step2Desc: 'Seja honesto com suas respostas',
    step3Title: 'Veja o Gênio ler sua mente!',
    step3Desc: 'Precisão perfeita, todas as vezes',
    startButton: 'Despertar o Gênio',
  },
  genie: {
    idle: 'Eu sou o GÊNIO. Pense em qualquer jogo. Eu vou ler sua mente com precisão absoluta.',
    thinking: 'Seus pensamentos se tornam claros... Os padrões emergem... Eu vejo tudo...',
    guessing: 'A resposta se cristaliza... Sua mente revela a verdade!',
    victory: 'PERFEIÇÃO! Eu li seus pensamentos perfeitamente! O Gênio NUNCA falha!',
    learn: 'Me ensine! Eu nunca vou esquecer...',
    ready: 'PRONTO',
    analyzing: 'ANALISANDO...',
    revealing: 'REVELANDO...',
    predicted: 'PREVISTO!',
  },
  question: {
    yes: 'SIM',
    no: 'NÃO',
  },
  reveal: {
    title: 'MENTE LIDA!',
    wasTheGame: 'O jogo era',
    questionCount: 'Fiz {{count}} pergunta para descobrir!',
    questionCountPlural: 'Fiz {{count}} perguntas para descobrir!',
    yesButton: 'SIM',
    noButton: 'NÃO',
    footer: 'O Gênio está sempre aprendendo e melhorando!',
  },
  learn: {
    title: 'Me ensine!',
    gameLabel: 'Em que jogo você pensou?',
    gamePlaceholder: 'Digite o nome do jogo...',
    characteristicLabel: 'O que tem no {{correctGame}} que não tem no {{wrongGame}}?',
    characteristicLabelEmpty: 'O que tem no seu jogo que não tem no {{wrongGame}}?',
    characteristicPlaceholder: 'Descreva uma característica única...',
    submitButton: 'Ensinar ao Gênio',
    footer: 'O Gênio nunca esquece! Obrigado por me ensinar.',
  },
  footer: {
    text: 'GENIE GAME • Leitor de Mentes Invicto',
  },
};
