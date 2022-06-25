import React from "react";
import Link from "next/link";
import styles from "./episode.module.css";

const Episode = ({ episodes }) => {
  return (
    <div className={styles["ep-ind"]}>
      {episodes.map((episode) => {
        return (
          <div key={episode.id}>
            <Link href={`/episode/${episode.id}`}>
              <div className={styles["ep-item"]}>
                <h2 className={styles["ep-txt"]} id="heading">
                  {episode.name}
                </h2>
                <h4 className={styles["ep-txt"]}>Episode: {episode.episode}</h4>
                <h4 className={styles["ep-txt"]}>
                  Air-Date: {episode.air_date}
                </h4>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Episode;
