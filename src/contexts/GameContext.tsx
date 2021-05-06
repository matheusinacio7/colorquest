import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

export enum GameStatus {
  PLAYING,
  WON,
  LOST,
}

interface IGameContext {
  difficulty: string;
  changeDifficulty: (newDifficulty: string) => void;
  gameMode: string;
  changeGameMode: (newMode: string) => void;
  gameStatus: GameStatus;
  changeGameStatus: (newStatus: GameStatus) => void;
  rootElement: HTMLElement;
  setRootElement: (rootElement: HTMLElement) => void;
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [difficulty, setDifficulty] = useState('easy');
  const [gameMode, setGameMode] = useState('rgb');
  const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
  const [rootElement, setRootElement] = useState(null);

  function changeDifficulty(newDifficulty: string) {
    setDifficulty(newDifficulty);
  }

  function changeGameMode(newMode: string) {
    setGameMode(newMode);
  }

  function changeGameStatus(newStatus: GameStatus) {
    setGameStatus(newStatus);
  }

  return (
  <GameContext.Provider value={{
    difficulty,
    changeDifficulty,
    gameMode,
    changeGameMode,
    changeGameStatus,
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
