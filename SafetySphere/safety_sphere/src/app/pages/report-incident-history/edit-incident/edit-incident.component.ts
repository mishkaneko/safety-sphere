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

  @ViewChild(GoogleSearchComponent)
  googleSearchComponent!: GoogleSearchComponent;

  @ViewChild(IncidentPhotoComponent)
  incidentPhotoComponent!: IncidentPhotoComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get incident ID from route parameters
    this.route.params.subscribe((params) => {
      this.id = params['id']; // Extract id from route parameter
      this.url = `/report-incident-history/edit-incident/${this.id}`;

      // Use id to fetch incident information
      this.apiService.getDataFromServer(this.url).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.incidentData = response;
          // Initialize the form controls with the retrieved data
          this.initializeFormControls();
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    });
    this.initializeFormControls();
  }

  initializeFormControls() {
    // Initialize the form controls in the constructor
    this.validateForm = this.fb.group({
      incidentType: [
        this.incidentData.incidentType || '',
        [Validators.required],
      ],
      datePicker: [this.incidentData.date || null, [Validators.required]],
      timePicker: [this.incidentData.time || null, [Validators.required]],
      incidentDetails: [
        this.incidentData.incidentDetails || '',
        [Validators.required],
      ],
    });
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
    this.apiService.updateServerData(formObj, this.url).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
