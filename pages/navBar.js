import { Link } from "@chakra-ui/react";

export default function NavBar() {
  const optionList = [
    ["RICK AND MORTY WIKI", "#home"],
    ["EXPLORE", "#explore"],
    ["EPISODES", "/episode_page"],
    ["CHARACTERS", "/char_page"],
  ];
  return (
    <div className="nav-container">
      {optionList.map(([item, URL], index) => (
        <Link className="nav-element" key={index} href={URL}>
          {item}
        </Link>
      ))}
    </div>
  );
}
