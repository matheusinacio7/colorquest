import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

import styles from '../styles/modules/ClearConfigButton.module.css';

export default function ClearConfigButton() {
  const { clearLocalStorage } = useContext(GameContext);

  function handleClear() {
    const wantsToClear = confirm('Are you sure? This will erase ALL your data, and CANNOT be undone.');

    if (wantsToClear) {
      clearLocalStorage();
    }
  }

  return (
    <button className={styles.clearButton} onClick={handleClear}>Clear all my data</button>
  )
}