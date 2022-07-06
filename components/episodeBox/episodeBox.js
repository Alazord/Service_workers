import Image from "next/image";
import styles from "./episodeBox.module.css";

export default function EpisodeBox() {
  return (
    <div className={styles.episodeBox}>
      <div className={styles.episodeHead}>EPISODES</div>
      <div className={styles.line}></div>
      <div className={styles.episodeContent}>
        <div className={styles.episodePrevious}>
          <Image
            alt="First Episode"
            src="/images/s1e1.jpeg"
            width="386px"
            height="240px"
          />
          <div className={styles.episodeName}>Pilot</div>
          <div className={styles.episodeDescription}>S01E01</div>
        </div>
        <div className={styles.episodeNext}>
          <Image
            alt="Last Episode"
            src="/images/s5e5.jpeg"
            width="386px"
            height="240px"
          />
          <div className={styles.episodeName}>Look Who is Purging Now</div>
          <div className={styles.episodeDescription}>S02E09</div>
        </div>
      </div>
    </div>
  );
}
