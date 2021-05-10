import { UserContext } from 'contexts/UserContext';
import { useContext, useEffect, useState } from 'react';

import styles from '../../styles/modules/Modal.module.css';

export default function RankUp(props: {className: string, closeFunction: () => void}) {
  return (
    <aside className={props.className}>
      <h1>Rank up!</h1>

      <section className={styles.modalCenter}>
        
      </section>

      <section>
        <button className={`${styles.button} ${styles.buttonContinue}`} onClick={props.closeFunction}>#gggggg</button>
      </section> 
    </aside>
  );
}