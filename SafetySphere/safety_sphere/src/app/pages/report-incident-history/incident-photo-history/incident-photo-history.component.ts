import { Component, Input } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { ApiService } from 'src/app/@services/api.service';

@Component({
  selector: 'incident-photo-history',
  templateUrl: './incident-photo-history.component.html',
  styleUrls: ['./incident-photo-history.component.scss'],
})
export class IncidentPhotoHistoryComponent {
  isReviewBtnDisabled = true;
  @Input() image_array: string[] = [];

  constructor(
    private nzImageService: NzImageService,
    private api: ApiService
  ) {}

  onClickReview() {
    let images = this.image_array.map((filename) => {
      return { src: this.api.toReportImageUrl(filename) };
    });
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
