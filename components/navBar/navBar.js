import { Link } from "@chakra-ui/react";

export default function NavBar({props}) {
  const OptionList = [
    ["HOME", "/"],
    ["EPISODES", "/episodePage"],
    ["CHARACTERS", "/charPage"],
  ];
  return (
    <div className="nav-container">
      {OptionList.map(([item, URL], index) => (
        <Link
          className="nav-element"
          key={index}
          href={URL}
          style={props === item ? { borderBottom: "4px solid #B0F10E" } : {}}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
