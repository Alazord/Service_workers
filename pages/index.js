import Head from "next/head";
import Navbar from "../components/navBar/NavBar";
import MainContent from "../components/mainContent/MainContent";
import { useEffect } from "react";

export default function Home() {
  /* function hasNetwork(online) {
    const navElements = document.querySelectorAll(".nav-element");
    navElements[0].style.backgroundColor = "lightblue";

    const element = document.querySelector(".nav-container");
    const bg = document.querySelector("body");
    if (online) {
      element.style.backgroundColor = "#ff01c1";
      bg.style.backgroundImage = `url("/images/Background.png")`;
      console.log("we're online");
    } else {
      element.style.backgroundColor = "grey";
      bg.style.backgroundImage = "none";
      bg.style.backgroundColor = "#D3D3D3";
      console.log("we're offline");
    }
  }
  useEffect(() => {
    window.addEventListener("load", () => {
      hasNetwork(navigator.onLine);
    });
    window.addEventListener("online", () => {
      hasNetwork(navigator.onLine);
    });
    window.addEventListener("offline", () => {
      hasNetwork(navigator.onLine);
    });
  });
*/
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
