import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Color from '../classes/Color';
import { ColorShiftArray } from '../classes/ColorShift';

import { getLoadedConfigurations, saveConfiguration, GameContext, GameStatus } from '../contexts/GameContext';

import shuffle from '../utils/shuffle';

interface IColorContext {
  currentTarget: Color;
  currentDraw: {color: Color, isTarget: boolean}[];
  drawNewGame: () => void;
}

export const ColorContext = createContext({} as IColorContext);

function getAccents(draw: {color: Color, isTarget: boolean}[]) {
  draw.forEach((draw) => {
    draw.color.average = Math.round(draw.color.rgbArray.reduce((acc, curr) => acc + curr, 0) / 3);
  });

  const sorted = draw.sort((a, b) => b.color.average - a.color.average);

  return [sorted[0], sorted[4]];
}

export function ColorProvider(props: {children: ReactNode}) {
  const [target, setTarget] = useState(new Color());
  const [draw, setDraw] = useState<Array<{color: Color, isTarget: boolean}>>(null);

  const { localStorage, onDrawNewGame, rootElement, nextConfig } = useContext(GameContext);

  function changeStyles(existingDraw?: {color: Color, isTarget: boolean}[]) {
    const styleDraw = existingDraw ? existingDraw : draw;
    const accents = getAccents(styleDraw);

    rootElement.style.setProperty('--accent-light', accents[0].color.hexString);
    rootElement.style.setProperty('--accent-dark', accents[1].color.hexString);

    rootElement.style.setProperty('--color-1', styleDraw[0].color.hexString);
    rootElement.style.setProperty('--color-2', styleDraw[1].color.hexString);
    rootElement.style.setProperty('--color-3', styleDraw[2].color.hexString);
    rootElement.style.setProperty('--color-4', styleDraw[3].color.hexString);
    rootElement.style.setProperty('--color-5', styleDraw[4].color.hexString);
  }

  function drawNewGame() {
    const newTarget = new Color().beRandom({ban: [242, 242, 242]});
    setTarget(newTarget);

    const colorShiftArray = new ColorShiftArray({difficulty: nextConfig.difficulty, originalColor: newTarget.rgbArray});

    const newDraw = shuffle(colorShiftArray.shiftArray.map(({shift}) => {
      const color = new Color(...newTarget.rgbArray).shift(...shift);
      return {
        color,
        isTarget: color.hexString === newTarget.hexString,
      };
    }));

    setDraw(newDraw);
    saveConfiguration(localStorage, 'draw', newDraw);
    saveConfiguration(localStorage, 'target', newTarget);
    onDrawNewGame();

    if (rootElement) {
      changeStyles(newDraw);
    }

    return newDraw;
  }

  useEffect(() => {
    if (!localStorage) return;

    const loadedConfigs = getLoadedConfigurations(localStorage, 'draw', 'gameStatus', 'target');

    if (!loadedConfigs.draw || loadedConfigs.gameStatus !== GameStatus.PLAYING) {
      drawNewGame();
    } else {
      setDraw(loadedConfigs.draw);
      setTarget(loadedConfigs.target);
      changeStyles(loadedConfigs.draw);
    }
  }, [localStorage]);

  return (
    <ColorContext.Provider value={{
      currentTarget: target,
      currentDraw: draw,
      drawNewGame,
    }}>
      {props.children}
    </ColorContext.Provider>
  );
}
