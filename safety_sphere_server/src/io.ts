import socketIO from 'socket.io'

export let io: socketIO.Server

export function setServer(server: socketIO.Server) {
    io = server

    io.on('connection', socket => {
        console.log('socket connected:', socket.id)

        socket.on('hello', data => {
            console.log('received hello:', data)
        })

        socket.on('online',data=>{
          let token = data.token 
          let user_id = token
          let rooms = [] // look up room from db
          for(let room of rooms){
            socket.join(room)
          }
        })

        socket.on('joinRoom', data => {
          console.log('joinRoom')
          console.log(data)

          for (const followEmail of data.allFollowEmail) {
            socket.join(followEmail)
          }
        })

        socket.on('broadcastTest', data => {
          console.log('broadcastTest')
          console.log(data)

          for (const followEmail of data.allFollowEmail) {
            // socket.broadcast.to(followEmail).emit('broadcastTest', 'This is a broadcast test!')
          }
        })
    })


}