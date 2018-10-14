import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';
import {Conversation} from './conversation/conversation';
import {HTTPStatusCodes , IMessagingObject} from './interfaces/commonInterfaces'
import {v4} from 'uuid';




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
   
    conversation = new  Conversation(ws,v4());
    conversation.loadConversationSchema();

    ws.on('message', (message: string) => {
        let inComingMessage = JSON.parse(message);
		// Plugin / Facebook specific check
		if (typeof inComingMessage !== 'object') {
			ws.send(HTTPStatusCodes.NOT_FOUND.toString());

			return;
		}

		const wsPayload = inComingMessage as IMessagingObject;
		if (!wsPayload.recipient || !wsPayload.recipient.id) {
			ws.send(HTTPStatusCodes.BAD_REQUEST.toString());

            return;
        }

        conversation.messageRecieved(wsPayload);
    });
 
    ws.send(conversation.getConversationStatus());
});








//start our server
server.listen(process.env.PORT || 8999, () => {
    const { port } = server.address() as AddressInfo;

    console.log(`Server started on port ${port} :)`);
});