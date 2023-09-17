import { HistoryService} from '../../../@services/history.service';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GoogleSearchComponent } from '../../report-incident/google-search/google-search.component';
import { IncidentPhotoComponent } from '../../report-incident/incident-photo/incident-photo.component';
import { ApiService } from 'src/app/@services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.scss'],
})
export class EditIncidentComponent {
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
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = params['id']; // Extract id from route parameter
      console.log('this.id')
      console.log(this.id)
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
    this.historyService.locationHistory = arrFormData.find((elem: any) => elem.key === 'location').value
    this.historyService.imageHistory = arrFormData.find((elem: any) => elem.key === 'image').value

    console.log('this.locationHistoryService.locationHistory: ', this.historyService.locationHistory)
    console.log('this.locationHistoryService.imageHistory: ', this.historyService.imageHistory)

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
    const incidentDetails = this.validateForm.get('incidentDetails')!.value;
    const images = this.incidentPhotoComponent.selectedImages;
    const formObj = {
      id,
      incidentType,
      date,
      time,
      location,
      coordinates,
      incidentDetails,
      images,
    };

    console.log('report-incident-component: ', formObj);

    // Send data to service
    this.apiService.put(formObj, this.url).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
