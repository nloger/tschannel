import {Channel} from "./Channel"
import {ChannelMessage} from "./ChannelMessage"

export enum enumSortBy {
	title = "title",
	content = "content"
}

export class MultiChannel {
    channels: Map<number, Channel>;

    constructor() {
        this.channels = new Map();
	}

    // create channel
    Create(channelId: number, name: string) {
        if (!this.channels.has(channelId)){
            let channel = new Channel(channelId, name);
            this.channels.set(channelId, channel);
        }
        
        return this.channels.get(channelId);
    }

    // delete by channelId
    Delete(channelId: number){
        if (!this.channels.has(channelId)){
            throw Error("Delete: channelId does not exist");
        }
        this.channels.delete(channelId);
    }

    // Write to Channel
    WriteTo(objMsg: ChannelMessage) {
        
        let channelId = objMsg.channelId;
        if (!this.channels.has(channelId)){
            throw Error("WriteTo: channelId does not exist");
        }

        this.channels.get(channelId)?.msg.push(objMsg);
    }

    // list message
    ListMsg(channelId: number,  start? : number , end?: number, keyToSortBy = enumSortBy.title) {
        if (!this.channels.has(channelId)){
            throw Error("ListMsg: channelId does not exist");
        }

        let msglist = this.channels.get(channelId)?.msg;
        if (keyToSortBy == enumSortBy.title){
            msglist?.sort((a, b) => a.title < b.title ? 1 : -1 );
        } else if(keyToSortBy == enumSortBy.content){
            msglist?.sort((a, b) => a.content < b.content ? 1 : -1 );
        }

        return msglist?.slice(start, end);
    }
}