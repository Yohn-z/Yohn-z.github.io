最近在研究一个后端的机器人探测器，用于检测是否为爬虫或是机器人。其中有用到LRU算法，以加快检测效率。

LRU 算法：如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小。也就是说，当限定的空间已存满数据时，应当把最久没有被访问到的数据淘汰。

我们假设系统为某进程分配了3个物理块，进程运行时的页面走向为 7 0 1 2 0 3 0 4，开始时3个物理块均为空，那么**LRU**算法是如下工作的：

![](http://oss.yohn-z.cn/myblog/promise/20200308204908-904152.png#align=left&display=inline&height=435&originHeight=435&originWidth=889&status=done&style=none&width=889)

