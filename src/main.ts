import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideAnimations } from '@angular/platform-browser/animations';
//--appConfig,
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalModule
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

export  function MSALInstanceFactory() {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: '00e599f2-c3c0-4fc2-9bba-29489f9a189b',
      authority: 'https://login.microsoftonline.com/TenantId/oauth2/v2.0/authorize',
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: "sessionStorage", // Store tokens in sessionStorage to avoid conflicts
      storeAuthStateInCookie: true, // Helps with issues in IE/Edge
    }
  });
   msalInstance.initialize();

  return msalInstance;
}

bootstrapApplication(AppComponent, {
  providers: [
provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MsalModule),
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: { interactionType: InteractionType.Redirect },
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: { interactionType: InteractionType.Redirect, protectedResourceMap: new Map() },
    },
  ],
}).catch(err => console.error(err));

