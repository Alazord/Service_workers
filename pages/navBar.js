import { Link } from "@chakra-ui/react";

export default function NavBar() {
  const optionList = [
    ["RICK AND MORTY WIKI", "/"],
    ["EXPLORE", "/#explore"],
    ["EPISODES", "/episode_page"],
    ["CHARACTERS", "/char_page"],
  ];
  return (
    <div className="nav-container">
      {optionList.map(([item, URL]) => (
        <Link className="nav-element" key={item} id={item} href={URL}>
          {item}
        </Link>
      ))}
    </div>
  );
}
