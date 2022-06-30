import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./char.module.css";

export default function MyChar(results) {
  const character = results.character;
  const characterData = [
    ["Species: ", character.species],
    ["Status: ", character.status],
    ["Name: ", character.name],
    ["Gender: ", character.gender],
  ];

  return (
    <div className={styles["character-card"]}>
      <Head>
        <title>Character Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles["character-card-heading"]}>
        Details of the character you clicked on:
      </h1>
      <div className={styles["character-card-items"]}>
        <Image
          alt="Character Image"
          src={character.image}
          width={300}
          height={300}
        />
        <ul className={styles["character-card-list"]}>
          {characterData.map((item, id) => (
            <li key={`item${id}`}>
              <b>{item[0]}</b>
              {item[1]}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles["character-card-return"]}>
        <Link href={"/charPage"}>Return</Link>
      </button>
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
