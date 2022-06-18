import React from "react";
import Link from "next/link";

const Episode = ({ episodes }) => {
  return (
    <div className="charInd"> 
      {episodes.map((episode) => {
        return (
          <div key={episode.id}>
            <Link href={`/episode/${episode.id}`}>
              <div className="charItem">
                <h2 className="charTxt">{episode.name}</h2>
                <h4 className="charTxt">Episode: {episode.episode}</h4>
                <h4 className="charTxt">Name: {episode.name}</h4>
              </div>
            </Link>
            </div>
        );
      })}
       </div>
  );
};

export default Episode;
