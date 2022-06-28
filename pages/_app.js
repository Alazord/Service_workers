import "../styles/globals.css";
import { useEffect } from "react";
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', function() {
  //     navigator.serviceWorker.register('/sw.js').then(function(registration) {
  //       // Registration was successful
  //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //       // Initializing list.
  //       updateList(null, null);
  //     }, function(err) {
  //       // registration failed :(
  //       console.log('ServiceWorker registration failed: ', err);
  //     });
  //   });
  // }
  // useEffect(() => {
  //   if("serviceWorker" in navigator) {
  //     window.addEventListener("load", function () {
  //      navigator.serviceWorker.register("sw2.js").then(
  //         function (registration) {
  //           console.log("Service Worker registration successful with scope: ", registration.scope);
  //         },
  //         function (err) {
  //           console.log("Service Worker registration failed: ", err);
  //         }
  //       );
  //     });
  //   }
  // }, [])
  function hasNetwork(online) {
    const element = document.querySelector(".nav-container");
    const bg = document.querySelector("body");
    if (online) {
      console.log("element", element);
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
