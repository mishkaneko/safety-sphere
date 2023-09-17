import { ApiService } from 'src/app/@services/api.service';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GoogleSearchComponent } from './google-search/google-search.component';
import { IncidentPhotoComponent } from './incident-photo/incident-photo.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.scss'],
})
export class ReportIncidentComponent {
  validateForm!: UntypedFormGroup;

  @ViewChild(GoogleSearchComponent)
  googleSearchComponent!: GoogleSearchComponent;

  @ViewChild(IncidentPhotoComponent)
  incidentPhotoComponent!: IncidentPhotoComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form controls in the constructor
    this.validateForm = this.fb.group({
      incidentType: ['', [Validators.required]],
      datePicker: [null, [Validators.required]],
      timePicker: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // // Access form values using the FormGroup
    const incidentType = this.validateForm.get('incidentType')!.value;
    const date: Date = this.validateForm.get('datePicker')!.value;
    const time: Date = this.validateForm.get('timePicker')!.value;
    const location = this.googleSearchComponent.location;
    const coordinates = this.googleSearchComponent.coordinates;
    const description = this.validateForm.get('description')!.value;
    // const image = this.incidentPhotoComponent.selectedImages;
    const image : any[] = [];

    console.log('date:', this.validateForm.get('datePicker'));
    console.log('date.value:', this.validateForm.get('datePicker')?.value);

    console.log('time:', this.validateForm.get('timePicker'));
    console.log('time.value:', this.validateForm.get('timePicker')?.value);

    Object.assign(window, {
      date: this.validateForm.get('datePicker')?.value,
      time: this.validateForm.get('timePicker')?.value,
    });

    let timestamp = new Date();
    timestamp.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    timestamp.setHours(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      0
    );

    console.log('timestamp:', timestamp);
    console.log('timestamp.isoString:', timestamp.toISOString());
    console.log('timestamp.time:', timestamp.getTime());

    const formObj = {
      incidentType,
      date,
      time,
      location,
      coordinates,
      description,
      image,
    };

    // Create a custom MatSnackBarConfig
    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000, // Duration in milliseconds
      panelClass: ['submit-form-success-snackbar'], // CSS class for custom styling
      verticalPosition: 'bottom', // Position at the bottom of the screen
    };

    // Clear form
    this.validateForm.reset();
    this.googleSearchComponent.clearSearchInput();

    console.log('report-incident-component: ', formObj);

    // Send data to service
    this.apiService.post(formObj, '/report-incident/user-report').subscribe({
      next: (response) => {
        console.log('Success:', response);
        // Display a snackbar on success
        this.snackBar.open('成功遞交報告', '關閉', snackBarConfig);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
