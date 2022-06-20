import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export default function MyChar(results) {
  const character = results.character;
  const characterData = [
    ["Species: ", character.species],
    ["Status: ", character.status],
    ["Name: ", character.name],
    ["Gender: ", character.gender],
  ];
  return (
    <div className="character-card">
      <Head>
        <title>Character Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="character-card-heading">
        Details of the character you clicked on:
      </h1>
      <div className="character-card-items">
        <Image alt="" src={character.image} width={300} height={300} />
        <ul
          style={{ listStyle: "none", alignItems: "center", fontSize: "21px" }}
        >
          {characterData.map((item, index) => (
            <li key={`item${index}`}>
              <b>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
      <button className="character-card-return">
        <Link href={"/char_page"}>Return</Link>
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.char;
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        character(id:${id}){
          image
          name
          status
          species
          type
          gender
          created
          episode{
            episode
          }
          }
      }
      `,
  });

  return {
    props: {
      character: data.character,
    },
  };
}
