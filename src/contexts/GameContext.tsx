import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

interface IGameContext {
  gameMode: string,
  changeGameMode: (newMode: string) => void,
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [gameMode, setGameMode] = useState('hex');

  function changeGameMode(newMode: string) {
    setGameMode(newMode);
  }

  return (
  <GameContext.Provider value={{
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
