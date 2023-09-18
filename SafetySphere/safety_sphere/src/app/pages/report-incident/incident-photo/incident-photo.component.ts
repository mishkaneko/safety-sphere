import { HistoryService } from '../../../@services/history.service';
import {
  Component,
  ViewChild,
  ElementRef,
  Pipe,
  SimpleChanges,
} from '@angular/core';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';
import { selectImage } from '@beenotung/tslib/file';
import { compressMobilePhoto, dataURItoFile } from '@beenotung/tslib/image';
import { format_byte } from '@beenotung/tslib/format';

interface Image {
  file: File;
  src: string; // base64
  alt: string;
}

@Component({
  selector: 'incident-photo',
  templateUrl: './incident-photo.component.html',
  styleUrls: ['./incident-photo.component.scss'],
})
export class IncidentPhotoComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  // selectedImages: string[] = this.historyService.imageHistory
  //   ? this.historyService.imageHistory
  //   : [];
  images: Image[] = [];

  // isReviewBtnDisabled = true;

  get isReviewBtnDisabled() {
    return this.images.length == 0;
  }

  constructor(
    private nzImageService: NzImageService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    // this.checkImgAvailability();
  }

  async selectImage() {
    let files = await selectImage({ multiple: true });
    for (let file of files) {
      let src = await compressMobilePhoto({
        image: file,
        mimeType: 'image/webp',
      });
      file = dataURItoFile(src, file);
      this.images.push({
        file,
        src,
        alt: `${file.name} (${format_byte(file.size)})`,
      });
      // this.selectedImages.push(src);
    }
    // this.checkImgAvailability();
  }

  showPreview() {
    let images: NzImage[] = this.images;
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }

  removeImage(image: Image) {
    let index = this.images.indexOf(image);
    if (index == -1) return;
    this.images.splice(index, 1);
    // this.selectedImages.splice(index, 1);
    // this.checkImgAvailability();
  }

  // checkImgAvailability() {
  //   if (this.selectedImages.length > 0) {
  //     this.isReviewBtnDisabled = false;
  //   }
  // }
}
