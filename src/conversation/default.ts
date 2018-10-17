
import {StepDirection, StepType, IConversationSchema} from './../interfaces/commonInterfaces'




const defaultConversationSchema: IConversationSchema= {steps:[
    
    {stepID: 1, stepDirection: StepDirection.Out,stepType:StepType.Text , payload :{message :"Hallo!"}},

    {stepID: 2, stepDirection: StepDirection.Out,stepType:StepType.Text , payload :{message :"This is CivitasDigitalis Bot, I am here to collect your precious ideas"}},
    {stepID: 3, stepDirection: StepDirection.Out,stepType:StepType.Category , payload :{message:"Before you write your idea please select one on the following categories"}, },
    {stepID: 4, stepDirection: StepDirection.In,stepType:StepType.Category},
    {stepID: 5, stepDirection: StepDirection.Out,stepType:StepType.Text, payload :{message :"So what's in your mind? " }},
    {stepID: 6, stepDirection: StepDirection.In,stepType:StepType.TextBody , payload :{message :"I think you should describe in more details, more than 10 words may help us more" }},
    {stepID: 7, stepDirection: StepDirection.Out,stepType:StepType.Text, payload :{message :"Thanks, could you please select a title for your idea" }},
    {stepID: 8, stepDirection: StepDirection.In,stepType:StepType.TextTitle  , payload :{message :"Could you please think about more illustrative title, at least 3 words" }},
    {stepID: 9, stepDirection: StepDirection.Out,stepType:StepType.Tags, payload:{message :"please select the one or more of the flollowing tags"}},
    {stepID: 10, stepDirection: StepDirection.In,stepType:StepType.Tags},
    {stepID: 12, stepDirection: StepDirection.Out,stepType:StepType.Text, payload:{message :"You can insert your email asddress"}},
    {stepID: 13, stepDirection: StepDirection.In,stepType:StepType.Email  , payload :{message :"Please insert a valid e-mail address" }},
    {stepID: 14, stepDirection: StepDirection.Out,stepType:StepType.Text, payload:{message :"Thanks for your contribution, Here are some ideas of other people that might interest you "}},
    {stepID: 16, stepDirection: StepDirection.Out,stepType:StepType.Carousel},
    {stepID: 17, stepDirection: StepDirection.In,stepType:StepType.End, NextStep : 13}
    
]
// ,intentSteps:[
//     {stepID: 1, stepDirection: StepDirection.In,stepType:StepType.Text , payload :{message :"Hallo!"}}
// ]
};


const DemoConversationSchema: IConversationSchema= {steps:[
    
    {stepID: 0, stepDirection: StepDirection.Out,stepType:StepType.Text , payload :{message :"Hallo!"}},
    {stepID: 1, stepDirection: StepDirection.Out,stepType:StepType.Text , payload :{message :"This is CivitasDigitalis Bot, I am here to collect your precious ideas"}},
    {stepID: 2, stepDirection: StepDirection.Out,stepType:StepType.Category , payload :{message:"Before you write your idea please select one of the following categories"}},
    {stepID: 3, stepDirection: StepDirection.In,stepType:StepType.Category},
    {stepID: 4, stepDirection: StepDirection.Out,stepType:StepType.Text, payload :{message :"just write a keyword ? " }},
    {stepID: 5, stepDirection: StepDirection.In,stepType:StepType.TextBody },
    {stepID: 6, stepDirection: StepDirection.Out,stepType:StepType.Carousel, payload :{message :"Thanks, could you please select a title for your idea" } , NextStep: 5}
    
    
]};




export {defaultConversationSchema , DemoConversationSchema} ;