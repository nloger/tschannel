import {ChannelMessage} from "./ChannelMessage"

export class Channel {
    channelId: number;
    name: string;
    msg: ChannelMessage[];
    constructor(channelId: number, name: string) {
        this.channelId = channelId;
        this.name = name;
        this.msg = [];
	}
}