### 一、安装MySql

原来的mysql5.5出故障了，所以决定换一个mysql版本的软件

![](http://oss.yohn-z.cn/myblog/PS/20200204111141-133623.png#alt=img)

需要先去官网下载[点击的MySQL的下载](https://dev.mysql.com/downloads/mysql/)

msi安装过程一路next就好,安装完成后解压包会默认出现在以下文件夹

![](http://oss.yohn-z.cn/myblog/mysql/20200204111442-294609.png#alt=img)

![](http://oss.yohn-z.cn/myblog/mysql/20200204111733-52416.png#alt=img)

其中my.ini是我后面加上去的，原本是没有的，需要自己写一个保存为my.ini

```
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=C:\\Program Files\\MySQL\\MySQL Server 8.0
# 设置mysql数据库的数据的存放目录
datadir=C:\\Program Files\MySQL\\MySQL Server 8.0\Data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。
max_connect_errors=10
# 服务端使用的字符集默认为utf8mb4
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
#mysql_native_password
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4
```

如果需要管理员权限请前往属性->安全处设置当前电脑用户读写权限

然后以**管理员身份**打开cmd.exe

进入mysql安装目录，初始化mysql

使用命令：

```
mysqld --initialize --console
```

![](http://oss.yohn-z.cn/myblog/mysql/20200204112120-18937.png#alt=img)

其中有个地方需要提前记住

![](http://oss.yohn-z.cn/myblog/mysql/20200204112204-255606.png#alt=img)

root @ localhost的临时密码：z+!9.u*cyPk2

之后安装mysql服务以及启动服务

执行：

```
mysqld --install [服务名]（服务名可以不加默认为mysql）
```

![](http://oss.yohn-z.cn/myblog/mysql/20200204112430-749445.png#alt=img)

**`net start mysql`启动MySQL的服务**

![](http://oss.yohn-z.cn/myblog/mysql/20200204112523-252464.png#alt=img)

### 二、连接MySQL + 修改密码

安装navicat,过程略。。。

新建连接

![](http://oss.yohn-z.cn/myblog/mysql/20200204112843-778850.png#alt=img)

连接名随便写，密码填写刚刚记下的**z+!9.u_cyPk2_

连接测试一下，出现了问题。。。

![](http://oss.yohn-z.cn/myblog/mysql/20200204113047-482578.png#alt=img)

不要。。。。

我们先去改个密码

在mysql的bin目录下输入`mysql -u root -p`

![](http://oss.yohn-z.cn/myblog/mysql/20200204113313-875082.png#alt=img)

然后，输入

```html
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```

![](http://oss.yohn-z.cn/myblog/mysql/20200204113500-921527.png#alt=img)

![](http://oss.yohn-z.cn/myblog/mysql/20200204113516-487332.png#alt=img)

再去测试下连接

![](http://oss.yohn-z.cn/myblog/mysql/20200204113546-666087.png#alt=img)

高兴！

PS:参考博文：MySQL 8.0.18安装教程(windows 64位) [点击链接](https://blog.csdn.net/qq_37350706/article/details/81707862)
