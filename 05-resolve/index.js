// Required to make jQuery work within CodeSandbox
const $ = window.jQuery || require("jquery");

const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function getFilmTitles(films) {
  return films
    .slice()
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}

// jQuery was written long before we had native promises in JavaScript.
// jQuery ships with its own promise implementation. That implementation doesn't have a method called "finally."
// We can fix this by using Promise.resolve. This way, the non-standard promise returned by the getJSON method
// will be converted to a proper native promise. If we refresh now, we see that our page is working again.
// This works for all promise-like objects with a then method. These objects are also known as thenables.
Promise.resolve($.ajax(API_URL + "films"))
  .then(films => {
    output.innerText = getFilmTitles(films);
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });
