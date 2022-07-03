import { Link } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

export default function NavBar({ props }) {
  const OptionList = [
    ["HOME", "/"],
    ["CHARACTERS", "/charPage"],
    ["EPISODES", "/episodePage"],
  ];
  const isOnline = useContext(ThemeContext);
  console.log("online status:", isOnline);
  return (
    <div
      className={isOnline ? "nav-container-online" : "nav-container-offline"}
    >
      {OptionList.map(([item, URL], index) => (
        <Link
          className={isOnline ? "nav-element-online" : "nav-element-offline"}
          key={index}
          href={URL}
          style={props === item ? { borderBottom: "4px solid white" } : {}}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
