import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home2.module.css";
import {
  Heading,
  Input,
  Stack,
  IconButton,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from '@chakra-ui/react'

import Episode from "../components/Episode";

export default function Home4(results) {
  const intialState = results;
  const [search, setSearch] = useState("");
  const [episodes, setEpisodes] = useState(intialState.episodes);
  const toast = useToast();

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>Episodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
        <Heading as="h1" size="2xl" mb={8}>
          Rick and Morty{" "}
        </Heading>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const results = await fetch("/api/SearchEpisodes", {
              method: "post",
              body: search,
            });
            const { episodes, error } = await results.json();
            if (error) {
              toast({
                position: "bottom",
                title: "An error occurred.",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } else {
              setEpisodes(episodes);
            }
          }}
        >
          <Stack maxWidth="235px" width="100%" isInline mb={8}>
            <Input
              placeholder="Search"
              value={search}
              // border="none"
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
            <IconButton
              color="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
              disabled={search === ""}
              type="submit"
            />
            <Button
              color="Green"
              aria-label="Reset "
              // icon={<CloseIcon />}
              disabled={search === ""}
              onClick={async () => {
                setSearch("");
                setEpisodes(intialState.episodes);
              }}
            >Reset</Button>
          </Stack>
        </form>
        <Episode episodes={episodes} />
      </Box>

      <footer className={styles.footer}>
        &copy;
      </footer>
    </Flex>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
    query {
        episodes(filter:null){
          results{
            name
            id
            air_date
            episode
            created
          }
        }     
      }
    `,
  });

  return {
    props: {
      episodes: data.episodes.results,
    },
  };
}
