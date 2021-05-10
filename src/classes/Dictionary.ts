export enum Language {
  ENGLISH,
  PORTUGUESE,
}

const difficulty = {
  [Language.ENGLISH]: {
    'EASY': 'Easy',
    'MEDIUM': 'Medium',
    'HARD': 'Hard',
    'ULTRAHARD': 'Insane',
  },
  [Language.PORTUGUESE]: {
    'EASY': 'Fácil',
    'MEDIUM': 'Médio',
    'HARD': 'Difícil',
    'ULTRAHARD': 'Insano',
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

const ranks = {
  [Language.ENGLISH]: {
    'peasant': 'Peasant',
    'soldier': 'Soldier',
    'knight': 'Knight',
    'champion': 'Champion',
  }
}


export class Dictionary {
  difficulty: {
    'EASY': string,
    'MEDIUM': string,
    'HARD': string,
    'ULTRAHARD': string,
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
  ranks: {
    'peasant': string,
    'soldier': string,
    'knight': string,
    'champion': string,
  }

  constructor (language: Language) {
    this.difficulty = difficulty[language];
    this.gameMode = gameMode;
    this.gameUi = gameUi[language];
    this.ranks = ranks[language];
  }
}
