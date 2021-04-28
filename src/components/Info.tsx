import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';

import styles from '../styles/modules/Info.module.css';

export default function Info( props: { className:string } ) {
  const { currentExp, currentLevel } = useContext(UserContext);
  const [percentToNextLevel, setPercentToNextLevel] = useState(0);
  const [levelUpExp, setLevelUpExp] = useState(0);
  
  function expDown(newExp: number, downExp: number) {
    setPercentToNextLevel(newExp);

    setTimeout(() => {
      setLevelUpExp(newExp);
    }, 1200);
  }

  function expUp(newExp: number, upExp: number) {
    setLevelUpExp(newExp);

    setTimeout(() => {
      setPercentToNextLevel(newExp);
    }, 600);
  }

  useEffect(() => {
    const newPercent = Math.round((currentExp / currentLevel.maxExp) * 10000) / 100;
    
    if (newPercent < percentToNextLevel) {
      expDown(currentExp, newPercent);
    } else {
      expUp(currentExp, newPercent);
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
          <span className={styles.streak}>
            <img className={styles.streakIcon} src="./svg/fire-icon.svg" alt="fire icon"/>
            <span className={styles.streakCount}>3</span>
          </span>
        </div>
      </div>      
    </section>
  );
}