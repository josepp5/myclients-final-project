import { Injectable } from '@angular/core';
import { Group } from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groups:Group[]=[];

  constructor() { }

  getGroups() : any{
    return this.groups;
  }

  setGroups(groups:any) {
    this.groups = groups;
  }
}
