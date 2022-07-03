import Image from "next/image";
import styles from "./mainCharacterBox.module.css";

export default function MainCharacterBox() {
  const characterList = [
    ["Beth Smith", "https://rickandmortyapi.com/api/character/avatar/4.jpeg"],
    ["Summer Smith", "https://rickandmortyapi.com/api/character/avatar/3.jpeg"],
    ["Rick Sanchez", "https://rickandmortyapi.com/api/character/avatar/1.jpeg"],
    ["Morty Smith", "https://rickandmortyapi.com/api/character/avatar/2.jpeg"],
    ["Jerry Smith", "https://rickandmortyapi.com/api/character/avatar/5.jpeg"],
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
