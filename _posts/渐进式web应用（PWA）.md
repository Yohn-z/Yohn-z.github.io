有幸能够看到前端如此之快的发展，其中一项让我赞叹的便是渐进式WEB应用（PWA）。

本文参考：

[渐进式web应用|MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)

[讲讲PWA](https://segmentfault.com/a/1190000012353473)

我们都知道原生APP开发的Native app体验非常好。但它也有一些缺点:

- 开发成本高(ios和安卓)
- 软件上线需要审核
- 版本更新需要将新版本上传到不同的应用商店
- 想使用一个app就必须去下载才能使用，即使是偶尔需要使用一下下

而web网页开发成本低，网站更新时上传最新的资源到服务器即可，用手机带的浏览器打开就可以使用。但是除了体验上比Native app还是差一些，还有一些明显的缺点

- 手机桌面入口不够便捷，想要进入一个页面必须要记住它的url或者加入书签
- 没网络就没响应，不具备离线能力
- 不像APP一样能进行消息推送

## 什么是PWA

PWA全称Progressive Web App，即渐进式WEB应用。

一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能

解决了哪些问题？

- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
- 实现了消息推送

它解决了上述提到的问题，这些特性将使得 Web 应用渐进式接近**原生 App**。

## PWA实现

首先在你的首页（index.html）中添加manifest

```
<link rel="manifest" href="manifest.json">
```

manifest.json是一个json格式的文件。

```
{
    "name": "Melody",
    "short_name": "Melody Index",
    "description": "The app that helps you use melody",
    "display": "standalone",
    "start_url": "/",
    "theme_color": "#313131",
    "background_color": "#313131",
    "icons": [
        {
            "src": "logo/512.png",
            "type": "image/png",
            "sizes": "512x512"
        },
        {
            "src": "logo/256.png",
            "type": "image/png",
            "sizes": "256x256"
        },
        {
            "src": "logo/192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "logo/144.png",
            "type": "image/png",
            "sizes": "144x144"
        },
        {
            "src": "logo/128.png",
            "type": "image/png",
            "sizes": "128x128"
        }
    ]
  }
```

> Manifest参考文档：

> [https://developer.mozilla.org/zh-CN/docs/Web/Manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

> 可以打开网站[https://developers.google.cn/web/showcase/2015/chrome-dev-summit](https://developers.google.cn/web/showcase/2015/chrome-dev-summit)查看添加至主屏幕的动图。

> 如果用的是安卓手机，可以下载chrome浏览器自己操作看看


## service worker实现离线缓存

Service Worker 是 Chrome 团队提出和力推的一个 WEB API，用于给 web 应用提供高级的可持续的后台处理能力。

Service Workers 就像介于服务器和网页之间的拦截器，能够拦截进出的HTTP 请求，从而完全控制你的网站。

**最主要的特点**

- 在页面中注册并安装成功后，运行于浏览器后台，不受页面刷新的影响，可以监听和截拦作用域范围内所有页面的 HTTP 请求。
- 网站必须使用 HTTPS。除了使用本地开发环境调试时(如域名使用 localhost)
- 运行于浏览器后台，可以控制打开的作用域范围下所有的页面请求
- 单独的作用域范围，单独的运行环境和执行线程
- 不能操作页面 DOM。但可以通过事件机制来处理
- 事件驱动型服务线程

> 为什么要求网站必须是HTTPS的，大概是因为service worker权限太大能拦截所有页面的请求吧，如果http的网站安装service worker很容易被攻击


----------------------------------------------------持续更新--------------------------------------------------------
