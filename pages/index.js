import Head from "next/head";
import NavBar from "../components/navBar/navBar";
import MainContent from "../components/mainContent/mainContent";
import Status from "../components/status/status";

export default function Home() {
  return (
    <div className="nav">
      <Head>
        <title>Home</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props="HOME" />
      <MainContent />
    </div>
  );
}
