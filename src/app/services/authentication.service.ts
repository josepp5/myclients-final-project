import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth, private dataService: Firestore) { }

  userId: any;
  token: any;
  user: any;

  // Creates new user with Email and password
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Logins the user with email and password
  async login({ email, password }: any) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;
      this.user = userCredential.user;
    } catch (error) {
      console.log(error);
    }
  }
  

  getIdToken() {
    return this.token;
  }

  // Logs out of the user that logged in
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.auth.signOut()
  }

}


