import { Injectable } from '@angular/core';
import { Defer, createDefer } from '@beenotung/tslib/async/defer'

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  googleDefer = createDefer<typeof google>()

  constructor() {
    this.waitGoogle()
  }

  waitGoogle() {
    if (typeof google != 'undefined') {
      this.googleDefer.resolve(google)
      return
    }
    setTimeout(() => this.waitGoogle(), 300)
  }

}
