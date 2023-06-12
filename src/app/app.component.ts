import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AppComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.currentUserService.setCurrentUser();
    },100);

  }
}
