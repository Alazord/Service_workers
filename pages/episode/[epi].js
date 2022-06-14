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
    const episode= results.episode;
    return (
        <Flex direction="column" justify="center" align="center">
          <Head>
            <title>Episode Details</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
            <Heading as="h1" size="2xl" mb={8}>
              Details of the episode you clicked on:{" "}
            </Heading>
            <Text align="center">Episode: {episode.episode}</Text>
            <Text align="center">Air-Date: {episode.air_date}</Text>
            <Text align="center">Name: {episode.name}</Text>
            <Text align="center">Created: {episode.created}</Text>
          </Box>
        </Flex>
      );
}

export async function getServerSideProps(context) {
    const id=context.params.epi;
    // const { query } = context
    // console.log(query);
    const client = new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql/",
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: gql`
      query {
        episode(id:${id}){
            name
            air_date
            episode
            created
        }     
      }
      `,
    });
  
    return {
      props: {
        episode: data.episode,
      },
    };
  }