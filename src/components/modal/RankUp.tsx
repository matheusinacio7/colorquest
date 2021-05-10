import { UserContext } from 'contexts/UserContext';
import { useContext, useEffect, useState } from 'react';

import styles from '../../styles/modules/Modal.module.css';

import Peasant from '../../../assets/svg/peasant.svg';

import { Dictionary, Language } from '../../classes/Dictionary';

export default function RankUp(props: {className: string, closeFunction: () => void}) {
  const { currentTitle } = useContext(UserContext);

  const dict = new Dictionary(Language.ENGLISH);

  return (
    <aside className={props.className}>
      <h1>Rank up!</h1>

      <section className={styles.modalCenter}>
        <Peasant className={`${styles.sprite} ${styles.spriteUp}`} />
      </section>

      <section className={styles.rankUpTitle}>
        <h1>Color {dict.ranks[currentTitle]}</h1>
      </section>

      <section>
        <button className={`${styles.button} ${styles.buttonContinue}`} onClick={props.closeFunction}>#gggggg</button>
      </section> 
    </aside>
  );
}