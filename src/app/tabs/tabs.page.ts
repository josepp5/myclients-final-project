import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  constructor(private router: Router) { }

  ionTabsDidChange($event: any) {
    console.log("triggered");
  }

  goToForm() {
    this.router.navigate(['user/tabs/tab1']);
  }
}
