import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';
import { json } from 'body-parser';
import {Conversation} from './conversation'


export enum WSMessageEvent {
	UserNotFound = 'user_not_found',
	UserFound = 'user_found',
	UserCreated = 'user_created',
	PUIDInvalid = 'puid_invalid',
	PageIDNotFound = 'pageid_not_found',
	PageIDMissing = 'pageid_missing',
	VerfiyTokenMissing = 'verifytoken_missing',
	ConnectionRejected = 'connection_rejected',
	NewMessage = 'new_message'
}

interface ICleint{
    conversations: Conversation[];
}


const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server, path:'/webplugin' });

let _clients:ICleint[];
let conversation : Conversation;

wss.on('connection', (ws: WebSocket) => {
   
    let user = JSON.stringify({ statusCode: 202, connected: true, type: WSMessageEvent.UserFound, payload: '123' });
    conversation = new  Conversation(ws)
    conversation.loadConversationSchema();
    
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        conversation.messageRecieved(message);

       
       // ws.send(`Hello, you sent -> ${message}`);
    });
 
    
   
    ws.send(user);
});








//start our server
server.listen(process.env.PORT || 8999, () => {
    const { port } = server.address() as AddressInfo;

    console.log(`Server started on port ${port} :)`);
});