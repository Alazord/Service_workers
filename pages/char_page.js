import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home2.module.css";
import { Link} from "@chakra-ui/react";

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
    <div className="nav">
      <div className="nav-container">
        {optionList.map(([item, URL], index) => (
          <Link className="nav-element" key={index} href={URL}>
            {item}
          </Link>
        ))}
      </div>
      <div className="page">
        <Head>
          <title>Characters</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="page-heading">
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
            setCharacters(characters);
          }}
        >
          <div className="search-bar">
            <input className="search-bar-inpt"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn"
              disabled={search === ""}
              type="submit"
            >
              Search
            </button>
            <button className="reset-btn"
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
        <div className="items">
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
