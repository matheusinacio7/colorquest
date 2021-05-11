import { GameContext } from 'contexts/GameContext';
import { useContext, useState } from 'react';

import styles from '../styles/modules/Configuration.module.css';

export default function Configuration() {
  const [isClosing, setIsClosing] = useState(false);
  const { setConfigIsOpen } = useContext(GameContext);

  function closeConfig() {
    setIsClosing(true);

    setTimeout(() => {
      setConfigIsOpen(false);
    }, 400);
  }

  return ( 
    <aside className={`${styles.config} ${isClosing ? styles.configClosing : null}`}>
      <button className={styles.closeButton} onClick={closeConfig}>X</button>

      <section className={styles.choices}>
        <div>
          <h1>Difficulty</h1>
          <label className={styles.choiceLabel}>
            <input type="radio" name="difficulty"/>
            <div>
              <h2>Easy</h2>
              <h3>For peasants</h3>
            </div>
          </label>
          <label className={styles.choiceLabel}>
            <input type="radio" name="difficulty"/>
            <div>
              <h2>Medium</h2>
              <h3>For real soldiers</h3>
            </div>
          </label>
          <label className={styles.choiceLabel}>
            <input type="radio" name="difficulty"/>
            <div>
              <h2>Hard</h2>
              <h3>For color knights</h3>
            </div>
          </label>
          <label className={styles.choiceLabel}>
            <input type="radio" name="difficulty"/>
            <div>
              <h2>Insane</h2>
              <h3>For champs.. or hacks</h3>
            </div>
          </label>
        </div>

        <div>
          <h1>Mode</h1>
          <label className={styles.choiceLabel}>
            <input type="radio" name="mode"/>
            <h2>RGB</h2>
          </label>
          <label className={styles.choiceLabel}>
            <input type="radio" name="mode"/>
            <h2>Hex</h2>
          </label>
        </div>
      </section>

      <section className={styles.confirmation}>
        <button>Apply</button>
        <p>Changes only apply on the next draw</p>
      </section>
    </aside>
  )
}