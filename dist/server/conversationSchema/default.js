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
})(StepType = exports.StepType || (exports.StepType = {}));
const defaultConversationSchema = { steps: [
        { stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Hallo!" } },
        { stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "This is CivitasDigitalis Bot, I am here to collect your precious ideas" } },
        { stepDirection: StepDirection.Out, stepType: StepType.Category, payload: { message: "Before you write your idea please select one on the following categories" } },
        { stepDirection: StepDirection.In, stepType: StepType.Category },
        { stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "So what's in your mind? " } },
        { stepDirection: StepDirection.In, stepType: StepType.TextBody },
        { stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Thanks, could you please select a title for your idea" } },
        { stepDirection: StepDirection.In, stepType: StepType.TextTitle },
        { stepDirection: StepDirection.Out, stepType: StepType.Tags, payload: { message: "please select the one or more of the flollowing tags" } },
        { stepDirection: StepDirection.In, stepType: StepType.Tags },
        { stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "You can insert your email asddress" } },
        { stepDirection: StepDirection.In, stepType: StepType.Email },
        { stepDirection: StepDirection.Out, stepType: StepType.Text, payload: { message: "Your email?" } }
    ] };
exports.defaultConversationSchema = defaultConversationSchema;
//# sourceMappingURL=default.js.map