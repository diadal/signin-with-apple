/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-var-requires */
import { WebPlugin } from '@capacitor/core';
import { loadScriptsInOrder } from './script';
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
export class SigninWithAppleWeb extends WebPlugin {
    async authorize(options) {
        return authorize(options);
    }
}
export { authorize };
//# sourceMappingURL=web.js.map