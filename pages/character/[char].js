import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../../styles/Home2.module.css";
import {
  Input,
  Stack,
  IconButton,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";
import Char from "../../components/Char";

export default function MyChar(results){
    const character= results.character;
    return (
        <Flex direction="column" justify="center" align="center">
          <Head>
            <title>Character Details</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
            <Heading as="h1" size="2xl" mb={8}>
              Details of the character you clicked on:{" "}
            </Heading>
            <Image alt="" src={character.image} width={300} height={300}  />
            <Text align="center">Species: {character.species}</Text>
            <Text align="center">Status: {character.status}</Text>
            <Text align="center">Name: {character.name}</Text>
            <Text align="center">Gender: {character.gender}</Text>
            <Text align="center">Created: {character.created}</Text>
          </Box>
        </Flex>
      );
}

export async function getServerSideProps(context) {
    const id=context.params.char;
    // const { query } = context
    // console.log(query);
    const client = new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql/",
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: gql`
      query {
        character(id:${id}){
          image
          name
          status
          species
          type
          gender
          created
          episode{
            episode
          }
          }
      }
      `,
    });
  
    return {
      props: {
        character: data.character,
      },
    };
  }