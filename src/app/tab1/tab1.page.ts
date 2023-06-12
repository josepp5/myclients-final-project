import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CustomersService } from '../services/customers.service';
import { ListComponent } from "../commons/list/list.component";
import { FormComponent } from "../commons/form/form.component";

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent, ListComponent, FormComponent]
})
export class Tab1Page {
  // Injectando los servicios desde el constructor puede llegar a llenarse y tener demasiados
  //constructor(private customerService: CustomersService) {}

  // Se puede Injectar de esta manera mas limpia
  //_customerService = inject(CustomersService);


  //ngOnInit(): void {
    //this._customerService.getCustomers().subscribe((res) => console.log(res));
  //}

  
}
