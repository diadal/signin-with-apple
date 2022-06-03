'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

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

/* eslint-disable no-async-promise-executor */
const appleScriptUrl = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
let isAppleScriptLoaded = false;
async function authorize(options) {
    return new Promise(async (resolve, reject) => {
        var _a, _b, _c;
        if (options) {
            isAppleScriptLoaded = await loadAppleSignJS();
            if (isAppleScriptLoaded) {
                AppleID.auth.init({
                    clientId: options.clientId,
                    redirectURI: options.redirectURI,
                    scope: (_a = options.scopes) !== null && _a !== void 0 ? _a : undefined,
                    state: (_b = options.state) !== null && _b !== void 0 ? _b : undefined,
                    nonce: (_c = options.nonce) !== null && _c !== void 0 ? _c : undefined,
                    usePopup: true,
                });
                AppleID.auth
                    .signIn()
                    .then((res) => {
                    var _a, _b;
                    const response = {
                        response: {
                            user: res.user,
                            email: (_a = res.user) === null || _a === void 0 ? void 0 : _a.email,
                            state: (_b = res.user) === null || _b === void 0 ? void 0 : _b.state,
                            id_token: res.authorization.id_token,
                            code: res.authorization.code,
                        },
                    };
                    resolve(response);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            else {
                reject('Unable to load Sign in with Apple JS framework.');
            }
        }
        else {
            reject('No options were provided.');
        }
    });
}
function loadAppleSignJS() {
    return new Promise(resolve => {
        if (!isAppleScriptLoaded) {
            if (typeof window !== undefined) {
                // const script = scriptjs;
                loadScriptsInOrder([appleScriptUrl]);
            }
            else {
                resolve(false);
            }
        }
        else {
            resolve(true);
        }
    });
}
class SigninWithAppleWeb extends core.WebPlugin {
    async authorize(options) {
        return authorize(options);
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SigninWithAppleWeb: SigninWithAppleWeb,
    authorize: authorize
});

const SigninWithApple = core.registerPlugin('SigninWithApple', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.SigninWithAppleWeb()),
});

exports.SigninWithApple = SigninWithApple;
exports.authorize = authorize;
//# sourceMappingURL=plugin.cjs.js.map
