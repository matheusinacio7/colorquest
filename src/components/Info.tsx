import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';

import styles from '../styles/modules/Info.module.css';

export default function Info( props: { className:string } ) {
  const { currentExp, currentLevel, currentStreak, hasLeveledUp } = useContext(UserContext);
  const [percentToNextLevel, setPercentToNextLevel] = useState(0);
  const [levelUpExp, setLevelUpExp] = useState(0);
  
  function expDown(newExp: number) {
    setPercentToNextLevel(newExp);

    if (hasLeveledUp) {
      setLevelUpExp(newExp);
    } else {
      setTimeout(() => {
        setLevelUpExp(newExp);
      }, 1200);
    }
  }

  function expUp(newExp: number) {
    setLevelUpExp(newExp);

    setTimeout(() => {
      setPercentToNextLevel(newExp);
    }, 600);
  }

  useEffect(() => {
    const progress = currentExp - currentLevel.minExp;
    const maxProgress = currentLevel.maxExp - currentLevel.minExp;
    const newPercent = Math.round((progress / maxProgress * 10000) / 100);
    
    if (newPercent < percentToNextLevel) {
      expDown(newPercent);
    } else {
      expUp(newPercent);
    }
  }, [currentExp]);

  return (
    <section className={`${props.className} ${styles.info}`}>
      <img className={styles.sprite} src="./svg/awesome-character.svg" alt="sprite"/>
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.currentExp} style={{width: `${percentToNextLevel}%`}}></div>
          <div className={styles.expUp} style={{width: `${levelUpExp}%`}}></div>
        </div>
        <div className={styles.details}>
          <span className={styles.levelExp}>
            <span>Color Peasant</span>
            <span>Level {currentLevel.level}</span>
          </span>
          {currentStreak > 2 ?
            <span className={styles.streak}>
              <img className={styles.streakIcon} src="./svg/fire-icon.svg" alt="fire icon"/>
              <span className={styles.streakCount}>{currentStreak}</span>
            </span>
            :
            null
          }
        </div>
      </div>      
    </section>
  );
}