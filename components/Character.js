import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SimpleGrid} from "@chakra-ui/react";

const Character = ({ characters }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" marginTop={40}>
    {/* <div className="charInd"> */}
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
       {/* </div> */}
    </SimpleGrid>
  );
};

export default Character;
