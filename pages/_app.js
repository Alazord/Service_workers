import "../styles/globals.css";
import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import getApolloClient from '../components/getApolloClient'

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

  // if (loading) {
  //   return (
  //     <div >
  //       Loading...
  //     </div>
  //   )
  // }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
