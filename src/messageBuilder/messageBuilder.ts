import { IPayload, StepType, } from './../interfaces/commonInterfaces'


export class MessageBuilder {

        /**
     * formatMessage
     */
    public  static buildMessage(payload: IPayload | undefined, messageType?: StepType): string {

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
                                    "title": "Add another idea",
                                    "subtitle": "Online-Status",
                                    "buttons": [
                                        {
                                            "type":"postback",
                                            "title":"Start",
                                            "payload":"{\"intent\":\"start\"}"
                                        },
                                        {
                                            "title": "Review your idea",
                                            "url": "http://localhost:8080/index2.html?ideaTitle=newIdea",
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