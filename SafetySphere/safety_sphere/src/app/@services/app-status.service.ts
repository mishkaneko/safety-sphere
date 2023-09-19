import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SocketIoService } from './socket-io.service';
import { createDefer } from '@beenotung/tslib/async/defer';


export type User = {
  email: string
  uuid: string
}

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {

  currentUser: User | null

  get isLogin() {
    return !!this.currentUser
  }

  get userEmail() {
    return this.currentUser?.email
  }

  get userUuid() {
    return this.currentUser?.uuid
  }

  constructor(private socketIoService: SocketIoService) {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('user')!)
    } catch (error) {
      this.currentUser = null
    }
  }

  onLogin(user: { email: string, uuid: string }) {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUser = user
    this.socketIoService.joinSocketRoomOfFollow()
    this.socketIoService.receiveMessageFromBroadcast()
  }

  onLogout() {
    localStorage.removeItem('user')
    this.currentUser = null
  }
}
