import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  image:any;

  constructor(
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

            
    // Little helper
  async presentToast(text: any) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  // Opens dialog to take picture or choose from device folders
  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
    });
    
    if (image) {
      this.saveImage(image)
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...'
    });
    await loading.present();

    const base64Data = await this.readAsBase64(photo);

    if (base64Data.includes('data')){
      this.image = base64Data;
    } else {
      this.image =`data:image/jpeg;base64,${base64Data}`;
    }
    
    loading.dismiss();
  }

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      let photoPath: string = photo.path!;
      const file = await Filesystem.readFile({
        path: photoPath
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      let photoWebPath: string = photo.webPath!;
      const response = await fetch(photoWebPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async deleteImage(){
    this.image = null;
  }

  getImage():any{
    return this.image;
  }

  setImage(image:any) {
    this.image = image;
  }
}
