import type { TranslationKeys } from './en';

export const es: TranslationKeys = {
  header: {
    title: 'GENIE GAME',
    subtitle: 'Lector de Mentes Supremo',
  },
  intro: {
    summon: 'INVOCA AL GENIO',
    challenge: 'Desafía a la IA lectora de mentes más poderosa',
    step1Title: 'Piensa en CUALQUIER videojuego',
    step1Desc: 'Desde clásicos hasta obras maestras modernas',
    step2Title: 'Responde las preguntas místicas',
    step2Desc: 'Sé honesto con tus respuestas',
    step3Title: '¡Mira al Genio leer tu mente!',
    step3Desc: 'Precisión perfecta, cada vez',
    startButton: 'Despertar al Genio',
  },
  genie: {
    idle: 'Soy el GENIO. Piensa en cualquier juego. Leeré tu mente con precisión absoluta.',
    thinking: 'Tus pensamientos se aclaran... Los patrones emergen... Lo veo todo...',
    guessing: '¡La respuesta se cristaliza... Tu mente revela la verdad!',
    victory: '¡PERFECCIÓN! ¡He leído tus pensamientos perfectamente! ¡El Genio NUNCA falla!',
    learn: 'Enséñame! Nunca lo olvidaré...',
    ready: 'LISTO',
    analyzing: 'ANALIZANDO...',
    revealing: 'REVELANDO...',
    predicted: '¡PREDICHO!',
  },
  question: {
    yes: 'SÍ',
    no: 'NO',
  },
  reveal: {
    title: '¡MENTE LEÍDA!',
    wasTheGame: 'El juego era',
    questionCount: '¡Hice {{count}} pregunta para descubrirlo!',
    questionCountPlural: '¡Hice {{count}} preguntas para descubrirlo!',
    yesButton: 'SÍ',
    noButton: 'NO',
    footer: '¡El Genio siempre está aprendiendo y mejorando!',
  },
  learn: {
    title: '¡Enséñame!',
    gameLabel: '¿En qué juego estabas pensando?',
    gamePlaceholder: 'Ingresa el nombre del juego...',
    characteristicLabel: '¿Qué tiene {{correctGame}} que no tiene {{wrongGame}}?',
    characteristicLabelEmpty: '¿Qué tiene tu juego que no tiene {{wrongGame}}?',
    characteristicPlaceholder: 'Describe una característica única...',
    submitButton: 'Enseñar al Genio',
    footer: '¡El Genio nunca olvida! Gracias por enseñarme.',
  },
  footer: {
    text: 'GENIE GAME • Lector de Mentes Invicto',
  },
};
