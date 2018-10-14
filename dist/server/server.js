"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const conversation_1 = require("./conversation/conversation");
const commonInterfaces_1 = require("./interfaces/commonInterfaces");
const uuid_1 = require("uuid");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server, path: '/webplugin' });
let _clients;
let conversation;
wss.on('connection', (ws) => {
    conversation = new conversation_1.Conversation(ws, uuid_1.v4());
    conversation.loadConversationSchema();
    ws.on('message', (message) => {
        let inComingMessage = JSON.parse(message);
        // Plugin / Facebook specific check
        if (typeof inComingMessage !== 'object') {
            ws.send(commonInterfaces_1.HTTPStatusCodes.NOT_FOUND.toString());
            return;
        }
        const wsPayload = inComingMessage;
        if (!wsPayload.recipient || !wsPayload.recipient.id) {
            ws.send(commonInterfaces_1.HTTPStatusCodes.BAD_REQUEST.toString());
            return;
        }
        conversation.messageRecieved(wsPayload);
    });
    ws.send(conversation.getConversationStatus());
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    const { port } = server.address();
    console.log(`Server started on port ${port} :)`);
});
//# sourceMappingURL=server.js.map