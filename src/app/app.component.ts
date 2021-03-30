import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Seiri';

  showSidenav = false;

  routerSubscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('dashboard', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dash.svg'));
    iconRegistry.addSvgIcon('dashboard-fill', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dash-fill.svg'));
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('start')) {
          this.showSidenav = false;
        }
        else {
          this.showSidenav = true;
        }
      }
    });
  }

  signOut() {
    this.authService.SignOut();

  }
}
