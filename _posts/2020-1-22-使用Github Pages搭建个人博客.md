---
title: 使用Jekyll在Github上搭建个人博客
tags: [github, jekyll]
---
### 一、Github Pages的使用

**1、注册一个github账户** 

网址 <https://github.com/>



**2、创建一个新的仓库**

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122224735-817208.png)

注意在设置仓库名时，需要设置为 **<u>用户名.github.io</u>**  这样的格式，比如我的用户名为**Yuhn-z**，则设置的仓库名应该为 **Yuhn-z.github.io**



**3、下载并使用git** 

百度  **git安装**，并自行安装使用，这里不多做介绍

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122225014-360945.png)

**4、更新github仓库中的内容**

首先创建一个空的文件夹，用于存放远程仓库

在git bash 中进入该文件夹

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231010-893794.png)

然后执行 `git clone <https://github.com/Yuhn-z/Yuhn-z.github.io>`  当然你需要改成自己的仓库路径

完成后会生成一个仓库文件夹 **Yuhn-z.github.io**



**5、进入仓库文件夹，创建index.html文件**

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122225518-716186.png)

```html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    	<p>hello world！</p>
    </body>
</html>
```



**6、推送到远程仓库**

在仓库文件夹下，右键选择git bash here，然后执行命令：

`git add .` `git commit -m "add index.html"` `git push origin master`

再按提示输入用户名密码即可

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122224728-297175.png)



**7、验证**

此时你的github仓库中已经多了一个文件了，是不是很神奇！

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122224736-445851.png)

我们再通过web浏览器访问   https://yuhn-z.github.io/

**看！！！！**

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231037-744922.png)

我们刚才编写的简单html文件已经可以通过特定的url访问了。

如果你是个前端大佬，你就可以通过这样的方式建立一个属于自己的、炫酷的个人博客或者个人简历。



### 二、使用你的专属域名

**1、首先你需要购买一个域名，我们可以去万网申请，**[**https://wanwang.aliyun.com/**](https://wanwang.aliyun.com/)

ps:国内购买域名后，需要备案后才能使用，比较麻烦，有条件的同学可以去国外的网站申请域名。

**2、购买域名后，进入域名控制台，选择解析域名**

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231045-229007.png)

**3、选择添加记录**

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231056-798390.png)

记录类型选择CNAME

主机记录选择 www

记录值填写 Yuhn-z.github.io

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231059-85280.png)

按确定添加记录后我们访问网址 [www.zyuhn.top](http://www.zyuhn.top) 会显示404，此时还差一个环节



**4、仓库中添加CNAME文件**

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231104-74373.png)

内容填写我们的域名

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231105-492857.png)

然后记得执行：`git add .` , `git commit -m "CNAME"`，`git push`

添加成功后再访问 [www.zyuhn.top](http://www.zyuhn.top) 

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231107-337167.png)

ok，到此就暂时结束了！



### 三、 Jekyll与github page结合，打造完美博客

ok,作为一个小（懒）白（鬼），怎么会亲自动手去写代码呢，当然是利用现有的工具直接生成博客啦，我使用的是Jekyll，当然也推荐hxeo，两者都是博客生成器，各有优缺点。

首先前往 [jekyll 主题官网](https://links.jianshu.com/go?to=http%3A%2F%2Fjekyllthemes.org%2F) (<http://jekyllthemes.org/> ) 选择一个你想要的主题，并下载下来

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122230109-546362.png)

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122230222-8377.png)

记得修改一下_config.yml里面的配置

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122230343-198943.png)



然后在仓库文件夹下，右键选择git bash here，然后执行命令：

`git add . git commit -m "add Jekyll" git push origin master`



成功上传后，访问你自己的域名（没有申请域名的访问 **用户名.github.io**）

以下给出我自己的博客截图：

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122231129-726776.png)

以及github仓库地址：

<https://github.com/Yuhn-z/Yuhn-z.github.io> 

如果觉得不错，记得star哦 

如果想要写博客的话就去 _posts 目录下新建markdown文件，命名格式  **年-月-日-文章标题**，如下：

![img](http://picture.zyuhn.top/myblog/2020-1-22-GithubPages+Jekyll搭建个人博客/20200122230727-700025.png)

再通过git上传github就行

另，推荐几款jekyll主题

[NexT官方地址](http://jekyllthemes.org/themes/jekyll-theme-next/)

[huxpro.github.io](https://github.com/Huxpro/huxpro.github.io)

[码志](https://github.com/mzlogin/mzlogin.github.io)

