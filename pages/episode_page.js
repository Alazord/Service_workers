import Head from "next/head";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";

import Episode from "../components/Episode";

export default function Home4(results) {
  function hasNetwork(online) {
    console.log(online);
    const element = document.querySelector(".nav-container");
    if (online) {
      element.style.backgroundColor = "#ff01c1";
    } else {
      element.style.backgroundColor = "grey";
    }
  }
  useEffect(() => {
    window.addEventListener("load", () => {
      hasNetwork(navigator.onLine);
    });
    window.addEventListener("online", () => {
      hasNetwork(true);
    });
    window.addEventListener("offline", () => {
      hasNetwork(false);
    });
  });
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
        <h1 className="page-heading">
          <Link href="/">Rick and Morty</Link>
        </h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const results = await fetch(
                "https://rickandmortyapi.com/graphql/",
                {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Cache-Control': 'max-age=3600',
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
                `,
                  }),
                }
              );
              const data = await results.json();
              console.log(data);
              setEpisodes(data.data.episodes.results);
            } catch (error) {
              Router.push("/fallback");
              // alert("Sorry, you are offline. New searches cannot be requested");
              // console.log("error: ", error[0]);
            }
          }}
        >
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
  const results = await fetch("https://rickandmortyapi.com/graphql/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
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
      `,
    }),
  });
  const data = await results.json();
  console.log(data);

  return {
    props: {
      episodes: data.data.episodes.results,
    },
  };
}
