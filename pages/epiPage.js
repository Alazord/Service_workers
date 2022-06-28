import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";
import { useQuery, gql } from "@apollo/client";

import Episode from "../components/episode/episode";

const EPISODE_LIST = gql`
  query getEpisodes($submit: String!) {
    episodes(filter: { name: $submit }) {
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
  const [submit,setSubmit] =useState("");
  const { error, data} = useQuery(EPISODE_LIST, {
    variables: { submit },
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
            setSubmit(search+" ");
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
              onClick={() => {
                setSubmit("");
                setSearch("");
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="items">
          {
          error ?
            (<h1>Sorry, you are offline. You cannot make new searches. However, you can still make old ones.</h1>):
          data ? (
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

export default function Epi_List() {
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
  // const intialState = results;
  // const [episodes,setEpisodes] = useState(intialState.episodes);
  // const [search, setSearch] = useState("");
  // const [submit,setSubmit] =useState("");
  // const { loading, error, data, refetch } = useQuery(EPISODE_LIST, {
  //   variables: { submit },
  // });
  // useEffect(()=>{
  //   data?
  //   setEpisodes(data.episodes.results):"";
  // },[data])
  // const optionList = [
  //   ["RICK AND MORTY WIKI", "/"],
  //   ["EXPLORE", "/#explore"],
  //   ["EPISODES", "/episodePage"],
  //   ["CHARACTERS", "/charPage"],
  // ];

  return (
    <Episode_List />
    // <div className="nav">
    //   <div className="nav-container">
    //     {optionList.map(([item, URL], index) => (
    //       <Link className="nav-element" key={index} href={URL}>
    //         {item}
    //       </Link>
    //     ))}
    //   </div>
    //   <div className="page">
    //     <Head>
    //       <title>Episodes</title>
    //       <link rel="icon" href="/favicon.ico" />
    //     </Head>
    //     <h1 className="page-heading">
    //       <Link href="/">Rick and Morty</Link>
    //     </h1>
    //     <form
    //       onSubmit={async (event) => {
    //         event.preventDefault();
    //         // refetch({name:{search}});
    //         setSubmit(search+" ");
    //       }}
    //     >
    //       <div className="search-bar">
    //         <input
    //           className="search-bar-inpt"
    //           value={search}
    //           onChange={(e) => {
    //             setSearch(e.target.value);
    //           }}
    //         />
    //         <button
    //           className="search-btn"
    //           disabled={search === ""}
    //           type="submit"
    //         >
    //           Search
    //         </button>
    //         <button
    //           className="reset-btn"
    //           // disabled={search === ""}
    //           onClick={() => {
    //             setSubmit("");
    //             setSearch("");
    //             // refetch({ name: "" });
    //           }}
    //         >
    //           Reset
    //         </button>
    //       </div>
    //     </form>
    //     <div className="items">
    //       {/* {data ? ( */}
    //         <Episode episodes={episodes} />
    //       {/* ) : (
    //         <div> Loading...</div>
    //       )} */}
    //     </div>
    //     <footer className={styles.footer}>&copy;</footer>
    //   </div>
    // </div>
  );
}

// export async function getStaticProps() {
//   const results = await fetch("https://rickandmortyapi.com/graphql/", {
//     method: "POST",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Cache-Control': 'max-age=60',
//     },
//     body: JSON.stringify({
//       query: `
//         query getEpisodes{
//           episodes(filter: {}) {
//             results {
//               name
//               id
//               air_date
//               episode
//               created
//             }
//           }
//         }
//       `,
//     }),
//   });
//   const data = await results.json();
//   // console.log(data);
  
//   return {
//     props: {
//       episodes: data.data.episodes.results,
//     },
//   };
//   }
  