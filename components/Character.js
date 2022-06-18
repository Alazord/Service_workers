import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text, SimpleGrid, Box, Grid } from "@chakra-ui/react";

const Character = ({ characters }) => {
  return (
    // <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" marginTop={40}>
      <div className="characterList">
      {characters.map((character) => {
        return (
          // <Box
          //   key={character.id}
          //   border="1px solid white"
          //   bg="white"
          //   opacity={0.9}
          // >
          <div key={character.id} href={`/character/${character.id}`}>
            <Link href={`/character/${character.id}`}>
              <div>
                <Image alt="" src={character.image} width={300} height={300} />
                {/* <Heading as="h4" align="center" size="md">
                  {character.name}
                </Heading> */}
                <h2>{character.name}</h2>
                <h4>Origin: {character.origin.name}</h4>
                {/* <Text align="center">Origin: {character.origin.name}</Text> */}
                {/* <Text align="center">Location: {character.location.name}</Text> */}
              </div>
            </Link>
          {/* // </Box> */}
          </div>
        );
      })}
      </div>
  );
};

export default Character;
