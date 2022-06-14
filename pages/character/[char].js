import { useRouter } from "next/router";
// import Head from "next/head";
// import { useState } from "react";
// import Character from "../../components/Character";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function characterDetails(){
    // const intialState = results;
    // const [characters, setCharacters] = useState(intialState.characters);
    // <Character characters={characters} />
    const router=useRouter();
    const id=router.query.id;
    // return <Character characters={characters} />;
    return <h1>Details about product {id}</h1>
}

// export async function getStaticProps() {
//     const client = new ApolloClient({
//       uri: "https://rickandmortyapi.com/graphql/",
//       cache: new InMemoryCache(),
//     });
//     const { data } = await client.query({
//       query: gql`
//         query {
//           characters(page: 1) {
//             info {
//               count
//               pages
//             }
//             results {
//               name
//               id
//               location {
//                 name
//                 id
//               }
//               image
//               origin {
//                 name
//                 id
//               }
//               episode {
//                 id
//                 episode
//                 air_date
//               }
//             }
//           }
//         }
//       `,
//     });
  
//     return {
//       props: {
//         characters: data.characters.results,
//       },
//     };
//   }
  