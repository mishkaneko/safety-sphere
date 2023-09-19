import { AppStatusService } from 'src/app/@services/app-status.service';
import { ApiService } from 'src/app/@services/api.service';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GoogleSearchComponent } from './google-search/google-search.component';
import { IncidentPhotoComponent } from './incident-photo/incident-photo.component';
import { ReportIncidentService } from 'src/app/@services/report-incident.service';
import {
  NzNotificationPlacement,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.scss'],
})
export class ReportIncidentComponent {
  showReportIncidentTitle: boolean = false;
  validateForm!: UntypedFormGroup;

  @ViewChild(GoogleSearchComponent)
  googleSearchComponent!: GoogleSearchComponent;

  @ViewChild(IncidentPhotoComponent)
  incidentPhotoComponent!: IncidentPhotoComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService,
    private router: Router,
    private appStatusService:AppStatusService
  ) {}

  ngOnInit(): void {
    ReportIncidentService.showReportIncidentTitle = true;

    // Initialize the form controls in the constructor
    this.validateForm = this.fb.group({
      incidentType: ['', [Validators.required]],
      datePicker: [null, [Validators.required]],
      timePicker: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    let formData = new FormData();

    // Get user_uuid
    // const { value } = await Preferences.get({key: "user_uuid"});
    let uuid: any = this.appStatusService.userUuid

    console.log("uuid: ", uuid);
    
    
    if (uuid !== null) {
      formData.set('user_uuid', uuid);
    } else {
      this.notification.error('請先登入', '', {
        nzPlacement: 'top',
      });
      return;
    }

    formData.set('incidentType', this.validateForm.get('incidentType')!.value);
    formData.set(
      'date',
      this.validateForm.get('datePicker')!.value.toISOString()
    );
    formData.set(
      'time',
      this.validateForm.get('timePicker')!.value.toISOString()
    );
    formData.set('location', this.googleSearchComponent.location);
    const coordinates = this.googleSearchComponent.coordinates;
    formData.set('lat', coordinates.lat!.toString());
    formData.set('lng', coordinates.lng!.toString());
    formData.set('description', this.validateForm.get('description')!.value);
    for (let image of this.incidentPhotoComponent.images) {
      formData.append('images', image.file);
    }

    console.log('report-incident-component: ', formData);

    // Send data to service
    this.apiService.upload(formData, '/report-incident/user-report').subscribe({
      next: (response) => {
        console.log('Success:', response);

        this.router.navigate(['/report-incident-history']);

        // Display notification on success
        this.notification.success('成功遞交報告', '', {
          nzPlacement: 'top',
        });
      },
      error: (error) => {
        this.notification.error('遞交報告不成功，請重試', '', {
          nzPlacement: 'top',
        });
        console.error('Error:', error);
      },
    });
  }

  ngOnDestroy() {
    ReportIncidentService.showReportIncidentTitle = false;
  }
}
