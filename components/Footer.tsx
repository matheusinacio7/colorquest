import { Fragment } from 'react';

import styles from '../styles/modules/Footer.module.css';

export default function Footer( props: { style: 'main' | 'alt' } ) {
  return (
    <footer className={styles.footer}>
      {props.style === 'main' ? 
        <Fragment><span>enjoy the game?</span> <a href="https://buymeacoffee.com" target="_blank"><img src="./svg/bmc-logo.svg" alt="buy me a coffee logo"/> buy me a coffee</a>:)</Fragment>:
        <p>Created with &#x2665; and &#x2615; by <a href="https://github.com/heyset" target="_blank">Matheus "Set" Inacio</a>, 2021.</p>
      }
    </footer>
  );
}
