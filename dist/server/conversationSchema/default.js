"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StepDirection;
(function (StepDirection) {
    StepDirection["In"] = "in";
    StepDirection["Out"] = "out";
})(StepDirection = exports.StepDirection || (exports.StepDirection = {}));
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
    StepType["Carousel"] = "carousel";
})(StepType = exports.StepType || (exports.StepType = {}));
const defaultConversationSchema = { steps: [
        { stepID: 1, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Hallo!" } },
        { stepID: 2, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "This is CivitasDigitalis Bot, I am here to collect your precious ideas" } },
        { stepID: 3, stepDirection: StepDirection.Out, stepType: StepType.Category, payload: { message: "Before you write your idea please select one on the following categories" } },
        { stepID: 4, stepDirection: StepDirection.In, stepType: StepType.Category },
        { stepID: 5, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "So what's in your mind? " } },
        { stepID: 6, stepDirection: StepDirection.In, stepType: StepType.TextBody },
        { stepID: 7, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Thanks, could you please select a title for your idea" } },
        { stepID: 8, stepDirection: StepDirection.In, stepType: StepType.TextTitle },
        { stepID: 9, stepDirection: StepDirection.Out, stepType: StepType.Tags, payload: { message: "please select the one or more of the flollowing tags" } },
        { stepID: 10, stepDirection: StepDirection.In, stepType: StepType.Tags },
        { stepID: 12, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "You can insert your email asddress" } },
        { stepID: 13, stepDirection: StepDirection.In, stepType: StepType.Email },
        { stepID: 14, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Your email?" } }
    ] };
exports.defaultConversationSchema = defaultConversationSchema;
const DemoConversationSchema = { steps: [
        { stepID: 0, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Hallo!" } },
        { stepID: 1, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "This is CivitasDigitalis Bot, I am here to collect your precious ideas" } },
        { stepID: 2, stepDirection: StepDirection.Out, stepType: StepType.Category, payload: { message: "Before you write your idea please select one of the following categories" } },
        { stepID: 3, stepDirection: StepDirection.In, stepType: StepType.Category },
        { stepID: 4, stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "just write a keyword ? " } },
        { stepID: 5, stepDirection: StepDirection.In, stepType: StepType.TextBody },
        { stepID: 6, stepDirection: StepDirection.Out, stepType: StepType.Carousel, payload: { message: "Thanks, could you please select a title for your idea" }, NextStep: 5 }
    ] };
exports.DemoConversationSchema = DemoConversationSchema;
//# sourceMappingURL=default.js.map