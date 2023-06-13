import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../interfaces/customer.interface';
import { CustomersService } from 'src/app/services/customers.service';
import { ImageService } from 'src/app/services/image.service';
import { Group } from 'src/app/models/Group';
import { Factura } from 'src/app/models/Factura';
import { FacturasCountService } from 'src/app/services/facturas-count.service';
import { CameraImagesComponent } from "../camera-images/camera-images.component";

// Form component 

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, CameraImagesComponent]
})
export class FormComponent implements OnInit {

  public clientes: Customer[] = [];
  customer!: Customer;
  newCustomer!: Customer;
  identifier = this.activatedRoute.snapshot.params['id'];
  userEmail = localStorage.getItem('username');
  groups: Group[] = [];
  group: string = this.activatedRoute.snapshot.params['group'];

  corporatenames: String[] = [];

  selectGroup:any;
  selectName:any;

  // Email check regex expression
  emailRegex: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}\.[a-zA-Z]{2,}$";
  nameRegex: string = "^(?!.*  )[a-zA-Z ]+$";
  taxidRegex: string = "^\d{8}[A-Z]$";
 
  corporatename: any;
  taxid: any;
  email: any;
  number: any;
  site: any;

  factura!: Factura;
  newFactura!: Factura;
  selectTipo: any;
  facturaFormActive: boolean = false;

  form: any;
  factuform: any;

  // Values from state will be injected in this variable
  _location = inject(Location);

  isToastOpen = false;

  constructor(
    private dataService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected imageService: ImageService,
    private facturasCount: FacturasCountService,
  ) {
    this.form = new FormGroup({
      corporatename: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nameRegex),
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      number: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      email: new FormControl('', [
        Validators.required,
        // Email validator
        Validators.pattern(this.emailRegex),
        Validators.maxLength(50)
      ]),
      site: new FormControl('', [
        Validators.maxLength(100)
      ]),
      taxid: new FormControl('', [
        Validators.required,
        Validators.maxLength(9)
      ])
    });

    this.factuform = new FormGroup({
      corporatename: new FormControl('', [
        Validators.required
      ]),
      group: new FormControl('', [
        Validators.required,
      ])
    });

  }

  ngOnInit() {
    this.groups = [];
    
    //Gets the values from State and sets the customer to modify in case there is one
    this.customer = (this._location.getState() as any).customer;
    if (this.customer) this.setCurrentCustomer(this.customer);

    this.factura = (this._location.getState() as any).factura;
    if (this.factura) {
      this.facturaFormActive = true;
      this.setCurrentFactura(this.factura);
    }

    // Gets the groups values to check what groups are activated
    this.dataService.getGroups(this.userEmail).subscribe(groups => {
      let size = groups.length;
      for (let i = 0; i < size; i++) {
        if (groups[i].active) {
          this.groups.push(groups[i]);
        }
      }
    });
  }

  // Matchs the customer attrib with the formControlNames
  setCurrentCustomer(customer: Customer) {
    this.form.patchValue(customer as any);
    this.imageService.setImage(customer.logo);
    
    this.selectGroup = this.group;
  }

  // Matchs the factura values with the formControls
  setCurrentFactura(factura: Factura) {
    this.factuform.patchValue(factura as any);
    this.imageService.setImage(factura.photo);
    this.selectGroup = this.group;
  }

  // Function that modifies the Cliente or Factura 
  modifyCustomer(tipo: string) {
    if (tipo == 'Factura') {
      this.newFactura = this.factuform.getRawValue();
      console.log(this.factuform.getRawValue());

      if (this.imageService.image != undefined) {
        this.newFactura.photo = this.imageService.image;
      }
      this.newFactura.id = this.identifier;
      this.dataService.updateFactura(this.newFactura, this.userEmail, this.group);
      this.router.navigate(['detail', this.group, this.newFactura.id])
    } else {
      this.newCustomer = this.form.getRawValue();

      if (this.imageService.image != undefined) {
        this.newCustomer.logo = this.imageService.image;
      }
      this.newCustomer.id = this.identifier;
      
      this.dataService.updateCustomer(this.newCustomer, this.userEmail, this.group);
      this.router.navigate(['detail', this.group, this.newCustomer.id])
    }

    this.imageService.deleteImage();
    this.form.reset();
  }

  // Function for click event to confirm new Customer/Provider/Factura or Confirm changes when modifying
  async confirm(tipo: string) {
    if (tipo == 'Factura') {
      if (this.identifier != undefined) {
        this.modifyCustomer(tipo);
        this.setOpen(true);

      } else {
        let factu = this.factuform.getRawValue() as Factura;

        factu.date = Date.now();
        factu.numero = await this.getFacturaNum(factu.corporatename);
        factu.employer = this.userEmail;

        if (this.imageService.image) {
          factu.photo = this.imageService.image;
        } else {
          factu.photo = 'undefined';
        }

        this.dataService.addFactura(factu, this.userEmail, this.selectGroup);
        this.setOpen(true);
        this.router.navigate(['user/tabs/tab2']);
      }

    } else {
      if (this.identifier) {
        this.modifyCustomer('otro')
        this.setOpen(true);
      } else {
        let customerO = this.form.getRawValue() as Customer;

        customerO.employer = this.userEmail;

        if (this.imageService.image) {
          customerO.logo = this.imageService.image
        } else {
          customerO.logo = 'undefined';
        }

        this.dataService.addCustomer(customerO, this.userEmail, this.selectGroup);
        this.setOpen(true);
        this.router.navigate(['user/tabs/tab2']);
      }
    }

    this.imageService.deleteImage();
    this.form.reset();
    this.factuform.reset();
  }

  // Toast bool
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  // Will change form depends the group the user chooses
  groupChange(event: any) {
    if (event.target.value.id == undefined) {
      this.selectGroup = event.detail.value;
      if (this.selectGroup == 'Facturas') this.facturaFormActive = true; else this.facturaFormActive = false;
    }
  }

  // Gets the values to show in the select so the user can choose
  tipoChange(event: any) {
    if (event.target.value.id == undefined) {
      this.selectTipo = event.detail.value;
    }
    this.getNames(this.selectTipo);
  }

  // Saves the selected value in a variable
  nameChange(event: any) {
    if (event.target.value.id == undefined) {
      this.selectName = event.detail.value;
    }
  }

  // Gets the names from the group when you choose a different group
  getNames(group: string) {
    this.corporatenames = [];

    this.dataService.getCustomers(this.userEmail, group).subscribe(persons => {
      let size = persons.length;
      for (let i = 0; i < size; i++) {
        this.corporatenames.push(persons[i].corporatename);
      }
    });
  }

  // Gets Factura number and returns the automated name
  async getFacturaNum(corporatename: any) {
    const count = await this.facturasCount.getFacturasByName(corporatename);

    return count.replace(/\s+/g, '').toLowerCase();
  }

}
