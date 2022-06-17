import Head from "next/head";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// export default function MyChar(results) {
//   const episode = results.episode;
//   return (
//     <Flex direction="column" justify="center" align="center">
//       <Head>
//         <title>Episode Details</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Box
//         mb={4}
//         flexDirection="column"
//         align="center"
//         justify="center"
//         py={8}
//         backgroundColor="white"
//         marginTop={80}
//         height={350}
//         padding={10}
//         borderRadius={20}
//         opacity={0.9}
//       >
//         <Heading as="h1" size="2xl" mb={8}>
//           Details of the episode you clicked on:{" "}
//         </Heading>
//         <Text align="center">Episode: {episode.episode}</Text>
//         <Text align="center">Air-Date: {episode.air_date}</Text>
//         <Text align="center">Name: {episode.name}</Text>
//         <Text align="center">Created: {episode.created}</Text>
//       </Box>
//       <button style={({ width: "100px" }, { fontSize: "24px" })}>
//         <a href="/episode_page">Return</a>
//       </button>
//     </Flex>
//   );
// }

export default function MyEpisode(results) {
  const episode = results.episode;
  return (
    <div className="episodeCard">
      <Head>
        <title>Episode Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        style={{
          backgroundColor: "purple",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Details of the Episode you clicked on:
      </h1>
      <div
        style={{
          alignItems: "center",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <ul
          style={{ listStyle: "none", alignItems: "center", fontSize: "21px" }}
        >
          <li>
            <b>Episode:</b> {episode.episode}
          </li>
          <li>
            <b>Air-Date:</b> {episode.air_date}
          </li>
          <li>
            <b>Name:</b> {episode.name}
          </li>
          <li>
            <b>Created:</b> {episode.created}
          </li>
        </ul>
      </div>
      <button
        style={{
          padding: "10px",
          fontSize: "18px",
          backgroundColor: "rgba(255,255,255,0.5)",
          borderRadius: "10px",
          width: "150px",
          marginTop: "10px",
          borderColor: "white",
        }}
      >
        <Link href={"/episode_page"}>Return</Link>
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.epi;
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        episode(id:${id}){
            name
            air_date
            episode
            created
        }     
      }
      `,
  });

  return {
    props: {
      episode: data.episode,
    },
  };
}
