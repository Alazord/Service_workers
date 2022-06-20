import Head from "next/head";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home2.module.css";
import {Link} from "@chakra-ui/react";

import Episode from "../components/Episode";

export default function Home4(results) {
  const intialState = results;
  const [search, setSearch] = useState("");
  const [episodes, setEpisodes] = useState(intialState.episodes);
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
          <title>Episodes</title>
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
                  query getEpisodes{
                    episodes(filter: { name: "${search}" }){
                      results{
                        name
                        id
                        air_date
                        episode
                        created
                      }
                    }     
                  }
                `
                })
              });
              const data = await results.json();
              console.log(data);
              setEpisodes(data.data.episodes.results);
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
                setEpisodes(intialState.episodes);
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="items">
          <Episode episodes={episodes} />
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
        query getEpisodes{
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
      `
      })
    });
    const data = await results.json();
    console.log(data);

  return {
    props: {
      episodes: data.data.episodes.results,
    },
  };
}
