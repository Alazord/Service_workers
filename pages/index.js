import Head from "next/head";
import Navbar from "./navBar";
import MainContent from "../components/MainContent.js";
import { useEffect } from "react";

export default function Home() {
  function hasNetwork(online) {
    console.log(online);
    const element = document.querySelector(".nav-container");
    if (online) {
      element.style.backgroundColor = "#ff01c1";
    } else {
      element.style.backgroundColor = "grey";
    }
  }
  useEffect(() => {
    window.addEventListener("load", () => {
      hasNetwork(navigator.onLine);
    });
    window.addEventListener("online", () => {
      hasNetwork(true);
    });
    window.addEventListener("offline", () => {
      hasNetwork(false);
    });
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
