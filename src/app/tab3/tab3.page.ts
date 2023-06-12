import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AccountPage } from "../pages/account/account.page";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent, AccountPage]
})
export class Tab3Page {
  constructor(private router: Router, private auth: AuthenticationService) {}

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/'])
  }
}
