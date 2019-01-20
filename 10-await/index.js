const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

async function queryAPI(endpoint) {
  const response = await fetch(API_URL + endpoint);
  if (response.ok) {
    return response.json();
  }
  throw Error("Unsuccessful response");
}

// // The code of 'async function main(){..} with this queryAPI also works.
// // But the above async function queryAPI(endpoint) is more clean
// function queryAPI(endpoint) {
//   return fetch(API_URL + endpoint).then(response => {
//     return response.ok
//       ? response.json()
//       : Promise.reject(Error("Unsuccessful response"));
//   });
// }


async function main() {
  // You can have a try block withint async to wrapped the await function.
  // Then you can have the catch block and finally block.
  try {
    const [films, planets, species] = await Promise.all([
      queryAPI("films"),
      queryAPI("planets"),
      queryAPI("species")
    ]);
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species`;
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
}

main();


// // Not clean implementation
// async function main() {
//   const films = await queryAPI("movies");
//   output.innerText = '${films.length} films' ;
//   spinner.remove();
// }
//
// main().catch (error => {
//   console.warn(error);
//   output.innerText = ":(";
//   spinner.remove();
// });

