import { Fragment } from 'react';

import FoldIcon from '../../assets/svg/double-down-arrow.svg';
import styles from '../styles/modules/Footer.module.css';

export default function Footer( props: { style: 'main' | 'alt' } ) {
  function handleFoldClick(direction: 'down' | 'up') {
    const targetElement = direction === 'down' ? document.getElementById('FAQ') : document.getElementById('header');

    targetElement.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <footer className={`${styles.footer} ${props.style === 'alt' ? styles.last : null}`}>
      {props.style === 'main' ? 
        <Fragment>
          <span>enjoy the game?</span> <a href="https://buymeacoffee.com/heyset" target="_blank"><img src="./svg/bmc-logo.svg" alt="buy me a coffee logo"/> buy me a coffee</a>:)
          <FoldIcon className={styles.foldIcon} onClick={() => handleFoldClick('down')}/>
        </Fragment>:
        <Fragment>
          <p>Created with &#x2665; and &#x2615; by <a href="https://github.com/heyset" target="_blank">Matheus "Set" Inacio</a>, 2021.</p>
          <FoldIcon className={`${styles.foldIcon} ${styles.foldIconUp}`} onClick={() => handleFoldClick('up')}/>
        </Fragment>
      }
    </footer>
  );
}
