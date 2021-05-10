import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import expTable from '../../assets/expTable.json';

import { GameContext, GameStatus } from './GameContext';
import { ColorContext } from './ColorContext';

const MAX_STREAK = 5;

const expByGameDifficulty = {
  0: 35,
  1: 60,
  2: 120,
  3: 500,
};

const difficultyExpMultipliers = {
  '-3': 0,
  '-2': 1/25,
  '-1': 1/5,
  '0': 1,
  '1': 1,
  '2': 1/25,
  '3': 1/25,
}

const gameModeExpMultipliers = {
  'rgb': 1,
  'hex': 1.5,
}

const streakMultipliers = [1, 1, 1, 1.5, 1.75, 2];

const Ranks = [
  {
    title: 'peasant',
    difficulty: 0,
    minLevel: 1,
    maxLevel: 7,
    index: 0,
  },
  {
    title: 'soldier',
    difficulty: 1,
    minLevel: 8,
    maxLevel: 14,
    index: 1,
  },
  {
    title: 'knight',
    difficulty: 2,
    minLevel: 15,
    maxLevel: 29,
    index: 2,
  },
  {
    title: 'champion',
    difficulty: 3,
    minLevel: 30,
    maxLevel: 50,
    index: 3,
  },
];

interface IUserContext {
  currentExp: number;
  currentLevel: {level: number, minExp: number, maxExp: number};
  currentTitle: string;
  currentStreak: number;
  getExpDelta: () => number;
  hasLeveledUp: boolean;
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider( props: {children: ReactNode} ) {
  const [currentExp, setCurrentExp] = useState(0);
  const [currentRank, setCurrentRank] = useState(Ranks[0]);
  const [currentTitle, setCurrentTitle] = useState(Ranks[0].title);
  const [currentLevel, setCurrentLevel] = useState({index: 0, level: 1, minExp: 0, maxExp: expTable[0].expToNextLevel});
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  const [currentStreak, setStreak] = useState(0);

  const { changeGameStatus, currentDifficulty, gameMode, gameStatus, rootElement } = useContext(GameContext);
  const { drawNewGame } = useContext(ColorContext);

  function getExpDelta() {
    if (gameStatus === GameStatus.WON) {
      return getExp(Math.min(currentStreak + 1, MAX_STREAK));
    }

    return getExp(0);
  }

  function gainOrLoseExp(expDiff: number) {
    setCurrentExp(previous => Math.max(Math.min(previous + expDiff, currentLevel.maxExp), currentLevel.minExp));
  }

  function getExp(streak: number) {
    const difficultyFactor = difficultyExpMultipliers[currentDifficulty - currentRank.difficulty];
    const streakFactor = streakMultipliers[streak];
    const modeFactor = gameModeExpMultipliers[gameMode];

    const expFactor = difficultyFactor * streakFactor * modeFactor;

    return Math.ceil(expByGameDifficulty[currentDifficulty] * expFactor);
  }

  function loseGame() {
    gainOrLoseExp(getExp(0) * -1);
    setStreak(0);
    console.log('lost');
  }

  function levelUp(exceedingExp: number) {
    const currentLevelIndex = currentLevel.index;
    const nextLevel = expTable[currentLevelIndex + 1];
    const expFloor = currentLevel.maxExp;

    setTimeout(() => {
      rootElement.style.setProperty('--current-exp-transition', 'none');
      rootElement.style.setProperty('--exp-up-transition', 'none');

      setCurrentLevel({
        index: currentLevelIndex + 1,
        level: nextLevel.level,
        minExp: currentLevel.maxExp,
        maxExp: nextLevel.expToNextLevel,
      });

      setHasLeveledUp(true);

      if (nextLevel.level > currentRank.maxLevel) {
        const nextRank = Ranks[currentRank.index + 1];
        setCurrentRank(nextRank);
        setCurrentTitle(nextRank.title);
      }

      setCurrentExp(expFloor + 1);
    }, 2250);

    setTimeout(() => {
      rootElement.style.setProperty('--current-exp-transition', 'width 0.75s ease-in');
      rootElement.style.setProperty('--exp-up-transition', 'width 0.25s ease-in');
      setHasLeveledUp(false);
      setCurrentExp(expFloor + exceedingExp);
    }, 2300);
  }

  function winGame() {
    const streak = Math.min(currentStreak + 1, MAX_STREAK);

    const exceedingExp = (currentExp + getExp(streak)) - currentLevel.maxExp;
    gainOrLoseExp(getExp(streak));

    if (exceedingExp > 0) {
      levelUp(exceedingExp);
    }

    console.log('won');

    setStreak(streak);
  }

  function forfeitGame() {
    loseGame();
    drawNewGame();
    changeGameStatus(GameStatus.PLAYING);
  }

  useEffect(() => {
    const gameStatusFunctions = {
      [GameStatus.WON]: winGame,
      [GameStatus.LOST]: loseGame,
      [GameStatus.PLAYING]: () => {},
      [GameStatus.FORFEIT]: forfeitGame,
    };

    gameStatusFunctions[gameStatus]();

  }, [gameStatus]);
  
  return(
    <UserContext.Provider value={{
      currentExp,
      currentLevel,
      currentTitle,
      currentStreak,
      getExpDelta,
      hasLeveledUp
    }}>
      {props.children}
    </UserContext.Provider>
  )
}