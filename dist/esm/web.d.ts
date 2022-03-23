import { WebPlugin } from '@capacitor/core';
import type { SigninWithApplePlugin, AppleSignResponse, AppleSignOptions } from './definitions';
declare function authorize(options?: AppleSignOptions): Promise<AppleSignResponse>;
export declare class SigninWithAppleWeb extends WebPlugin implements SigninWithApplePlugin {
    authorize(options?: AppleSignOptions): Promise<AppleSignResponse>;
}
export { authorize };
