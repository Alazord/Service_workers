import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Character.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

const Character = ({ characters }) => {
  const isOnline = useContext(ThemeContext);
  if (characters.length === 0) {
    return (
      <h1
        className={
          styles[isOnline ? "search-loader-online" : "search-loader-offline"]
        }
      >
        There are no characters for your search.
      </h1>
    );
  }
  return (
    <div className={styles["char-ind"]}>
      {characters.map((character) => {
        return (
          <div className={styles["char-item"]} key={character.id}>
            <Link href={`/character/${character.id}`}>
              <div className={styles["char-subitem"]}>
                <Image
                  alt="Character Image"
                  src={character.image}
                  width={246}
                  height={234}
                />
                <div className={styles["char-txt"]}>{character.name}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
