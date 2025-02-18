import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInStatus.asObservable();

  constructor(private msalService: MsalService) {
    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    const isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
    this.loggedInStatus.next(isAuthenticated);
  }

  login(): void {
    this.msalService.loginPopup().subscribe(() => {
      this.msalService.instance.setActiveAccount(this.msalService.instance.getAllAccounts()[0]);
      this.updateLoginStatus();
    });
  }

  logout(): void {
    this.msalService.logoutPopup().subscribe(() => {
      this.loggedInStatus.next(false);
    });
  }
}
