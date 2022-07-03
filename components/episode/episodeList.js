import { useState } from "react";
import styles from "./episode.module.css";
import { useQuery, gql } from "@apollo/client";
import Episode from "./episode";

const EPISODE_LIST = gql`
  query getEpisodes($submit: String!) {
    episodes(filter: { name: $submit }) {
      results {
        name
        id
        air_date
        episode
        created
      }
    }
  }
`;

const EpisodeList = () => {
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState("");
  const { error, data } = useQuery(EPISODE_LIST, {
    variables: { submit },
  });

  return (
    <div className="nav">
      <div className="page">
        <div className="random">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setSubmit(search + " ");
            }}
          >
            <div className="search-bar">
              <input
                className="search-bar-inpt"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="search-btn" type="submit">
                Search
              </button>
              <button
                className="reset-btn"
                onClick={() => {
                  setSubmit("");
                  setSearch("");
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="items">
          {error ? (
            <h2 className={styles["search-loader-offline"]}>
              Sorry, you are offline. You cannot make new searches. However, you
              can still make old ones.
            </h2>
          ) : data ? (
            <Episode episodes={data.episodes.results} />
          ) : (
            <div className="loader"> Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeList;
