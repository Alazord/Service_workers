import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home2.module.css";
import Navbar from "/pages/navBar";
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
import { Button, ButtonGroup } from "@chakra-ui/react";

import Episode from "../components/Episode";

export default function Home4(results) {
  const intialState = results;
  const [search, setSearch] = useState("");
  const [episodes, setEpisodes] = useState(intialState.episodes);
  const toast = useToast();
  return (
    <div>
      <Navbar />
      <Flex direction="column" justify="center" align="center">
      {/* <div id="epi"> */}
        <Head>
          <title>Episodes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <Box
          mb={4}
          flexDirection="column"
          align="center"
          justify="center"
          py={8}
          bg="aqua"
        > */}
          <Heading fontSize="44px" size="2xl" mb={8} marginTop={60}>
            Rick and Morty{" "}
          </Heading>
          {/* <h1 style={j}>Rick and Morty</h1> */}
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
            <Stack
              isInline
              mb={8}
              margin="0 auto"
              justifyContent="center"
              height="30px"
            >
              <Input
                placeholder="Search"
                value={search}
                // border="none"
                onChange={(e) => setSearch(e.target.value)}
                width="300px"
                borderRadius={5}
              ></Input>
              <IconButton
                color="blue"
                aria-label="Search database"
                icon={<SearchIcon />}
                disabled={search === ""}
                type="submit"
                width="30px"
                height="30px"
                borderRadius={5}
                backgroundColor="white"
              />
              <Button
                color="Green"
                aria-label="Reset "
                width="80px"
                borderRadius={5}
                backgroundColor="white"
                // icon={<CloseIcon />}
                disabled={search === ""}
                onClick={async () => {
                  setSearch("");
                  setEpisodes(intialState.episodes);
                }}
              >
                Reset
              </Button>
            </Stack>
          </form>
          <Episode episodes={episodes} />
        {/* </Box> */}
        <footer className={styles.footer}>&copy;</footer>
      </Flex>
      {/* </div> */}
    </div>
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
        episodes(filter: null) {
          results {
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
