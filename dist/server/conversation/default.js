"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonInterfaces_1 = require("./../interfaces/commonInterfaces");
const defaultConversationSchema = { steps: [
        { stepID: 1, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "Hallo!" } },
        { stepID: 2, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "This is CivitasDigitalis Bot, I am here to collect your precious ideas" } },
        { stepID: 3, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Category, payload: { message: "Before you write your idea please select one on the following categories" }, },
        { stepID: 4, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.Category },
        { stepID: 5, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "So what's in your mind? " } },
        { stepID: 6, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.TextBody, payload: { message: "I think you should describe in more details, more than 10 words may help us more" } },
        { stepID: 7, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "Thanks, could you please select a title for your idea" } },
        { stepID: 8, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.TextTitle, payload: { message: "Could you please think about more illustrative title, at least 3 words" } },
        { stepID: 9, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Tags, payload: { message: "please select the one or more of the flollowing tags" } },
        { stepID: 10, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.Tags },
        { stepID: 12, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "You can insert your email asddress" } },
        { stepID: 13, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.Email, payload: { message: "Please insert a valid e-mail address" } },
        { stepID: 14, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "Thanks for your contribution " } },
        { stepID: 15, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "Here are some ideas of other people that might interest you" } },
        { stepID: 16, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Carousel },
        { stepID: 17, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.End }
    ]
    // ,intentSteps:[
    //     {stepID: 1, stepDirection: StepDirection.In,stepType:StepType.Text , payload :{message :"Hallo!"}}
    // ]
};
exports.defaultConversationSchema = defaultConversationSchema;
const DemoConversationSchema = { steps: [
        { stepID: 0, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "Hallo!" } },
        { stepID: 1, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "This is CivitasDigitalis Bot, I am here to collect your precious ideas" } },
        { stepID: 2, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Category, payload: { message: "Before you write your idea please select one of the following categories" } },
        { stepID: 3, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.Category },
        { stepID: 4, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Text, payload: { message: "just write a keyword ? " } },
        { stepID: 5, stepDirection: commonInterfaces_1.StepDirection.In, stepType: commonInterfaces_1.StepType.TextBody },
        { stepID: 6, stepDirection: commonInterfaces_1.StepDirection.Out, stepType: commonInterfaces_1.StepType.Carousel, payload: { message: "Thanks, could you please select a title for your idea" }, NextStep: 5 }
    ] };
exports.DemoConversationSchema = DemoConversationSchema;
//# sourceMappingURL=default.js.map