import type { TranslationKeys } from './en';

export const zh: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: '终极读心者',
  },
  intro: {
    summon: '召唤精灵',
    challenge: '挑战最强大的读心AI',
    step1Title: '想一个任意的电子游戏',
    step1Desc: '从经典到现代杰作',
    step2Title: '回答神秘的问题',
    step2Desc: '诚实回答',
    step3Title: '看精灵读懂你的思想！',
    step3Desc: '完美准确，每一次',
    startButton: '唤醒精灵',
  },
  genie: {
    idle: '我是精灵。想任何游戏。我会以绝对精确读懂你的思想。',
    thinking: '你的思想变得清晰...模式出现...我看到了一切...',
    guessing: '答案明确了...你的思想揭示了真相！',
    victory: '完美！我完美地读懂了你的思想！精灵从不失败！',
    learn: '教我！我永远不会忘记...',
    ready: '准备就绪',
    analyzing: '分析中...',
    revealing: '揭示中...',
    predicted: '已预测！',
  },
  question: {
    yes: '是',
    no: '否',
  },
  reveal: {
    title: '读心成功！',
    wasTheGame: '游戏是',
    questionCount: '我问了{{count}}个问题就发现了！',
    questionCountPlural: '我问了{{count}}个问题就发现了！',
    yesButton: '是',
    noButton: '否',
    footer: '精灵一直在学习和进步！',
  },
  learn: {
    title: '教我！',
    gameLabel: '你在想什么游戏？',
    gamePlaceholder: '输入游戏名称...',
    characteristicLabel: '写一个是/否问题，对"{{correctGame}}"为真，但对"{{wrongGame}}"不为真',
    characteristicLabelEmpty: '写一个是/否问题，对你的游戏为真，但对"{{wrongGame}}"不为真',
    characteristicHint: '写成一个完整的问题。例如："它是格斗游戏吗？"、"它有开放世界吗？"、"它是2D游戏吗？"',
    characteristicPlaceholder: '例如："它是格斗游戏吗？"、"它有多人模式吗？"、"它是2D平台游戏吗？"',
    previewLabel: '问题预览',
    submitButton: '教精灵',
    translating: '翻译中...',
    footer: '精灵永远不会忘记！谢谢你教我。',
  },
  footer: {
    text: 'GENIE GAME • 不败的读心者',
  },
};
