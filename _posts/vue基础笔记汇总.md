---


## tags: [vue]

[vue官方文档](https://cn.vuejs.org/v2/guide/events.html)

[vue生命周期](#jump20)

## 速览

vue基础

[v-cloak指令的用法](#jump1)

[数据填充相关3个指令用法](#jump2)

[v-once的应用场景](#jump3)

[双向数据绑定](#jump4)

[点击事件绑定](#jump5)

[html属性绑定](#jump6)

[class 绑定对象](#jump7)

[class绑定数组](#jump8)

[class样式绑定相关语法细节](#jump9)

[style绑定用法](#jump10)

[分支结构if else以及 v-show](#jump12)

[循环结构-遍历数组](#jump12)

[循环结构-遍历对象](#jump13)

vue常用

[一个简单的vue表单](#jump14)

[表单域修饰符lazy、trim、number](#jump15)

[vue自定义指令](#jump16)

[vue计算属性](#jump17)

[vue监听器](#jump18)

[vue过滤器-设置时间格式](#jump19)

[vue数组操作](#jump21)

vue小demo

[图书管理](#jump22)

vue组件

[组件注册的基本用法](#jump23)

[局部组件用法](#jump24)

[父子兄弟组件传值](#jump25)

[组件插槽](#jump26)

### v-cloak指令的用法

在数据初始化加载时，影藏{{ }}

1、提供样式

```
[v-cloak]{
   display: none;
}
```

2、在插值表达式所在的标签中添加v-cloak指令

```
<div v-cloak>{{msg}}</div>
```

### 数据填充相关3个指令用法

1、v-text指令用于将数据填充到标签中，作用于插值表达式类似，但是没有闪动问题

2、v-html指令用于将HTML片段填充到标签中，但是可能有安全问题

3、v-pre用于显示原始信息

```
<div>{{msg}}</div>
<div v-text='msg'></div>
<div v-html='msg1'></div>
<div v-pre>{{msg}}</div>
```

### v-once的应用场景

v-once的应用场景：如果显示的信息后续不需要再修改，你们可以使用v-once，这样可以提高性能。

```
<div v-once>{{info}}</div>
```

### 双向数据绑定

```
<div>{{msg}}</div>
<div><input type="text" v-model='msg'></div>
```

### 点击事件绑定

```
<button v-on:click='num++'>点击</button>
<button @click='num++'>点击1</button>
<button @click='handle'>点击2</button>
<button @click='handle()'>点击3</button>
```

```
<!-- 如果事件直接绑定函数名称，那么默认会传递事件对象作为事件函数的第一个参数 -->
<button v-on:click='handle1'>点击1</button>
<!-- 2、如果事件绑定函数调用，那么事件对象必须作为最后一个参数显示传递，
并且事件对象的名称必须是$event 
-->
<button v-on:click='handle2(123, 456, $event)'>点击2</button>
```

### html属性绑定

```
<a v-bind:href="url">百度</a>
<a :href="url">百度1</a>
```

```
<input type="text" v-bind:value="msg" v-on:input='handle'>
<input type="text" v-bind:value="msg" v-on:input='msg=$event.target.value'>
<input type="text" v-model='msg'>
```

其中 v-model 的底层结合了 `v-bind:value="msg"` `v-on:input='msg=$event.target.value'`两者

### class 绑定对象

```
<body>
  <div id="app">
    <div v-bind:class="{active: isActive,error: isError}">
      测试样式
    </div>
    <button v-on:click='handle'>切换</button>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      样式绑定

    */
    var vm = new Vue({
      el: '#app',
      data: {
        isActive: true,
        isError: true
      },
      methods: {
        handle: function(){
          // 控制isActive的值在true和false之间进行切换
          this.isActive = !this.isActive;
          this.isError = !this.isError;
        }
      }
    });
  </script>
</body>
```

### class绑定数组

```
<body>
  <div id="app">
    <div v-bind:class='[activeClass, errorClass]'>测试样式</div>
    <button v-on:click='handle'>切换</button>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      样式绑定

    */
    var vm = new Vue({
      el: '#app',
      data: {
        activeClass: 'active',
        errorClass: 'error'
      },
      methods: {
        handle: function(){
          this.activeClass = '';
          this.errorClass = '';
        }
      }
    });
  </script>
</body>
```

### class样式绑定相关语法细节

```
<body>
  <div id="app">
    <div v-bind:class='[activeClass, errorClass, {test: isTest}]'>测试样式</div>
    <div v-bind:class='arrClasses'></div>
    <div v-bind:class='objClasses'></div>
    <div class="base" v-bind:class='objClasses'></div>

    <button v-on:click='handle'>切换</button>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      样式绑定相关语法细节：
      1、对象绑定和数组绑定可以结合使用
      2、class绑定的值可以简化操作
      3、默认的class如何处理？默认的class会保留
      
    */
    var vm = new Vue({
      el: '#app',
      data: {
        activeClass: 'active',
        errorClass: 'error',
        isTest: true,
        arrClasses: ['active','error'],
        objClasses: {
          active: true,
          error: true
        }
      },
      methods: {
        handle: function(){
          // this.isTest = false;
          this.objClasses.error = false;
        }
      }
    });
  </script>
</body>
```

### style绑定用法

```
<body>
  <div id="app">
    <div v-bind:style='{border: borderStyle, width: widthStyle, height: heightStyle}'></div>
    <div v-bind:style='objStyles'></div>
    <div v-bind:style='[objStyles, overrideStyles]'></div>
    <button v-on:click='handle'>切换</button>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      样式绑定之内联样式Style：
      
    */
    var vm = new Vue({
      el: '#app',
      data: {
        borderStyle: '1px solid blue',
        widthStyle: '100px',
        heightStyle: '200px',
        objStyles: {
          border: '1px solid green',
          width: '200px',
          height: '100px'
        },
        overrideStyles: {
          border: '5px solid orange',
          backgroundColor: 'blue'
        }
      },
      methods: {
        handle: function(){
          this.heightStyle = '100px';
          this.objStyles.width = '100px';
        }
      }
    });
  </script>
</body>
```

### 分支结构if else以及 v-show

```
<body>
  <div id="app">
    <div v-if='score>=90'>优秀</div>
    <div v-else-if='score<90&&score>=80'>良好</div>
    <div v-else-if='score<80&&score>60'>一般</div>
    <div v-else>比较差</div>
    <div v-show='flag'>测试v-show</div>
    <button v-on:click='handle'>点击</button>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      分支结构

      v-show的原理：控制元素样式是否显示 display:none
    */
    var vm = new Vue({
      el: '#app',
      data: {
        score: 10,
        flag: false
      },
      methods: {
        handle: function(){
          this.flag = !this.flag;
        }
      }
    });
  </script>
</body>
```

### 循环结构-遍历数组

```
<body>
  <div id="app">
    <div>水果列表</div>
    <ul>
      <li v-for='item in fruits'>{{item}}</li>
      <li v-for='(item, index) in fruits'>{{item + '---' + index}}</li>
      <li :key='item.id' v-for='(item, index) in myFruits'>
        <span>{{item.ename}}</span>
        <span>-----</span>
        <span>{{item.cname}}</span>
      </li>

    </ul>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      循环结构-遍历数组
    */
    var vm = new Vue({
      el: '#app',
      data: {
        fruits: ['apple', 'orange', 'banana'],
        myFruits: [{
          id: 1,
          ename: 'apple',
          cname: '苹果'
        },{
          id: 2,
          ename: 'orange',
          cname: '橘子'
        },{
          id: 3,
          ename: 'banana',
          cname: '香蕉'
        }]
      }
    });
  </script>
</body>
```

### 循环结构-遍历对象

```
<body>
  <div id="app">
    <div v-if='v=="female"' v-for='(v,k,i) in obj'>{{v + '---' + k + '---' + i}}</div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    // 使用原生js遍历对象
    var obj = {
      uname: 'lisi',
      age: 12,
      gender: 'male'
    }
    for(var key in obj) {
      console.log(key, obj[key])
    }
    /*
      循环结构
    */
    var vm = new Vue({
      el: '#app',
      data: {
        obj: {
          uname: 'zhangsan',
          age: 13,
          gender: 'female'
        }
      }
    });
  </script>
</body>
```

### 一个简单的vue表单

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style type="text/css">
  
  form div {
    height: 40px;
    line-height: 40px;
  }
  form div:nth-child(4) {
    height: auto;
  }
  form div span:first-child {
    display: inline-block;
    width: 100px;
  }
  </style>
</head>
<body>
  <div id="app">
    <form action="http://itcast.cn">
      <div>
        <span>姓名：</span>
        <span>
          <input type="text" v-model='uname'>
        </span>
      </div>
      <div>
        <span>性别：</span>
        <span>
          <input type="radio" id="male" value="1" v-model='gender'>
          <label for="male">男</label>
          <input type="radio" id="female" value="2" v-model='gender'>
          <label for="female">女</label>
        </span>
      </div>
      <div>
        <span>爱好：</span>
        <input type="checkbox" id="ball" value="1" v-model='hobby'>
        <label for="ball">篮球</label>
        <input type="checkbox" id="sing" value="2" v-model='hobby'>
        <label for="sing">唱歌</label>
        <input type="checkbox" id="code" value="3" v-model='hobby'>
        <label for="code">写代码</label>
      </div>
      <div>
        <span>职业：</span>
        <select v-model='occupation' multiple>
          <option value="0">请选择职业...</option>
          <option value="1">教师</option>
          <option value="2">软件工程师</option>
          <option value="3">律师</option>
        </select>
      </div>
      <div>
        <span>个人简介：</span>
        <textarea v-model='desc'></textarea>
      </div>
      <div>
        <input type="submit" value="提交" @click.prevent='handle'>
      </div>
    </form>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      表单基本操作
    */
    var vm = new Vue({
      el: '#app',
      data: {
        uname: 'lisi',
        gender: 2,
        hobby: ['2','3'],
        // occupation: 3
        occupation: ['2','3'],
        desc: 'nihao'
      },
      methods: {
        handle: function(){
          console.log(this.uname)
          console.log(this.gender)
          console.log(this.hobby.toString())
          console.log(this.occupation)
          console.log(this.desc)

        }
      }
    });
  </script>
</body>
</html>
```

### 表单域修饰符（lazy、trim、number）

```
<input type="text" v-model.number='age'>
<input type="text" v-model.trim='info'>
<input type="text" v-model.lazy='msg'>
```

### vue自定义指令

```
<body>
  <div id="app">
    <input type="text" v-focus>
    <input type="text">
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      自定义指令
    */
    Vue.directive('focus', {
      inserted: function(el){
        // el表示指令所绑定的元素
        el.focus();
      }
    });
    var vm = new Vue({
      el: '#app',
      data: {
        
      },
      methods: {
        handle: function(){
          
        }
      }
    });
  </script>
</body>
```

```
    <div id="app">
    	<input type="text" v-color='msg'>
  	</div>
    /*
      自定义指令-带参数
    */
    Vue.directive('color', {
      bind: function(el, binding){
        // 根据指令的参数设置背景色
        // console.log(binding.value.color)
        el.style.backgroundColor = binding.value.color;
      }
    });
```

局部指令

```
    var vm = new Vue({
      el: '#app',
      data: {
        msg: {
          color: 'red'
        }
      },
      methods: {
        handle: function(){
          
        }
      },
      directives: {
        color: {
          bind: function(el, binding){
            el.style.backgroundColor = binding.value.color;
          }
        },
        focus: {
          inserted: function(el) {
            el.focus();
          }
        }
      }
    });
```

### vue计算属性

```
<body>
  <div id="app">
    <div>{{reverseString}}</div>
    <div>{{reverseString}}</div>
    <div>{{reverseMessage()}}</div>
    <div>{{reverseMessage()}}</div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      计算属性与方法的区别:计算属性是基于依赖进行缓存的，而方法不缓存
    */
    var vm = new Vue({
      el: '#app',
      data: {
        msg: 'Nihao',
        num: 100
      },
      methods: {
        reverseMessage: function(){
          console.log('methods')
          return this.msg.split('').reverse().join('');
        }
      },
      computed: {
        reverseString: function(){
          console.log('computed')
          // return this.msg.split('').reverse().join('');
          var total = 0;
          for(var i=0;i<=this.num;i++){
            total += i;
          }
          return total;
        }
      }
    });
  </script>
</body>
```

### vue监听器

适用于数据变化时或者开销比较大的操作

```

  <div id="app">
    <div>
      <span>用户名：</span>
      <span>
        <input type="text" v-model.lazy='uname'>
      </span>
      <span>{{tip}}</span>
    </div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*      
      侦听器
      1、采用侦听器监听用户名的变化
      2、调用后台接口进行验证
      3、根据验证的结果调整提示信息
    */
    var vm = new Vue({
      el: '#app',
      data: {
        uname: '',
        tip: ''
      },
      methods: {
        checkName: function(uname) {
          // 调用接口，但是可以使用定时任务的方式模拟接口调用
          var that = this;
          setTimeout(function(){
            // 模拟接口调用
            if(uname == 'admin') {
              that.tip = '用户名已经存在，请更换一个';
            }else{
              that.tip = '用户名可以使用';
            }
          }, 2000);
        }
      },
      watch: {
        uname: function(val){
          // 调用后台接口验证用户名的合法性
          this.checkName(val);
          // 修改提示信息
          this.tip = '正在验证...';
        }
      }
    });

  </script>
```

示例：验证用户名是否可用

### vue过滤器-设置时间格式

```
<body>
  <div id="app">
    <div>{{date | format('yyyy-MM-dd hh:mm:ss')}}</div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      过滤器案例：格式化日期
      
    */
    // Vue.filter('format', function(value, arg) {
    //   if(arg == 'yyyy-MM-dd') {
    //     var ret = '';
    //     ret += value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    //     return ret;
    //   }
    //   return value;
    // })
    Vue.filter('format', function(value, arg) {
      function dateFormat(date, format) {
          if (typeof date === "string") {
              var mts = date.match(/(\/Date\((\d+)\)\/)/);
              if (mts && mts.length >= 3) {
                  date = parseInt(mts[2]);
              }
          }
          date = new Date(date);
          if (!date || date.toUTCString() == "Invalid Date") {
              return "";
          }
          var map = {
              "M": date.getMonth() + 1, //月份 
              "d": date.getDate(), //日 
              "h": date.getHours(), //小时 
              "m": date.getMinutes(), //分 
              "s": date.getSeconds(), //秒 
              "q": Math.floor((date.getMonth() + 3) / 3), //季度 
              "S": date.getMilliseconds() //毫秒 
          };

          format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
              var v = map[t];
              if (v !== undefined) {
                  if (all.length > 1) {
                      v = '0' + v;
                      v = v.substr(v.length - 2);
                  }
                  return v;
              } else if (t === 'y') {
                  return (date.getFullYear() + '').substr(4 - all.length);
              }
              return all;
          });
          return format;
      }
      return dateFormat(value, arg);
    })
    var vm = new Vue({
      el: '#app',
      data: {
        date: new Date()
      }
    });
  </script>
</body>
```

### vue生命周期

```
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '生命周期'
      },
      methods: {
        update: function(){
          this.msg = 'hello';
        },
        destroy: function(){
          this.$destroy();
        }
      },
      //挂载，初始化相关属性
      beforeCreate: function(){
        console.log('beforeCreate');
      },
      created: function(){
        console.log('created');
      },
      beforeMount: function(){
        console.log('beforeMount');
      },
      mounted: function(){
        console.log('mounted');
      },
      //更新，元素或组件的变更操作
      beforeUpdate: function(){
        console.log('beforeUpdate');
      },
      updated: function(){
        console.log('updated');
      },
      //销毁，销毁操作
      beforeDestroy: function(){
        console.log('beforeDestroy');
      },
      destroyed: function(){
        console.log('destroyed');
      }
    });
```

### vue数组操作

```
  <script type="text/javascript">
    /*
      Vue数组操作
      1、变异方法：会影响数组的原始数据的变化。
      2、替换数组：不会影响原始的数组数据，而是形成一个新的数组。
    */
    var vm = new Vue({
      el: '#app',
      data: {
        fname: '',
        list: ['apple','orange','banana']
      },
      methods: {
        add: function(){
          this.list.push(this.fname);
        },
        del: function(){
          this.list.pop();
        },
        change: function(){
          this.list = this.list.slice(0,2);
        }
      }
    });
  </script>
```

```
  <div id="app">
    <ul>
      <li v-for='item in list'>{{item}}</li>
    </ul>
    <div>
      <div>{{info.name}}</div>
      <div>{{info.age}}</div>
      <div>{{info.gender}}</div>
    </div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      动态处理响应式数据
      
    */
    var vm = new Vue({
      el: '#app',
      data: {
        list: ['apple', 'orange', 'banana'],
        info: {
          name: 'lisi',
          age: 12
        }
      },
    });
    // vm.list[1] = 'lemon';
    // Vue.set(vm.list, 2, 'lemon');
    vm.$set(vm.list, 1, 'lemon');

    // vm.info.gender = 'male';
    vm.$set(vm.info, 'gender', 'female');

    
  </script>
```

### 简单的图书管理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style type="text/css">
    .grid {
      margin: auto;
      width: 530px;
      text-align: center;
    }
    .grid table {
      border-top: 1px solid #C2D89A;
      width: 100%;
      border-collapse: collapse;
    }
    .grid th,td {
      padding: 10;
      border: 1px dashed #F3DCAB;
      height: 35px;
      line-height: 35px;
    }
    .grid th {
      background-color: #F3DCAB;
    }
    .grid .book {
      padding-bottom: 10px;
      padding-top: 5px;
      background-color: #F3DCAB;
    }
    .grid .total {
      height: 30px;
      line-height: 30px;
      background-color: #F3DCAB;
      border-top: 1px solid #C2D89A;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="grid">
      <div>
        <h1>图书管理</h1>
        <div class="book">
          <div>
            <label for="id">
              编号：
            </label>
            <input type="text" id="id" v-model='id' :disabled="flag" v-focus>
            <label for="name">
              名称：
            </label>
            <input type="text" id="name" v-model='name'>
            <button @click='handle' :disabled="submitFlag">提交</button>
          </div>
        </div>
      </div>
      <div class="total">
        <span>图书总数：</span>
        <span>{{total}}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr :key='item.id' v-for='item in books'>
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.date | format('yyyy-MM-dd hh:mm:ss')}}</td>
            <td>
              <a href="" @click.prevent='toEdit(item.id)'>修改</a>
              <span>|</span>
              <a href="" @click.prevent='deleteBook(item.id)'>删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      图书管理-添加图书
    */
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus();
      }
    });
    Vue.filter('format', function(value, arg) {
      function dateFormat(date, format) {
        if (typeof date === "string") {
          var mts = date.match(/(\/Date\((\d+)\)\/)/);
          if (mts && mts.length >= 3) {
            date = parseInt(mts[2]);
          }
        }
        date = new Date(date);
        if (!date || date.toUTCString() == "Invalid Date") {
          return "";
        }
        var map = {
          "M": date.getMonth() + 1, //月份 
          "d": date.getDate(), //日 
          "h": date.getHours(), //小时 
          "m": date.getMinutes(), //分 
          "s": date.getSeconds(), //秒 
          "q": Math.floor((date.getMonth() + 3) / 3), //季度 
          "S": date.getMilliseconds() //毫秒 
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
          var v = map[t];
          if (v !== undefined) {
            if (all.length > 1) {
              v = '0' + v;
              v = v.substr(v.length - 2);
            }
            return v;
          } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
          }
          return all;
        });
        return format;
      }
      return dateFormat(value, arg);
    })
    var vm = new Vue({
      el: '#app',
      data: {
        flag: false,
        submitFlag: false,
        id: '',
        name: '',
        books: []
      },
      methods: {
        handle: function(){
          if(this.flag) {
            // 编辑图书
            // 就是根据当前的ID去更新数组中对应的数据
            this.books.some((item) => {
              if(item.id == this.id) {
                item.name = this.name;
                // 完成更新操作之后，需要终止循环
                return true;
              }
            });
            this.flag = false;
          }else{
            // 添加图书
            var book = {};
            book.id = this.id;
            book.name = this.name;
            book.date = 2525609975000;
            this.books.push(book);
            // 清空表单
            this.id = '';
            this.name = '';
          }
          // 清空表单
          this.id = '';
          this.name = '';
        },
        toEdit: function(id){
          // 禁止修改ID
          this.flag = true;
          console.log(id)
          // 根据ID查询出要编辑的数据
          var book = this.books.filter(function(item){
            return item.id == id;
          });
          console.log(book)
          // 把获取到的信息填充到表单
          this.id = book[0].id;
          this.name = book[0].name;
        },
        deleteBook: function(id){
          // 删除图书
          // 根据id从数组中查找元素的索引
          // var index = this.books.findIndex(function(item){
          //   return item.id == id;
          // });
          // 根据索引删除数组元素
          // this.books.splice(index, 1);
          // -------------------------
          // 方法二：通过filter方法进行删除
          this.books = this.books.filter(function(item){
            return item.id != id;
          });
        }
      },
      computed: {
        total: function(){
          // 计算图书的总数
          return this.books.length;
        }
      },
      watch: {
        name: function(val) {
          // 验证图书名称是否已经存在
          var flag = this.books.some(function(item){
            return item.name == val;
          });
          if(flag) {
            // 图书名称存在
            this.submitFlag = true;
          }else{
            // 图书名称不存在
            this.submitFlag = false;
          }
        }
      },
      mounted: function(){
        // 该生命周期钩子函数被触发的时候，模板已经可以使用
        // 一般此时用于获取后台数据，然后把数据填充到模板
        var data = [{
          id: 1,
          name: '三国演义',
          date: 2525609975000
        },{
          id: 2,
          name: '水浒传',
          date: 2525609975000
        },{
          id: 3,
          name: '红楼梦',
          date: 2525609975000
        },{
          id: 4,
          name: '西游记',
          date: 2525609975000
        }];
        this.books = data;
      }
    });
  </script>
</body>
</html>
```

### 组件注册的基本用法

组件注册注意事项

      1、组件参数的data值必须是函数

      2、组件模板必须是单个跟元素

      3、组件模板的内容可以是模板字符串

      4、如果使用驼峰式命名组件，那么在使用组件的时候，只能在字符串模板中用驼峰的方式使用组件，但是

      5、在普通的标签模板中，必须使用短横线的方式使用组件

```
<body>
  <div id="app">
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">

    // Vue.component('button-counter', {
    //   data: function(){
    //     return {
    //       count: 0
    //     }
    //   },
    //   template: '<div><button @click="handle">点击了{{count}}次</button><button>测试</button></div>',
    //   methods: {
    //     handle: function(){
    //       this.count += 2;
    //     }
    //   }
    // })
    // -----------------------------------
    Vue.component('ButtonCounter', {
      data: function(){
        return {
          count: 0
        }
      },
      template: `
        <div>
          <button @click="handle">点击了{{count}}次</button>
          <button>测试123</button>
        </div>
      `,
      methods: {
        handle: function(){
          this.count += 2;
        }
      }
    })
    var vm = new Vue({
      el: '#app',
      data: {
        
      }
    });
  </script>
</body>
```

### 局部组件用法

```
<body>
  <div id="app">
    <hello-world></hello-world>
    <hello-tom></hello-tom>
    <hello-jerry></hello-jerry>
    <test-com></test-com>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      局部组件注册
      局部组件只能在注册他的父组件中使用
    */
    Vue.component('test-com',{
      template: '<div>Test<hello-world></hello-world></div>'
    });
    var HelloWorld = {
      data: function(){
        return {
          msg: 'HelloWorld'
        }
      },
      template: '<div>{{msg}}</div>'
    };
    var HelloTom = {
      data: function(){
        return {
          msg: 'HelloTom'
        }
      },
      template: '<div>{{msg}}</div>'
    };
    var HelloJerry = {
      data: function(){
        return {
          msg: 'HelloJerry'
        }
      },
      template: '<div>{{msg}}</div>'
    };
    var vm = new Vue({
      el: '#app',
      data: {
        
      },
      components: {
        'hello-world': HelloWorld,
        'hello-tom': HelloTom,
        'hello-jerry': HelloJerry
      }
    });
  </script>
</body>
```

### 父组件向子组件传值

```
<body>
  <div id="app">
    <div>{{pmsg}}</div>
    <menu-item :pstr='pstr' :pnum='12' pboo='true' :parr='parr' :pobj='pobj'></menu-item>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
  
    
    Vue.component('menu-item', {
      props: ['pstr','pnum','pboo','parr','pobj'],
      template: `
        <div>
          <div>{{pstr}}</div>
          <div>{{12 + pnum}}</div>
          <div>{{typeof pboo}}</div>
          <ul>
            <li :key='index' v-for='(item,index) in parr'>{{item}}</li>
          </ul>
            <span>{{pobj.name}}</span>
            <span>{{pobj.age}}</span>
          </div>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        pmsg: '父组件中内容',
        pstr: 'hello',
        parr: ['apple','orange','banana'],
        pobj: {
          name: 'lisi',
          age: 12
        }
      }
    });
  </script>
</body>
```

子组件向父组件传值

```
<body>
  <div id="app">
    <div :style='{fontSize: fontSize + "px"}'>{{pmsg}}</div>
    <menu-item :parr='parr' @enlarge-text='handle($event)'></menu-item>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      子组件向父组件传值-携带参数
    */
    
    Vue.component('menu-item', {
      props: ['parr'],
      template: `
        <div>
          <ul>
            <li :key='index' v-for='(item,index) in parr'>{{item}}</li>
          </ul>
          <button @click='$emit("enlarge-text", 5)'>扩大父组件中字体大小</button>
          <button @click='$emit("enlarge-text", 10)'>扩大父组件中字体大小</button>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        pmsg: '父组件中内容',
        parr: ['apple','orange','banana'],
        fontSize: 10
      },
      methods: {
        handle: function(val){
          // 扩大字体大小
          this.fontSize += val;
        }
      }
    });
  </script>
</body>
```

兄弟组件传值需要一个注册中心

```
<body>
  <div id="app">
    <div>父组件</div>
    <div>
      <button @click='handle'>销毁事件</button>
    </div>
    <test-tom></test-tom>
    <test-jerry></test-jerry>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      兄弟组件之间数据传递
    */
    // 提供事件中心
    var hub = new Vue();

    Vue.component('test-tom', {
      data: function(){
        return {
          num: 0
        }
      },
      template: `
        <div>
          <div>TOM:{{num}}</div>
          <div>
            <button @click='handle'>点击</button>
          </div>
        </div>
      `,
      methods: {
        handle: function(){
          hub.$emit('jerry-event', 2);
        }
      },
      mounted: function() {
        // 监听事件
        hub.$on('tom-event', (val) => {
          this.num += val;
        });
      }
    });
    Vue.component('test-jerry', {
      data: function(){
        return {
          num: 0
        }
      },
      template: `
        <div>
          <div>JERRY:{{num}}</div>
          <div>
            <button @click='handle'>点击</button>
          </div>
        </div>
      `,
      methods: {
        handle: function(){
          // 触发兄弟组件的事件
          hub.$emit('tom-event', 1);
        }
      },
      mounted: function() {
        // 监听事件
        hub.$on('jerry-event', (val) => {
          this.num += val;
        });
      }
    });
    var vm = new Vue({
      el: '#app',
      data: {
        
      },
      methods: {
        handle: function(){
          hub.$off('tom-event');
          hub.$off('jerry-event');
        }
      }
    });
  </script>
</body>
```

### 组件插槽的使用

基本用法

```
  <div id="app">
    <alert-box>有bug发生</alert-box>
    <alert-box>有一个警告</alert-box>
    <alert-box></alert-box>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      组件插槽：父组件向子组件传递内容
    */
    Vue.component('alert-box', {
      template: `
        <div>
          <strong>ERROR:</strong>
          <slot>默认内容</slot>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        
      }
    });
  </script>
```

具名插槽

```
  <div id="app">
    <base-layout>
      <p slot='header'>标题信息</p>
      <p>主要内容1</p>
      <p>主要内容2</p>
      <p slot='footer'>底部信息信息</p>
    </base-layout>

    <base-layout>
      <template slot='header'>
        <p>标题信息1</p>
        <p>标题信息2</p>
      </template>
      <p>主要内容1</p>
      <p>主要内容2</p>
      <template slot='footer'>
        <p>底部信息信息1</p>
        <p>底部信息信息2</p>
      </template>
    </base-layout>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      具名插槽
    */
    Vue.component('base-layout', {
      template: `
        <div>
          <header>
            <slot name='header'></slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
            <slot name='footer'></slot>
          </footer>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        
      }
    });
  </script>
```

作用域插槽

```
<div id="app">
    <fruit-list :list='list'>
      <template slot-scope='slotProps'>
        <strong v-if='slotProps.info.id==3' class="current">{{slotProps.info.name}}</strong>
        <span v-else>{{slotProps.info.name}}</span>
      </template>
    </fruit-list>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      作用域插槽
    */
    Vue.component('fruit-list', {
      props: ['list'],
      template: `
        <div>
          <li :key='item.id' v-for='item in list'>
            <slot :info='item'>{{item.name}}</slot>
          </li>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        list: [{
          id: 1,
          name: 'apple'
        },{
          id: 2,
          name: 'orange'
        },{
          id: 3,
          name: 'banana'
        }]
      }
    });
  </script>
```

组件开发案例-购物车

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style type="text/css">
    .container {
    }
    .container .cart {
      width: 300px;
      margin: auto;
    }
    .container .title {
      background-color: lightblue;
      height: 40px;
      line-height: 40px;
      text-align: center;
      /*color: #fff;*/  
    }
    .container .total {
      background-color: #FFCE46;
      height: 50px;
      line-height: 50px;
      text-align: right;
    }
    .container .total button {
      margin: 0 10px;
      background-color: #DC4C40;
      height: 35px;
      width: 80px;
      border: 0;
    }
    .container .total span {
      color: red;
      font-weight: bold;
    }
    .container .item {
      height: 55px;
      line-height: 55px;
      position: relative;
      border-top: 1px solid #ADD8E6;
    }
    .container .item img {
      width: 45px;
      height: 45px;
      margin: 5px;
    }
    .container .item .name {
      position: absolute;
      width: 90px;
      top: 0;left: 55px;
      font-size: 16px;
    }

    .container .item .change {
      width: 100px;
      position: absolute;
      top: 0;
      right: 50px;
    }
    .container .item .change a {
      font-size: 20px;
      width: 30px;
      text-decoration:none;
      background-color: lightgray;
      vertical-align: middle;
    }
    .container .item .change .num {
      width: 40px;
      height: 25px;
    }
    .container .item .del {
      position: absolute;
      top: 0;
      right: 0px;
      width: 40px;
      text-align: center;
      font-size: 40px;
      cursor: pointer;
      color: red;
    }
    .container .item .del:hover {
      background-color: orange;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="container">
      <my-cart></my-cart>
    </div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    
    var CartTitle = {
      props: ['uname'],
      template: `
        <div class="title">{{uname}}的商品</div>
      `
    }
    var CartList = {
      props: ['list'],
      template: `
        <div>
          <div :key='item.id' v-for='item in list' class="item">
            <img :src="item.img"/>
            <div class="name">{{item.name}}</div>
            <div class="change">
              <a href="" @click.prevent='sub(item.id)'>－</a>
              <input type="text" class="num" :value='item.num' @blur='changeNum(item.id, $event)'/>
              <a href="" @click.prevent='add(item.id)'>＋</a>
            </div>
            <div class="del" @click='del(item.id)'>×</div>
          </div>
        </div>
      `,
      methods: {
        changeNum: function(id, event){
          this.$emit('change-num', {
            id: id,
            type: 'change',
            num: event.target.value
          });
        },
        sub: function(id){
          this.$emit('change-num', {
            id: id,
            type: 'sub'
          });
        },
        add: function(id){
          this.$emit('change-num', {
            id: id,
            type: 'add'
          });
        },
        del: function(id){
          // 把id传递给父组件
          this.$emit('cart-del', id);
        }
      }
    }
    var CartTotal = {
      props: ['list'],
      template: `
        <div class="total">
          <span>总价：{{total}}</span>
          <button>结算</button>
        </div>
      `,
      computed: {
        total: function() {
          // 计算商品的总价
          var t = 0;
          this.list.forEach(item => {
            t += item.price * item.num;
          });
          return t;
        }
      }
    }
    Vue.component('my-cart',{
      data: function() {
        return {
          uname: '张三',
          list: [{
            id: 1,
            name: 'TCL彩电',
            price: 1000,
            num: 1,
            img: 'img/a.jpg'
          },{
            id: 2,
            name: '机顶盒',
            price: 1000,
            num: 1,
            img: 'img/b.jpg'
          },{
            id: 3,
            name: '海尔冰箱',
            price: 1000,
            num: 1,
            img: 'img/c.jpg'
          },{
            id: 4,
            name: '小米手机',
            price: 1000,
            num: 1,
            img: 'img/d.jpg'
          },{
            id: 5,
            name: 'PPTV电视',
            price: 1000,
            num: 2,
            img: 'img/e.jpg'
          }]
        }
      },
      template: `
        <div class='cart'>
          <cart-title :uname='uname'></cart-title>
          <cart-list :list='list' @change-num='changeNum($event)' @cart-del='delCart($event)'></cart-list>
          <cart-total :list='list'></cart-total>
        </div>
      `,
      components: {
        'cart-title': CartTitle,
        'cart-list': CartList,
        'cart-total': CartTotal
      },
      methods: {
        changeNum: function(val) {
          // 分为三种情况：输入域变更、加号变更、减号变更
          if(val.type=='change') {
            // 根据子组件传递过来的数据，跟新list中对应的数据
            this.list.some(item=>{
              if(item.id == val.id) {
                item.num = val.num;
                // 终止遍历
                return true;
              }
            });
          }else if(val.type=='sub'){
            // 减一操作
            this.list.some(item=>{
              if(item.id == val.id) {
                item.num -= 1;
                // 终止遍历
                return true;
              }
            });
          }else if(val.type=='add'){
            // 加一操作
            this.list.some(item=>{
              if(item.id == val.id) {
                item.num += 1;
                // 终止遍历
                return true;
              }
            });
          }
        },
        delCart: function(id) {
          // 根据id删除list中对应的数据
          // 1、找到id所对应数据的索引
          var index = this.list.findIndex(item=>{
            return item.id == id;
          });
          // 2、根据索引删除对应数据
          this.list.splice(index, 1);
        }
      }
    });
    var vm = new Vue({
      el: '#app',
      data: {

      }
    });

  </script>
</body>
</html>
```
