"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const conversation_1 = require("./conversation");
var WSMessageEvent;
(function (WSMessageEvent) {
    WSMessageEvent["UserNotFound"] = "user_not_found";
    WSMessageEvent["UserFound"] = "user_found";
    WSMessageEvent["UserCreated"] = "user_created";
    WSMessageEvent["PUIDInvalid"] = "puid_invalid";
    WSMessageEvent["PageIDNotFound"] = "pageid_not_found";
    WSMessageEvent["PageIDMissing"] = "pageid_missing";
    WSMessageEvent["VerfiyTokenMissing"] = "verifytoken_missing";
    WSMessageEvent["ConnectionRejected"] = "connection_rejected";
    WSMessageEvent["NewMessage"] = "new_message";
})(WSMessageEvent = exports.WSMessageEvent || (exports.WSMessageEvent = {}));
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server, path: '/webplugin' });
let _clients;
let conversation;
wss.on('connection', (ws) => {
    let user = JSON.stringify({ statusCode: 202, connected: true, type: WSMessageEvent.UserFound, payload: '123' });
    conversation = new conversation_1.Conversation(ws);
    conversation.loadConversationSchema();
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        conversation.messageRecieved(message);
        // ws.send(`Hello, you sent -> ${message}`);
    });
    ws.send(user);
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    const { port } = server.address();
    console.log(`Server started on port ${port} :)`);
});
//# sourceMappingURL=server.js.map