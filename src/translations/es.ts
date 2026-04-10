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
    characteristicLabel: 'Escribe una pregunta de SÍ/NO que sea VERDADERA para "{{correctGame}}" pero NO para "{{wrongGame}}"',
    characteristicLabelEmpty: 'Escribe una pregunta de SÍ/NO que sea VERDADERA para tu juego pero NO para "{{wrongGame}}"',
    characteristicHint: 'Escríbela como una pregunta completa. Ej: "¿Es un juego de lucha?", "¿Tiene mundo abierto?", "¿Es un juego 2D?"',
    characteristicPlaceholder: 'Ej: "¿Es un juego de lucha?", "¿Tiene modo multijugador?", "¿Es un plataformas 2D?"',
    previewLabel: 'Vista previa de la pregunta',
    submitButton: 'Enseñar al Genio',
    translating: 'Traduciendo...',
    footer: '¡El Genio nunca olvida! Gracias por enseñarme.',
  },
  footer: {
    text: 'GENIE GAME • Lector de Mentes Invicto',
  },
};
