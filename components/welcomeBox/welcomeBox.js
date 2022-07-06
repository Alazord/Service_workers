import Image from "next/image";
import styles from "./welcomeBox.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

export default function WelcomeBox() {
  const isOnline = useContext(ThemeContext);
  return (
    <div className={styles.welcomeBox}>
      <div className={isOnline ? styles.welcomeOnline : styles.welcomeOffline}>
        RICK AND MORTY
      </div>
      <div className={styles.carousal}>
        <Image
          alt="Rick and Morty"
          src="/images/rickMortyHome.jpeg"
          width="800px"
          height="400px"
          className={styles.carousalImg}
        />
      </div>
    </div>
  );
}
