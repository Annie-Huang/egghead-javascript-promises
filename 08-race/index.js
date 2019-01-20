function resolveAfter(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

// This is a very useful implementation for timeout!!
function timeout(ms, promise) {
  let timeoutID;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutID = setTimeout(() => {
      reject(
        new Error(`Operation timed out after ${ms}ms`)
      );
    }, ms);
  });

  // Promise.race returns a promise itself, which is set out the same way as the first input promise that settles,
  //   but differently as soon as any of the input promises resolves or rejects,
  //   the promise return by promise.race is resolved or rejected accordingly.
  // The promise.race method will return the fastest of the input promises if you will.
  return Promise.race([promise, timeoutPromise]).finally(
    () => {
      // If you don't have the clearTimeout it will run until it finished, even though it can be much longer than input promise's timeout.
      clearTimeout(timeoutID);
    }
  );
}

const promise = resolveAfter(1000, "A");

timeout(500, promise).then(
  value => {
    console.log(`Fulfilled: ${value}`);
  },
  error => {
    console.log(`Rejected: ${error}`);
  }
);


// To track the time for how long the process is running:
// gtime -f "%e" node index.js
// It will show something like:
// A
// 5.05     << meaning it takes 5.05 seconds to run
