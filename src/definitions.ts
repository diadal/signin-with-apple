export interface SigninWithApplePlugin {
  authorize(options?: AppleSignOptions): Promise<AppleSignResponse>;
}

export interface AppleSignOptions {
  clientId: string;
  redirectURI: string;
  scopes?: string;
  state?: string;
  nonce?: string;
}

export interface AppleSignResponse {
  response: {
    user: string;
    email: string | null;
    givenName: string | null;
    familyName: string | null;
    identityToken: string;
    authorizationCode: string;
  };
}
