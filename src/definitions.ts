export interface SigninWithApplePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
