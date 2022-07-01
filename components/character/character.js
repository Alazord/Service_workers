import React from "react";
import Link from "next/link";
import styles from "./Character.module.css";

const Character = ({ characters }) => {
  if (characters.length === 0) {
    return (
      <h1 style={{ backgroundColor: "white" }}>
        There are no characters for your search.
      </h1>
    );
  }
  return (
    <div className={styles["char-ind"]}>
      {characters.map((character) => {
        return (
          <div
            className={styles["char-item"]}
            key={character.id}
            style={{ backgroundImage: `url(${character.image})` }}
          >
            <Link href={`/character/${character.id}`}>
              <div className={styles["char-subitem"]}>
                <h4 className={styles["char-txt"]}>{character.name}</h4>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
