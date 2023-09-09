import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'incident-photo',
  templateUrl: './incident-photo.component.html',
  styleUrls: ['./incident-photo.component.scss'],
})
export class IncidentPhotoComponent {
  // selectedImages: string[] = [];
  selectedImages: any;
  isReviewBtnDisabled = true;

  constructor(private nzImageService: NzImageService) {}

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
    const images = await Camera.pickImages({
      // quality: 90,
      width: 207,
    });
    console.log('images');
    console.log(images);

    // Check if there are selected photos and add them to the selectedImages array
    // if (images && images.photos && images.photos.length > 0) {
    //   // Convert blob into buffer
    //   this.selectedImages = images.photos.map((photo) => {
    //     fetch(photo.webPath)
    //       .then((response) => response.blob())
    //       .then((blob) => {
    //         const reader = new FileReader();
    //         reader.onload = function () {
    //           const arrayBuffer = reader.result; // This will be an ArrayBuffer
    //           if (arrayBuffer) {}
    //           const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
    //           console.log(buffer); // This will be a Node.js Buffer
    //         };
    //         reader.readAsArrayBuffer(blob);
    //       })
    //       .catch((error) => {
    //         console.error('Error converting blob: ', error);
    //       });
    //   });
    // }

    this.checkImgAvailability();
  }

  onClickReview() {
    let images = this.selectedImages.map((nzImg: any) => {
      return { src: `${nzImg.toString()}` };
    });
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
    this.checkImgAvailability();
  }

  checkImgAvailability() {
    if (this.selectedImages) {
      this.isReviewBtnDisabled = false;
    }
  }
}
