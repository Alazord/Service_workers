import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import style from "./status.module.css";
export default function Status() {
  const isOnline = useContext(ThemeContext);
  return (
    <div className={isOnline ? style.statusOnline : style.statusOffline}>
      {isOnline ? "" : "You are in offline mode"}
    </div>
  );
}
