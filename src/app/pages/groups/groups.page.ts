import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomersService } from 'src/app/services/customers.service';
import { Group } from 'src/app/models/Group';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GroupsPage implements OnInit {

  username = localStorage.getItem('username');
  groups: Group[] = [];
  proveedoresToggle: any;
  facturasToggle: any;

  constructor(private dataService: CustomersService) { }

  ngOnInit() {
    this.initView();
  }

  initView() {
    // Loads the groups info or creates it if is the first time the user logs in
    this.dataService.getGroups(this.username).subscribe(groups => {

      this.groups = groups;
      
      if (groups.length == 1) {
        let provedoresGroup = new Group;
        provedoresGroup.id = 'Proveedores';
        provedoresGroup.icon = 'assets/icon/add.gif';
        provedoresGroup.active = false;
        this.dataService.addGroup(provedoresGroup, this.username, 'Proveedores');
  
        let facturasGroup = new Group;
        facturasGroup.id = 'Facturas';
        facturasGroup.icon = 'assets/icon/list.gif';
        facturasGroup.active = false;
        this.dataService.addGroup(facturasGroup, this.username, 'Facturas');

      } 
    });
  }

  // Activate or Desactivate groups globally
  onToggleChanged(event: any, groupName: any) {
    console.log(groupName + "  " + event.target.checked);
    this.dataService.updateGroup(this.username, groupName, event.target.checked);
  }

}
