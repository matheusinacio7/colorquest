import { createContext, useState, ReactNode } from 'react';
import Color from '../classes/Color';

interface IColorContext {
  changeStyles: (any) => void,
  currentTarget: Color,
  currentDraw: [Color, Color, Color, Color, Color],
  drawNewGame: () => void,
}

export const ColorContext = createContext({} as IColorContext);

export function ColorProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color());

  function changeStyles(rootElement) {
    rootElement.style.setProperty('--color-1', target.hexString);
  }

  function drawNewGame() {
    const newTarget = new Color().beRandom();
    setTarget(newTarget);
  }

  return (
    <ColorContext.Provider value={{
      changeStyles,
      currentTarget: target,
      currentDraw: [target, target, target, target, target],
      drawNewGame,
    }}>
      {props.children}
    </ColorContext.Provider>
  );
}
