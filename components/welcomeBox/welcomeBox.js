import Image from "next/image";
import styles from "./WelcomeBox.module.css";

export default function WelcomeBox() {
  return (
    <div className={styles["welcome-box"]}>
      <div className="status"></div>
      <div className={styles["welcome"]}>WELCOME TO RICK AND MORTY WIKI!</div>
      <div className={styles["carousal"]}>
        <Image
          alt="Rick and Morty"
          src="/images/rickMortyHome.jpeg"
          width="800px"
          height="400px"
          className={styles["carousal-img"]}
        />
      </div>
    </div>
  );
}
