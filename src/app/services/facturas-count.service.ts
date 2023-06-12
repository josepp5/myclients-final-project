import { Injectable } from '@angular/core';
import { Factura } from '../models/Factura';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasCountService {

  facturas: Factura[] = [];
  email = localStorage.getItem('username');
  count:any;
  constructor(private dataService: CustomersService) { }

  // This service helps creating an automatic id to the new Factura
  // the name will be "corporatename"+ / + consecutive number.

  getFacturasByName(corporatename: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      this.dataService.getFacturas(this.email).subscribe(facturas => {
        this.facturas = facturas;
        this.count = 0;

        for (let i = 0; i < this.facturas.length; i++) {
          if (this.facturas[i].corporatename === corporatename) {
            this.count++;
          }
        }
        resolve(corporatename+"/"+this.count++)
      });
    });
  }
}
