"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("./default");
const WebSocket = require("ws");
const commonInterfaces_1 = require("../interfaces/commonInterfaces");
const messageBuilder_1 = require("./../messageBuilder/messageBuilder");
const validators_1 = require("./../utils/validators");
class Conversation {
    constructor(ws, uuid) {
        this._conversationSchema = this.loadConversationSchema();
        this._currentStep = 0;
        this._ws = ws;
        this._uuid = uuid;
        this._idea = { category: "", title: "", body: "", email: "", tags: "" };
    }
    loadConversationSchema(conversationSchema) {
        return conversationSchema ? conversationSchema : default_1.defaultConversationSchema;
    }
    getConversationStatus() {
        if (this._ws.readyState === WebSocket.OPEN) {
            return JSON.stringify({ statusCode: 202, connected: true, type: commonInterfaces_1.WSMessageEvent.UserFound, payload: this._uuid });
        }
        else {
            return JSON.stringify({ statusCode: 400, connected: false, type: commonInterfaces_1.WSMessageEvent.ConnectionRejected, payload: "" });
        }
    }
    nextStep(nextstep, isPrevStepValidationPassed) {
        //setTimeout(() => {   }, 1500);
        if (isPrevStepValidationPassed) {
            if (nextstep !== undefined && nextstep >= 0) {
                this._currentStep = nextstep;
            }
            else if (this._currentStep < this._conversationSchema.steps.length) {
                this._currentStep++;
            }
        }
        else {
            this.messageStepOut(isPrevStepValidationPassed);
        }
        console.log(this._currentStep);
        if (this._conversationSchema.steps[this._currentStep].stepDirection === commonInterfaces_1.StepDirection.Out) {
            this.messageStepOut(isPrevStepValidationPassed);
        }
    }
    messageStepOut(isPrevStepValidationPassed) {
        let nextStep = Object.assign({}, this._conversationSchema.steps[this._currentStep]);
        let message = messageBuilder_1.MessageBuilder.buildMessage(nextStep.payload, nextStep.stepType);
        this.sendMessage(message);
        if (isPrevStepValidationPassed) {
            this.nextStep(nextStep.NextStep, isPrevStepValidationPassed);
        }
    }
    messageRecieved(message) {
        if (message.postback !== undefined && validators_1.Validator.IsJsonString(message.postback.payload) &&
            JSON.parse(message.postback.payload)['intent'] !== undefined &&
            JSON.parse(message.postback.payload)['intent'] === "start") {
            // console.log(JSON.parse(message.postback.payload)['intent']);
            this.nextStep(0, true);
            return;
        }
        let nextStep = Object.assign({}, this._conversationSchema.steps[this._currentStep]);
        if (nextStep.stepDirection === commonInterfaces_1.StepDirection.In) {
            let messageIsProcessed = this.processRecievedMessage(nextStep, message);
            this.nextStep(nextStep.NextStep, messageIsProcessed);
            return;
        }
    }
    processRecievedMessage(step, message) {
        let isDone = true;
        let messageText = (message.message && message.message.text) ? message.message.text : "";
        let postBackPayload = (message.postback) ? message.postback.payload : "";
        if (step.stepDirection === commonInterfaces_1.StepDirection.In && step.stepType === commonInterfaces_1.StepType.Category) {
            this._idea.category = postBackPayload;
        }
        else if (step.stepDirection === commonInterfaces_1.StepDirection.In && step.stepType === commonInterfaces_1.StepType.TextBody) {
            let isValid = validators_1.Validator.validatetTextLength(messageText, 10);
            if (isValid) {
                this._idea.body = messageText;
            }
            else {
                isDone = false;
            }
        }
        else if (step.stepDirection === commonInterfaces_1.StepDirection.In && step.stepType === commonInterfaces_1.StepType.TextTitle) {
            let isValid = validators_1.Validator.validatetTextLength(messageText, 3);
            if (isValid) {
                this._idea.title = messageText;
            }
            else {
                isDone = false;
            }
        }
        else if (step.stepDirection === commonInterfaces_1.StepDirection.In && step.stepType === commonInterfaces_1.StepType.Tags) {
            this._idea.tags = postBackPayload;
        }
        else if (step.stepDirection === commonInterfaces_1.StepDirection.In && step.stepType === commonInterfaces_1.StepType.Email) {
            let isValid = validators_1.Validator.validateEmail(messageText);
            if (isValid) {
                this._idea.email = messageText;
            }
            else {
                isDone = false;
            }
        }
        return isDone;
    }
    sendMessage(message) {
        let isSent = false;
        try {
            this._ws.send(message);
        }
        catch (_a) {
            isSent = false;
        }
        return isSent;
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=conversation.js.map