const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");

function getFilmTitles(films) {
  return films
    .slice()
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}

output.innerText = "Loading ...";

// fetch(API_URL + "films")
fetch(API_URL + "movies")
  .then(response => {
    // Handle failed network request. e.g. None success http status code.
    if (!response.ok) {
      throw Error("Unsuccessful response");
    }
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });

/*

// This below is different from above.
// Just do response and error does not handle response.json() returns with a error code.
// It only handles if the response is rejected by the network.
fetch(API_URL + "movies")
  .then(
    // onFulfilled. Only onFulfilled or onRejected will be call, NEVER BOTH.
    response => {
      console.log(response);
      // e.g.
      // return Promise.reject("Invalid JSON").then(films => {
      return response.json().then(films => {
        output.innerText = getFilmTitles(films);
      }, error => {console.warn(error);});
    },
    // onRejected
    error => {
      console.warn(error);
      output.innerText = ":(";
    }
  );

*/
