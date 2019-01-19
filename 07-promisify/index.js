const fs = require("fs");
const util = require("util");

// It is working in node.js environment.
// If you don't have access to the util module, because you're working in another environment such as the browser,
// you can either go with a manual approach that we've seen before,
// or you can find yourself a package that implements a generic promisify method.
// As we've seen, converting callback style functions to promise based ones is mostly boilerplate.
// You don't want to be repeating yourself over and over again.
const readFile = util.promisify(fs.readFile);

readFile(__filename, "utf8").then(
  contents => {
    console.log(contents);
  },
  error => {
    console.error(error);
  }
);

/*
function readFile(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}
*/
