/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Load a script from given `url`
const loadScript = function (url: string) {
  return new Promise(function (resolve, _reject) {
    const script = document.createElement('script');
    script.src = url;

    script.addEventListener('load', function () {
      // The script is loaded completely
      resolve(true);
    });

    document.head.appendChild(script);
  });
};

// Perform all promises in the order
const waterfall = function (promises: any[]) {
  return promises.reduce(
    async function (p: Promise<any>, _c: () => Promise<any>) {
      // Waiting for `p` completed
      await p;
      // await c();
      return true;
    },
    // The initial value passed to the reduce method
    Promise.resolve([])
  );
};

// const test = () => {
//   return dd
// }
// Load an array of scripts in order
const loadScriptsInOrder = (arrayOfJs: string[]) => {
  const promises = arrayOfJs.map(function (url: string) {
    return loadScript(url);
  });
  return waterfall(promises);
};

export { loadScriptsInOrder }
