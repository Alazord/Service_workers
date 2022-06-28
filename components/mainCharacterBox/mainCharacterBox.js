import Image from "next/image";
import styles from "./MainCharacterBox.module.css";

export default function MainCharacterBox() {
  const characterList = [
    ["Beth Smith", "/images/bethSmith.jpeg"],
    ["Summer Smith", "/images/summerSmith.jpeg"],
    ["Rick Sanchez", "/images/rickSanchez.jpg"],
    ["Morty Smith", "/images/mortySmith.jpg"],
    ["Jerry Smith", "/images/jerrySmith.jpg"],
  ];
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
