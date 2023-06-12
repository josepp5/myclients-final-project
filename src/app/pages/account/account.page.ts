import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { CameraImagesComponent } from "../../commons/camera-images/camera-images.component";
import { CustomersService } from 'src/app/services/customers.service';
import { ImageService } from 'src/app/services/image.service';

// Account Page 

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, CameraImagesComponent]
})
export class AccountPage implements OnInit {

  userEmail = localStorage.getItem('username');
  profilePic:any;
  user: User = new User();
  newUser: User = new User();

  picOpen:boolean = false;

  constructor(private userService: CustomersService, protected imageService: ImageService,) { }

  ngOnInit() {
    
    // Loads the current logged user values 
    this.userService.getUser(this.userEmail).subscribe( user => {
      this.user = user;
    });
  }

  // This function modifies the profile image of the user
  onConfirmPic(){
    this.newUser = this.user;
    if (this.imageService.image != undefined) {
      this.newUser.pic = this.imageService.image;
    }
    this.userService.updateUser(this.newUser, this.userEmail);

    this.imageService.deleteImage();
    
  }

  // Deletes current user profile picture
  floatBtnClick(){
    this.picOpen = true;
    this.imageService.deleteImage();
  }


}
