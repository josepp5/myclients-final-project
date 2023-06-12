import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  form: any;
  user: User = new User();

  emailRegex: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}\.[a-zA-Z]{2,}$";
  invalid:boolean = false;

  constructor(private userService: CustomersService, private auth: AuthenticationService, private router: Router) {
    
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
        Validators.minLength(5)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  ngOnInit() {
  }

  // Gets values from signup form and send them to the signup service to register new user
  async signup() {
    let user = this.form.getRawValue();

    if (user.password == user.confirmPassword && this.form.valid) {
      const res = await this.auth.register(this.form.value)
        .then( async response => {
          console.log(response);
          let user = new User;
          user.email = response.user.email;
          user.rol = 'empleado';

          // Call service to add new user
          this.userService.addUser(user, user.email, 'info');       

          this.router.navigate([''])
        })
        .catch(error => console.log(error));

    } else {
      this.invalid = true;
    }
  }

  inpuFocus() {
    this.invalid = false;
  }

}
