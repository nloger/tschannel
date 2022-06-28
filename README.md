## Typescript代码说明
- 安装、编译
  - 下载或clone代码到本地 
  - 执行npm install 安装依赖包
  - 执行npm run test 运行单元测试代码
  - 执行npm run build 编译
  - 进入graphql目录，执行node svr.js 启动graphql服务
  


## graphql查询地址及接口说明: 
  
  - 查询地址 http://localhost:5000/graphql

  - 创建channel，如果channelId存在，直接返回channel信息，否则新创建
	  `mutation {
	    Create(channelId: 3, name: "def") {
	      channelId
	      name
	    }
	  }`
   
  - 查询所有channel列表
  
	`query{
      ChannelList {
        channelId
        name
      }
    }`

  - 根据WriteTo参数中的channelId, 把消息写到对应的channel消息队列中
  
	`mutation {
	    WriteTo(msgId: 13, title: "99_title", content: "content", channelId: 1) {
	      msgId
	      title
	      content
	      channelId
	      createdAt
	    }
	  }`


  - 查询所有channelId队列中的所有消息，可根据start, limit参数达到分页目的，如start: 3, limit: 5 表示返回从第3条消息开始的5条信息
  
  	`query{
	    ChannelMessageList(channelId: 1, start: 0, limit: 0) {
	      msgId
	      title
	      content
	      channelId
	      createdAt
	    }
	  }`





