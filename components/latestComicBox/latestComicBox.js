import Image from "next/image";
import styles from "./latestComicBox.module.css";

export default function LatestComicBox() {
  return (
    <div className={styles["latest-comic-box"]}>
      <div className={styles["latest-comic-head"]}>LATEST COMIC</div>
      <div className={styles["line"]}></div>
      <div className={styles["latest-comic-content"]}>
        <div className={styles["latest-comic-content-img"]}></div>
        <div className={styles["latest-comic-details"]}>
          <div className={styles["latest-comic-title"]}>
            Rick And Morty Presents: The Hotel Immortal
          </div>
          <div className={styles["latest-comic-description"]}>
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
