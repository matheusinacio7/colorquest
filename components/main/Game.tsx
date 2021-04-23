import styles from '../../styles/modules/Game.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCog, faRedo } from '@fortawesome/free-solid-svg-icons';

export default function Game( props: {className: string} ) {
  const currentlyAvailableGame = true;

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
          <span>(130, 70, 90)</span>
          <span>RGB, easy</span>
        </p>
        <div className={styles.draw}>
          <button>
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
