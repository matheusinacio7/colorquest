export enum Language {
  ENGLISH,
  PORTUGUESE,
}

const difficulty = {
  [Language.ENGLISH]: {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard',
    'ultraHard': 'Insane',
  },
  [Language.PORTUGUESE]: {
    'easy': 'Fácil',
    'medium': 'Médio',
    'hard': 'Difícil',
    'ultraHard': 'Insano',
  }
}

const gameMode = {
  'rgb': 'RGB',
  'hex': 'Hex',
}

const gameUi = {
  [Language.ENGLISH]: {
    'playing': 'Which color is this?',
    'win': 'Gratz!!',
    'lose': 'Oops ):',
  },
  [Language.PORTUGUESE]: {
    'playing': 'Qual cor é essa?',
    'win': 'Parabéns!!',
    'lose': 'Opa ):',
  }
}

export class Dictionary {
  difficulty: {
    'easy': string,
    'medium': string,
    'hard': string,
    'ultraHard': string,
  }
  gameMode : {
    'rgb': string,
    'hex': string,
  }
  gameUi: {
    'playing': string,
    'win': string,
    'lose': string,
  }

  constructor (language: Language) {
    this.difficulty = difficulty[language];
    this.gameMode = gameMode;
    this.gameUi = gameUi[language];
  }
}
