import { SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets'; 

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:8100',
      'capacitor://localhost',
      'ionic://localhost',
      'http://localhost',
  ],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class EscapeRouteGateway {
  @WebSocketServer() server; 
    
  private clientsArr: any[]=[]; 
 
  handleConnection(client: any,){ 
    console.log('有人鏈接了'+client.id);    
  } 

  handleDisconnect(client:any){ 
    console.log('有人斷接了'+client.id);    
  } 
  
  @SubscribeMessage('addCart') 
  addCart(client: any, payload: any) { 
       console.log(payload) 
    
      // var roomid=url.parse(client.request.url,true).query.roomid; /*獲取房間號獲取桌號*/ 
      // client.join(roomid);
      // this.server.to(roomid).emit('addCart','Server AddCart Ok'); //廣播所有人包含自己
      // client.broadcast.to(roomid).emit('addCart','Server AddCart Ok '); //不包括自己


  } 

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
