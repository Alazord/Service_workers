import Head from "next/head";
import styles from "./epi.module.css";
import NavBar from "../../components/navBar/navBar";
import Status from "../../components/status/status";
import { useContext } from "react";
import { ThemeContext } from "../_app";

export default function Episode_Card(results) {
  const episode = results.episode;
  const episodeData = [
    ["Episode: ", episode.episode],
    ["Air-Date: ", episode.air_date],
    ["Name: ", episode.name],
    ["Created: ", episode.created],
  ];
  const isOnline = useContext(ThemeContext);
  return (
    <div className={styles.episodeCard}>
      <Head>
        <title>Episode Details</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props="EPISODES" />
      <h2
        className={
          isOnline
            ? styles.episodeCardHeadingOnline
            : styles.episodeCardHeadingOffline
        }
      >
        Details of the Episode you clicked on:
      </h2>
      <div
        className={
          isOnline
            ? styles.episodeCardItemsOnline
            : styles.episodeCardItemsOffline
        }
      >
        <ul className={styles.episodeCardList}>
          {episodeData.map((item, id) => (
            <li key={`item${id}`}>
              <b>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.epi;
  const results = await fetch("https://rickandmortyapi.com/graphql/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=3600",
    },
    body: JSON.stringify({
      query: `
        query getEpisodes{
          episode(id:${id}){
            name
            air_date
            episode
            created
          }    
        }
      `,
    }),
  });
  const data = await results.json();
  return {
    props: {
      episode: data.data.episode,
    },
  };
}
