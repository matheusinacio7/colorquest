import { createContext, useEffect, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

import expTable from '../../assets/expTable.json';

import { ModalType } from '../components/Modal';
import Color from 'classes/Color';

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

interface ConfigInterface {
  difficulty?: Difficulty;
  draw?: {color: Color, isTarget: boolean};
  target?: {color: Color, isTarget: boolean};
  gameMode?: string;
  gameStatus?: GameStatus;
  level?: {index: number, level: number, minExp: number, maxExp: number};
  rank?: {title: string, difficulty: Difficulty, minLevel: number, maxLevel: number, index: number};
  experience?: number;
  streak?: number;
}

const DEFAULTS:ConfigInterface = {
  difficulty: Difficulty.EASY,
  draw: null,
  target: null,
  gameMode: 'rgb',
  gameStatus: GameStatus.PLAYING,
  level: { index: 0, level: 1, minExp: 0, maxExp: expTable[0].expToNextLevel },
  rank: {
    title: 'peasant',
    difficulty: 0,
    minLevel: 1,
    maxLevel: 7,
    index: 0,
  },
  experience: 0,
  streak: 0,
}

export function getLoadedConfigurations(localStorage: Storage, ...keys: string[]):ConfigInterface {
  const loadedConfigs:ConfigInterface = {};

  keys.forEach((key) => {
    const stored = localStorage.getItem(key);

    loadedConfigs[key] = stored ? JSON.parse(stored) : DEFAULTS[key];
  });

  return loadedConfigs;
}

export function saveConfiguration(localStorage: Storage, key: string, value: any) {
  if (!localStorage) return;
  localStorage.setItem(key, JSON.stringify(value));
}

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
  localStorage: Storage;
  setLocalStorage: (localStorage: Storage) => void;
  clearLocalStorage: () => void;
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [currentDifficulty, setDifficulty] = useState(Difficulty.EASY);
  const [gameMode, setGameMode] = useState('rgb');
  const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
  const [rootElement, setRootElement] = useState(null);
  const [localStorage, setLocalStorage] = useState(null);
  const [modalType, setModalType] = useState(ModalType.None);
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const [nextConfig, setNextConfig] = useState({gameMode: 'rgb', difficulty: Difficulty.EASY});

  function changeDifficulty(newDifficulty: Difficulty) {
    setDifficulty(newDifficulty);
    saveConfiguration(localStorage, 'difficulty', newDifficulty);
  }

  function changeGameMode(newMode: string) {
    setGameMode(newMode);
    saveConfiguration(localStorage, 'gameMode', newMode);
  }

  function changeGameStatus(newStatus: GameStatus) {
    setGameStatus(newStatus);
    saveConfiguration(localStorage, 'gameStatus', newStatus);
  }

  function closeModal() {
    setModalType(ModalType.None);
  }

  function openModal(newType: ModalType) {
    setModalType(newType);
    console.log(newType);
  }

  function onDrawNewGame() {
    changeGameMode(nextConfig.gameMode);
    changeDifficulty(nextConfig.difficulty);
  }

  useEffect(() => {
    if(!localStorage) return;

    const loadedConfigs = getLoadedConfigurations(localStorage, 'gameMode', 'difficulty');
    changeGameMode(loadedConfigs.gameMode);
    changeDifficulty(loadedConfigs.difficulty);

    setNextConfig({
      gameMode: loadedConfigs.gameMode,
      difficulty: loadedConfigs.difficulty,
    });
  }, [localStorage]);

  function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
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
    localStorage,
    setLocalStorage,
    clearLocalStorage,
  }}>
    <ColorProvider>
      <UserProvider>
        {props.children}
      </UserProvider>
    </ColorProvider>
  </GameContext.Provider>)
}
