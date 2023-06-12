import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private firestore: Firestore, private userService: AuthenticationService) { }

  currentUser$ = new BehaviorSubject<{ id: string, name: string } | null | undefined>(undefined);

  user!:any;

  // Sets current user values
  setCurrentUser() {
    if (localStorage.getItem('token')) {
      this.currentUser$.next({ id: '1', name: 'Foo' });
      
    } else {
      this.currentUser$.next(null);
      
    }
  }

  // Gets the current user values
  getCurrentUser(email:any) : Observable<User>{
      const customerRef = doc(this.firestore, 'users', email);
      return docData(customerRef, { idField: "id" }) as Observable<User>;
  }
}
