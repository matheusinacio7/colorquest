import { useContext, useEffect, useRef, useState } from 'react';

import { Difficulty, GameContext } from 'contexts/GameContext';
import { UserContext } from 'contexts/UserContext';

import styles from '../styles/modules/Configuration.module.css';

export default function Configuration() {
  const [isClosing, setIsClosing] = useState(false);
  const { setConfigIsOpen, nextConfig, setNextConfig } = useContext(GameContext);
  const { currentRank } = useContext(UserContext);
  const [currentSelection, setCurrentSelection] = useState({gameMode: null, difficulty: null})
  const difficultyRadio = useRef(new Array<HTMLInputElement>());
  const modeRadio = useRef(new Array<HTMLInputElement>());

  function closeConfig() {
    setIsClosing(true);

    setTimeout(() => {
      setConfigIsOpen(false);
    }, 400);
  }

  useEffect(() => {
    difficultyRadio.current[nextConfig.difficulty].checked = true;
    setCurrentSelection({gameMode: nextConfig.gameMode, difficulty: nextConfig.difficulty});

    for (let i = 0; i < difficultyRadio.current.length; i++) {
      if (currentRank.index - i < -1) {
        difficultyRadio.current[i].disabled = true;
      }
    }

    if (nextConfig.gameMode === 'rgb') {
      modeRadio.current[0].checked = true;
    } else {
      modeRadio.current[1].checked = true;
    }
  }, []);

  function handleConfigSelection(configType: 'gameMode' | 'difficulty', newState: 'rgb' | 'hex' | Difficulty) {
    setCurrentSelection((current) => {
      current[configType] = newState;
      return current;
    });
  }

  function handleApplySettings() {
    setNextConfig(currentSelection);
    closeConfig();
  }

  return ( 
    <aside className={`${styles.config} ${isClosing ? styles.configClosing : null}`}>
      <button className={styles.closeButton} onClick={closeConfig}>X</button>

      <section className={styles.choices}>
        <div>
          <h1>Difficulty</h1>
          <div>
            <label className={styles.choiceLabel}>
              <input
                type="radio"
                name="difficulty"
                ref={(el) => difficultyRadio.current[0] = el}
                onChange={() => handleConfigSelection('difficulty', Difficulty.EASY)}
              />
              <div>
                <h2>Easy</h2>
                <h3>For peasants</h3>
              </div>
            </label>
            <label className={styles.choiceLabel}>
              <input
                type="radio"
                name="difficulty"
                ref={(el) => difficultyRadio.current[1] = el}
                onChange={() => handleConfigSelection('difficulty', Difficulty.MEDIUM)}
              />
              <div>
                <h2>Medium</h2>
                <h3>For real soldiers</h3>
              </div>
            </label>
            <label className={styles.choiceLabel}>
              <input
                type="radio"
                name="difficulty"
                ref={(el) => difficultyRadio.current[2] = el}
                onChange={() => handleConfigSelection('difficulty', Difficulty.HARD)}
              />
              <div>
                <h2>Hard</h2>
                <h3>For color knights</h3>
              </div>
            </label>
            <label className={styles.choiceLabel}>
              <input
                type="radio"
                name="difficulty"
                ref={(el) => difficultyRadio.current[3] = el}
                onChange={() => handleConfigSelection('difficulty', Difficulty.ULTRAHARD)}
              />
              <div>
                <h2>Insane</h2>
                <h3>For champs.. or hacks</h3>
              </div>
            </label>
          </div>
        </div>

        <div>
          <h1>Mode</h1>
          <div>
            <label className={styles.choiceLabel}>
              <input
                type="radio"
                name="mode"
                ref={(el) => modeRadio.current[0] = el}
                onChange={() => handleConfigSelection('gameMode', 'rgb')}
              />
              <h2>RGB</h2>
            </label>
            <label className={styles.choiceLabel}>
              <input
                type="radio"
                name="mode"
                ref={(el) => modeRadio.current[1] = el}
                onChange={() => handleConfigSelection('gameMode', 'hex')}
              />
              <h2>Hex</h2>
            </label>
          </div>
        </div>
      </section>

      <section className={styles.confirmation}>
        <button onClick={handleApplySettings}>Apply</button>
        <p>Changes only apply starting on the next draw</p>
      </section>
    </aside>
  )
}