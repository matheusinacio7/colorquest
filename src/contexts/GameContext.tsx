import { createContext, ReactNode, useState } from 'react';
import Color from '../classes/Color';

interface IGameContext {
  currentTarget: Color,
  currentDraw: [Color, Color, Color, Color, Color],
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const target = new Color().beRandom();
  
  return (
  <GameContext.Provider value={{
    currentTarget: target,
    currentDraw: [target, target, target, target, target]
  }}>
    {props.children};
  </GameContext.Provider>)
}
