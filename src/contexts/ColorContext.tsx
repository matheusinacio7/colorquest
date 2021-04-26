import { createContext, useState, ReactNode } from 'react';
import Color from '../classes/Color';
import { ColorShiftArray } from '../classes/ColorShift';

import shuffle from '../utils/shuffle';

interface IColorContext {
  changeStyles: (any) => void,
  currentTarget: Color,
  currentDraw: [Color, Color, Color, Color, Color],
  drawNewGame: () => void,
}

export const ColorContext = createContext({} as IColorContext);

export function ColorProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color());
  const [draw, setDraw] = useState([new Color(), new Color(), new Color(), new Color(), new Color()]);

  const currentDifficulty = 'easy';

  function changeStyles(rootElement : HTMLElement) {
    rootElement.style.setProperty('--color-1', draw[0].hexString);
    rootElement.style.setProperty('--color-2', draw[1].hexString);
    rootElement.style.setProperty('--color-3', draw[2].hexString);
    rootElement.style.setProperty('--color-4', draw[3].hexString);
    rootElement.style.setProperty('--color-5', draw[4].hexString);
  }

  function drawNewGame() {
    const newTarget = new Color().beRandom();
    setTarget(newTarget);
    const colorShiftArray = new ColorShiftArray({difficulty: currentDifficulty, originalColor: newTarget.rgbArray});
    let newDraw = Array<Color>();

    colorShiftArray.shiftArray.forEach(shiftArray => {
      newDraw.push(new Color(...newTarget.rgbArray).shift(...shiftArray.shift));
      console.log(shiftArray.shift);
    });

    newDraw = shuffle(newDraw);

    console.log('--------------------');

    setDraw(newDraw);
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
