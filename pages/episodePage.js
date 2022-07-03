import EpisodeList from "../components/episode/episodeList";
import Head from "next/head";
import NavBar from "../components/navBar/NavBar";
import Status from "../components/status/status";

export default function Epi_List() {
  return (
    <div className="nav">
      <Head>
        <title>Episodes</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props={"EPISODES"} />
      <EpisodeList />
    </div>
  );
}
