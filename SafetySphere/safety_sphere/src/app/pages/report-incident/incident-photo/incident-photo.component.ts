import { Component, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'incident-photo',
  templateUrl: './incident-photo.component.html',
  styleUrls: ['./incident-photo.component.scss'],
})
export class IncidentPhotoComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  selectedImages: string[] = [];
  // selectedImages: any;
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
      // width: 207,
    });
    const { format, webPath } = images.photos[0];
    // const imageBlob = new Blob([webPath], { type: `image/${format}` })
    // this.onImageSelected(format, imageBlob)
    // fetch(webPath)
    //   .then(response => response.blob())
    //   .then(blobData => this.onImageSelected(format, blobData))
    //   .catch(error => console.error(error))
    const response = await fetch(webPath);
    const blobData = await response.blob();
    this.onImageSelected(format, blobData);

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

  onImageSelected(imageFormat: string, imageBlob: Blob) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.onload = () => {
        const maxWidth: number = 207;
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
        this.ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
        canvasElement.width = width;
        canvasElement.height = height;
        this.ctx.drawImage(image, 0, 0, width, height);

        const resizedImageData = canvasElement.toDataURL(
          `image/${imageFormat}`
        );
        console.log('resizedImageData');
        console.log(resizedImageData);
        this.selectedImages.push(resizedImageData);
      };

      image.src = e.target.result;
    };

    reader.readAsDataURL(imageBlob);
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
