import React from "react";
import Image from "next/image";
import Link from "next/link";

const Character = ({ characters }) => {
  return (
    <div className="char-ind">
      {characters.map((character) => {
        return (
          <div className="char-item" key={character.id} style={{backgroundImage:`url(${character.image})`}}>
            <Link href={`/character/${character.id}`}>
              <div className="char-subitem">
                {/* <Image alt="" src={character.image} width={300} height={300} /> */}
                <h4 className="char-txt">{character.name}</h4>
                {/* <h4 className="char-txt">Origin: {character.origin.name}</h4> */}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
