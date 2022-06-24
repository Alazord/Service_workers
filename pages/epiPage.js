import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import Episode from "../components/Episode";

const queryClient = new QueryClient();

const Episode_List = () => {
    const [episodes,setEpisodes]=useState([]);
    const [search, setSearch] = useState("");
    const { loading, error, data, refetch } = useQuery('Episodes', async () => {
        try{
            const res = await fetch("https://rickandmortyapi.com/graphql/", {
                method: "POST",
                mode: "cors",
                headers: {
                "Content-Type": "application/json",
                // 'Cache-Control': 'max-age=60',
                },
                body: JSON.stringify({
                query: `
                    query getEpisodes{
                    episodes(filter: { name: "${search}" }) {
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
            
            const res2= await res.json();
            // console.log("abc",res2.data.episodes.results);
            setEpisodes(res2.data.episodes.results);
            return res2.data.episodes.results;
        }
        catch(error){
                Router.push("/fallback");
        }
    });
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
              refetch();
          }}
        >
          <div className="search-bar">
            <input
              className="search-bar-inpt"
              value={search}
              onChange={(e) => {
                  setSearch(e.target.value)
                  
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
              disabled={search === ""}
              onClick={async () => {
                await setSearch("");
                refetch();
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="items">
             {loading?
            <div> Loading...</div>:
            error?<div> Error...</div>:
           <Episode episodes={episodes} />}
        </div>

        <footer className={styles.footer}>&copy;</footer>
      </div>
    </div>
  )
}

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
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Episode_List />
    </QueryClientProvider>
  );
}
