import { ApiService } from 'src/app/@services/api.service';
import { Component } from '@angular/core';
import { UserProfile, UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userProfileInformation?: UserProfile;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    // Might have to pass user_id here?
    this.userService.getProfile().subscribe({
      next: (json) => {
        this.userProfileInformation = json.profile;
        console.log(this.userProfileInformation);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  // Fn for submit btn
  onSubmit() {
    if (this.userProfileInformation) {
      console.log(this.userProfileInformation);

      // Sends data to server
      this.apiService
        .put(this.userProfileInformation, '/user-profile')
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    }
  }
}
