import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import expTable from '../../assets/expTable.json';

import { GameContext, GameStatus } from '../contexts/GameContext';

const MAX_STREAK = 5;

const expByGameDifficulty = {
  easy: 35,
  medium: 60,
  hard: 120,
  ultraHard: 500,
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

const ranks = ['Peasant', 'Soldier', 'Knight', 'Champion'];
const difficulties = ['easy', 'medium', 'hard', 'ultraHard'];

interface IUserContext {
  currentExp: number;
  currentLevel: {level: number, minExp: number, maxExp: number};
  currentStreak: number;
  hasLeveledUp: boolean;
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider( props: {children: ReactNode} ) {
  const [currentExp, setCurrentExp] = useState(0);
  const [currentRank, setCurrentRank] = useState(ranks[0]);
  const [currentLevel, setCurrentLevel] = useState({index: 0, level: 1, minExp: 0, maxExp: expTable[0].expToNextLevel});
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  const [currentStreak, setStreak] = useState(0);

  const { difficulty, gameMode, gameStatus, rootElement } = useContext(GameContext);

  function gainOrLoseExp(expDiff: number) {
    setCurrentExp(previous => Math.max(Math.min(previous + expDiff, currentLevel.maxExp), currentLevel.minExp));
  }

  function getExp(streak: number) {
    const gameDifficultyIndex = difficulties.indexOf(difficulty);
    const rankIndex = ranks.indexOf(currentRank);

    const difficultyFactor = difficultyExpMultipliers[gameDifficultyIndex - rankIndex];
    const streakFactor = streakMultipliers[streak];
    const modeFactor = gameModeExpMultipliers[gameMode];

    const expFactor = difficultyFactor * streakFactor * modeFactor;

    return Math.ceil(expByGameDifficulty[difficulty] * expFactor);
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

  useEffect(() => {
    if (gameStatus === GameStatus.WON) {
      winGame();
    } else if (gameStatus === GameStatus.LOST) {
      loseGame();
    }
  }, [gameStatus]);
  
  return(
    <UserContext.Provider value={{
      currentExp,
      currentLevel,
      currentStreak,
      hasLeveledUp
    }}>
      {props.children}
    </UserContext.Provider>
  )
}