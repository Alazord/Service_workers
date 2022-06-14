import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Character = ({ characters }) => {
  return (
      
    <SimpleGrid columns={[1, 2, 3,4]} spacing="40px">
        
      {characters.map((character) => {
        return (
            <div key={character.id}><Link href="/char"><div>
            <Image alt="" src={character.image} width={300} height={300} />
            <Heading as="h4" align="center" size="md">
              {character.name}
            </Heading>
            <Text align="center">Origin: {character.origin.name}</Text>
            {/* <Text align="center">Location: {character.location.name}</Text> */}
            </div></Link></div>
        );
      })}
    </SimpleGrid>
    
  );
};

export default Character;
