export interface IPayload {
    message: string;
    quickReplies?: any[];

}

export interface IIdea {
    category: string;
    title: string;
    body: string;
    email: string;
    tags: string;
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
	Carousel = 'carousel',
	End = 'end'
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


export enum WSMessageEvent {
    UserNotFound = 'user_not_found',
    UserFound = 'user_found',
    UserCreated = 'user_created',
    PUIDInvalid = 'puid_invalid',
    PageIDNotFound = 'pageid_not_found',
    PageIDMissing = 'pageid_missing',
    VerfiyTokenMissing = 'verifytoken_missing',
    ConnectionRejected = 'connection_rejected',
    NewMessage = 'new_message'
}

// plugin messages
export interface IMessage {
	mid: string;
	seq: number;
}

export enum AttachmentType {
	Image = "image",
	Video = "video",
	Audio = "audio",
	Location = "location",
	File = "file"
}

export interface IMultimediaPayload {
	url: string;
}

export interface ILocationPayload {
	coordinates: {
		lat: number;
		long: number;
	}
}

export interface IAttachment {
	type: AttachmentType;
	payload: IMultimediaPayload | ILocationPayload
}

export interface ITextMessage extends IMessage {
	text?: string;
	attachments?: IAttachment[];
	quick_reply?: IQuickreply;
}

export interface IQuickreply {
	payload: string;
}

export interface IPostback {
	payload: string;
}

export interface IMessageReadEvent {
	watermark: number;
	seq: number;
}

export interface IMessageDeliveryEvent {
	mids: string[];
	watermark: number;
	seq: number;
}

export interface IMessageReferral {
	ref: string;
	referer_uri?: string;
}

export interface IMessagingObject {
	sender: {
		id: string;
	};
	recipient: {
		id: string;
	};
	timestamp: number;
	message?: ITextMessage;
	postback?: IPostback;
	read?: IMessageReadEvent;
	delivery?: IMessageDeliveryEvent;
	referral?: IMessageReferral;
}

export enum HTTPStatusCodes {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	TEMPORARY_REDIRECT = 307,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	REQUEST_ENTITY_TOO_LARGE = 413,
	REQUEST_URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	REQUESTED_RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	UNPROCESSABLE_ENTITY = 422,
	TOO_MANY_REQUESTS = 429,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
}
