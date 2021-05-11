import { WebPlugin } from '@capacitor/core';
import type {
  SigninWithApplePlugin,
  AppleSignResponse,
  AppleSignOptions,
} from './definitions';

declare let AppleID: any;
const appleScriptUrl =
  'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
let isAppleScriptLoaded = false;

async function authorize(
  options?: AppleSignOptions,
): Promise<AppleSignResponse> {
  return new Promise(async (resolve, reject) => {
    if (options) {
      isAppleScriptLoaded = await loadAppleSignJS();

      if (isAppleScriptLoaded) {
        AppleID.auth.init({
          clientId: options.clientId,
          redirectURI: options.redirectURI,
          scope: options.scopes ?? undefined,
          state: options.state ?? undefined,
          nonce: options.nonce ?? undefined,
          usePopup: true,
        });
        AppleID.auth
          .signIn()
          .then((res: any) => {
            const response: AppleSignResponse = {
              response: {
                user: res.user,
                email: res.user?.email,
                state: res.user?.state,
                id_token: res.authorization.id_token,
                code: res.authorization.code,
              },
            };

            resolve(response);
          })
          .catch((err: any) => {
            reject(err);
          });
      } else {
        reject('Unable to load Sign in with Apple JS framework.');
      }
    } else {
      reject('No options were provided.');
    }
  });
}

function loadAppleSignJS(): Promise<boolean> {
  return new Promise(resolve => {
    if (!isAppleScriptLoaded) {
      if (typeof window !== undefined) {
        const script = require('scriptjs');
        script(appleScriptUrl, () => resolve(true));
      } else {
        resolve(false);
      }
    } else {
      resolve(true);
    }
  });
}

export class SigninWithAppleWeb
  extends WebPlugin
  implements SigninWithApplePlugin {
  async authorize(options?: AppleSignOptions): Promise<AppleSignResponse> {
    return authorize(options);
  }
}

export { authorize };
