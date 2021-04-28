import { createContext, useState, ReactNode } from 'react';
import { ColorProvider } from './ColorContext';
import { UserProvider } from './UserContext';

export const GameContext = createContext({});

export function GameProvider(props: {children: ReactNode}) {
  return (
  <GameContext.Provider value={{}}>
    <UserProvider>
      <ColorProvider>
        {props.children}
      </ColorProvider>
    </UserProvider>
  </GameContext.Provider>)
}
