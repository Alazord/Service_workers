import Head from "next/head";
import Navbar from "./navBar";
import MainContent from "../components/MainContent.js";

export default function Home() {
  return (
    <div className="nav">
      <Head>
        <title>Home</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar id="home-navbar" />
      <MainContent />
    </div>
  );
}
