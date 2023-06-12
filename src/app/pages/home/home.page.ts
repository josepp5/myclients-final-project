import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Customer } from 'src/app/models/Customer';
import { User } from 'src/app/models/User';
import { CustomersService } from 'src/app/services/customers.service';
import { Factura } from 'src/app/models/Factura';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  user: User = new User;
  clientes: Customer[] = [];
  proveedores: Customer[] = [];
  facturas: Factura[] = [];
  groups: Group[] = [];
  groupProv:any;
  groupFac:any;
  facturasGroup:any;
  proveedoresGroup:any;
  
  username: any;

  features: any[] = [
    { id: 1, name: 'Formulario', src: 'user/tabs/tab1', icon: 'assets/icon/add.gif', page: '' },
    { id: 2, name: 'Lista', src: 'user/tabs/tab2', icon: 'assets/icon/list.gif', page: '' },
    { id: 3, name: 'Grupos', src: 'groups', icon: 'assets/icon/folder.gif', page: '' },
    { id: 4, name: 'Cuenta', src: 'user/tabs/tab3', icon: 'assets/icon/avatar.gif', page: '' },
  ];

  constructor(private dataService: CustomersService) { }

// Loads data into the different list and items in the page
  async ngOnInit() {

    this.user.email = localStorage.getItem('username');

    this.dataService.getCustomers(this.user.email, "Clientes").subscribe(customers => {
      this.clientes = customers;
    });

    this.dataService.getCustomers(this.user.email, "Proveedores").subscribe(proveedores => {
      this.proveedores = proveedores;
    });

    this.dataService.getFacturas(this.user.email).subscribe(facturas => {
      this.facturas = facturas;
    });

    let clientesGroup = new Group;
    clientesGroup.id = 'Clientes';
    clientesGroup.icon = 'assets/icon/avatar.gif';
    clientesGroup.active = true;
    await this.dataService.addGroup(clientesGroup, this.user.email, 'Clientes');

  }

}
