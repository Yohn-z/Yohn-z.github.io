### 一、什么是前端异步？什么是promise

首先JavaScript的执行环境是「单线程」

所谓单线程，是指JS引擎中负责解释和执行JavaScript代码的线程只有一个，也就是一次只能完成一项任务，这个任务执行完后才能执行下一个，它会「阻塞」其他任务。这个任务可称为主线程。

```
var a = 1;
console.log("aaaa");
while(a>0){

}
console.log("bbbb");
```

上面的这段代码中我们知道`console.log("bbbb");`永远也不会执行

而异步模式可以一起执行**_*多个任务*_**

其中 JS中常见的异步调用有：

- 定时任务-setTimeout

- ajax

- 事件函数-使用嵌套的回调函数

以上情况不细讲，我们主要说说promise。

那么，promise是什么？

> promise的意思是承诺，有的人翻译为许愿，但它们代表的都是未实现的东西，等待我们接下来去实现。

> Promise最早出现在commnjs，随后形成了Promise/A规范。在Promise这个技术中它本身代表以目前还不能使用的对象，但可以在将来的某个时间点被调用。使用Promise我们可以用同步的方式写异步代码。其实Promise在实际的应用中往往起到代理的作用。**例如，我们像我们发出请求调用服务器数据，由于网络延时原因，我们此时无法调用到数据，我们可以接着执行其它任务，等到将来某个时间节点服务器响应数据到达客户端，我们即可使用promise自带的一个回调函数来处理数据。**


JavaScript实现异步执行，在Promise未出现前，我们通常是使用嵌套的回调函数来解决的。但是使用回调函数来解决异步问题，简单还好说，但是如果问题比较复杂，我们将会面临多层嵌套的问题，代码的可读性将非常的差。

### 二、promise的小优点

假设我们现在要解决一个问题：使用ajax先向请求1获得一个值，根据请求1获得的值我盟们要发起请求2，然后再根据请求2的值发起请求3。

无疑这样三个前后有依赖关系的异步请求必须使用嵌套调用，否则在异步的情况下，三个请求都会发生，且没有先后的执行顺序

```
    $.ajax({
      url: 'http://localhost:3000/data',
      success: function(data) {
        console.log('第一次请求成功, 这是返回的数据:',data)
        $.ajax({
          url: 'http://localhost:3000/data1',
          success: function(data) {
            console.log('第二次请求成功, 这是返回的数据:',data)
            $.ajax({
              url: 'http://localhost:3000/data2',
              success: function(data) {
                console.log('第一次请求成功, 这是返回的数据:',data)
              }
            });
          }
        });
      }
    });
```

以上出现了多层回调嵌套，有种晕头转向的感觉。这也就是我们常说的厄运回调金字塔（Pyramid of Doom），编程体验十分不好。而使用`Promise`，我们就可以利用`then`进行「链式回调」，将异步操作以同步操作的流程表示出来。当然这你可能还看不出区别，我们继续往下看。

先定义一个基于promise的ajax请求

```
    /*
      基于Promise发送Ajax请求
    */
    function queryData(url) {
      var p = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState != 4) return;
          if(xhr.readyState == 4 && xhr.status == 200) {
            // 处理正常的情况
            resolve(xhr.responseText);
          }else{
            // 处理异常情况
            reject('服务器错误');
          }
        };
        xhr.open('get', url);
        xhr.send(null);
      });
      return p;
    }
```

然后嵌套使用。

```

    // 发送多个ajax请求并且保证顺序
    queryData('http://localhost:3000/data')
      .then(function(data){
        console.log('第一次请求成功, 这是返回的数据:',data)
        return queryData('http://localhost:3000/data1');
      })
      .then(function(data){
        console.log('第二次请求成功, 这是返回的数据:',data);
        return queryData('http://localhost:3000/data2');
      })
      .then(function(data){
        console.log('第三次请求成功, 这是返回的数据:',data)
      });
```

是不是感觉这样的方式比多层嵌套清晰很多。

### 三、promise基本用法

`Promise`对象代表一个未完成、但预计将来会完成的操作。

它有以下三种状态：

- `pending`：初始值，不是fulfilled，也不是rejected
- `fulfilled`：代表操作成功
- `rejected`：代表操作失败

先看一个例子：

```
var p = new Promise((resolve, reject) => {
    //实现一个异步
    setTimeout(() => {
        var flag = false;
        if(flag) {
            // 正常情况
            resolve('hello');
        }else {
            // 异常情况
            reject('出错了');
        }

    },100);
});

p.then((data) => {
    console.log(data);
},(err) => {
    console.log(err);
})
```

最终的打印结构为“出错了”

这类似构建对象，我们使用`new`来构建一个`Promise`。`Promise`接受一个「函数」作为参数，该函数的两个参数分别是`resolve`和`reject`。这两个函数就是就是「回调函数」，由JavaScript引擎提供。

`resolve`函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

`reject`函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用`then`方法指定`resolved`状态和`reject`状态的回调函数。

```
p.then((data) => {
    console.log(data);
},(err) => {
    console.log(err);
})
```

`then`方法会返回一个Promise。它有两个参数，分别为Promise从`pending`变为`fulfilled`和`rejected`时的回调函数（第二个参数非必选）。这两个函数都**接受Promise对象传出的值作为参数**。

简单来说，`then`就是定义`resolve`和`reject`函数的。

### 四、promise常用API

#### 3.1  .then() .catch()  .finally()

```
    function foo() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("error",100)
            })
        })
    }
    foo().then((data) => {
        console.log(data)
    }).catch((data) => {
        console.log(data)
    }).finally(() => {
        console.log('finished')
    });
    
    -------打印结果--------------------------
    error
    finished
```

简单来说就是then接受成功的信息，catch接受失败的信息，而finally无论如何都会执行。

#### 3.2 .all() .race()

首先创建三个个promise

```
    function queryData(url) {
      return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState != 4) return;
          if(xhr.readyState == 4 && xhr.status == 200) {
            // 处理正常的情况
            resolve(xhr.responseText);
          }else{
            // 处理异常情况
            reject('服务器错误');
          }
        };
        xhr.open('get', url);
        xhr.send(null);
      });
    }

    var p1 = queryData('http://localhost:3000/a1');
    var p2 = queryData('http://localhost:3000/a2');
    var p3 = queryData('http://localhost:3000/a3');
```

`Promise.all`方法接受一个数组（或具有Iterator接口）作参数，数组中的对象（p1、p2、p3）均为promise实例（如果不是一个promise，该项会被用`Promise.resolve`转换为一个promise)。它的状态由这三个promise实例决定。

- 当p1, p2, p3状态都变为`fulfilled`，p的状态才会变为`fulfilled`，并将三个promise返回的结果，按参数的顺序（而不是 `resolved`的顺序）存入数组，传给p的回调函数。
- 当p1, p2, p3其中之一状态变为`rejected`，p的状态也会变为`rejected`，并把第一个被`reject`的promise的返回值，传给p的回调函数，

```
Promise.all([p1,p2,p3]).then(function(result){
   console.log(result)
})
```

`Promise.race`方法同样接受一个数组（或具有Iterator接口）作参数。当p1, p2, p3中有一个实例的状态发生改变（变为`fulfilled`或`rejected`），p的状态就跟着改变。并把第一个改变状态的promise的返回值，传给p的回调函数。

```
Promise.race([p1,p2,p3]).then(function(result){
	console.log(result)
})
```

参考文章：

[初探promise](https://segmentfault.com/a/1190000007032448)

[「前端进阶」完全吃透Promise，深入JavaScript异步](https://blog.csdn.net/qq_40128367/article/details/82992263)

[前端异步解决方案-3（Promise）](https://segmentfault.com/a/1190000018889742)
