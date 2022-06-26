import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";

import Character from "../components/character/character";
import { memo } from "react";

export default function Character_List(results) {
useEffect(() => {
  const episodes = document.querySelectorAll(".nav-element");
  episodes[3].style.backgroundColor = "lightblue";

  const element = document.querySelector(".nav-container");
  const bg = document.querySelector("body");
  if (navigator.onLine) {
    element.style.backgroundColor = "#ff01c1";
    bg.style.backgroundImage = `url("/images/Background.png")`;
  } else {
    element.style.backgroundColor = "grey";
    bg.style.backgroundImage = "none";
    bg.style.backgroundColor = "#D3D3D3";
  }
  return () => {
    episodes[3].style.backgroundColor = "none";
  };
});
const intialState = results;
const [search, setSearch] = useState("");
const [characters, setCharacters] = useState(intialState.characters);
const optionList = [
  ["RICK AND MORTY WIKI", "/"],
  ["EXPLORE", "/#explore"],
  ["EPISODES", "/episodePage"],
  ["CHARACTERS", "/charPage"],
];

const memoizedCallback = useCallback(
  async (event) => {
    event.preventDefault();
    try {
      const results = await fetch("https://rickandmortyapi.com/graphql/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          query: `
          query getCharacters{
            characters(filter: { name: "${search}" }) {
              info {
                count
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
        }),
      });
      const data = await results.json();
      console.log(data);
      setCharacters(data.data.characters.results);
    } catch (error) {
      Router.push("/searchFallback");
    }
  },
  [search]
);

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
      <form onSubmit={memoizedCallback}>
        <div className="search-bar">
          <input
            className="search-bar-inpt"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="search-btn"
            disabled={search === ""}
            type="submit"
          >
            Search
          </button>
          <button
            className="reset-btn"
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
const results = await fetch("https://rickandmortyapi.com/graphql/", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    // 'Cache-Control': 'max-age=60',
  },
  body: JSON.stringify({
    query: `
      query getCharacters{
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
  }),
});
const data = await results.json();
console.log(data);

return {
  props: {
    characters: data.data.characters.results,
  },
};
}
