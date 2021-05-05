import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

interface IGameContext {
  difficulty: string;
  changeDifficulty: (newDifficulty: string) => void;
  gameMode: string;
  gameStatus: 'playing'|'won'|'lost';
  changeGameMode: (newMode: string) => void;
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [canPick, setCanPick] = useState(true);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameMode, setGameMode] = useState('rgb');
  const [gameStatus, setGameStatus] = useState('playing');

  function changeDifficulty(newDifficulty: string) {
    setDifficulty(newDifficulty);
  }

  function changeGameMode(newMode: string) {
    setGameMode(newMode);
  }

  return (
  <GameContext.Provider value={{
    difficulty,
    changeDifficulty,
    gameMode,
    gameStatus,
    changeGameMode,
  }}>
    <UserProvider>
      <ColorProvider>
        {props.children}
      </ColorProvider>
    </UserProvider>
  </GameContext.Provider>)
}
