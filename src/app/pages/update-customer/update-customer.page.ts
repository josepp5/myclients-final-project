import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from 'src/app/commons/form/form.component';


@Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.page.html',
    styleUrls: ['./update-customer.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, FormComponent]
})
export class UpdateCustomerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
