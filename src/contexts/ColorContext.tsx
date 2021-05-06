import { createContext, useContext, useState, ReactNode } from 'react';
import Color from '../classes/Color';
import { ColorShiftArray } from '../classes/ColorShift';

import { GameContext } from '../contexts/GameContext';

import shuffle from '../utils/shuffle';

interface IColorContext {
  changeStyles: () => void;
  currentTarget: Color;
  currentDraw: {color: Color, isTarget: boolean}[];
  drawNewGame: () => void;
}

export const ColorContext = createContext({} as IColorContext);

export function ColorProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color());
  const [draw, setDraw] = useState(new Array(5).fill({color: new Color(), isTarget: false}));

  const { rootElement } = useContext(GameContext);
  const currentDifficulty = 'easy';

  function changeStyles() {
    rootElement.style.setProperty('--color-1', draw[0].color.hexString);
    rootElement.style.setProperty('--color-2', draw[1].color.hexString);
    rootElement.style.setProperty('--color-3', draw[2].color.hexString);
    rootElement.style.setProperty('--color-4', draw[3].color.hexString);
    rootElement.style.setProperty('--color-5', draw[4].color.hexString);
  }

  function drawNewGame() {
    const newTarget = new Color().beRandom({ban: [242, 242, 242]});
    setTarget(newTarget);

    const colorShiftArray = new ColorShiftArray({difficulty: currentDifficulty, originalColor: newTarget.rgbArray});

    const newDraw = shuffle(colorShiftArray.shiftArray.map(({shift}) => {
      const color = new Color(...newTarget.rgbArray).shift(...shift);
      return {
        color,
        isTarget: color.hexString === newTarget.hexString,
      };
    }));

    setDraw(newDraw);
  }

  return (
    <ColorContext.Provider value={{
      changeStyles,
      currentTarget: target,
      currentDraw: draw,
      drawNewGame,
    }}>
      {props.children}
    </ColorContext.Provider>
  );
}
