"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiChannel = exports.enumSortBy = void 0;
const Channel_1 = require("./Channel");
var enumSortBy;
(function (enumSortBy) {
    enumSortBy["title"] = "title";
    enumSortBy["content"] = "content";
})(enumSortBy = exports.enumSortBy || (exports.enumSortBy = {}));
class MultiChannel {
    constructor() {
        this.channels = new Map();
    }
    // create channel
    Create(channelId, name) {
        if (!this.channels.has(channelId)) {
            let channel = new Channel_1.Channel(channelId, name);
            this.channels.set(channelId, channel);
        }
        return this.channels.get(channelId);
    }
    // delete by channelId
    Delete(channelId) {
        if (!this.channels.has(channelId)) {
            throw Error("Delete: channelId does not exist");
        }
        this.channels.delete(channelId);
    }
    // Write to Channel
    WriteTo(objMsg) {
        var _a, _b;
        let channelId = objMsg.channelId;
        if (!this.channels.has(channelId)) {
            throw Error("WriteTo: channelId does not exist");
        }
        let msgId = objMsg.msgId;
        let bIsHasMsgId = (_a = this.channels.get(channelId)) === null || _a === void 0 ? void 0 : _a.msg.some((value, index, array) => { return value.msgId == msgId; });
        if (bIsHasMsgId) {
            throw Error("WriteTo: msgId duplicate");
        }
        (_b = this.channels.get(channelId)) === null || _b === void 0 ? void 0 : _b.msg.push(objMsg);
    }
    // list message
    ListMsg(channelId, start, end, keyToSortBy = enumSortBy.title) {
        var _a;
        if (!this.channels.has(channelId)) {
            throw Error("ListMsg: channelId does not exist");
        }
        let msglist = (_a = this.channels.get(channelId)) === null || _a === void 0 ? void 0 : _a.msg;
        if (keyToSortBy == enumSortBy.title) {
            msglist === null || msglist === void 0 ? void 0 : msglist.sort((a, b) => a.title < b.title ? 1 : -1);
        }
        else if (keyToSortBy == enumSortBy.content) {
            msglist === null || msglist === void 0 ? void 0 : msglist.sort((a, b) => a.content < b.content ? 1 : -1);
        }
        return msglist === null || msglist === void 0 ? void 0 : msglist.slice(start, end);
    }
}
exports.MultiChannel = MultiChannel;
