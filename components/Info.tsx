import styles from '../styles/modules/Info.module.css';

export default function Info( props: { className:string } ) {
  return (
    <section className={`${props.className} ${styles.info}`}>
      <img className={styles.sprite} src="./svg/awesome-character.svg" alt="sprite"/>
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.currentExp}></div>
          <div className={styles.expUp}></div>
        </div>
        <div className={styles.details}>
          <span className={styles.levelExp}>
            <span>Color Peasant</span>
            <span>Level 3</span>
          </span>
          <span className={styles.streak}>
            <img className={styles.streakIcon} src="./svg/fire-icon.svg" alt="fire icon"/>
            <span className={styles.streakCount}>3</span>
          </span>
        </div>
      </div>      
    </section>
  );
}