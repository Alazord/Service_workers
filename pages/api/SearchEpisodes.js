import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "https://rickandmortyapi.com/graphql/",
//   cache: new InMemoryCache(),
// });

let temp;

const xyz=async (req, result) => {
  const search = req.body;
  fetch('https://rickandmortyapi.com/graphql/', {
    method: 'POST',
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      // 'Cache-Control': 'max-age=60',
    },
    body: JSON.stringify({
      'query': `
      query getEpisodes{
        episodes(filter: { name: "${search}" }){
          results{
            name
            id
            air_date
            episode
            created
          }
        }     
      }
    `.replace(/\s{2,}/g, ' ')
    })
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data.data);
    temp= data.data;
    result.status(200).json({ episodes: data.episodes.results, error: null });
  })
  
  // return data.episodes.results;
  // try {
  //   const { data } = await client.query({
  //     query: gql`
  //     query {
  //       episodes(filter: { name: "${search}" }){
  //         results{
  //           name
  //           id
  //           air_date
  //           episode
  //           created
  //         }
  //       }     
  //     }
  //     `,
  //   });
  //   res.status(200).json({ episodes: data.episodes.results, error: null });
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ episodes: null, error: "Internal Error, Please try again" });
  // }
};

export default xyz;
