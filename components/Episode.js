import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text, SimpleGrid, Box } from "@chakra-ui/react";

const Episode = ({ episodes }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" marginTop="40px">
      {episodes.map((episode) => {
        return (
          <Box
            key={episode.id}
            style={{ border: "1px solid black" }}
            bg="#FFFFFF"
            borderRadius={10}
            height="200px"
            width="300px"
            textOverflow={0}
          >
            <Link href={`/episode/${episode.id}`}>
              <div>
                <Heading as="h4" align="center" size="md">
                  {episode.name}
                </Heading>
                <Text align="center">Episode: {episode.episode}</Text>
                <Text align="center">Name: {episode.name}</Text>
              </div>
            </Link>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default Episode;
