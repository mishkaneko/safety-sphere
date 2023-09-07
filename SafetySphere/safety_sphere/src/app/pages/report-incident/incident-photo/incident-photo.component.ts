import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'incident-photo',
  templateUrl: './incident-photo.component.html',
  styleUrls: ['./incident-photo.component.scss'],
})
export class IncidentPhotoComponent {
  selectedImages: string[] = [];

  // Take photo
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    // Push taken img into img array
    if (image.dataUrl) {
      this.selectedImages.push(image.dataUrl);
    }
  }

  // Pick photo from gallery
  async pickPhoto() {
    const images = await Camera.pickImages({});

    // Check if there are selected photos and add them to the selectedImages array
    if (images && images.photos && images.photos.length > 0) {
      this.selectedImages = images.photos.map((photo) => photo.webPath);
    }
    console.log('selected image: ', this.selectedImages);
  }
}
