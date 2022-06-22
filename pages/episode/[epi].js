import Head from "next/head";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function MyEpisode(results) {
  const episode = results.episode;
  const episodeData = [
    ["Episode: ", episode.episode],
    ["Air-Date: ", episode.air_date],
    ["Name: ", episode.name],
    ["Created: ", episode.created],
  ];
  return (
    <div className="episode-card">
      <Head>
        <title>Episode Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="episode-card-heading">
        Details of the Episode you clicked on:
      </h1>
      <div className="episode-card-items">
        <ul className="character-card-list">
          {episodeData.map((item, id) => (
            <li key={`item${id}`}>
              <b>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
      <button className="episode-card-return">
        <Link href={"/episodePage"}>Return</Link>
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.epi;
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
          episode(id:${id}){
            name
            air_date
            episode
            created
          }    
        }
      `
      })
    });
    const data = await results.json();
  return {
    props: {
      episode: data.data.episode,
    },
  };
}
