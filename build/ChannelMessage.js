"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMessage = void 0;
class ChannelMessage {
    constructor(msgId, title, content, channelId, createdAt) {
        this.msgId = msgId;
        this.title = title;
        this.content = content;
        this.channelId = channelId;
        this.createdAt = createdAt;
    }
}
exports.ChannelMessage = ChannelMessage;
