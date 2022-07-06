import { Link } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import { OPTION_LIST as optionList } from "../Constants";

export default function NavBar({ props }) {
  const isOnline = useContext(ThemeContext);
  return (
    <div
      className={isOnline ? "nav-container-online" : "nav-container-offline"}
    >
      {optionList.map(([item, URL], index) => (
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
