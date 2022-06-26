import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";
import { useQuery, gql } from "@apollo/client";

import Episode from "../components/episode/episode";

const EPISODE_LIST = gql`
  query getEpisodes($name: String!) {
    episodes(filter: { name: $name }) {
      results {
        name
        id
        air_date
        episode
        created
      }
    }
  }
`;

const Episode_List = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(EPISODE_LIST, {
    variables: { name: search },
  });
  // console.log(data);
  // useEffect(() => {
  //   refetch({ name: search });
  // });
  const optionList = [
    ["RICK AND MORTY WIKI", "/"],
    ["EXPLORE", "/#explore"],
    ["EPISODES", "/episodePage"],
    ["CHARACTERS", "/charPage"],
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
            refetch({name:{search}});
          }}
        >
          <div className="search-bar">
            <input
              className="search-bar-inpt"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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
              // disabled={search === ""}
              onClick={async () => {
                setSearch("");
                refetch({ name: "" });
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="items">
          {data ? (
            <Episode episodes={data.episodes.results} />
          ) : (
            <div> Loading...</div>
          )}
        </div>
        <footer className={styles.footer}>&copy;</footer>
      </div>
    </div>
  );
};

export default function Home4() {
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

  return (
    // <QueryClientProvider client={queryClient} contextSharing={true}>
    <Episode_List />
    // </QueryClientProvider>
  );
}
