import Head from "next/head";
import Image from "next/image";
import styles from "./char.module.css";
import NavBar from "../../components/navBar/navBar";
import Status from "../../components/status/status";
import { useContext } from "react";
import { ThemeContext } from "../_app";

export default function MyChar(results) {
  const character = results.character;
  const characterData = [
    ["Species: ", character.species],
    ["Status: ", character.status],
    ["Name: ", character.name],
    ["Gender: ", character.gender],
  ];
  const isOnline = useContext(ThemeContext);

  return (
    <div className={styles.characterCard}>
      <Head>
        <title>Character Details</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props="CHARACTERS" />
      <h2
        className={
          isOnline
            ? styles.characterCardHeadingOnline
            : styles.characterCardHeadingOffline
        }
      >
        Details of the character you clicked on:
      </h2>
      <div
        className={
          isOnline
            ? styles.characterCardItemsOnline
            : styles.characterCardItemsOffline
        }
      >
        <Image
          alt="Character Image"
          src={character.image}
          width={300}
          height={300}
        />
        <ul className={styles.characterCardList}>
          {characterData.map((item, id) => (
            <li key={`item${id}`}>
              <b className={styles.subHead}>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.char;
  const results = await fetch("https://rickandmortyapi.com/graphql/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=3600",
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
    `,
    }),
  });
  const data = await results.json();
  return {
    props: {
      character: data.data.character,
    },
  };
}
