import { registerPlugin } from '@capacitor/core';

import type { SigninWithApplePlugin } from './definitions';

const SigninWithApple = registerPlugin<SigninWithApplePlugin>('SigninWithApple', {
  web: () => import('./web').then(m => new m.SigninWithAppleWeb()),
});

export * from './definitions';
export { SigninWithApple };
