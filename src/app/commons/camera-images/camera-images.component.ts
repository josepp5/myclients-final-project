import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';

// Camera component 

@Component({
  selector: 'app-camera-images',
  templateUrl: './camera-images.component.html',
  styleUrls: ['./camera-images.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule ]

})
export class CameraImagesComponent implements OnInit {

  comprueba:boolean = false

  constructor(
    protected imageService: ImageService
  ) { }

  ngOnInit() {
  }

  

}
