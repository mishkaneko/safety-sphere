import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentRoutePathService {
  // private _currentRoutePath!: string
  private currentRoutePath = new Subject<any>();

  constructor() { }

  setCurrentRoutePath (routePath: string) {
    this.currentRoutePath.next(routePath);
  }

  getCurrentRoutePath () {
    return this.currentRoutePath.asObservable();
  }
}
