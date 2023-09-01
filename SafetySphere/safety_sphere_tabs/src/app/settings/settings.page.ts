import { AlertController } from '@ionic/angular';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private userService: UserService, private alertController: AlertController) {
  }

  // private userService: UserService
  // constructor(userService: UserService) {
  //   this.userService = userService
  // }

  ngOnInit() {
  }

  hasLogin() {
    return this.userService.hasLogin()
  }

  async logout() {
    let alert = await this.alertController.create({
      header: 'Confirm to logout?',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.userService.logout()
          }
        },
        { text: 'Dismiss', role: 'cancel' }
      ]
    })
    await alert.present()
  }

}
