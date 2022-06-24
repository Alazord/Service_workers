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
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
