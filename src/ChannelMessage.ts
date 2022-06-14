export class ChannelMessage {
    msgId: number;
    title: string;
    content: string;
    channelId: number;
    createdAt: Date;
    
    constructor(msgId: number, title: string, content: string, channelId: number, createdAt: Date) {
        this.msgId = msgId;
        this.title = title;
        this.content = content;
        this.channelId = channelId;
        this.createdAt = createdAt;
	}
}
