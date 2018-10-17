
import { defaultConversationSchema, DemoConversationSchema } from './default';
import * as WebSocket from 'ws';
import { ApiHandler, APIList } from '../apiHandler/apiHandler'
import { IConversationSchema, IConversationStep, IIdea, StepDirection, StepType, IPayload, WSMessageEvent, IMessagingObject } from '../interfaces/commonInterfaces'
import { MessageBuilder } from './../messageBuilder/messageBuilder'
import { Validator } from './../utils/validators'


export class Conversation {

    private _conversationSchema: IConversationSchema;
    private _currentStep: number;
    private _ws: WebSocket;
    private _uuid: string;
    private _idea: IIdea;


    constructor(ws: WebSocket, uuid: string) {
        this._conversationSchema = this.loadConversationSchema();
        this._currentStep = 0;
        this._ws = ws;
        this._uuid = uuid;
        this._idea = { category: "", title: "", body: "", email: "", tags: "" };


    }

    public loadConversationSchema(conversationSchema?: IConversationSchema): IConversationSchema {

        return conversationSchema ? conversationSchema : defaultConversationSchema;
    }

    public getConversationStatus(): string {

        if (this._ws.readyState === WebSocket.OPEN) {
            return JSON.stringify({ statusCode: 202, connected: true, type: WSMessageEvent.UserFound, payload: this._uuid });
        } else {
            return JSON.stringify({ statusCode: 400, connected: false, type: WSMessageEvent.ConnectionRejected, payload: "" });
        }

    }
    private nextStep(nextstep: number | undefined, isPrevStepValidationPassed: boolean) {
        //setTimeout(() => {   }, 1500);
        if (isPrevStepValidationPassed) {
            if (nextstep !== undefined && nextstep >= 0) {
                this._currentStep = nextstep;
            } else if(this._currentStep < this._conversationSchema.steps.length) {
                this._currentStep++;
            }
        } else {
            this.messageStepOut(isPrevStepValidationPassed);
        }
        if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.Out) {
            this.messageStepOut(isPrevStepValidationPassed);
        }

    }

    public messageStepOut(isPrevStepValidationPassed: boolean) {
        let nextStep = Object.assign({}, this._conversationSchema.steps[this._currentStep]);
        let message = MessageBuilder.buildMessage(nextStep.payload, nextStep.stepType);
        this.sendMessage(message);
        if (isPrevStepValidationPassed) {
            this.nextStep(nextStep.NextStep, isPrevStepValidationPassed);
        }
    }

    public messageRecieved(message: IMessagingObject) {

        if (message.postback !== undefined && Validator.IsJsonString(message.postback.payload)&&
            JSON.parse(message.postback.payload)['intent'] !== undefined &&
            JSON.parse(message.postback.payload)['intent'] === "start") {
            // console.log(JSON.parse(message.postback.payload)['intent']);
            this.nextStep(0, true);
            return;
        }


  
        let nextStep = Object.assign({}, this._conversationSchema.steps[this._currentStep]);
        if (nextStep.stepDirection === StepDirection.In) {
            let messageIsProcessed = this.processRecievedMessage(nextStep, message);
            this.nextStep(nextStep.NextStep, messageIsProcessed);
            return;
        } 

    }

    public processRecievedMessage(step: IConversationStep, message: IMessagingObject): boolean {
        let isDone = true;
        let messageText: string = (message.message && message.message.text) ? message.message.text : "";
        let postBackPayload = (message.postback) ? message.postback.payload : "";

        if (step.stepDirection === StepDirection.In && step.stepType === StepType.Category) {

            this._idea.category = postBackPayload;
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.TextBody) {
            let isValid = Validator.validatetTextLength(messageText, 10);
            console.log("koko 1");
            if (isValid) {
                this._idea.body = messageText;

            } else {
                isDone = false;
            }

        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.TextTitle) {
            console.log("koko 2");
            let isValid = Validator.validatetTextLength(messageText, 3);
            if (isValid) {
                this._idea.title = messageText;

            } else {
                isDone = false;
            }
        } else if (step.stepDirection === StepDirection.In && step.stepType === StepType.Tags) {
            this._idea.tags = postBackPayload;

        } else if (step.stepDirection === StepDirection.In && step.stepType === StepType.Email) {
            let isValid = Validator.validateEmail(messageText);

            if (isValid) {
                this._idea.email = messageText;

            } else {
                isDone = false;
            }

        }else if (step.stepDirection === StepDirection.In && step.stepType === StepType.End) {

            isDone= true;
        }

        return isDone;
    }

    public sendMessage(message: string): boolean {
        let isSent = false;
        try {
            this._ws.send(message);
        }
        catch{
            isSent = false;
        }

        return isSent;
    }






}


