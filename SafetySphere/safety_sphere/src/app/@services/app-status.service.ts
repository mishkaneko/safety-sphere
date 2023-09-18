import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {
  // userName!: string
  userEmail!: string
  currentPageLabel: string = ''
  isLogin: boolean = false
  userUuid!: string

  constructor() {
    Preferences.get({ key: 'user_uuid' }).then(result => {
      if (result.value) this.userUuid = result.value
      this.isLogin = Boolean(result.value)
    })
    Preferences.get({ key: 'email' }).then(result => {
      if (result) this.userEmail = result.value as string
    })
  }

  // private _isLogin: boolean = false
  // get isLogin () {
  //   return this._isLogin
  // }
  // set isLogin (value) {
  //   this._isLogin = value
  // }

  // updateUserName (name: string) {
  //   this.userName = name
  // }

  async onLogin () {
    const email = await Preferences.get({ key: 'email' })
    this.isLogin = true
    this.userEmail = email.value as string
  }

  onLogout () {
    this.isLogin = false
  }
}
 