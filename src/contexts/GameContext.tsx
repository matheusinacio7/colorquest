import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';

export const GameContext = createContext({});

export function GameProvider(props: {children: ReactNode}) {
  return (
  <GameContext.Provider value={{}}>
    <ColorProvider>
      {props.children}
    </ColorProvider>
  </GameContext.Provider>)
}
