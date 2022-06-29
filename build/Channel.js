"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
class Channel {
    constructor(channelId, name) {
        this.channelId = channelId;
        this.name = name;
        this.msg = [];
    }
}
exports.Channel = Channel;
