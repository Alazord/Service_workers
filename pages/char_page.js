import Head from "next/head";
import Link from "next/link";
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

import Character from "../components/Character";

export default function Home2(results) {
  const intialState = results;
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState(intialState.characters);
  // const toast = useToast();
  const optionList = [
    ["RICK AND MORTY WIKI", "/"],
    ["EXPLORE", "/#explore"],
    ["EPISODES", "/episode_page"],
    ["CHARACTERS", "/char_page"],
  ];

  return (
    <div><div className="nav-container">
    {optionList.map(([item, URL], index) => (
      <Link className="nav-element" key={index} href={URL}>
        {item}
      </Link>
    ))}
  </div>
<div className="charPage">
  <Head>
    <title>Characters</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  {/* <Box mb={4} flexDirection="column" align="center" justify="center" py={8}> */}
    {/* <Heading as="h1" marginTop={60}>
      <Link href="/">Rick and Morty</Link>
    </Heading> */}
    <h1><Link href="/">Rick and Morty</Link></h1>

    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const results = await fetch("/api/SearchCharacters", {
          method: "post",
          body: search,
        });
        const { characters, error } = await results.json();
        // if (error) {
        //   toast({
        //     position: "bottom",
        //     title: "An error occurred.",
        //     description: error,
        //     status: "error",
        //     duration: 5000,
        //     isClosable: true,
        //   });
        // } else {
          setCharacters(characters);
        // }
      }}
    >
      {/* <Stack
        isInline
        mb={8}
        margin="0 auto"
        justifyContent="center"
        height="30px"
        marginTop={20}
      > */}
        <input
          placeholder="Search"
          value={search}
          // border="none"
          onChange={(e) => setSearch(e.target.value)}
          width="300px"
          borderRadius={5}
        >

        </input>
        <button
          color="blue"
          aria-label="Search database"
          // icon={<SearchIcon />}
          disabled={search === ""}
          type="submit"
          width="30px"
          height="30px"
          borderRadius={5}
          backgroundColor="white"
        >Search</button>
        <button
          color="Green"
          aria-label="Reset "
          width="80px"
          borderRadius={5}
          backgroundColor="white"
          // icon={<CloseIcon />}
          disabled={search === ""}
          onClick={async () => {
            setSearch("");
            setCharacters(intialState.characters);
          }}
        >
          Reset
        </button>
      {/* </Stack> */}
    </form>
    <div><Character characters={characters} /></div>
  {/* </Box> */}

  <footer className={styles.footer}>&copy;</footer>
  </div> </div>
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
        characters(filter:{}) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              name
              id
            }
            image
            origin {
              name
              id
            }
            episode {
              id
              episode
              air_date
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
