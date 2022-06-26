import "../styles/globals.css";
import { useEffect } from "react";
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
  // method: "POST",
  // mode: "cors",
  // headers: {
  // "Content-Type": "application/json",
  // // 'Cache-Control': 'max-age=60',
  // },
});

function MyApp({ Component, pageProps }) {
//   const persistor = new CachePersistor({
//     cache,
//     storage: new AsyncStorageWrapper(AsyncStorage),
//  });
//  // then later when initializing your App
//  useEffect(() => {
//     async function initializeCache() {
//        await persistor.restore();
//        const client = new ApolloClient({
//           // your Apollo Client initialization
//           uri: "https://rickandmortyapi.com/graphql/",
//           cache: new InMemoryCache(),
//        });
//        client.onClearStore(async () => {
//           await persistor.purge();
//        });
//     }
//     initializeCache();
//  }, []);  

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
