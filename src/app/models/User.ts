import { Customer } from "./Customer";
import { Factura } from "./Factura";

export class User {
    email!:any;
    pic!:any;
    rol!: 'empleado' | 'admin';
    customers!: Customer[];
    proveedores!:Customer[];
    facturas!:Factura[];
  }