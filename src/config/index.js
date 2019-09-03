const config = {
  redirectPathAfterSignOut: '/sign-in',
  signInConfirmCodePageUrl: '/sign-in-confirm-code',
  adminRole: '20_example_admin',
  camelizeUserDataKeys: true,
  autoSignOutWithin: false,
  recaptchaSiteKey: undefined,
  successAuthenticationResponseSaga: undefined,
  failedAuthenticationResponseSaga: undefined,
};

export const setConfig = (newConfig) => {
  Object.assign(config, newConfig);
};

export default config;
