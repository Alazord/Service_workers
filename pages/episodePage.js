import Head from "next/head";
import Navbar from "../components/navBar/navBar";
import EpisodeList from "../components/episode/episodeList";

export default function Epi_List() {
  return (
    <div>
      <Head>
        <title>Episodes</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="status"></div>
      <Navbar props={"EPISODES"} id="home-navbar" />
      <EpisodeList />
    </div>
  );
}
