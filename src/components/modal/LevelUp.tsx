import { UserContext } from 'contexts/UserContext';
import { useContext, useEffect, useState } from 'react';

import styles from '../../styles/modules/Modal.module.css';

export default function LevelUp(props: {className: string, closeFunction: () => void}) {
  const { currentLevel } = useContext(UserContext);
  const [displayLevel, setDisplayLevel] = useState(1);

  useEffect(() => {
    setDisplayLevel(currentLevel.level + 1);
  }, []);

  return (
    <aside className={props.className}>
      <h1>Congratulations!</h1>

      <section className={styles.modalCenter}>
        <h1>Level</h1>
        <div className={styles.levelingContainer}>
          <h3>{displayLevel - 1}</h3>
          <div className={styles.arrow}>
            <div className={styles.arrowBody}></div>
            <div className={styles.arrowHead}></div>
          </div>
          <h2>{displayLevel}</h2>
        </div>
      </section>

      <section>
        <button className={`${styles.button} ${styles.buttonContinue}`} onClick={props.closeFunction}>Keep 'em coming</button>
      </section> 
    </aside>
  );
}