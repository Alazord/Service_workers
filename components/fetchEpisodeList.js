import Router from "next/router";

export default async function fetchEpisodeList ({queryKey}) {
    try{
      const [_key, search] = queryKey
      const res = await fetch("https://rickandmortyapi.com/graphql/", {
          method: "POST",
          mode: "cors",
          headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'max-age=3600',
          },
          body: JSON.stringify({
          query: `
              query getEpisodes{
              episodes(filter: { name: "${search}" }) {
                  results {
                  name
                  id
                  air_date
                  episode
                  created
                  }
              } 
              }
          `,
          }),
      });
      const episode_object= await res.json();
      const episode_list=episode_object.data.episodes.results;
      return episode_list;
    }
    catch(error){
      Router.push("/searchFallback");
    }
  };