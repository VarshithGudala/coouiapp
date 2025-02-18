import { BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
export const msalConfig = {
  auth: {
    clientId: '',
      authority: '',
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
