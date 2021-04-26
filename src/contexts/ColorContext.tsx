import { createContext, useState, ReactNode } from 'react';
import Color from '../classes/Color';

interface IColorContext {
  currentTarget: Color,
  currentDraw: [Color, Color, Color, Color, Color],
  drawNewGame: () => void,
}

export const ColorContext = createContext({} as IColorContext);

export function ColorProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color().beRandom());

  function drawNewGame() {
    const newTarget = new Color().beRandom();
    setTarget(newTarget);
  }

  return (
    <ColorContext.Provider value={{
      currentTarget: target,
      currentDraw: [target, target, target, target, target],
      drawNewGame,
    }}>
      {props.children}
    </ColorContext.Provider>
  );
}
