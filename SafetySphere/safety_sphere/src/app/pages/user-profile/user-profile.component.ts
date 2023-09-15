import { ApiService } from 'src/app/@services/api.service';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userProfileForm!: UntypedFormGroup;
  isFormReady: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get user profile
    // Might have to pass user_id here?
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.initializeFormControls(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  initializeFormControls(arrFormData: any) {
    const formFormat: any = {
      userName: [[Validators.required]],
      userPhone: [[Validators.required]],
      notes: [''],
      emergName: [[Validators.required]],
      emergRelation: [[Validators.required]],
      emergPhone: [[Validators.required]],
      emergAddress: [[Validators.required]],
    };

    arrFormData = arrFormData.filter((elem: any) => elem.key in formFormat);

    for (const elem of arrFormData) {
      formFormat[elem.key].unshift(elem.value || '');
    }

    this.userProfileForm = this.fb.group(formFormat);

    this.isFormReady = true;
  }

  // Fn for submit btn
  onSubmit() {
    // Access form values using the FormGroup
    const userName = this.userProfileForm.get('userName')!.value;
    const userPhone = this.userProfileForm.get('userPhone')!.value;
    const notes = this.userProfileForm.get('notes')!.value;
    const emergName = this.userProfileForm.get('emergName')!.value;
    const emergRelation = this.userProfileForm.get('emergRelation')!.value;
    const emergPhone = this.userProfileForm.get('emergPhone')!.value;
    const emergAddress = this.userProfileForm.get('emergAddress')!.value;
    const formObj = {
      userName,
      userPhone,
      notes,
      emergName,
      emergRelation,
      emergPhone,
      emergAddress,
    };

    // Clears form
    this.userProfileForm.reset();
    console.log(formObj);

    // Sends data to server
    this.apiService.post(formObj, '/user-profile/user-information').subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
