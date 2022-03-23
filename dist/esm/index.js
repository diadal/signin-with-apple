import { registerPlugin } from '@capacitor/core';
import { authorize } from './web';
const SigninWithApple = registerPlugin('SigninWithApple', {
    web: () => import('./web').then(m => new m.SigninWithAppleWeb()),
});
export * from './definitions';
export { SigninWithApple, authorize };
//# sourceMappingURL=index.js.map