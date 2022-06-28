
import {MultiChannel} from "../src/MultiChannel"
import {ChannelMessage} from "../src/ChannelMessage"

describe("MultiChannel unit test", () => {

    let mc = new MultiChannel();
    test("test Create", () =>{
        // check channels
        expect(mc.channels.size).toBe(0);
        
        // create channel 1
        let c1 = mc.Create(1,"channel1");
        expect(mc.channels.size).toBe(1);
        expect(mc.channels.get(1)?.channelId).toBe(1);
        expect(mc.channels.get(1)?.name).toBe("channel1");
    
        // create channel 2
        let c2 = mc.Create(2,"channel2");
        expect(mc.channels.size).toBe(2);
        expect(c2?.channelId).toBe(2);
        expect(c2?.name).toBe("channel2");
    });


    test("test WriteTo", () =>{
        // add message to channel 1
        for(let i=0; i<10; i++){
            let {msgId, title, content, channelId, createdAt} = {
                msgId: i, title: `${i}_title`, content: `${i}_content`, channelId: 1, createdAt: new Date()
            }
            
            mc.WriteTo(new ChannelMessage(msgId, title, content, channelId, createdAt))
        }

        // add message to channel 2
        for(let i=0; i<5; i++){
            let {msgId, title, content, channelId, createdAt} = {
                msgId: i, title: `${i}_title`, content: `${i}_content`, channelId: 2, createdAt: new Date()
            }
            
            mc.WriteTo(new ChannelMessage(msgId, title, content, channelId, createdAt))
        }
        
        expect(mc.channels.get(1)?.msg.length).toBe(10);
        expect(mc.channels.get(2)?.msg.length).toBe(5);
    })

    test("test list message", () =>{

        // channel 1 message size = 10
        let mlst = mc.ListMsg(1);
        expect(mlst?.length).toBe(10);

        // get the first msg
        mlst = mc.ListMsg(1, 0, 1)
        expect(mlst?.length).toBe(1);
        
        // let msg = mlst?[0];     // ??
        let msg = mlst?.slice(0,1).pop();

        // order by descending, the first msgId = 9
        expect(msg?.msgId).toBe(9);
        expect(msg?.title).toBe("9_title");

        // get last message
        mlst = mc.ListMsg(1);
        msg = mlst?.slice(-1).pop();
        expect(msg?.msgId).toBe(0);
        expect(msg?.title).toBe("0_title");
        //expect(mlst?.length).toBe(1);
    })
    

    test("test except", () =>{
        expect(()=>{
            mc.WriteTo(new ChannelMessage(1, "", "", 5, new Date()))
        }).toThrowError(/channelId does not exist/);

        
        expect(()=>{
            mc.WriteTo(new ChannelMessage(1, "", "", 1, new Date()))
        }).toThrowError(/msgId duplicate/);
        
        expect(()=>{
            mc.ListMsg(5)
        }).toThrowError(/channelId does not exist/);
        
        expect(()=>{
            mc.Delete(5)
        }).toThrowError(/channelId does not exist/);
    });

    expect(1+2).toBe(3);  
});