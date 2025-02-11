import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  //constructor(private authService: MsalService) {}
  private pca: PublicClientApplication | null = null;
  isLoggingIn = false;
  userName: string | null = null;
  message: string = '';

  constructor(private authService: MsalService) {}

  async ngOnInit() {
    // ✅ Ensure MSAL instance is fully initialized before login
    this.pca = this.authService.instance as PublicClientApplication;
    //this.pca.initialize();
  }


  async login() {
    if (!this.pca) {
      console.error('MSAL is not initialized yet.');
      return;
    }

    if (this.authService.instance.getActiveAccount() || this.isLoggingIn) {
      this.message = "⚠️ User is already logged in or login is in progress."; // ✅ Set message
      console.log(this.message);
      return;
    }

    this.isLoggingIn = true;
    this.message = "🔄 Logging in... Please wait.";

    try {
      const result = await this.authService.loginPopup().toPromise();
      if(result){
        console.log('Login success:', result);
        this.authService.instance.setActiveAccount(result!.account);
        this.userName = result.account?.name || "Unknown User";
        this.message = `✅ Successfully logged in as: ${this.userName}`;
        }else{
          console.log('Login result fail:', result);
        }
        
    } catch (error) {
      console.error('Login failed:', error);
      this.message = "❌ Login failed. Please try again.";
    } finally {
      this.isLoggingIn = false;
    }
  }

  // MSAL Configuration
 msalInstance = new PublicClientApplication({
  auth: {
    clientId: '00e599f2-c3c0-4fc2-9bba-29489f9a189b',
    authority: 'https://login.microsoftonline.com/65e0ca54-5ef8-4817-9149-3d007c53fe35/oauth2/v2.0/authorize',
    redirectUri: 'http://localhost:4200',
    //  postLogoutRedirectUri: '/'
  },
  cache: {
    cacheLocation: 'localStorage',
  }
});



async login2() {
  if (!this.pca) {
    console.error('MSAL is not initialized yet.');
    return;
  }

  if (this.authService.instance.getActiveAccount() || this.isLoggingIn) {
    console.log("User is already logged in or login is in progress.");
    return;
  }

  this.isLoggingIn = true;

  try {
    const result = await this.authService.loginPopup().toPromise();
    if(result){
    console.log('Login success:', result);
    this.authService.instance.setActiveAccount(result!.account);
    }else{
      console.log('Login result fail:', result);
    }
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    this.isLoggingIn = false;
  }
}

  login1() {

    if (this.authService.instance.getActiveAccount() || this.isLoggingIn) {
      console.log("User is already logged in or login is in progress.");
      return;
    }

    this.isLoggingIn = true;

    this.authService.loginPopup().subscribe({
      next: (result: AuthenticationResult) => {
        console.log('Login successful:', result);
        this.authService.instance.setActiveAccount(result.account);
        this.isLoggingIn = false;
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.isLoggingIn = false;
      },
    });
    /*// Initialize MSAL and handle redirect
    this.msalInstance.initialize().then(() => {
  this.msalInstance.handleRedirectPromise().then((authResponse: any) => {
    if (authResponse) {
      console.log('User authenticated:', authResponse);
      // Acquire token after authentication
      this.msalInstance.acquireTokenSilent({
        scopes: ['User.Read'],
        account: this.msalInstance.getAllAccounts()[0]
      }).then(tokenResponse => {
        console.log('Access token acquired:', tokenResponse.accessToken);
      }).catch(err => {
        console.error(err);
        // Handle token acquisition error
      });
    } else {
      console.log('No authentication response received');
      // Redirect to login if user is not authenticated
      this.msalInstance.loginRedirect({
        scopes: ['User.Read']
      }).catch(err => {
        console.error(err);
      });
    }
  }).catch(err => {
    console.error(err);
  });
}).catch(err => {
  console.error(err);
});*/

/*    this.authService.loginPopup().subscribe({
      next: result => console.log('Login success:', result),
      error: error => console.error('Login failed:', error),
    });*/


  }
}




