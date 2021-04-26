import { useContext, useEffect } from 'react';

import styles from '../../styles/modules/Game.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faRedo } from '@fortawesome/free-solid-svg-icons';
import { ColorContext } from '../../contexts/ColorContext';

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
  const currentlyAvailableGame = true;

  useEffect(() => {
    drawNewGame();
  }, []);

  useEffect(() => {
    changeStyles(getRootElement());
  }, [currentTarget]);

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
          <span>{currentTarget.rgbString}</span>
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
          <div className={`${styles.color1}`}></div>
          <div className={styles.color2}></div>
          <div className={styles.color3}></div>
        </div>
        <div>
          <div className={styles.color4}></div>
          <div className={styles.color5}></div>
        </div>
      </div>
    </section>
  );
}
