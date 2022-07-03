import Image from "next/image";
import styles from "./episodeBox.module.css";

export default function EpisodeBox() {
  return (
    <div className={styles["episode-box"]}>
      <div className={styles["episode-head"]}>EPISODES</div>
      <div className={styles["line"]}></div>
      <div className={styles["episode-content"]}>
        <div className={styles["episode-previous"]}>
          <Image
            alt="First Episode"
            src="/images/s1e1.jpeg"
            width="386px"
            height="240px"
          />
          <div className={styles["episode-name"]}>Pilot</div>
          <div className={styles["episode-description"]}>S01E01</div>
        </div>
        <div className={styles["episode-next"]}>
          <Image
            alt="Last Episode"
            src="/images/s5e5.jpeg"
            width="386px"
            height="240px"
          />
          <div className={styles["episode-name"]}>Look Who is Purging Now</div>
          <div className={styles["episode-description"]}>S02E09</div>
        </div>
      </div>
    </div>
  );
}
