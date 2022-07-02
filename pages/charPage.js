import CharacterList from "../components/character/charList";
import Head from "next/head";
import NavBar from "../components/navBar/navBar";
import Status from "../components/status/status";

export default function Char_List() {
  return (
    <div className="nav">
      <Head>
        <title>Characters</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Status />
      <NavBar id="home-navbar" props={"CHARACTERS"} />
      <CharacterList />
    </div>
  );
}
