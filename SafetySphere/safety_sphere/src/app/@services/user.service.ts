import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export type UserProfile = [
  {
    name: 'username';
    key: 'userName';
    value: string;
  },
  {
    name: 'user phone no.';
    key: 'userPhone';
    value: string;
  },
  {
    name: 'user notes';
    key: 'notes';
    value: string;
  },
  {
    name: 'emergency contact name';
    key: 'emergName';
    value: string;
  },
  {
    name: 'emergency phone';
    key: 'emergPhone';
    value: string;
  },
  {
    name: 'emergency relation';
    key: 'emergRelation';
    value: string;
  },
  {
    name: 'emergency address';
    key: 'emergAddress';
    value: string;
  }
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  getProfile() {
    return this.api.get('/user-profile');
  }
}
