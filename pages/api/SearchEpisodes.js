import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

const xyz=async (req, res) => {
  const search = req.body;
  let queryString = `
    query {
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
  `;
  fetch('https://rickandmortyapi.com/graphql/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60',
    },
    body: JSON.stringify({
      'query': queryString.replace(/\s{2,}/g, ' ')
    }),
  })
  .then(async (response) => {
    let result = await response.json();
    let restaurants = result.data.restaurants;
    restaurants.forEach((restaurant) => {
      $('#list').append(`
        <li class="card">
          <div class="card-body row">
            <div class="col-sm-8">
              <h4>${restaurant.name}<span class="stars star-${restaurant.stars}"></span></h4>
              <div class="type">${restaurant.type}</div>
            </div>
            <div class="col-sm-4">
              <a class="btn btn-outline-primary pull-right" target="_blank" href="${restaurant.map}">Direction</a>
            </div>
          </div>
        </li>`);
    });
    $('#count').text(restaurants.length);
  });
  // try {
  //   const { data } = await client.query({
  //     query: gql`
      // query {
      //   episodes(filter: { name: "${search}" }){
      //     results{
      //       name
      //       id
      //       air_date
      //       episode
      //       created
      //     }
      //   }     
      // }
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
