import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { io } from 'src/io';
import { knex } from 'src/knex';

type Pos = {
    lat: number,
    lng: number
}

@Injectable()
export class UserPositionService {

    realtimePos: Record<string, Pos> = {}



    constructor() {
        io.on('connection', socket => this.onSocket(socket))
    }

    onSocket(socket: Socket) {
        socket.on('login', uuid => this.onLogin(socket, uuid))
    }

    async onLogin(socket: Socket, uuid: string) {
        try {
            let friend_ids = await this.getRoomList(uuid)
            this.subscribeAlerts(socket, friend_ids)
            socket.on('enter-realtime-pos-page', ()=> this.subscribeRealtimePos(socket, friend_ids))
            socket.on('leave-realtime-pos-page', ()=> this.unsubscribeRealtimePos(socket, friend_ids))
        } catch (error) {
            console.error('failed to init socket when login:', error)
            socket.disconnect()
        }
    }

    // TODO use push notice
    subscribeAlerts(socket: Socket, friend_ids: string[]) {
        for (let friend_id of friend_ids) {
            socket.join(`${friend_id}-alert`)
        }
    }

    subscribeRealtimePos(socket: Socket, friend_ids: string[]) {
        for (let friend_id of friend_ids) {
            socket.join(`${friend_id}-pos`)
        }
    }

    unsubscribeRealtimePos(socket: Socket, friend_ids: string[]) {
        for (let friend_id of friend_ids) {
            socket.leave(`${friend_id}-pos`)
        }
    }

    receiveUserPosition(uuid: string, pos: Pos) {
        this.realtimePos[uuid] = pos
        io.to(uuid).emit('update-pos', { uuid, pos })
    }

    async getRoomList(uuid: string) {
        let rows = await knex('emerg_contact')
            .select('current_user_uuid')
            .where('emerg_contact_uuid', uuid)
        return rows.map(row => row.current_user_uuid)
    }
}
