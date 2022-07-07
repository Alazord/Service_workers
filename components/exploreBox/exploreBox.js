import Image from "next/image";
import { EXPLORE as explore } from "../Constants";
import styles from "./exploreBox.module.css";

export default function ExploreBox() {
  return (
    <div className={styles.exploreBox}>
      <div className={styles.exploreHead} id="explore">
        EXPLORE AND DISCOVER
      </div>
      <div className={styles.line}></div>
      <div className={styles.exploreContent}>
        {explore.map((item) => (
          <div key={item.expTitle} className={styles.exploreContentTag}>
            <Image
              alt="Explore Image"
              src={item.src}
              width="240px"
              height="168px"
            />
            <div className={styles.exploreTitle}>{item.expTitle}</div>
            <div className={styles.exploreDescription}>{item.expDesc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
