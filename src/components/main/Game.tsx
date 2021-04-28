import { SyntheticEvent, useContext, useEffect } from 'react';

import styles from '../../styles/modules/Game.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faRedo } from '@fortawesome/free-solid-svg-icons';
import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';

let rootElement : HTMLElement;

function getRootElement() {
  if (rootElement) {
    return rootElement;
  }

  rootElement = document.querySelector(':root');
  return rootElement;
}

export default function Game( props: {className: string} ) {
  const { changeStyles, currentDraw, currentTarget, drawNewGame } = useContext(ColorContext);
  const { loseGame, winGame } = useContext(UserContext);
  const currentlyAvailableGame = true;

  useEffect(() => {
    drawNewGame();
  }, []);

  useEffect(() => {
    changeStyles(getRootElement());
  }, [currentTarget]);

  function pickColor(e) {
    const index = e.target.dataset.index;

    if (currentDraw[index].hexString === currentTarget.hexString) {
      winGame(rootElement);
    } else {
      loseGame();
    }
  }

  return (
    <section className={`${props.className} ${styles.game}`}>
      <div className={styles.info}>
        <div className={styles.config}>
          <button>
            <FontAwesomeIcon icon={faCog} size="lg"></FontAwesomeIcon>
          </button>
        </div>
        <p>
          <span>Which color is this?</span>
          <span>{currentTarget.hexString}</span>
          <span>RGB, easy</span>
        </p>
        <div className={styles.draw}>
          <button onClick={drawNewGame}>
            <FontAwesomeIcon icon={currentlyAvailableGame ? faRedo : faArrowRight} size="2x"></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className={styles.colorGroup}>
        <div>
          <div data-index='0' className={styles.color1} onClick={pickColor}></div>
          <div data-index='1' className={styles.color2} onClick={pickColor}></div>
          <div data-index='2' className={styles.color3} onClick={pickColor}></div>
        </div>
        <div>
          <div data-index='3' className={styles.color4} onClick={pickColor}></div>
          <div data-index='4' className={styles.color5} onClick={pickColor}></div>
        </div>
      </div>
    </section>
  );
}
