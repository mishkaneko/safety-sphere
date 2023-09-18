import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) {
   }

  sendMessage(event: string,  msg: any) {
    this.socket.emit(event, msg);
  }
  getMessage(event: string) {
    return this.socket.fromEvent(event).pipe(map((data:any) => data.msg));
  }

}
