import Head from "next/head";
// import Link from "next/Link";
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
  Link,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";

import Character from "../components/Character";

export default function Home2(results) {
  const intialState = results;
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState(intialState.characters);
  const optionList = [
    ["RICK AND MORTY WIKI", "/"],
    ["EXPLORE", "/#explore"],
    ["EPISODES", "/episode_page"],
    ["CHARACTERS", "/char_page"],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="nav-container">
        {optionList.map(([item, URL], index) => (
          <Link className="nav-element" key={index} href={URL}>
            {item}
          </Link>
        ))}
      </div>
      <div
        style={{ direction: "column", justify: "center", alignItems: "center" }}
      >
        <Head>
          <title>Characters</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "90px",
            textAlign: "center",
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Link href="/">Rick and Morty</Link>
        </h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const results = await fetch("/api/SearchCharacters", {
              method: "post",
              body: search,
            });
            const { characters, error } = await results.json();
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
              setCharacters(characters);
            }
          }}
        >
          <div
            style={{
              margin: "0 auto",
              justifyContent: "center",
              height: "40px",
              marginTop: "20px",
              display: "flex",
              gap: "5px",
            }}
          >
            <input
              placeholder="Search"
              value={search}
              // border="none"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "400px", borderRadius: "5px" }}
            />
            <button
              disabled={search === ""}
              type="submit"
              style={{
                borderRadius: "5px",
                backgroundColor: "#4a58ed",
                color: "white",
                borderColor: "white",
              }}
            >
              Search
            </button>
            <button
              style={{
                width: "80px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "white",
                borderColor: "white",
              }}
              // icon={<CloseIcon />}
              disabled={search === ""}
              onClick={async () => {
                setSearch("");
                setCharacters(intialState.characters);
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <div
          style={{
            display: "grid",
            columnCount: "4",
            margin: "0 30px",
          }}
        >
          <Character characters={characters} />
        </div>

        <footer className={styles.footer}>&copy;</footer>
      </div>
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
        characters(filter: {}) {
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
