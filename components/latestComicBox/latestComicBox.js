import styles from "./latestComicBox.module.css";

export default function LatestComicBox() {
  return (
    <div className={styles.latestComicBox}>
      <div className={styles.latestComicHead}>LATEST COMIC</div>
      <div className={styles.line}></div>
      <div className={styles.latestComicContent}>
        <div className={styles.latestComicContentImg}></div>
        <div className={styles.latestComicDetails}>
          <div className={styles.latestComicTitle}>
            Rick And Morty Presents: The Hotel Immortal
          </div>
          <div className={styles.latestComicDescription}>
            Murder at the Hotel Immortal?! Impossible, you say? Not so! Find out
            who done stabbed whom in this whodunnit issue of Rick and Morty
            Presents. When Cornvelious Daniels checks in for some RnR at the
            Hotel Immortal, bodies start dropping--and accusations start flying!
          </div>
        </div>
      </div>
    </div>
  );
}
