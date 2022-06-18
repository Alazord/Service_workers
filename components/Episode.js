import React from "react";
import Link from "next/link";
import { SimpleGrid } from "@chakra-ui/react";


const Episode = ({ episodes }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" marginTop={40}>
    {/* <div className="charInd"> */}
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
       {/* </div> */}
    </SimpleGrid>
  );
};

export default Episode;
