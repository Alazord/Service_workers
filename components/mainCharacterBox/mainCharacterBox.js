import Image from "next/image";
import styles from "./mainCharacterBox.module.css";
import { CHARACTER_LIST as characterList } from "../Constants";

export default function MainCharacterBox() {
  return (
    <div className={styles["main-characters-box"]}>
      <div className={styles["main-characters-head"]}>MAIN CHARACTERS</div>
      <div className={styles["line"]}></div>
      <div className={styles["main-characters-images"]}>
        {characterList.map((item) => (
          <div className={styles["main-character-img-list"]} key={1}>
            <Image
              alt="Main Character"
              src={item[1]}
              height={140}
              width={140}
            />
            <div className={styles["main-character-img-tag"]}>{item[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
