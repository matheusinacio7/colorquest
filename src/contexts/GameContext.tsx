import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

interface IGameContext {
  difficulty: string,
  changeDifficulty: (newDifficulty: string) => void,
  gameMode: string,
  changeGameMode: (newMode: string) => void,
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [gameMode, setGameMode] = useState('rgb');
  const [difficulty, setDifficulty] = useState('easy');

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
    changeGameMode,
  }}>
    <UserProvider>
      <ColorProvider>
        {props.children}
      </ColorProvider>
    </UserProvider>
  </GameContext.Provider>)
}
