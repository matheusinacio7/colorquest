import { Fragment, useContext, useEffect, useState } from 'react';

import styles from '../styles/modules/Modal.module.css';

import LevelUp from './modal/LevelUp';
import RankUp from './modal/RankUp';
import Redraw from './modal/Redraw';

import { GameContext, GameStatus } from '../contexts/GameContext';

export enum ModalType {
  RedrawConfirmation,
  LevelUp,
  RankUp,
  None,
}

export default function Modal() {
  const { changeGameStatus, closeModal, modalType } = useContext(GameContext);
  const [fading, setFading] = useState(false);

  function forfeitGame() {
    changeGameStatus(GameStatus.FORFEIT);
    closeModal();
  }

  function fadeAway() {
    setFading(true);

    setTimeout(() => {
      closeModal();
      setFading(false);
    }, 110);
  }

  function ModalWindow(props: {className: string, type: ModalType}) {
    if (props.type === ModalType.RedrawConfirmation) {
      return <Redraw className={props.className} closeFunction={fadeAway} forfeitFunction={forfeitGame} />;
    }

    if (props.type === ModalType.LevelUp) {
      return <LevelUp className={props.className} closeFunction={fadeAway} />;
    }

    if (props.type === ModalType.RankUp) {
      return <RankUp className={props.className} closeFunction={fadeAway} />;
    }

    return null;
  }

  return (
    <Fragment>
      <ModalWindow className={`${styles.window} ${fading ? styles.windowFade : null} `} type={modalType} />

      {modalType !== ModalType.None && <div className={styles.backdrop}></div>}
    </Fragment>
  )
}