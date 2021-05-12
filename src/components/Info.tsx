import { useContext, useEffect, useState } from 'react';

import { GameContext, GameStatus } from '../contexts/GameContext';
import { UserContext } from '../contexts/UserContext';
import { ColorContext } from 'contexts/ColorContext';

import ConfigIcon from '../../assets/svg/config-icon.svg';
import NextIcon from '../../assets/svg/next-icon.svg';
import RedrawIcon from '../../assets/svg/redraw-icon.svg';
import Streak from '../../assets/svg/streak-icon.svg';
import Peasant from '../../assets/svg/peasant.svg';

import { Dictionary, Language } from '../classes/Dictionary';
import { ModalType } from 'components/Modal';

import styles from '../styles/modules/Info.module.css';

export default function Info( props: { className:string } ) {
  const { currentExp, currentLevel, currentTitle, currentStreak, hasLeveledUp } = useContext(UserContext);
  const { gameStatus, openModal, setConfigIsOpen } = useContext(GameContext);
  const { drawNewGame } = useContext(ColorContext);
  const [percentToNextLevel, setPercentToNextLevel] = useState(0);
  const [levelUpExp, setLevelUpExp] = useState(0);
  const [levelUpExpStyle, setLevelUpExpStyle] = useState({width: '0px', height: '10px'});
  const [currentExpStyle, setCurrentExpStyle] = useState({width: '0px', height: '10px'});
  const [currentWindow, setCurrentWindow] = useState(undefined);

  const dict = new Dictionary(Language.ENGLISH);
  
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

  function handleRedraw() {
    if (gameStatus !== GameStatus.PLAYING) {
      drawNewGame();
      return;
    }

    openModal(ModalType.RedrawConfirmation);
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

  useEffect(() => {
    if (window.innerWidth < 674) {
      setCurrentExpStyle({width: `${percentToNextLevel}%`, height: '10px'});
    } else {
      setCurrentExpStyle({width: `${percentToNextLevel}%`, height: '20px'});
    }
  }, [percentToNextLevel]);

  useEffect(() => {
    if (window.innerWidth < 674) {
      setLevelUpExpStyle({width: `${levelUpExp}%`, height: '10px'});
    } else {
      setLevelUpExpStyle({width: `${levelUpExp}%`, height: '20px'});
    }
  }, [levelUpExp]);

  useEffect(() => {
    setCurrentWindow(window);
  }, []);

  return (
    <section className={`${props.className} ${styles.info}`}>
      <ConfigIcon className={styles.configIcon} onClick={() => setConfigIsOpen(true)}/>
      <div className={styles.spriteContainer}>
        <Peasant className={`${styles.sprite}`} />
        {currentWindow && currentWindow.innerWidth >= 674 && <span className={styles.levelExp}>
            <span>Color {dict.ranks[currentTitle]}</span>
            <span>Level {currentLevel.level}</span>
        </span>}
      </div>
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.currentExp} style={currentExpStyle}></div>
          <div className={styles.expUp} style={levelUpExpStyle}></div>
        </div>
        <div className={styles.details}>
          {currentWindow && currentWindow.innerWidth < 674 && <span className={styles.levelExp}>
            <span>Color {dict.ranks[currentTitle]}</span>
            <span>Level {currentLevel.level}</span>
          </span>}
          {currentStreak > 2 ?
            <span className={styles.streak}>
              <Streak className={styles.streakIcon} />
              <span className={styles.streakCount}>{currentStreak}</span>
            </span>
            :
            null
          }
        </div>
      </div>      
      <div className={styles.desktopButtonContainer}>
          <button disabled={gameStatus !== GameStatus.PLAYING ? true : false} onClick={handleRedraw}>
            <RedrawIcon />
          </button>
          <button disabled={gameStatus === GameStatus.PLAYING ? true : false} onClick={handleRedraw}>
            <NextIcon />
          </button>
      </div>
    </section>
  );
}