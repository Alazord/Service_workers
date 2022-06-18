import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text, SimpleGrid, Box } from "@chakra-ui/react";

const Character = ({ characters }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" marginTop={40}>
      {characters.map((character) => {
        return (
          <Box key={character.id} border="1px solid white" bg="white">
            <Link href={`/character/${character.id}`}>
              <div>
                <Image alt="" src={character.image} width={300} height={300} />
                <Heading as="h4" align="center" size="md">
                  {character.name}
                </Heading>
                <Text align="center">Origin: {character.origin.name}</Text>
                {/* <Text align="center">Location: {character.location.name}</Text> */}
              </div>
            </Link>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default Character;
