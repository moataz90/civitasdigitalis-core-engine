
import { defaultConversationSchema, DemoConversationSchema } from './conversationSchema/default';
import * as WebSocket from 'ws';
import { parse } from 'querystring';
import { json } from 'body-parser';
import * as axios from 'axios';

export interface IIdea {
    category: string;
    title: string;
    body: string;
    email: string;
    tags: string;
}


export class Conversation {

    private _conversationSchema: IConversationSchema;
    private _currentStep: number;
    private _ws: WebSocket;
    private _idea: IIdea;

    constructor(ws: WebSocket) {
        this._conversationSchema = this.loadConversationSchema();
        this._currentStep = 0;
        this._ws = ws;
        this._idea = { category: "", title: "", body: "", email: "", tags: "" };

    }
    private nextStep(nextstep? : number) {
        setTimeout(() => {
            if(nextstep){

                this._currentStep = nextstep;
            }else{
                this._currentStep++;
            }
            
            if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.Out) {
                this.messageRecieved("");
            }
        }, 1500);
    }

    public messageRecieved(message: string) {


console.log(message);

        let nextStep = Object.assign({}, this._conversationSchema.steps[this._currentStep]);


        if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.Out && this._conversationSchema.steps[this._currentStep].payload !== undefined) {
            this.sendMessage((this.formatMessage(this._conversationSchema.steps[this._currentStep].payload, this._conversationSchema.steps[this._currentStep].stepType)), this._conversationSchema.steps[this._currentStep].NextStep);

        } if (this._conversationSchema.steps[this._currentStep].stepDirection === StepDirection.In) {
            this.validateRecievedMessage(this._conversationSchema.steps[this._currentStep], message);
        }

    }

    public validateRecievedMessage(step: IConversationStep, message: string) {
        let mess = JSON.parse(message);
        if (step.stepDirection === StepDirection.In && step.stepType === StepType.Category) {
            this._idea.category = mess["postback"]["payload"];
            this.nextStep(step.NextStep);
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.TextBody) {
            this._idea.body = mess["message"]["text"];
            this.nextStep(step.NextStep);
        }
        else if (step.stepDirection === StepDirection.In && step.stepType === StepType.TextTitle) {
            this._idea.title = mess["message"]["text"];
            this.nextStep(step.NextStep);
        } else if (step.stepDirection === StepDirection.In && step.stepType === StepType.Tags) {
            this._idea.tags = mess["postback"]["payload"];
            this.nextStep(step.NextStep);
        } else if (step.stepDirection === StepDirection.In && step.stepType === StepType.Email) {
            this._idea.email = mess["message"]["text"];
            this.nextStep(step.NextStep);
        }

    }


    public sendMessage(message: string, nextStep?: number) {
        this._ws.send(message);
        console.log(nextStep + "asdsd");
        this.nextStep(nextStep);
    }

    public loadConversationSchema(): IConversationSchema {

        return DemoConversationSchema;
    }


    // get example 
    public getdata() {
        axios.default.get('http://civitasdigitalis.fortiss.org/classification/lemma/all')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    /**
     * formatMessage
     */
    public formatMessage(payload: IPayload | undefined, messageType?: StepType): string {
        console.log("Formatting message %s  %s", payload, messageType);

        let textMessage = payload ? payload.message : "";
        let basicMessage = {
            "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": {
                "messaging_type": "RESPONSE", "recipient": { "id": "123" },
                "message": { "text": textMessage }, "timestamp": 1535415055810
            }
        }


        let categoryMessage = {
            "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": {
                "messaging_type": "RESPONSE",
                "recipient": { "id": "123" },
                "message": {
                    "text": textMessage,
                    "quick_replies": [{ "content_type": "text", "title": "Category1", "payload": "Category1" },
                    { "content_type": "text", "title": "Category2", "payload": "Category2" },
                    { "content_type": "text", "title": "Category3", "payload": "Category3" }
                    ]
                }, "timestamp": 1535549101966
            }
        };
        let tagsMessage = {
            "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": {
                "messaging_type": "RESPONSE",
                "recipient": { "id": "123" },
                "message": {
                    "text": textMessage,
                    "quick_replies": [{ "content_type": "text", "title": "Tag1", "payload": "Tag1" },
                    { "content_type": "text", "title": "Tag2", "payload": "Tag2" },
                    { "content_type": "text", "title": "Tag3", "payload": "Tag3" }
                    ]
                }, "timestamp": 1535549101966
            }
        };

        let carouselMessage = {
            "statusCode": 200,
            "connected": true,
            "type": "new_message",
            "payload": {
                "messaging_type": "RESPONSE",
                "recipient": {
                    "id": "dcda1983-9355-4446-878a-6bc522386386"
                },
                "message": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [
                                {
                                    "image_url": "",
                                    "title": "Kundenservice",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "title": "to website",
                                            "url": "https://www.google.com/",
                                            "type": "web_url"
                                        },
                                        {
                                            "title": "to map",
                                            "url": "https://www.google.com/maps",
                                            "type": "web_url"
                                        }
                                    ]
                                },
                                {
                                    "image_url": "",
                                    "title": "Kontakt",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "title": "to website",
                                            "url": "https://www.google.com/",
                                            "type": "web_url"
                                        },
                                        {
                                            "title": "to map",
                                            "url": "https://www.google.com/maps",
                                            "type": "web_url"
                                        }
                                    ]
                                },
                                {
                                    "image_url": "",
                                    "title": "Online Kundenportal",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "title": "to website",
                                            "url": "https://www.google.com/",
                                            "type": "web_url"
                                        },
                                        {
                                            "title": "to map",
                                            "url": "https://www.google.com/maps",
                                            "type": "web_url"
                                        }
                                    ]
                                },
                                {
                                    "image_url": "",
                                    "title": "Tarife",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "title": "to website",
                                            "url": "https://www.google.com/",
                                            "type": "web_url"
                                        },
                                        {
                                            "title": "to map",
                                            "url": "https://www.google.com/maps",
                                            "type": "web_url"
                                        }
                                    ]
                                },
                                {
                                    "image_url": "",
                                    "title": "Elektromobilität",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "title": "to website",
                                            "url": "https://www.google.com/",
                                            "type": "web_url"
                                        },
                                        {
                                            "title": "to map",
                                            "url": "https://www.google.com/maps",
                                            "type": "web_url"
                                        }
                                    ]
                                },
                                {
                                    "image_url": "",
                                    "title": "Contracting",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "title": "to website",
                                            "url": "https://www.google.com/",
                                            "type": "web_url"
                                        },
                                        {
                                            "title": "to map",
                                            "url": "https://www.google.com/maps",
                                            "type": "web_url"
                                        }
                                    ]
                                }
                            ],
                            "sharable": false
                        }
                    }
                },
                "timestamp": 1537848019566
            }
        };

        if (messageType === StepType.Carousel) {

            return JSON.stringify(carouselMessage);
        }
        else if (messageType === StepType.Category) {

            return JSON.stringify(categoryMessage);
        } else if (messageType === StepType.Tags) {

            return JSON.stringify(tagsMessage);
        }
        else {
            return JSON.stringify(basicMessage);
        }


    }

}



export enum StepType {
    Text = 'text',
    TextBody = 'textBody',
    TextTitle = 'textBody',
    Tags = 'tags',
    Category = 'Category',
    Map = 'map',
    Webview = 'webview',
    Email = 'email',
    Carousel = 'carousel'
}

export enum StepDirection {
    In = 'in',
    Out = 'out'
}

enum payloadType {
}

export interface IConversationStep {
    stepID: number,
    stepDirection: StepDirection,
    stepType: StepType,
    payload?: IPayload,
    analyse?: boolean,
    api?: string,
    NextStep?: number

}


export interface IPayload {
    message: string;
    quickReplies?: any[];

}
export interface IConversationSchema {
    steps: IConversationStep[]
}