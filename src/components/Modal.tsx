import { Fragment, useContext, useEffect, useState } from 'react';

import styles from '../styles/modules/Modal.module.css';

import LevelUp from './modal/LevelUp';
import Redraw from './modal/Redraw';

import { GameContext, GameStatus } from '../contexts/GameContext';

export enum ModalType {
  RedrawConfirmation,
  LevelUp,
  None,
}

export default function Modal() {
  const { changeGameStatus, closeModal, modalType } = useContext(GameContext);

  function forfeitGame() {
    changeGameStatus(GameStatus.FORFEIT);
    closeModal();
  }

  function ModalWindow(props: {className: string, type: ModalType}) {
    if (props.type === ModalType.RedrawConfirmation) {
      return <Redraw className={props.className} closeFunction={closeModal} forfeitFunction={forfeitGame} />;
    }

    if (props.type === ModalType.LevelUp) {
      return <LevelUp className={props.className} closeFunction={closeModal} />;
    }

    return null;
  }

  return (
    <Fragment>
      <ModalWindow className={`${styles.window} ${modalType !== ModalType.None ? styles.visible : null}`} type={modalType} />

      {modalType !== ModalType.None && <div className={styles.backdrop}></div>}
    </Fragment>
  )
}