---


## tags: [html]

有时，img标签中的src图片加载失败，原来的图片位置会出现一个碎片图标。

![](http://oss.yohn-z.cn/myblog/%E4%B8%83%E7%89%9B%E4%BA%91%E4%BD%BF%E7%94%A8/20200124022314-879825.png#alt=img)

这样是不是看着很不舒服呢。

那怎么让这个碎片图标变得好看些呢，这是我今天要讨论的问题。

可以借用img标签的**onerror**事件，img标签支持**onerror** 事件，在装载文档或图像的过程中如果发生了错误，就会触发**onerror**事件。可以使用一张**提示错误的图片**代替显示不了的图片。

```html
<img src="images/logo.png" onerror="javascript:this.src='http://oss.yohn-z.cn/myblog/noimg/github/github-nopig.png';">
```

![](http://oss.yohn-z.cn/myblog/onerror%E4%BE%BF%E7%AD%BE/20200124023142-332264.png#alt=img)

当图片images/logo.png不存在时，将触发 **onerror**事件，而 **onerror** 中又为该 img 指定了替代的图片。

但是，这种方法并不推荐使用！

> 当images/logoError.png 也不存在，则会继续触发 onerror事件，导致死循环，故会出现打开网页时提示 **Stack overflow at line: 0** 错误。特别说明：如果图片存在，但网络很不通畅，也可能触发 **onerror事件**。


解决方法（代码）：

```html
<script type="text/javascript"> 
    function imgerrorfun(){ 
        var img=event.srcElement; 
        img.src="替代的图片.png"; 
        img.onerror=null; 
    } 
</script> 
<img src="images/logo.png" onerror="imgerrorfun();" />
```

当然你可以这样

```
<img src="" onerror="this.src='javascript:test.png';this.onerror='null';">
```

也可以直接隐藏

```
<img src="" onerror="this.style.display = 'none';">
```

同时贴出我测试的另外一种解决方案：

```javascript
<script>  
    function imgExists(e){
            //默认图片
            var imgUrl = "http://oss.yohn-z.cn/myblog/assets/images/avatar.jpg";
            var img = new Image();
            img.src=imgUrl;
            //判断图片大小是否大于0 或者 图片高度与宽度都大于0
            if(img.filesize>0||(img.width>0&&img.height>0)){
                e.src = imgUrl;
            }else{
                //默认图片也不存在的时候
            }
      }
</script>
<img src="images/logo.png" onerror="imgExists(this);" />
```

附上参考链接：[w3school中img部分](https://www.w3school.com.cn/tags/tag_img.asp)

最后，感谢阅读！！！如果觉得不错，记得star哦！
