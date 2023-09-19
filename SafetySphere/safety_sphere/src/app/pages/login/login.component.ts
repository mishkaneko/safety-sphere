import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ApiService } from 'src/app/@services/api.service';
import { Preferences } from '@capacitor/preferences';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AppStatusService } from 'src/app/@services/app-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm!: UntypedFormGroup;
  verificationCodeTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  // emailInput: string = ''
  // verificationCodeInput: string = ''
  isClickedGetVerificationCode: boolean = false
  countdown: number = 0

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router,
    private appStatusService: AppStatusService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      verificationCode: [null]
    });
  }

  getVerificationCode(e: MouseEvent): void {
    e.preventDefault();
    let verificationCode: string | null = null
    this.onCountdownForGettingVerificationCode()
    // this.apiService.post({ email: this.emailInput }, '/login/create-verification-code').subscribe({
    this.apiService.post({ email: this.validateForm.value.email }, '/login/create-verification-code').subscribe({
      next: async (response: any) => {
        verificationCode = response.verificationCode as string
        await Preferences.set({ key: 'verificationCode', value: verificationCode, });
      },
      error: error => {
        console.error(error)
      }
    })
  }

  // async retrieveUserUuid () {
  //   const { value } = await Preferences.get({ key: 'user_uuid' });
  //   return value
  // }

  onCountdownForGettingVerificationCode() {
    this.countdown = 180
    const count = setInterval(async () => {
      this.countdown -= 1
      if (this.countdown === 0) {
        clearInterval(count)
        await Preferences.remove({ key: 'verificationCode' });
      }
    }, 1000)
  }

  async verifyVerificationCode() {
    const { value } = await Preferences.get({ key: 'verificationCode' });
    return value ? value === this.validateForm.value.verificationCode : value
  }

  onRegisterModal() {
    this.modal.info({
      nzTitle: '註冊？',
      nzContent: '<p>Email未註冊，是否需要註冊？</p>',
      nzOkText: '是',
      nzOkType: 'primary',
      nzOnOk: () => this.onApiRegister(),
      nzCancelText: '否',
    });
  }

  onErrorModal(element: { label: string }) {
    this.modal.error({
      nzTitle: '登入失敗',
      nzContent: `"${element.label}"輸入錯誤`
    });
  }

  async submitForm() {
    //#region 
    // if (this.validateForm.valid && await this.verifyVerificationCode()) {
    // } else {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
    //#endregion

    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else if (!await this.verifyVerificationCode()) {
      this.onErrorModal({ label: '驗證碼' })
    }
    // else if (await this.retrieveUserUuid()) {
    //   await this.onApiLogin()
    // }
    else {
      this.onApiVerifyEmailExist()
    }
  }

  // async onApiLogin () {
  //   const data = { userUuid: await this.retrieveUserUuid() }
  //   this.apiService.post(data, '/login').subscribe({
  //     next: async (response:any) => {
  //       if (response.doesLoginSucceed) {
  //         this.appStatusService.onLogin()
  //         this.createNotification({
  //           type: 'success',
  //           title: '登入成功！',
  //           message: '歡迎使用SafetySphere。'
  //         })
  //         this.router.navigateByUrl('/')
  //       } else {
  //         throw new Error('fail to login')
  //       }
  //     },
  //     error: error => {
  //       console.error(error)
  //       this.createNotification({
  //         type: 'error',
  //         title: '登入失敗！',
  //         message: '抱歉，系統維護中...'
  //       })
  //     }
  //   })
  // }

  onApiVerifyEmailExist() {
    let email = this.validateForm.value.email
    const data = { email }
    this.apiService.post(data, '/login/verifyEmailExist').subscribe({
      next: async (response: any) => {
        if (!response.doesEmailExist) return this.onRegisterModal()
        let uuid = response.userUuid
        this.appStatusService.onLogin({ email, uuid })
        this.createNotification({
          type: 'success',
          title: '登入成功！',
          message: '歡迎使用SafetySphere。'
        })
        this.router.navigateByUrl('/')
      },
      error: error => {
        console.error(error)
        this.createNotification({
          type: 'error',
          title: '登入 / 註冊失敗！',
          message: '抱歉，系統維護中...'
        })
      }
    })
  }

  onApiRegister() {
    let email = this.validateForm.value.email
    const data = { email }
    this.apiService.post(data, '/login/register').subscribe({
      next: async (response: any) => {
        let uuid = response.userUuid
        this.appStatusService.onLogin({ email, uuid })
        this.createNotification({
          type: 'success',
          title: '註冊成功！',
          message: '歡迎使用SafetySphere。'
        })
        this.router.navigateByUrl('/')
      },
      error: error => {
        console.error(error)
        this.createNotification({
          type: 'error',
          title: '註冊失敗！',
          message: '抱歉，系統維護中...'
        })
      }
    })
  }

  createNotification(props: { type: string, title: string, message: string }) {
    const { type, title, message } = props
    this.notification.create(type, title, message);
  }

  async ngOnDestroy() {
    await Preferences.remove({ key: 'verificationCode' });
  }
}
