import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import style from "./status.module.css";
export default function Status() {
  const isOnline = useContext(ThemeContext);
  return (
    <div
      className={isOnline ? style["status-online"] : style["status-offline"]}
    >
      {isOnline ? "" : "You are in offline mode"}
    </div>
  );
}
