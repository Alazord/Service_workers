import Head from "next/head";
import NavBar from "../components/navBar/NavBar";
import MainContent from "../components/mainContent/MainContent";

export default function Home() {
  return (
    <div className="nav">
      <Head>
        <title>Home</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="status"></div>
      <NavBar id="home-navbar" props="HOME" />
      <MainContent />
    </div>
  );
}
