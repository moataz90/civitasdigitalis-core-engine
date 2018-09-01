"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("./conversationSchema/default");
class Conversation {
    constructor(ws) {
        this._conversationSchema = this.loadConversationSchema();
        this._currentStep = 0;
        this._ws = ws;
        this._idea = { category: "", title: "", body: "", email: "", tags: "" };
    }
    nextStep() {
        setTimeout(() => {
            this._currentStep++;
            if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.Out) {
                this.messageRecieved("");
            }
        }, 1500);
    }
    messageRecieved(message) {
        let nextStep = Object.assign({}, this._conversationSchema.steps[this._currentStep]);
        if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.Out && this._conversationSchema.steps[this._currentStep].payload !== undefined) {
            this.sendMessage((this.formatMessage(this._conversationSchema.steps[this._currentStep].payload, this._conversationSchema.steps[this._currentStep].stepType)));
        }
        if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.In) {
            this.validateRecievedMessage(this._conversationSchema.steps[this._currentStep], message);
        }
    }
    validateRecievedMessage(step, message) {
        let mess = JSON.parse(message);
        if (step.stepDirection === StepDirection.In && step.stepType === StepType.Category) {
            this._idea.category = mess["postback"]["payload"];
            this.nextStep();
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.TextBody) {
            this._idea.body = mess["message"]["text"];
            this.nextStep();
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.TextTitle) {
            this._idea.title = mess["message"]["text"];
            this.nextStep();
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.Tags) {
            this._idea.tags = mess["postback"]["payload"];
            this.nextStep();
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.Email) {
            this._idea.email = mess["message"]["text"];
            this.nextStep();
        }
    }
    sendMessage(message) {
        this._ws.send(message);
        this.nextStep();
    }
    loadConversationSchema() {
        return default_1.defaultConversationSchema;
    }
    /**
     * formatMessage
     */
    formatMessage(payload, messageType) {
        console.log("Formatting message %s  %s", payload, messageType);
        let textMessage = payload ? payload.message : "";
        let basicMessage = { "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": { "messaging_type": "RESPONSE", "recipient": { "id": "123" },
                "message": { "text": textMessage }, "timestamp": 1535415055810 } };
        let categoryMessage = { "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": { "messaging_type": "RESPONSE",
                "recipient": { "id": "123" },
                "message": { "text": textMessage,
                    "quick_replies": [{ "content_type": "text", "title": "Category1", "payload": "Category1" },
                        { "content_type": "text", "title": "Category2", "payload": "Category2" },
                        { "content_type": "text", "title": "Category3", "payload": "Category3" }
                    ] }, "timestamp": 1535549101966 } };
        let tagsMessage = { "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": { "messaging_type": "RESPONSE",
                "recipient": { "id": "123" },
                "message": { "text": textMessage,
                    "quick_replies": [{ "content_type": "text", "title": "Tag1", "payload": "Tag1" },
                        { "content_type": "text", "title": "Tag2", "payload": "Tag2" },
                        { "content_type": "text", "title": "Tag3", "payload": "Tag3" }
                    ] }, "timestamp": 1535549101966 } };
        if (messageType === StepType.Category) {
            return JSON.stringify(categoryMessage);
        }
        else if (messageType === StepType.Tags) {
            return JSON.stringify(tagsMessage);
        }
        else {
            return JSON.stringify(basicMessage);
        }
    }
}
exports.Conversation = Conversation;
var StepType;
(function (StepType) {
    StepType["Text"] = "text";
    StepType["TextBody"] = "textBody";
    StepType["TextTitle"] = "textBody";
    StepType["Tags"] = "tags";
    StepType["Category"] = "Category";
    StepType["Map"] = "map";
    StepType["Webview"] = "webview";
    StepType["Email"] = "email";
})(StepType = exports.StepType || (exports.StepType = {}));
var StepDirection;
(function (StepDirection) {
    StepDirection["In"] = "in";
    StepDirection["Out"] = "out";
})(StepDirection = exports.StepDirection || (exports.StepDirection = {}));
var payloadType;
(function (payloadType) {
})(payloadType || (payloadType = {}));
//# sourceMappingURL=conversation.js.map