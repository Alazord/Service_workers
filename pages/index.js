import Head from "next/head";
import Navbar from "../components/navBar/NavBar";
import MainContent from "../components/mainContent/MainContent";

export default function Home() {
  return (
    <div className="nav">
      <Head>
        <title>Home</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="status"></div>
      <Navbar props={"HOME"} id="home-navbar" />
      <MainContent />
    </div>
  );
}
