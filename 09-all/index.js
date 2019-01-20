const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function queryAPI(endpoint) {
  return fetch(API_URL + endpoint).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
}

// // If you do it in sequential way, the 2nd promise will only be fired out after return from the 1st promise.
// queryAPI("films").then(films => {
//   return queryAPI("planets").then(planets => {
//     output.innerText =
//       '${films.length} films, ' +
//       '${planets.length} planets, ' ;
//   }) ;
// })
//   .finally(() => {
//     spinner.remove();
//   });

Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
  queryAPI("species")
])
  .then(([films, planets, species]) => {
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species`;
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });


// // The order of the return response will be the same as the request.
// const promise = Promise.all([
//   queryAPI("films"),
//   queryAPI("planets"),
// ]);
//
// promise
//   .then(results => {
//     const films = results[0];
//     const planets = results[1];
//     output.innerText =
//       '${films.length} films, ' +
//       '${planets.length} planets ';
//   })
//   .finally(() => {
//     spinner.remove();
//   });
