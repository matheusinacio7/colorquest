import { createContext, ReactNode, useState } from 'react';
import Color from '../classes/Color';

interface IGameContext {
  currentTarget: Color,
  currentDraw: [Color, Color, Color, Color, Color],
  drawNewGame: () => void,
}

export const GameContext = createContext({} as IGameContext);

export function GameProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color().beRandom());

  function drawNewGame() {
    const newTarget = new Color().beRandom();
    setTarget(newTarget);
  }
  
  return (
  <GameContext.Provider value={{
    currentTarget: target,
    currentDraw: [target, target, target, target, target],
    drawNewGame,
  }}>
    {props.children};
  </GameContext.Provider>)
}
