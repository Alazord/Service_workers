import { useState} from "react";
import { useQuery, gql } from "@apollo/client";

import Character from "./character";

const CHARACTER_LIST = gql`
  query getCharacters($submit: String!) {
    characters(filter: { name: $submit }) {
      results {
        name
        id
        image
      }
    }
  }
`;

const CharacterList = () => {
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState("");
  const { error, data } = useQuery(CHARACTER_LIST, {
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
              <button
                className="search-btn"
                type="submit"
              >
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
            <h1>
              Sorry, you are offline. You cannot make new searches. However, you
              can still make old ones.
            </h1>
          ) : data ? (
            <Character characters={data.characters.results} />
          ) : (
            <div className="loader"> Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
