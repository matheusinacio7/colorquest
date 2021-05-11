import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

import { ModalType } from '../components/Modal';

export enum GameStatus {
  PLAYING,
  WON,
  LOST,
  FORFEIT,
};

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
  ULTRAHARD,
};

interface IGameContext {
  currentDifficulty: Difficulty;
  changeDifficulty: (newDifficulty: Difficulty) => void;
  gameMode: string;
  changeGameMode: (newMode: string) => void;
  gameStatus: GameStatus;
  changeGameStatus: (newStatus: GameStatus) => void;
  rootElement: HTMLElement;
  setRootElement: (rootElement: HTMLElement) => void;
  modalType: ModalType;
  closeModal: () => void;
  openModal: (newType: ModalType) => void;
  configIsOpen: boolean;
  setConfigIsOpen: (newState: boolean) => void;
  nextConfig: { gameMode: string, difficulty: Difficulty };
  setNextConfig: (newConfig: {gameMode: string, difficulty: Difficulty}) => void;
  onDrawNewGame: () => void;
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [currentDifficulty, setDifficulty] = useState(Difficulty.EASY);
  const [gameMode, setGameMode] = useState('rgb');
  const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
  const [rootElement, setRootElement] = useState(null);
  const [modalType, setModalType] = useState(ModalType.None);
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const [nextConfig, setNextConfig] = useState({gameMode: 'rgb', difficulty: Difficulty.EASY});

  function changeDifficulty(newDifficulty: Difficulty) {
    setDifficulty(newDifficulty);
  }

  function changeGameMode(newMode: string) {
    setGameMode(newMode);
  }

  function changeGameStatus(newStatus: GameStatus) {
    setGameStatus(newStatus);
  }

  function closeModal() {
    setModalType(ModalType.None);
  }

  function openModal(newType: ModalType) {
    setModalType(newType);
    console.log(newType);
  }

  function onDrawNewGame() {
    setGameMode(nextConfig.gameMode);
    setDifficulty(nextConfig.difficulty);
  }

  return (
  <GameContext.Provider value={{
    currentDifficulty,
    changeDifficulty,
    gameMode,
    changeGameMode,
    changeGameStatus,
    gameStatus,
    rootElement,
    setRootElement,
    modalType,
    closeModal,
    openModal,
    configIsOpen,
    setConfigIsOpen,
    nextConfig,
    setNextConfig,
    onDrawNewGame,
  }}>
    <ColorProvider>
      <UserProvider>
        {props.children}
      </UserProvider>
    </ColorProvider>
  </GameContext.Provider>)
}
