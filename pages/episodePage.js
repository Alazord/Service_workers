import Head from "next/head";
import Navbar from "../components/navBar/navBar";
import EpisodeList from "../components/episode/episodeList";
import Head from "next/head";
import NavBar from "../components/navBar/navBar";

export default function Epi_List() {
  return (
    <div className="nav">
      <Head>
        <title>Episodes</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="status"></div>
      <NavBar id="home-navbar" props={"EPISODES"} />
      <EpisodeList />
    </div>
  );
}
