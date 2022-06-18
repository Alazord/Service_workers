import Head from "next/head";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function MyEpisode(results) {
  const episode = results.episode;
  return (
    <div className="episodeCard">
      <Head>
        <title>Episode Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        className="episodeCardHeading"
      >
        Details of the Episode you clicked on:
      </h1>
      <div
        className="episodeCardItems"
      >
        <ul
          style={{ listStyle: "none", alignItems: "center", fontSize: "21px" }}
        >
          <li>
            <b>Episode:</b> {episode.episode}
          </li>
          <li>
            <b>Air-Date:</b> {episode.air_date}
          </li>
          <li>
            <b>Name:</b> {episode.name}
          </li>
          <li>
            <b>Created:</b> {episode.created}
          </li>
        </ul>
      </div>
      <button
        className="episodeCardReturn"
      >
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
