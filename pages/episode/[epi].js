import Head from "next/head";
import styles from "./epi.module.css";
import NavBar from "../../components/navBar/NavBar";
import Status from "../../components/status/status";

export default function Episode_Card(results) {
  const episode = results.episode;
  const episodeData = [
    ["Episode: ", episode.episode],
    ["Air-Date: ", episode.air_date],
    ["Name: ", episode.name],
    ["Created: ", episode.created],
  ];
  return (
    <div className={styles["episode-card"]}>
      <Head>
        <title>Episode Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props="EPISODES" />
      <h2 className={styles["episode-card-heading"]}>
        Details of the Episode you clicked on:
      </h2>
      <div className={styles["episode-card-items"]}>
        <ul className={styles["episode-card-list"]}>
          {episodeData.map((item, id) => (
            <li key={`item${id}`}>
              <b>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
      {/* <button className={styles["episode-card-return"]}>
        <Link href={"/episodePage"}>Return</Link>
      </button> */}
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
