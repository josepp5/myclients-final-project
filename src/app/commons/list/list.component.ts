import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { Observable, debounceTime } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { Group } from 'src/app/models/Group';
import { Factura } from 'src/app/models/Factura';

// List Component

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class ListComponent  implements OnInit {

  clientes:Customer[]=[];
  facturas:Factura[]=[];

  fromDetailGroup:any;

  userEmail = localStorage.getItem('username');
  
  filteredItems:any[]=[];
  searchText!:any;
  valid:boolean = false;

  groups:Group[]=[];
  // Default value for the select is "Clientes"
  selectGroup:string = "Clientes";

  constructor(protected dataService: CustomersService, private activatedRoute: ActivatedRoute ) {}

  async ngOnInit() {

    // Gets group value from route
    this.fromDetailGroup = this.activatedRoute.snapshot.params['grupo'];
    
    // Will load the list with the right group information
    if (this.fromDetailGroup) {
      this.groupChange(undefined, this.fromDetailGroup);
    } else {
      this.dataService.getCustomers(this.userEmail, "Clientes").subscribe( customers => {
        this.clientes = customers;
      });
    }
    
    // Gets the infro from the groups, if they are active or not
    (await this.dataService.getGroups(this.userEmail)).subscribe( groups => {
      this.groups = [];
      let size = groups.length;
      
      for (let i = 0; i < size; i++){
        if (groups[i].active){
          this.groups.push(groups[i]);
        } 
      }
    });
  }

  // filter data with the searchbar
  filterItems(tipo:string){
    this.valid = true;
    if (this.searchText === '') {
      this.filteredItems = [];
      this.valid = false;
      return;
    }

    if (tipo == 'Facturas'){
      if (this.searchText.length === 1) {
        const startsWith = [];
        for (const item of this.facturas) {
          if (item.numero.toLowerCase().startsWith(this.searchText.toLowerCase())) {
            startsWith.push(item);
          }
        }
        this.filteredItems = startsWith;
      } else {
        const contains = [];
        for (const item of this.facturas) {
          if (item.numero.toLowerCase().includes(this.searchText.toLowerCase())) {
            contains.push(item);
          }
        }
        this.filteredItems = contains;
        console.log(contains);
      }
    } else {
      if (this.searchText.length === 1) {
        const startsWith = [];
        for (const item of this.clientes) {
          if (item.corporatename.toLowerCase().startsWith(this.searchText.toLowerCase())) {
            startsWith.push(item);
          }
        }
        this.filteredItems = startsWith;
      } else {
        const contains = [];
        for (const item of this.clientes) {
          if (item.corporatename.toLowerCase().includes(this.searchText.toLowerCase())) {
            contains.push(item);
          }
        }
        this.filteredItems = contains;
      }
    }
  }

  // sets the list values with the data from the selected group
  groupChange(event:any, grupo?:any) {

    if (grupo) {
      this.selectGroup = grupo;
    } else {
      if(event.target.value.id == undefined){
        this.selectGroup = event.detail.value;
      } else {
        this.selectGroup = event.target.value.id;
      }
    }

    if (this.selectGroup == 'Facturas') {
      this.dataService.getFacturas(this.userEmail).subscribe( facturas => {
        this.facturas = facturas;
        
      });
    } else {
      this.dataService.getCustomers(this.userEmail, this.selectGroup).subscribe( customers => {
        this.clientes = customers;
      });
    }

    this.searchText = '';
    this.filterItems(this.selectGroup);
  }

}
