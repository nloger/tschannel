const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
} = require('graphql');

MChannel = require("../build/MultiChannel");
ChMsg = require("../build/ChannelMessage");

var mc = new MChannel.MultiChannel();

// create channel
var c1 = mc.Create(1,"Channel1");
var c2 = mc.Create(2,"Channel2");

// add message to channel 1
for(let i=0; i<10; i++){
  let {msgId, title, content, channelId, createdAt} = {
      msgId: i, title: `${i}_title`, content: `${i}_content`, channelId: 1, createdAt: new Date()
  }
  
  mc.WriteTo(new ChMsg.ChannelMessage(msgId, title, content, channelId, createdAt))
}

// add message to channel 2
for(let i=0; i<5; i++){
  let {msgId, title, content, channelId, createdAt} = {
      msgId: i, title: `${i}_title`, content: `${i}_content`, channelId: 2, createdAt: new Date()
  }
  
  mc.WriteTo(new ChMsg.ChannelMessage(msgId, title, content, channelId, createdAt))
}


const ChannelType = new GraphQLObjectType({
  name: 'Channel',    
  fields: {
    channelId:{ type: GraphQLInt },
    name:{ type: GraphQLString },
  }
});

const ChannelMessageType = new GraphQLObjectType({
  name: 'ChannelMessage',    
  fields: {
    msgId:{ type: GraphQLInt },
    title:{ type: GraphQLString },
    content:{ type: GraphQLString },
    channelId:{ type: GraphQLInt },
    createdAt:{ type: GraphQLString },
  }
});


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
      Hello: {
        type: GraphQLString, 
        resolve: () => {
          return "hello graphql ...";
        },

      },
      ChannelList: {
        type: new GraphQLList(ChannelType),
        resolve: () => {
          let arr = [];
          for (let value of mc.channels.values()) {
            let channelId = value.channelId
            let name = value.name
            arr.push({channelId, name})    
          }
          return arr;
        },
      },
      
      ChannelMessageList: {
        type: new GraphQLList(ChannelMessageType),
        
        args: {
          channelId: { type: GraphQLInt },
          start: { type: GraphQLInt },
          limit: { type: GraphQLInt }
        },
        resolve: (_value, args) => {
          
          var msg = mc.ListMsg(args.channelId, args.start);
          if (args.limit > 0) {
            msg = mc.ListMsg(args.channelId, args.start, args.start + args.limit);
          } 

          return msg;
        },
      },
  }
})


const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    
      Create: {
        type: ChannelType,
        
        args: {
          channelId: { type: new GraphQLNonNull(GraphQLInt) },
          name: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_value, args) => {
          return mc.Create(args.channelId, args.name);
        },
      },
      WriteTo: {
        type: ChannelMessageType,
        
        args: {
          msgId: { type: new GraphQLNonNull(GraphQLInt) },
          title: { type: new GraphQLNonNull(GraphQLString) },
          content: { type: new GraphQLNonNull(GraphQLString) },
          channelId: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: (_value, args) => {
          
          let newMsg = new ChMsg.ChannelMessage(args.msgId, args.title, args.content, args.channelId, new Date());
          mc.WriteTo(newMsg);
          return newMsg;
        },
      },
  }
})

// step3 构造 schema
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  description: 'GraphiQL schema for MultiChannel',
});


module.exports = schema;