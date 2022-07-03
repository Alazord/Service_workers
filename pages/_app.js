import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export const ThemeContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [isOnline, setOnline] = useState(true);
  function hasNetwork(online) {
    //const element = document.querySelector(".nav-container");
    //const bg = document.querySelector("body");
    //const mode = document.querySelector(".status");
    if (online) {
      //if (mode) {
      //  //mode.classList.remove("offline");
      //  //mode.classList.add("online");
      //  //mode.innerText = "";
      //}
      //if (element) {
      //  element.style.backgroundColor = "#498467";
      //}
      //bg.style.backgroundImage = `url("/images/Background.png")`;
      console.log("we're online");
      setOnline(true);
      console.log("Setonline", isOnline);
    } else {
      //if (mode) {
      //  mode.classList.remove("online");
      //  mode.classList.add("offline");
      //  mode.innerText = "You are in offline mode";
      //}
      ////if (element) {
      ////  element.style.backgroundColor = "#6D6A75";
      ////}
      //// bg.style.backgroundImage = `url("/images/offlineBackground.svg")`;
      //bg.style.backgroundColor = "#D3D3D3";
      console.log("we're offline");
      setOnline(false);
      console.log("Setonline", isOnline);
    }
  }
  useEffect(() => {
    hasNetwork(navigator.onLine);
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
  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={isOnline}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
