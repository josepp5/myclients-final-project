import { Injectable } from '@angular/core';
import { Firestore, deleteDoc, addDoc, collection, collectionData, doc, updateDoc, docData, DocumentReference, query, where, getDocs, setDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';
import { Group } from '../models/Group';
import { Factura } from '../models/Factura';
import { User } from '../models/User';
import { group } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private firestore: Firestore) { }

  // FACTURAS SERVICES ///////////////////////

  getFacturas(userEmail:any): Observable<Factura[]> {
    const customerRef = collection(this.firestore, 'users', 'demo@presentacion.com' , "Facturas");
    return collectionData(customerRef, { idField: "id" }) as Observable<Factura[]>;
  }

  getFacturaById(id: string, userEmail:any, tipo:any): Observable<Factura> {
    const customerRef = doc(this.firestore, 'users', 'demo@presentacion.com' , tipo, id);
    return docData(customerRef, { idField: "id" }) as Observable<Factura>;
  }

  addFactura(factura: Factura, userEmail: any, tipo: any) {
    const customerRef = collection(this.firestore, 'users', 'demo@presentacion.com', tipo);
    addDoc(customerRef, factura);
  }

  async updateFactura(factura: Factura, userEmail:any, tipo:any) {
    const docInstance = doc(this.firestore, `users/${userEmail}/${tipo}/${factura.id}`);
    const updatedData = { ...factura };
    console.log(updatedData);

    await updateDoc(docInstance, updatedData);
  }

  // CLIENTES SERVICES /////////////////////////

  addCustomer(customer: Customer, userEmail: any, tipo: any) {
    const customerRef = collection(this.firestore, 'users', 'demo@presentacion.com', tipo);
    addDoc(customerRef, customer);
  }

  getCustomers(userEmail:any, tipo: any): Observable<Customer[]> {
    const customerRef = collection(this.firestore, 'users', 'demo@presentacion.com' , tipo);
    return collectionData(customerRef, { idField: "id" }) as Observable<Customer[]>;
  }

  getCustomerById(id: string, userEmail:any, tipo:any): Observable<Customer> {
    const customerRef = doc(this.firestore, 'users', 'demo@presentacion.com' , tipo, id);
    return docData(customerRef, { idField: "id" }) as Observable<Customer>;
  }

  async deleteCustomer(id: string, userEmail:any, tipo:any) {
    const docRef = doc(this.firestore, `users/${userEmail}/${tipo}/${id}`);
    await deleteDoc(docRef);
  }

  async updateCustomer(customer: Customer, userEmail:any, tipo:any) {
    const docInstance = doc(this.firestore, `users/${userEmail}/${tipo}/${customer.id}`);
    const updatedData = { ...customer };
    console.log(updatedData);

    await updateDoc(docInstance, updatedData);
  }

  // GROUPS SERVICES ////////////////////////////

  addGroup(group: Group, userEmail: any, customId?: string) {
    const groupsRef = collection(this.firestore, 'users', userEmail, 'groups');
    let docRef: DocumentReference;

    if (customId) {
      docRef = doc(groupsRef, customId);
    } else {
      docRef = doc(groupsRef);
    }
  
    setDoc(docRef, JSON.parse(JSON.stringify(group)))
      .then(() => {
        console.log('Group added successfully');
      })
      .catch((error) => {
        console.error('Error adding group:', error);
      });
  }

  getGroups(userEmail:any): Observable<Group[]> {
    const customerRef = collection(this.firestore, 'users', userEmail , "groups");
    return collectionData(customerRef, { idField: "id" }) as Observable<Group[]>;
  }

  async getGroup(userEmail:any, id:any): Promise<Observable<Group>> {
    const customerRef = doc(this.firestore, 'users', userEmail , "groups", id);
    return docData(customerRef, { idField: "id" }) as Observable<Group>;
  }

  async updateGroup(userEmail:any, tipo:any, activate:boolean) {
    const docInstance = doc(this.firestore, `users/${userEmail}/groups/${tipo}`);
    const updatedData = { active : activate };

    await updateDoc(docInstance, updatedData);
  }

  /// USER SERVICES ///////////////////////////////

  addUser(user: User, userEmail: any, customId?: string) {
    const usersRef = collection(this.firestore, 'users', userEmail, 'account');
    let docRef: DocumentReference;

    if (customId) {
      docRef = doc(usersRef, customId);
    } else {
      docRef = doc(usersRef);
    }
  
    setDoc(docRef, JSON.parse(JSON.stringify(user)))
      .then(() => {
        console.log('User added successfully');
      })
      .catch((error) => {
        console.error('Error adding group:', error);
      });
  }

  getUser(userEmail:any): Observable<User> {
    const customerRef = doc(this.firestore, 'users', userEmail, 'account', 'info');
    return docData(customerRef, { idField: "id" }) as Observable<User>;
  }

  async updateUser(user: User, userEmail:any) {
    const docInstance = doc(this.firestore, `users/${userEmail}/account/info`);
    const updatedData = { ...user };

    await updateDoc(docInstance, updatedData);
  }

  
}
