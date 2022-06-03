/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Load a script from given `url`
const loadScript = function (url) {
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
const waterfall = function (promises) {
    return promises.reduce(async function (p, _c) {
        // Waiting for `p` completed
        await p;
        // await c();
        return true;
    }, 
    // The initial value passed to the reduce method
    Promise.resolve([]));
};
// const test = () => {
//   return dd
// }
// Load an array of scripts in order
const loadScriptsInOrder = (arrayOfJs) => {
    const promises = arrayOfJs.map(function (url) {
        return loadScript(url);
    });
    return waterfall(promises);
};
export { loadScriptsInOrder };
//# sourceMappingURL=script.js.map