import { HistoryService } from '../../../@services/history.service';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GoogleSearchComponent } from '../../report-incident/google-search/google-search.component';
import { IncidentPhotoComponent } from '../../report-incident/incident-photo/incident-photo.component';
import { ApiService } from 'src/app/@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.scss'],
})
export class EditIncidentComponent {
  protected HistoryService = HistoryService;
  validateForm!: UntypedFormGroup;
  url = '';
  id = '';
  incidentData: any = {};
  isFormReady: boolean = false;

  @ViewChild(GoogleSearchComponent)
  googleSearchComponent!: GoogleSearchComponent;

  @ViewChild(IncidentPhotoComponent)
  incidentPhotoComponent!: IncidentPhotoComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    HistoryService.showEditIncidentTitle = true;

    this.route.params.subscribe((params) => {
      this.id = params['id']; // Extract id from route parameter
      console.log('this.id');
      console.log(this.id);
      this.url = `/report-incident-history/edit-incident/${this.id}`;

      // Use id to fetch incident information
      this.apiService.get(this.url).subscribe({
        next: (response) => {
          console.log('Success:', response);

          // Initialize the form controls with the retrieved data
          this.initializeFormControls(response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    });
  }

  initializeFormControls(arrFormData: any) {
    const formFormat: any = {
      incidentType: [[Validators.required]],
      datePicker: [[Validators.required]],
      timePicker: [[Validators.required]],
      location: [[Validators.required]],
      description: [[Validators.required]],
    };

    // Sets the value of locationHistory in service
    this.historyService.locationHistory = arrFormData.find(
      (elem: any) => elem.key === 'location'
    ).value;
    this.historyService.imageHistory = arrFormData.find(
      (elem: any) => elem.key === 'image'
    ).value;

    console.log(
      'this.locationHistoryService.locationHistory: ',
      this.historyService.locationHistory
    );
    console.log(
      'this.locationHistoryService.imageHistory: ',
      this.historyService.imageHistory
    );

    arrFormData = arrFormData.filter((elem: any) => elem.key in formFormat);

    console.log('arrFormData: ', arrFormData);

    for (const elem of arrFormData) {
      formFormat[elem.key].unshift(elem.value || '');
    }

    console.log('formFormat: ', formFormat);

    this.validateForm = this.fb.group(formFormat);

    this.isFormReady = true;
  }

  onSave() {
    // // Access form values using the FormGroup
    const id = this.id;
    const incidentType = this.validateForm.get('incidentType')!.value;
    const date = this.validateForm.get('datePicker')!.value;
    const time = this.validateForm.get('timePicker')!.value;
    const location = this.googleSearchComponent.location;
    const coordinates = this.googleSearchComponent.coordinates;
    const description = this.validateForm.get('description')!.value;
    // TODO
    // const image = this.incidentPhotoComponent.selectedImages
    //   ? this.incidentPhotoComponent.selectedImages
    //   : [];
    const image: any[] = [];

    const formObj = {
      id,
      incidentType,
      date,
      time,
      location,
      coordinates,
      description,
      image,
    };

    console.log('report-incident-component: ', formObj);

    // Send data to service
    this.apiService.put(formObj, this.url).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.notification.success('成功儲存報告', '', {
          nzPlacement: 'top',
        });
        this.router.navigate(['/report-incident-history']);
      },
      error: (error) => {
        this.notification.error('儲存報告不成功，請重試', '', {
          nzPlacement: 'top',
        });
        console.error('Error:', error);
      },
    });
  }

  returnToReportIncidentHistoryPage() {
    this.router.navigate(['report-incident-history']);
  }

  ngOnDestroy() {
    HistoryService.showEditIncidentTitle = false;
  }
}
