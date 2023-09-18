import { Component, OnInit } from '@angular/core';
import { NearbyPlacesService } from 'src/app/@services/nearby-places.service';
import { AlarmService } from './@services/alarm.service';
import { AppStatusService } from './@services/app-status.service';
// import { Preferences } from '@capacitor/preferences';
// import { ApiService } from 'src/app/@services/api.service';
// import { CurrentRoutePathService } from './@services/current-route-path.service'
import { IncidentMapService } from 'src/app/@services/incident-map.service';
import { HistoryService } from 'src/app/@services/history.service';
import { ReportIncidentService } from './@services/report-incident.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected isCollapsed = true;
  // protected userEmail!: string
  // protected userName!: string
  // protected openUpdateUserNameModal: boolean  = false
  // protected userNameTypeIn: string | null = null;
  protected historyService = HistoryService;
  protected reportIncidentService = ReportIncidentService;
  protected incidentMapService = IncidentMapService;

  constructor(
    private alarmService: AlarmService,
    private nearbyPlacesService: NearbyPlacesService,
    protected appStatusService: AppStatusService
  ) // private apiService: ApiService

  {}

  get isEscaping() {
    return this.nearbyPlacesService.isEscaping;
  }

  // private async initUserEmail () {
  //   const { value } = await Preferences.get({ key: 'email' });
  //   if (value) this.userEmail = value
  // }

  // private async initUserName () {
  //   const { value } = await Preferences.get({ key: 'user_name' });
  //   if (value) this.userName = value
  // }

  // protected async updateUserName () {
  //   if (this.userNameTypeIn) {
  //     // const userUuid = await Preferences.get({ key: 'user_uuid' });
  //     // const data = { name: this.userNameTypeIn, userUuid: userUuid.value }
  //     await Preferences.set({ key: 'user_name', value: this.userNameTypeIn });
  //     this.userName = this.userNameTypeIn
  //     // this.apiService.post(data, '/user-profile/updateUserName')
  //   }
  //   this.openUpdateUserNameModal = false
  // }

  protected onRestart() {
    this.nearbyPlacesService.onRestart();
  }

  protected onStopEscape() {
    this.alarmService.stop();
    this.nearbyPlacesService.isEscaping = false;
    this.nearbyPlacesService.onRestart();
  }

  protected iconSoundColor() {
    return this.alarmService.isAlarming ? '#f74d4f' : '#9e9e9e';
  }

  protected onSwitchAlarm() {
    return this.alarmService.isAlarming
      ? this.alarmService.stop()
      : this.alarmService.loop();
  }

  // private async autoLogin () {
  //   const retrieveUserUuid = async () => {
  //     const { value } = await Preferences.get({ key: 'user_uuid' });
  //     return value
  //   }
  //   if (await retrieveUserUuid()) {
  //     const data = { userUuid: await retrieveUserUuid() }
  //     this.apiService.post(data, '/login').subscribe({
  //       next: async (response:any) => {
  //         if (response.doesLoginSucceed) {
  //           this.appStatusService.onLogin()
  //         } else {
  //           throw new Error('fail to login')
  //         }
  //       },
  //       error: error => {
  //         console.error(error)
  //       }
  //     })
  //   }
  // }
}
