import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable, filter, map } from 'rxjs';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private currentUserService: CurrentUserService, private router: Router) { }

  // Guard that would denied the navigation if the user hasn't logged in before
  canActivate(): Observable<boolean> {
    return this.currentUserService.currentUser$.pipe(
      filter(currentUser => currentUser !== undefined),
      map((currentUser) => {
      if (!currentUser) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    })
    )
  }


}
