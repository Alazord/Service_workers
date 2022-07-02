import Head from "next/head";
import Navbar from "../components/navBar/navBar";
import CharacterList from "../components/character/charList";

export default function Char_List() {
  return (
    <div>
      <Head>
        <title>Characters</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="status"></div>
      <Navbar props={"CHARACTERS"} id="home-navbar" />
      <CharacterList />
    </div>
  );
}
