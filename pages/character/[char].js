import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
    <div className={styles["character-card"]}>
      <Head>
        <title>Character Details</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props="CHARACTERS" />
      <h2
        className={
          styles[
            isOnline
              ? "character-card-heading-online"
              : "character-card-heading-offline"
          ]
        }
      >
        Details of the character you clicked on:
      </h2>
      <div
        className={
          styles[
            isOnline
              ? "character-card-items-online"
              : "character-card-items-offline"
          ]
        }
      >
        <Image
          alt="Character Image"
          src={character.image}
          width={300}
          height={300}
        />
        <ul className={styles["character-card-list"]}>
          {characterData.map((item, id) => (
            <li key={`item${id}`}>
              <b className="sub-head">{item[0]}</b>
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
