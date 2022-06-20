import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export default function MyChar(results) {
  const character = results.character;
  return (
    <div className="characterCard">
      <Head>
        <title>Character Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        className="characterCardHeading"
      >
        Details of the character you clicked on:
      </h1>
      <div
        className="characterCardItems"
      >
        <Image alt="" src={character.image} width={300} height={300} />
        <ul
          style={{ listStyle: "none", alignItems: "center", fontSize: "21px" }}
        >
          <li>
            <b>Species:</b> {character.species}
          </li>
          <li>
            <b>Status:</b> {character.status}
          </li>
          <li>
            <b>Name:</b> {character.name}
          </li>
          <li>
            <b>Gender:</b> {character.gender}
          </li>
        </ul>
      </div>
      <button
        className="characterCardReturn"
      >
        <Link href={"/char_page"}>Return</Link>
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.char;
  const results = await fetch('https://rickandmortyapi.com/graphql/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Cache-Control': 'max-age=60',
      },
      body: JSON.stringify({
        query: `
        query getCharacters{
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
      `
      })
    });
    const data = await results.json();
  return {
    props: {
      character: data.data.character,
    },
  };
}
