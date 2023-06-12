import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  form: any;
  emailRegex: string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  contactRegex: string = "[789][0-9]{9}";

  invalid: boolean = false;

  constructor(private userService: AuthenticationService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit() {
  }

  navigatetoSignUp() {
    this.router.navigate(['signup']);
  }

  inpuFocus() {
    this.invalid = false;
  }

  // Gets values from login form and send them to the login service.
  async loginUser() {

    const res = await this.userService.login(this.form.value)
      .then(response => {

        localStorage.removeItem('token');
        localStorage.setItem('token', this.userService.user.accessToken);

        localStorage.setItem('username', this.form.value.email);
        this.router.navigate(['home', this.form.value.email]);
      })
      .catch((error: any) => {
        this.invalid = true;
        console.log(error);
      })
  }
}
