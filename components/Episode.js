import React from "react";
import Link from "next/link";

const Episode = ({ episodes }) => {
  return (
    <div className="char-ind">
      {episodes.map((episode) => {
        return (
          <div key={episode.id}>
            <Link href={`/episode/${episode.id}`}>
              <div className="char-item">
                <h2 className="char-txt" id="heading">
                  {episode.name}
                </h2>
                <h4 className="char-txt">Episode: {episode.episode}</h4>
                <h4 className="char-txt">Air-Date: {episode.air_date}</h4>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Episode;
