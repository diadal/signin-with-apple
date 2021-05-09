import { WebPlugin } from '@capacitor/core';

import type { SigninWithApplePlugin } from './definitions';

export class SigninWithAppleWeb extends WebPlugin implements SigninWithApplePlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
