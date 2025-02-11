import { BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
export const msalConfig = {
  auth: {
    clientId: '00e599f2-c3c0-4fc2-9bba-29489f9a189b',
      authority: 'https://login.microsoftonline.com/65e0ca54-5ef8-4817-9149-3d007c53fe35/oauth2/v2.0/authorize',
      redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: true
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false
    }
  }
};
export const loginRequest = {
  scopes: ['openid', 'profile', 'email']
};
