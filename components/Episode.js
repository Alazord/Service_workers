import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Episode = ({ episodes }) => {
  return (
      
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
        
      {episodes.map((episode) => {
        return (
            <div key={episode.id}><Link href={`/episode/${episode.id}`}><div>
            <Heading as="h4" align="center" size="md">
              {episode.name}
            </Heading>
            <Text align="center">Episode: {episode.episode}</Text>
            <Text align="center">Name: {episode.name}</Text>
            </div></Link></div>
        );
      })}
    </SimpleGrid>
    
  );
};

export default Episode;
