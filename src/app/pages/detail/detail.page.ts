import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidator, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/Customer';
import { CustomersService } from 'src/app/services/customers.service';
import { Factura } from 'src/app/models/Factura';
import { User } from 'src/app/models/User';

// Detail Page

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {

  customer: Customer = new Customer();
  factura:Factura = new Factura();
  user:User = new User();
  userEmail = localStorage.getItem('username');
  
  handlerMessage = '';
  roleMessage = '';

  isToastOpen = false;
  isAlertOpen = false;
  isAdminOpen = false;

  corporatename:any;
  taxid: any;
  email: any;

  id:any
  group:any;
  extras:any;

  hasAccount = false;
  currentImage:any;
  imageData:any;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => { this.handlerMessage = 'Alert canceled'; }
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => { this.setOpen(true) }
    }
  ];

  public alertDeleteButton = ['OK'];
  

  constructor(private dataService: CustomersService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    // Gets params from route
    this.id = this.activatedRoute.snapshot.params['id'];
    this.group = this.activatedRoute.snapshot.params['group'];

    // Gets current user info
    this.dataService.getUser(this.userEmail).subscribe( user => {
      this.user = user;
    });
    
    // Loads the right info into the detail
    if(this.id!=undefined){  
      // if its not a Factura loads Client/Provider
      if(this.group!='Facturas'){
        this.dataService.getCustomerById(this.id, this.userEmail, this.group).subscribe( customer => {
          this.customer = customer;
          
        });
        // If its a factura loads factura
      } else {
        this.dataService.getFacturaById(this.id, this.userEmail, this.group).subscribe( factura => {
          this.factura = factura;

        });
      }
    }
  }
  
  async callNumber(number:any){
    //await CallNumber.call({ number: number, bypassAppChooser: false });
  }

// Function that uses btn click event to navigate back to the right list
  backBtnNavigation(grupo:any){
    this.router.navigate(['user/tabs/tab2', grupo]);
  }


  // Opens website in a new page
  openLinkBrowser(url:string){
    window.open("https://"+url, '_system', "location=yes" );
  }

  // Navigation to modifying page/process (Cliente, Proovedor)
  editCustomer(customer : Customer) {
    this.router.navigateByUrl(`update-customer/${this.group}/${this.id}`, { state: { customer } });
  }

  // Navigation to modifying page/process Factura
  editFactura(factura : Factura) {
    this.router.navigateByUrl(`update-customer/${this.group}/${this.id}`, { state: { factura } });
  }
  
  // Click event to delete data
  async onDelete(){ 
    const response = await this.dataService.deleteCustomer(this.id, this.userEmail, this.group);
  }

  // It will delete only if the logged account is the admin
  setResult(ev:any, role:any) {
    if(role == 'admin'){
      if (ev.detail.role == "confirm") { 
        this.onDelete()
        this.router.navigate(['user/tabs/tab2']);
      }
    } else {
      this.isAdminOpen = false;
      this.isAlertOpen = false;
    }
  }

  // Toast boolean
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  setAlertOpen(isOpen: boolean, rol:string) {
    if (rol == 'empleado')
    {
    this.isAlertOpen = isOpen;
    } else if (rol == 'admin') {
      this.isAdminOpen = isOpen;
    }
  }
}
