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
        <h1 className="pageHeading">
          <Link href="/">Rick and Morty</Link>
        </h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try{
              const results = await fetch('https://rickandmortyapi.com/graphql/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  // 'Cache-Control': 'max-age=60',
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
                `
                })
              });
              const data = await results.json();
              console.log(data);
              setCharacters(data.data.characters.results);
            } catch(error){
              alert("Sorry, you are offline. New searches cannot be requested");
              console.log("error: ", error[0]);
            }
          }}
        >
          <div className="searchBar">
            <input className="searchBarInpt"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="searchBtn"
              disabled={search === ""}
              type="submit"
            >
              Search
            </button>
            <button className="resetBtn"
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
  const results = await fetch('https://rickandmortyapi.com/graphql/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
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
      `
      })
    });
    const data = await results.json();
    console.log(data);

  return {
    props: {
      characters: data.data.characters.results,
    },
  };
}
