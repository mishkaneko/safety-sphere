import socketIO from 'socket.io'

export let io: socketIO.Server

export function setServer(server: socketIO.Server) {
    io = server

    io.on('connection', socket => {
        console.log('socket connected:', socket.id)
    })
}