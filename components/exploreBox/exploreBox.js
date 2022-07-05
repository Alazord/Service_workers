import Image from "next/image";
import { EXPLORE as explore } from "../Constants";
import styles from "./exploreBox.module.css";

export default function ExploreBox() {
  return (
    <div className={styles["explore-box"]}>
      <div className={styles["explore-head"]} id="explore">
        EXPLORE AND DISCOVER
      </div>
      <div className={styles["line"]}></div>
      <div className={styles["explore-content"]}>
        {explore.map((item) => (
          <div key={item.expTitle} className={styles["explore-content-tag"]}>
            <Image
              alt="Explore Image"
              src={item.src}
              width="240px"
              height="168px"
            />
            <div className={styles["explore-title"]}>{item.expTitle}</div>
            <div className={styles["explore-description"]}>{item.expDesc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
