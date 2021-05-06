import { useContext, useState, useEffect } from 'react';

import styles from '../../styles/modules/Game.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faRedo } from '@fortawesome/free-solid-svg-icons';
import { ColorContext } from '../../contexts/ColorContext';
import { GameContext, GameStatus } from '../../contexts/GameContext';
import { UserContext } from '../../contexts/UserContext';

import { Dictionary, Language } from '../../classes/Dictionary';

export default function Game( props: {className: string} ) {
  const { changeStyles, currentDraw, currentTarget, drawNewGame } = useContext(ColorContext);
  const { difficulty, gameMode, gameStatus, changeGameStatus, rootElement, setRootElement } = useContext(GameContext);
  const { expDelta } = useContext(UserContext);

  const [colorCircles, setColorCircles] = useState(null);
  const [colorCircleGroup, setColorCircleGroup] = useState(null);
  const [currentlyPressedElement, setCurrentlyPressedElement] = useState(null);
  const [currentlyCorrectElement, setCurrentlyCorrectElement] = useState(null);
  
  const dict = new Dictionary(Language.ENGLISH);

  useEffect(() => {
    setRootElement(document.querySelector(':root'));
    drawNewGame();

    const colorElements = document.getElementsByClassName(styles.color);

    setColorCircles(colorElements);
    setColorCircleGroup(document.querySelector(`.${styles.colorGroup}`));
  }, []);

  useEffect(() => {
    if (!rootElement) return;

    changeStyles();
    
    if (!currentlyCorrectElement || !currentlyPressedElement || !colorCircleGroup) {
      return;
    }

    changeGameStatus(GameStatus.PLAYING);
    currentlyPressedElement.classList.remove(styles.colorPressed);
    currentlyCorrectElement.classList.remove(styles.colorCorrect);
    colorCircleGroup.classList.remove(styles.cantPick);
  }, [currentTarget]);

  function pickColor(e) {
    if (gameStatus !== GameStatus.PLAYING) return;

    const index = e.target.dataset.index;

    setCurrentlyPressedElement(e.target);

    e.target.classList.add(styles.colorPressed);
    colorCircleGroup.classList.add(styles.cantPick);

    if (currentDraw[index].isTarget) {
      changeGameStatus(GameStatus.WON);
      e.target.classList.add(styles.colorCorrect);
      setCurrentlyCorrectElement(e.target);
    } else {
      changeGameStatus(GameStatus.LOST);

      const correctColorIndex = currentDraw.findIndex((colorInfo) => colorInfo.isTarget);

      colorCircles[correctColorIndex].classList.add(styles.colorCorrect);
      setCurrentlyCorrectElement(colorCircles[correctColorIndex]);
    }
  }

  function GameStatusBar() {
    function firstBarContent () {
      if (gameStatus === GameStatus.PLAYING) {
        return dict.gameUi.playing;
      } else {
        return currentTarget[`${gameMode}String`]
      }
    }

    function secondBarContent () {
      switch (gameStatus) {
        case GameStatus.PLAYING:
          return currentTarget[`${gameMode}String`];
        case GameStatus.WON:
          return dict.gameUi.win;
        case GameStatus.LOST:
          return dict.gameUi.lose;
      }
    }

    function thirdBarContent () {
      switch (gameStatus) {
        case GameStatus.PLAYING:
          return `${dict.gameMode[gameMode]}, ${dict.difficulty[difficulty]}`;
        case GameStatus.WON:
          return `+ ${expDelta} XP`;
        case GameStatus.LOST:
          return `- ${expDelta} XP`;
      }
    }

    return (
      <p>
        <span>{firstBarContent()}</span>
        <span>{secondBarContent()}</span>
        <span>{thirdBarContent()}</span>
      </p>
    )
  }

  return (
    <section className={`${props.className} ${styles.game}`}>
      <div className={styles.info}>
        <div className={styles.config}>
          <button>
            <FontAwesomeIcon icon={faCog} size="lg"></FontAwesomeIcon>
          </button>
        </div>
        <GameStatusBar />
        <div className={styles.draw}>
          <button onClick={drawNewGame}>
            <FontAwesomeIcon icon={gameStatus === GameStatus.PLAYING ? faRedo : faArrowRight} size="2x"></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className={styles.colorGroup}>
        <div>
          <div data-index='0' className={`${styles.color1} ${styles.color}`} onClick={pickColor}></div>
          <div data-index='1' className={`${styles.color2} ${styles.color}`}  onClick={pickColor}></div>
          <div data-index='2' className={`${styles.color3} ${styles.color}`}  onClick={pickColor}></div>
        </div>
        <div>
          <div data-index='3' className={`${styles.color4} ${styles.color}`}  onClick={pickColor}></div>
          <div data-index='4' className={`${styles.color5} ${styles.color}`}  onClick={pickColor}></div>
        </div>
      </div>
    </section>
  );
}
