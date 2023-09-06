// import { ApiService } from 'src/app/@services/api.service';
// import { Component } from '@angular/core';
// import {
//   UntypedFormBuilder,
//   UntypedFormGroup,
//   Validators,
// } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
// })
// export class UserProfileComponent {
//   userProfileForm!: UntypedFormGroup;

//   constructor(
//     private fb: UntypedFormBuilder,
//     private apiService: ApiService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     // Initializes the form controls in the constructor
//     this.userProfileForm = this.fb.group({
//       userName: ['', [Validators.required]],
//       userPhone: ['', [Validators.required]],
//       notes: [''],
//       emergName: ['', [Validators.required]],
//       emergRelation: ['', [Validators.required]],
//       emergPhone: ['', [Validators.required]],
//       emergAddress: ['', [Validators.required]],
//     });
//   }

//   // Fn for submit btn
//   onSubmit() {
//     // Access form values using the FormGroup
//     const userName = this.userProfileForm.get('userName')!.value;
//     const userPhone = this.userProfileForm.get('userPhone')!.value;
//     const notes = this.userProfileForm.get('notes')!.value;
//     const emergName = this.userProfileForm.get('emergName')!.value;
//     const emergRelation = this.userProfileForm.get('emergRelation')!.value;
//     const emergPhone = this.userProfileForm.get('emergPhone')!.value;
//     const emergAddress = this.userProfileForm.get('emergAddress')!.value;
//     const formObj = {
//       userName,
//       userPhone,
//       notes,
//       emergName,
//       emergRelation,
//       emergPhone,
//       emergAddress,
//     };

//     // Clears form
//     this.userProfileForm.reset();

//     console.log(formObj);
//     // this.sendDataToService(formObj);
//   }

//   // Sends data to service
//   // sendDataToService(data: {}) {
//   //   this.apiService
//   //     .sendDataToServer(data, '/user-profile/information')
//   //     .subscribe({
//   //       next: (response) => {
//   //         console.log('Response from server: ', response);
//   //       },
//   //       error: (error) => {
//   //         // Displays an error message in a Snackbar
//   //         this.snackBar.open('An error occurred while sending data.', 'Close', {
//   //           duration: 5000,
//   //         });
//   //         console.error('Error: ', error);
//   //       },
//   //     });
//   // }
// }
