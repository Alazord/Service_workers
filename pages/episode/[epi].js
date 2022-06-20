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
        <ul
          style={{ listStyle: "none", alignItems: "center", fontSize: "21px" }}
        >
          {episodeData.map((item, index) => (
            <li key={`item${index}`}>
              <b>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
      <button className="episode-card-return">
        <Link href={"/episode_page"}>Return</Link>
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.epi;
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        episode(id:${id}){
            name
            air_date
            episode
            created
        }     
      }
      `,
  });

  return {
    props: {
      episode: data.episode,
    },
  };
}
