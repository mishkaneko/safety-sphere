import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token = 'xx'

  constructor() { }

  hasLogin() {
    return !!this.token
  }

  logout() {
    this.token = ''
  }
}
