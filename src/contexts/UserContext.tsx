import { createContext, useState, ReactNode } from 'react';
import expTable from '../../assets/expTable.json';

const expByGameDifficulty = {
  easy: 35,
  medium: 60,
  hard: 120,
  ultraHard: 500,
};

const expFactors = {
  '-3': 0,
  '-2': 1/25,
  '-1': 1/5,
  '0': 1,
  '1': 1,
  '2': 1/25,
  '3': 1/25,
}

const ranks = ['Peasant', 'Soldier', 'Knight', 'Champion'];
const difficulties = ['easy', 'medium', 'hard', 'ultraHard'];

interface IUserContext {
  currentExp: number,
  currentLevel: {level: number, minExp: number, maxExp: number},
  loseGame: () => void,
  winGame: () => void,
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider( props: {children: ReactNode} ) {
  const [currentExp, setCurrentExp] = useState(0);
  const [currentRank, setCurrentRank] = useState(ranks[1]);
  const [currentLevel, setCurrentLevel] = useState({level: 1, minExp: 0, maxExp: expTable[0].expToNextLevel});

  const currentDifficulty = 'ultraHard';

  function getExp() {
    const gameDifficultyIndex = difficulties.indexOf(currentDifficulty);
    const rankIndex = ranks.indexOf(currentRank);

    const expFactor = expFactors[gameDifficultyIndex - rankIndex];
    return Math.ceil(expByGameDifficulty[currentDifficulty] * expFactor);
  }

  function loseGame() {
    setCurrentExp(previous => Math.max(previous - getExp(), currentLevel.minExp));
    console.log('lost');
  }

  function winGame() {
    setCurrentExp(previous => Math.min(previous + getExp(), currentLevel.maxExp));
    console.log('won');
  }
  
  return(
    <UserContext.Provider value={{
      currentExp,
      currentLevel,
      loseGame,
      winGame,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}