import React from "react";
import Link from "next/link";
import styles from "./episode.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

const Episode = ({ episodes }) => {
  const isOnline = useContext(ThemeContext);

  return episodes.length === 0 ? (
    <h1
      className={
        isOnline ? styles.searchLoaderOnline : styles.searchLoaderOffline
      }
    >
      There are no episodes for your search.
    </h1>
  ) : (
    <div className={styles.epInd}>
      {episodes.map((episode) => {
        return (
          <div key={episode.id}>
            <Link href={`/episode/${episode.id}`}>
              <div
                className={
                  isOnline ? styles.epItemOnline : styles.epItemOffline
                }
              >
                <h2 className={styles.epTxt} id="heading">
                  {episode.name}
                </h2>
                <h4 className={styles.epTxt}>Episode: {episode.episode}</h4>
                <h4 className={styles.epTxt}>Air-Date: {episode.air_date}</h4>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Episode;
