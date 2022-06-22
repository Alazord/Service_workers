import { Link } from "@chakra-ui/react";

export default function NavBar() {
  const OptionList = [
    ["RICK AND MORTY WIKI", "#home"],
    ["EXPLORE", "#explore"],
    ["EPISODES", "/episodePage"],
    ["CHARACTERS", "/charPage"],
  ];
  return (
    <div className="nav-container">
      {OptionList.map(([item, URL], index) => (
        <Link className="nav-element" key={index} href={URL}>
          {item}
        </Link>
      ))}
    </div>
  );
}
