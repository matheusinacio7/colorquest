import { createContext, useState, ReactNode } from 'react';
import expTable from '../../assets/expTable.json';

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

const streakMultipliers = [1, 1, 1, 1.5, 1.75, 2];

const ranks = ['Peasant', 'Soldier', 'Knight', 'Champion'];
const difficulties = ['easy', 'medium', 'hard', 'ultraHard'];

interface IUserContext {
  currentExp: number,
  currentLevel: {level: number, minExp: number, maxExp: number},
  hasLeveledUp: boolean,
  loseGame: () => void,
  winGame: (HTMLElement) => void,
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider( props: {children: ReactNode} ) {
  const [currentExp, setCurrentExp] = useState(0);
  const [currentRank, setCurrentRank] = useState(ranks[0]);
  const [currentLevel, setCurrentLevel] = useState({index: 0, level: 1, minExp: 0, maxExp: expTable[0].expToNextLevel});
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  const [currentStreak, setStreak] = useState(0);

  const currentDifficulty = 'easy';

  function gainOrLoseExp(expDiff: number) {
    setCurrentExp(previous => Math.max(Math.min(previous + expDiff, currentLevel.maxExp), currentLevel.minExp));
  }

  function getExp(streak: number) {
    const gameDifficultyIndex = difficulties.indexOf(currentDifficulty);
    const rankIndex = ranks.indexOf(currentRank);

    const difficultyFactor = difficultyExpMultipliers[gameDifficultyIndex - rankIndex];
    const streakFactor = streakMultipliers[streak];

    const expFactor = difficultyFactor * streakFactor;

    return Math.ceil(expByGameDifficulty[currentDifficulty] * expFactor);
  }

  function loseGame() {
    gainOrLoseExp(getExp(0) * -1);
    setStreak(0);
    console.log('lost');
  }

  function levelUp(exceedingExp: number, rootElement: HTMLElement) {
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

  function winGame(rootElement: HTMLElement) {
    const streak = Math.min(currentStreak + 1, 5);

    const exceedingExp = (currentExp + getExp(streak)) - currentLevel.maxExp;
    gainOrLoseExp(getExp(streak));

    if (exceedingExp > 0) {
      levelUp(exceedingExp, rootElement);
    }

    console.log('won');

    setStreak(streak);
  }
  
  return(
    <UserContext.Provider value={{
      currentExp,
      currentLevel,
      hasLeveledUp,
      loseGame,
      winGame,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}