import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from './api.service';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {
  // userName!: string
  userEmail!: string
  currentPageLabel: string = ''
  isLogin: boolean = false
  userUuid!: string

  constructor(private apiService: ApiService, private socketIoService: SocketIoService) {
    Preferences.get({ key: 'user_uuid' }).then(result => {
      if (result.value) {
        this.userUuid = result.value
        this.isLogin = true
        this.joinSocketRoom()
      }
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
    const userUuid = await Preferences.get({ key: 'user_uuid' })
    this.isLogin = true
    this.userEmail = email.value as string
    this.userUuid = userUuid.value as string
  }

  onLogout () {
    this.isLogin = false
  }

  joinSocketRoom () {
    this.apiService.post({ currentUserUuid: this.userUuid }, '/follow/retrieve-all').subscribe({
      next: (response: any) => {
        console.log('response')
        console.log(response)
        const allFollowEmail = response[0].emerg_contacts.reduce((total: [], elem: any) => {
          return elem.emerg_contact_email ? [...total, elem.emerg_contact_email] : total
        }, [this.userEmail])
        this.socketIoService.sendMessage('joinRoom', { allFollowEmail })
      },
      error: error => console.error(error)
    })
  }
}
 