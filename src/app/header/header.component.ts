import { ChangeDetectorRef, Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  providers: [LoginComponent],
  imports: [CommonModule]
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private loginComponent: LoginComponent, private dialog: MatDialog, private msalService: MsalService, private router: Router,
      private authService: AuthService,private cdr: ChangeDetectorRef 
  ) {
    this.checkLoginStatus();
  }
  async handleSSOLogin(event: Event) {
    event.preventDefault(); // Prevent default navigation

    try {
    // Call the login method from LoginComponent
      const loginResult = await this.loginComponent.login();

      // Open a dialog to show the login result
      const dialogRef = this.dialog.open(PopupComponent, {
        data: { message: loginResult }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.refreshMenu();
        }
      });
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  refreshMenu(): void {
    this.checkLoginStatus(); 
    this.cdr.detectChanges(); 
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;
  }

  login(): void {
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      this.checkLoginStatus();
    });
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout(): void {
    this.msalService.logoutPopup().subscribe(() => {
      this.isLoggedIn = false;
      this.refreshMenu(); 
    });
  }
}

