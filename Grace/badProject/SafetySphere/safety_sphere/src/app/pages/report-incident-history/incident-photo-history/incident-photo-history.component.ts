import { Component, Input } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'incident-photo-history',
  templateUrl: './incident-photo-history.component.html',
  styleUrls: ['./incident-photo-history.component.scss'],
})
export class IncidentPhotoHistoryComponent {
  isReviewBtnDisabled = true;
  @Input() image_array: string[] = [];

  constructor(private nzImageService: NzImageService) {}

  onClickReview() {
    let images = this.image_array.map((nzImg) => {
      return { src: `${nzImg.toString()}` };
    });
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
