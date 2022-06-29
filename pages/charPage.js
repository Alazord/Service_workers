import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";
import { useQuery, gql } from "@apollo/client";

import Character from "../components/character/character";
import Character_List from "../components/character/charList";

export default function Char_List() {
  return <Character_List />;
}
