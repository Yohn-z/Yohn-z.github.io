之前有接触过flex布局的内容，并也做过一些小demo，但对这种布局的本质仍然不是特别理解。

于是今天便对flex布局做一个整理。

来源文章：[菜鸟教程-flex布局](https://www.runoob.com/w3cnote/flex-grammar.html)

网页布局是css的一个重点。我们传统的布局解决方案，主要是基于盒模型。

2009年，W3C提出了一种新的方案—-Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

## 一、Flex布局是什么？

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

```
.box{
  display: flex;
}

.inlinebox{
  display: inline-flex;
}
```

## 二、基本概念

采用flex布局的元素，称之为Flex容器。随之，它的左右的子元素都成为了它的成员。

![](http://oss.yohn-z.cn/myblog/promise/20200228205707-431588.png#alt=1582894626562)

容器默认存在两根轴：水平的主轴和垂直的交叉轴。主轴的开始位置叫做main start ,结束位置叫做main end; 交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 三、容器的属性

flex-direction: 属性决定主轴的方向（即项目的排列方向）。

flex-wrap: 决定了换行方式。

flex-flow：属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

justify-content：属性定义了项目在主轴上的对齐方式。

justify-content：属性定义了项目在主轴上的对齐方式。

align-items：属性定义项目在交叉轴上如何对齐。

## 四、项目的属性

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

## 五、结束语

好吧，看了这么多，其实不太记得住，属性太多喽，以后用到了过来看！
