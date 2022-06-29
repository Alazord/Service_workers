import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home2.module.css";
import { Link } from "@chakra-ui/react";
import Router from "next/router";
import { useQuery, gql } from "@apollo/client";

import Episode from "../components/episode/episode";
import Episode_List from "../components/episode/episodeList";

export default function Epi_List() {
  return <Episode_List />;
}
