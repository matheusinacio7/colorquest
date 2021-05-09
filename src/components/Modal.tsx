import { Fragment, useContext, useEffect, useState } from 'react';

import styles from '../styles/modules/Modal.module.css';

import Redraw from './modal/Redraw';

import { GameContext, GameStatus } from '../contexts/GameContext';

export enum ModalType {
  RedrawConfirmation,
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

    return null;
  }

  return (
    <Fragment>
      <ModalWindow className={`${styles.window} ${modalType !== ModalType.None ? styles.visible : null}`} type={ModalType.RedrawConfirmation} />

      {modalType !== ModalType.None && <div className={styles.backdrop}></div>}
    </Fragment>
  )
}