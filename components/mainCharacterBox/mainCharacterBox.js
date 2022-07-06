import Image from "next/image";
import styles from "./mainCharacterBox.module.css";
import { CHARACTER_LIST as characterList } from "../Constants";

export default function MainCharacterBox() {
  return (
    <div className={styles.mainCharactersBox}>
      <div className={styles.mainCharactersHead}>MAIN CHARACTERS</div>
      <div className={styles.line}></div>
      <div className={styles.mainCharactersImages}>
        {characterList.map((item) => (
          <div className={styles.mainCharacterImgList} key={1}>
            <Image
              alt="Main Character"
              src={item[1]}
              height={140}
              width={140}
            />
            <div className={styles.mainCharacterImgTag}>{item[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
