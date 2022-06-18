import React from "react";
import Image from "next/image";
import Link from "next/link";

const Character = ({ characters }) => {
  return (
    <div className="charInd"> 
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <Link href={`/character/${character.id}`}>
              <div className="charItem">
                <Image alt="" src={character.image} width={300} height={300} />
                <h4 className="charTxt">{character.name}</h4>
                <h4 className="charTxt">Origin: {character.origin.name}</h4>
              </div>
            </Link>
            </div>
        );
      })}
      </div> 
  );
};

export default Character;
