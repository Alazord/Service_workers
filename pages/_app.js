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
    if (online) {
      console.log("we're online");
      setOnline(true);
      console.log("Setonline", isOnline);
    } else {
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
