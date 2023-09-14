import { Injectable } from '@angular/core';
import { ApiService } from './@services/api.service';

export type UserProfile = {
  user_name: string;
  user_phone: string;
  notes: string;
  emerg_name: string;
  emerg_phone: string;
  emerg_relation: string;
  emerg_address: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  getProfile() {
    return this.api.get<{
      profile: UserProfile;
    }>('/user-profile');
  }
}
