import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  //issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  issuer: 'https://sso-test.oreillyauto.com/auth/realms/TeamNet',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/verify',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  //clientId: 'spa-demo',
  clientId: 'oreilly-auto-perfeqta-sandbox',
  responseType: 'code',
  dummyClientSecret: 'e62ea7bb-1160-4a71-a567-8fdee0a731e8',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  //scope: 'openid profile email voucher',
  // scope: 'openid microprofile-jwt offline_access address profile roles web-origins phone email',
  scope: 'openid offline_access profile email',
  showDebugInformation: true,
  sessionChecksEnabled: true,// Activate Session Checks:
  loginUrl: 'https://sso-test.oreillyauto.com/auth/realms/TeamNet/protocol/openid-connect/auth',
  logoutUrl: 'https://sso-test.oreillyauto.com/auth/realms/TeamNet/protocol/openid-connect/logout',
}
/**
 * 
1. Client-ID: oreilly-auto-perfeqta-sandbox
2. Client-Secret-Key: e62ea7bb-1160-4a71-a567-8fdee0a731e8
3. Issuer URL: https://sso-test.oreillyauto.com/auth/realms/TeamNet
4. Login URL: https://sso-test.oreillyauto.com/auth/realms/TeamNet/protocol/openid-connect/auth
5. Logout URL: https://sso-test.oreillyauto.com/auth/realms/TeamNet/protocol/openid-connect/logout

*/