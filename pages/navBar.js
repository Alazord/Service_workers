import { Link } from "@chakra-ui/react";

export default function NavBar() {
  const optionList = [
    "RICK AND MORTY WIKI",
    "EXPLORE",
    "RICK AND MORTY",
    "EPISODES",
    "CHARACTERS",
  ];
  return (
    <div className="nav-container">
      {optionList.map((item, index) => (
        <Link
          className="nav-element"
          key={index}
          href={index === 4 ? "/char_page" : "#"}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
