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
    this.pca.initialize();
  }


  async login(): Promise<string> {
    if (!this.pca) {
      this.pca = this.authService.instance as PublicClientApplication;
      this.pca.initialize();
      console.error('MSAL is not initialized yet, Initialized now');
      //return "❌ MSAL is not initialized yet.";
    }

    if (this.authService.instance.getActiveAccount() || this.isLoggingIn) {
      this.message = "⚠️ User is already logged in or login is in progress."; // ✅ Set message
      console.log(this.message);
      return this.message;  // ✅ Return the message
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
    return this.message; // ✅ Return the final message
  }

  // MSAL Configuration
 msalInstance = new PublicClientApplication({
  auth: {
    clientId: '',
    authority: '',
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
  }
}




