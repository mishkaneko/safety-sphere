import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ApiService } from 'src/app/@services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  verificationCodeTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  emailInput: string = ''

  constructor(private fb: UntypedFormBuilder, private apiService: ApiService) {}

  getverificationCode(e: MouseEvent): void {
    e.preventDefault();

    this.apiService.post({ email: this.emailInput }, '/')
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true]
      verificationCode: [null, [Validators.required]]
    });
  }
}
