## docker说明

- 编译Dockerfile文件：
    
    执行命令: docker build --security-opt seccomp:unconfined -t apache/php8.1:v1.0 .
 
    注：linux下build不使用参数--security-opt seccomp:unconfined会出现NO_PUBKEY错误,导致build失败，windows下使用不支持该参数，报"Error response from daemon: The daemon on this platform does not support setting security options on build"

- 因没有linux环境，手动完成Dockerfile内容，构建images放在baidu网盘链接: [https://pan.baidu.com/s/10FPWDp-AxXaUo5HJ9ON22A](https://pan.baidu.com/s/10FPWDp-AxXaUo5HJ9ON22A)提取码: xzp4  


- 下载后，本地images导入：
 
    docker import ubuntu_apache_php.tar ubuntu_apache_php:v1.0
 
 
- 查images id:

    docker images
- 后台运行:
  
    docker run -i -t -d -p 8082:80 --security-opt seccomp=unconfined [images id] bash

- 使用docker-compose up
    根据docker images修改docker-compose.yaml的image id，执行命令docker-compose up
 
- 确认可以访问：
     http://dockerhost:8082/?from=YZR&to=YSO


- 