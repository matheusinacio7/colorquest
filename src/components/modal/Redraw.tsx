import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';

import styles from '../../styles/modules/Modal.module.css';

export default function Redraw(props: {className: string, closeFunction: () => void, forfeitFunction: () => void, }) {
  const { getExpDelta } = useContext(UserContext);

  return (
    <aside className={props.className}>
      <h1>Are you sure?</h1>

      <section>
        <button className={`${styles.button} ${styles.buttonDanger}`} onClick={props.forfeitFunction}>
          <p>Yep</p>
          <p>(-{`${getExpDelta()}`} XP)</p>
        </button>
        <button className={`${styles.button} ${styles.buttonSafe}`} onClick={props.closeFunction}>
          <p>Actually,</p>
          <p>No</p>
        </button>
      </section> 
    </aside>
  );
}