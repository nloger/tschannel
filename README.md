## Typescript代码说明
- 安装、编译、启动graphql服务
  - 下载或clone代码到本地 
  - 执行npm install 安装依赖包
  - 执行npm run test 运行单元测试代码
  - 执行npm run build 编译
  - 进入graphql目录，执行node svr.js 启动graphql服务
  
- 工程目录说明
  - src目录存放multi-channel代码
  - build是npm run build生成的代码  
  - graphql服务的代码，依赖build目录下生成的代码  
  
## Docker说明
  - npm run build编译完成后，修改docker-compose.yaml文件中volumes:项的本地目录位置(例：tschannel项目在C:\Users\tschannel, 配置成/c/Users:/home/node/app)，确保docker可以访问到tschannel项目文件
  - 执行docker-compose up -d 启动 
  - 进入http://dockerhost:5000/graphql

## graphql查询地址及接口说明: 
  
  - 查询地址 http://dockerhost:5000/graphql

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





