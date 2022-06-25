import Head from "next/head";
import Navbar from "../components/navBar/navBar";
import MainContent from "../components/mainContent/mainContent";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const episodes = document.querySelectorAll(".nav-element");
    episodes[0].style.backgroundColor = "lightblue";

    const element = document.querySelector(".nav-container");
    const bg = document.querySelector("body");
    if (navigator.onLine) {
      element.style.backgroundColor = "#ff01c1";
      bg.style.backgroundImage = `url("/images/Background.png")`;
    } else {
      element.style.backgroundColor = "grey";
      bg.style.backgroundImage = "none";
      bg.style.backgroundColor = "#D3D3D3";
    }
    return () => {
      episodes[0].style.backgroundColor = "none";
    };
  });

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
