import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GoogleSearchComponent } from './google-search/google-search.component';

interface Coordinates {
  lat: number | undefined;
  lng: number | undefined;
}

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.scss'],
})
export class ReportIncidentComponent {
  validateForm!: UntypedFormGroup;
  receivedCoordinates: Coordinates;

  @ViewChild(GoogleSearchComponent)
  googleSearchComponent!: GoogleSearchComponent;

  constructor(private fb: UntypedFormBuilder) {
    this.receivedCoordinates = {
      lat: undefined,
      lng: undefined,
    };
  }

  ngOnInit(): void {
    // Initialize the form controls in the constructor
    this.validateForm = this.fb.group({
      incidentType: ['', [Validators.required]],
      datePicker: [null, [Validators.required]],
      timePicker: [null, [Validators.required]],
      incidentDetails: ['', [Validators.required]],
    });
  }

  // From child
  receiveCoordinatesFromChild(coordinates: Coordinates) {
    this.receivedCoordinates = coordinates;
    return this.receivedCoordinates;
  }

  onSubmit() {
    // // Access form values using the FormGroup
    const incidentType = this.validateForm.get('incidentType')!.value;
    const date = this.validateForm.get('datePicker')!.value;
    const time = this.validateForm.get('timePicker')!.value;
    const coordinates = this.receiveCoordinatesFromChild(
      this.receivedCoordinates
    );
    const incidentDetails = this.validateForm.get('incidentDetails')!.value;
    const formObj = { incidentType, date, time, coordinates, incidentDetails };

    // Clear form
    this.validateForm.reset();
    this.googleSearchComponent.clearSearchInput();

    console.log(formObj);
  }
}
