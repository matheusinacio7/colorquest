import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

enum GameStatus {
  playing,
  won,
  lost,
}

interface IGameContext {
  difficulty: string;
  changeDifficulty: (newDifficulty: string) => void;
  gameMode: string;
  gameStatus: GameStatus;
  rootElement: HTMLElement;
  setRootElement: (rootElement: HTMLElement) => void;
  changeGameMode: (newMode: string) => void;
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [difficulty, setDifficulty] = useState('easy');
  const [gameMode, setGameMode] = useState('rgb');
  const [gameStatus, setGameStatus] = useState(GameStatus.playing);
  const [rootElement, setRootElement] = useState(null);

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
    gameStatus,
    rootElement,
    setRootElement,
  }}>
    <UserProvider>
      <ColorProvider>
        {props.children}
      </ColorProvider>
    </UserProvider>
  </GameContext.Provider>)
}
