import { createContext, useContext, useState, ReactNode } from 'react';
import Color from '../classes/Color';
import { ColorShiftArray } from '../classes/ColorShift';

import { GameContext } from '../contexts/GameContext';

import shuffle from '../utils/shuffle';

interface IColorContext {
  changeStyles: () => void;
  currentTarget: Color;
  currentDraw: Color[];
  drawNewGame: () => void;
}

export const ColorContext = createContext({} as IColorContext);

export function ColorProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color());
  const [draw, setDraw] = useState([new Color(), new Color(), new Color(), new Color(), new Color()]);

  const { rootElement } = useContext(GameContext);
  const currentDifficulty = 'easy';

  function changeStyles() {
    rootElement.style.setProperty('--color-1', draw[0].hexString);
    rootElement.style.setProperty('--color-2', draw[1].hexString);
    rootElement.style.setProperty('--color-3', draw[2].hexString);
    rootElement.style.setProperty('--color-4', draw[3].hexString);
    rootElement.style.setProperty('--color-5', draw[4].hexString);
  }

  function drawNewGame() {
    const newTarget = new Color().beRandom({ban: [242, 242, 242]});
    setTarget(newTarget);
    const colorShiftArray = new ColorShiftArray({difficulty: currentDifficulty, originalColor: newTarget.rgbArray});
    let newDraw = Array<Color>();

    // refatorar para map

    colorShiftArray.shiftArray.forEach(shiftArray => {
      newDraw.push(new Color(...newTarget.rgbArray).shift(...shiftArray.shift));
    });

    newDraw = shuffle(newDraw);

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
