import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import getApolloClient from "../components/getApolloClient";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  // const [client, setClient] = useState(null)
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   console.log("abcd");
  //   getApolloClient().then((client) => {
  //     setClient(client)
  //     setLoading(false)
  //   })
  //   console.log("xyz");
  // }, [])
  function hasNetwork(online) {
    const element = document.querySelector(".nav-container");
    const bg = document.querySelector("body");
    if (online) {
      // console.log("element", element);
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
