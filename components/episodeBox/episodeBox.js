import Image from "next/image";
import styles from "./episodeBox.module.css";

export default function EpisodeBox() {
  return (
    <div className={styles["episode-box"]}>
      <div className={styles["episode-head"]}>EPISODES</div>
      <div className={styles["line"]}></div>
      <div className={styles["episode-content"]}>
        <div className={styles["episode-previous"]}>
          <div>Previous Episode</div>
          <Image
            alt="First Episode"
            src="/images/s1e1.jpeg"
            width="386px"
            height="240px"
          />
          <div className={styles["episode-name"]}>Name of Episode</div>
          <div className={styles["episode-description"]}>Small description</div>
        </div>
        <div className={styles["episode-next"]}>
          <div>Next Episode</div>
          <Image
            alt="Last Episode"
            src="/images/s5e5.jpeg"
            width="386px"
            height="240px"
          />
          <div className={styles["episode-name"]}>Name of Episode</div>
          <div className={styles["episode-description"]}>Small description</div>
        </div>
      </div>
    </div>
  );
}
