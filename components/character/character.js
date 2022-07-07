import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./character.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

const Character = ({ characters }) => {
  const isOnline = useContext(ThemeContext);
  return characters.length == 0 ? (
    <h1
      className={
        isOnline ? styles.searchLoaderOnline : styles.searchLoaderOffline
      }
    >
      There are no characters for your search.
    </h1>
  ) : (
    <div className={styles.charInd}>
      {characters.map((character) => {
        return (
          <div className={styles.charItem} key={character.id}>
            <Link href={`/character/${character.id}`}>
              <div className={styles.charSubitem}>
                <Image
                  alt="Character Image"
                  src={character.image}
                  width={244}
                  height={232}
                />
                <div className={styles.charTxt}>{character.name}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
