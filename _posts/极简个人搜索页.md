## 极简个人搜索页
### 在线访问
https://explore.yohn-z.cn/my-search/
### 技术栈
使用原生三剑客（html+css+js）开发 , 无需编译部署, 响应式适配
### 目录结构说明
* /css  - css样式
* /icon  - 图标
* /img  - 图片
* /js  - js脚本
* /favicon.svg  - 网站图标、页签图标
* /index.html  主页
### 页面效果
搜索框底部可以放一些个人常用的链接
![20240428202132](http://oss.yohn-z.cn/img/20240428202132.png)

目前支持三种搜索引擎，分别是百度、必应、谷歌，点击切换
![20240428202329](http://oss.yohn-z.cn/img/20240428202329.png)

移动端访问效果
<img src="http://oss.yohn-z.cn/img/20240428202557.png" width="320" />

### 快速部署
1、Fork 本项目到自己的仓库
![20240428203251](http://oss.yohn-z.cn/img/20240428203251.png)
2、更改相关代码
![20240428203416](http://oss.yohn-z.cn/img/20240428203416.png)
3、直接更新仓库代码
git ...
4、使用github page

找到配置项 my-search > Settings > Pages
![20240428203818](http://oss.yohn-z.cn/img/20240428203818.png)
选择仓库分支和目录 主分支 > /（root）
![20240428203931](http://oss.yohn-z.cn/img/20240428203931.png)
点击保存（save）后，等待一会，GitHub 就会构建你的页面并设置访问链接
一般是 `http://<用户名>.github.io/<仓库名>/`

如果你有自己的域名，可以自定义搜索页的访问链接（域名）

![20240428204410](http://oss.yohn-z.cn/img/20240428204410.png)
一般是在项目根目录下创建文件 `CNAME`，并写入你的访问域名或者子域名，如：`explore.yohn-z.cn`

然后在你的域名解析管理处，添加一条记录，类型是 `cname`, 指向 `<用户名>.github.io/<仓库名>`

![20240428204802](http://oss.yohn-z.cn/img/20240428204802.png)

可参考项目：`https://github.com/Yohn-z/Yohn-z.github.io`





