import "../styles/globals.css";
import React, { useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  function hasNetwork(online) {
    const element = document.querySelector(".nav-container");
    const bg = document.querySelector("body");
    if (online) {
      if (element) {
        element.style.backgroundColor = "#ff01c1";
      }
      bg.style.backgroundImage = `url("/images/Background.png")`;
      console.log("we're online");
    } else {
      if (element) {
        element.style.backgroundColor = "grey";
      }
      bg.style.backgroundImage = "none";
      bg.style.backgroundColor = "#D3D3D3";
      console.log("we're offline");
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
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
