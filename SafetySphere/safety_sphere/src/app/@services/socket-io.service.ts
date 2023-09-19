import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Preferences } from '@capacitor/preferences';
import { Subject } from 'rxjs';
import { NearbyPlacesService } from './nearby-places.service'


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  broadcastForAskingForHelp$ = new Subject<any>();
  getBroadcast$ = new Subject<any>();

  userUuid = Preferences.get({ key: 'user_uuid' });
  email = Preferences.get({ key: 'email' });
  askingHelp: boolean = false

  mapInformForUserAskingHelp!: any

  constructor(private socket: Socket, private apiService: ApiService) {
    socket.on('connect', async () => {
      const userUuid = await this.userUuid
      if (userUuid.value) {
        this.joinSocketRoomOfFollow()
        this.receiveMessageFromBroadcast()
      }
    })
  }

  sendMessage(event: string,  msg: any) {
    this.socket.emit(event, msg);
  }
  getMessage(event: string) {
    // return this.socket.fromEvent(event).pipe(map((data:any) => data.msg));
    return this.socket.fromEvent(event).pipe(map((data:any) => data));
  }

  async joinSocketRoomOfFollow () {
    const userUuid = await this.userUuid
    this.apiService.post({ currentUserUuid: userUuid.value }, '/follow/retrieve-all').subscribe({
      next: (response: any) => {
        const allFollowEmail = response[0].emerg_contacts.reduce((total: [], elem: any) => {
          return elem.emerg_contact_email ? [...total, elem.emerg_contact_email] : total
        }, [])
        this.sendMessage('joinRoom', { allFollowEmail });
      },
      error: (error: any) => console.error(error)
    })
  }

  async receiveMessageFromBroadcast () {
    this.getMessage('someoneAskingHelp').subscribe({
      next: (response: any) => {
        console.log('response')
        console.log(response)
        this.getBroadcast$.next(response)
        this.mapInformForUserAskingHelp = response
      },
      error: error => console.error(error)
    })
  }

  async broadcastForAskingForHelp () {
    const email = await this.email
    setTimeout(() => {
      console.log('this.sendMessage')
      // this.sendMessage('onBroadcast', {
      //   email: email.value,
      //   mapInform: {
      //     place: NearbyPlacesService.places.length ? NearbyPlacesService.places.find(elem => elem.selected) : null,
      //     escapeRoute: NearbyPlacesService.escapeRoute,
      //     userLatLng: NearbyPlacesService.userLatLng
      //   }
      // })
    }, 5000)
  }

  // stopBroadcast () {
  //   this.sendMessage('stopBroadcast', 'stop')
  // }
}
