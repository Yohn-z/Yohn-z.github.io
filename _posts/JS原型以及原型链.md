---


## tags: [javascript]

### 一、什么是构造函数

首先在ES6之前，并没有引入类的概念，也可以说对象不是通过类来创建的，而是通过**构造函数**来定义**对象**。

#### 1.1创建对象的几种方式

// 第一种： 字面量

```
var Obj1 = {name:"o1"}
```

// 第二种：利用 new Object() 创建对象

```
var Obj2 = new Object({name:"o2"})
```

// 第三种：构造函数

```
function O(name) { 
    this.name = name
}; 
var Obj3 = new O("o3")
```

// 第四种：Object.create

```
var P = {name:"o4"} 
var Obj4 = Object.create(P)
```

当然不同方式创建的对象，略有不同。

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128212852-306091.png#id=FqPFx&originHeight=206&originWidth=1097&originalType=binary&ratio=1&status=done&style=none)

#### 1.2 构造函数使用

这里，我们主要以**第三种方式**为例，构造函数是一种特殊的函数，主要用来初始化对象，总与new一起使用。

new在执行时会做以下四件事：

（1）内存中创建一个新的空对象

（2）让this指向这个新对象

（3）执行构造函数中的方法，给这个新对象添加属性和方法。

（4）返回这个新对象，所以不需要在构造函数中写**return**

现在让我们改写一下**第三种**方式的代码（添加一个方法）：

```
function O(name) { 
	this.name = name
	this.doAction = function(){
		console.log(this.name)
	}
};
```

然后，我们使用这个构造函数创建两个**对象**（剧透，这样的方式会导致浪费内存！！！）

```
var Obj3_1 = new O("o3_1")
var Obj3_2 = new O("o3_2")
```

对比一下这两个对象的doAction方法

```
console.log(Obj3_1.doAction == Obj3_2.doAction)
console.log(Obj3_1)
console.log(Obj3_2)
```

打印结果：

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128215330-55748.png#id=Fc4s4&originHeight=206&originWidth=653&originalType=binary&ratio=1&status=done&style=none)

也就是说明这两个对象的action方法是不同**地址**的，即**各自开辟**了doAction方法的**内存空间**（可以理解为使用了**双倍**的内存空间），这样就导致了创建的新对象比较多时，会占用比较大的内存空间。

那么怎么优化，或者说使用哪种方法能改变这种**浪费内存空间**的方法呢？

### 二、JS原型

我们希望所有对象能使用同一个函数，不用再新开辟内存空间。

#### 2.1 构造函数原型 prototype

so，我们就需要使用构造函数原型 **prototype**。通过它，我们可以让所有对象共享构造函数！

我们打印一下构造函数O

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128221031-382337.png#id=v7BQY&originHeight=227&originWidth=810&originalType=binary&ratio=1&status=done&style=none)

可以看到构造函数中有一个prototype 对象，这个对象的**所有属性和方法都会被构造函数拥有**。

把那些不变的方法，直接定义到prototype 对象中，即可实现所有对象的实例共享这些方法。

上代码

```
// 第三种：构造函数 
function O(name) { 
this.name = name
	// this.doAction = function(){
	//     console.log(this.name)
	// }
}; 
O.prototype.doAction = function(){
	console.log(this.name)
}
```

再对比一下这两个对象的doAction方法

```
console.log(Obj3_1.doAction == Obj3_2.doAction)
console.log(Obj3_1)
console.log(Obj3_2)
```

打印结果：

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128221857-699203.png#id=BKNPQ&originHeight=341&originWidth=817&originalType=binary&ratio=1&status=done&style=none)

**此时他们的doAction方法的内存空间一致。即他们使用了同一块空间。**

此时新的对象实例就可以使用doAction方法了

```
Obj3_1.doAction()
Obj3_2.doAction()
```

#### 2.2对象原型`__proto__` 属性

但是为什么不同的对象实例可以使用构造函数原型prototype中的方法呢。

即为啥obj3_1and obj3_2在没有开辟自身的doAction方法空间的时候，却使用doAction方法呢？

我们打印一下这两个对象实例

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128222848-423931.png#id=ZzW1s&originHeight=311&originWidth=852&originalType=binary&ratio=1&status=done&style=none)

我们发现每个对象实例中都会有一个`__protp__` 对象。这个属性指向了构造函数原型prototype（类似指针·）

对比一下构造函数中的prototype属性

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128223129-234939.png#id=bV77m&originHeight=245&originWidth=735&originalType=binary&ratio=1&status=done&style=none)

是不是和`__protp__` 的内容一模一样！

当执行doAction方法的时候，首先会查找这个**对象实例**本身有没有这个方法，如果没有，就会通过这个对象实例的`__protp__` 属性查找构造函数原型prototype上有没有这个方法，如此依次往上。

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128224559-350013.png#id=ZXXgy&originalType=binary&ratio=1&status=done&style=none)

#### 2.3 constructor 构造函数

细心的同学往往会发现无论是`__protp__` 还是prototype都会有一个属性constructor

`console.log(O.prototype)`

`console.log(Obj3_1.__proto__)`

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128225907-497650.png#id=sGwuO&originHeight=219&originWidth=654&originalType=binary&ratio=1&status=done&style=none)

我们震惊的发现constructor里面的内容即为构造函数O本身。

```
console.log(O.prototype.constructor == Obj3_1.__proto__.constructor)
console.log(O.prototype.constructor == O)
```

结果为 true

即constructor指向了构造函数本身

### 三、JS原型链

每个构造函数都有一个原型对象protype，原型对象都包含一个指向构造函数的指针constructor，构造函数的实例也有一个指向原型对象的内部指针`__proto__`。
当这个原型对象是另一个类型的实例，那么这个原型对象就有一个内部指针指向另一个原型，以此类推就构成了一条原型链。原型链的根就是Object.prototype。

下图表示原型链关系：

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200128232718-910518.png#id=C2chK&originHeight=701&originWidth=1002&originalType=binary&ratio=1&status=done&style=none)

由这张图想到是不是直接可以给Object的prototype增加一个方法，扩展一下js内置的函数呢，比如数组求和？。

### 四、原型继承

#### 4.1 组合继承

```
    // 借用父构造函数继承属性
    // 1. 父构造函数
    function Father(uname, age) {
        // this 指向父构造函数的对象实例
        this.uname = uname;
        this.age = age;
    }
    Father.prototype.money = function() {
        console.log(100000);

    };
    // 2 .子构造函数 
    function Son(uname, age, score) {
        // this 指向子构造函数的对象实例
        Father.call(this, uname, age);
        this.score = score;
    }
    // 以下方式直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
    // Son.prototype = Father.prototype; 
    Son.prototype = new Father();
    // 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
    Son.prototype.constructor = Son;
    // 这个是子构造函数专门的方法
    Son.prototype.exam = function() {
        console.log('孩子要考试');

    }
    var son = new Son('刘德华', 18, 100);
```

#### 4.2 拷贝继承

```
        function Person() {}

        Person.prototype.name = "小红"
        Person.prototype.age = 18

        function Student() {}
        Student.prototype.score = 100

        var p = Person.prototype;
        var s = Student.prototype;

        for (key in p) {
            s[key] = p[key]
        }
        console.dir(Person)
        console.dir(Student)
```

类似于复制，把一个对象中的属性和方法直接复制到另一个对象中

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200129003358-292810.png#id=wlF2k&originHeight=579&originWidth=829&originalType=binary&ratio=1&status=done&style=none)

你可以封装一下拷贝代码

```
function extend(Child, Parent) {

    var p = Parent.prototype;
    var c = Child.prototype;

    for (var i in p) {
    c[i] = p[i];
    }

}
```

#### 4.3 利用空对象作中介实现继承

```
function Person() {};
Person.prototype.name = "小红";
Person.prototype.age = 11;

function Student() {};
var F = function () {};
F.prototype = Person.prototype;

Student.prototype = new F();
Student.prototype.constructor = Student;

Student.prototype.age = 25;

console.dir(Person)
console.dir(Student)
```

![](http://oss.yohn-z.cn/myblog/js%E5%8E%9F%E5%9E%8B/20200129005126-781730.png#id=n2uA3&originHeight=454&originWidth=1163&originalType=binary&ratio=1&status=done&style=none)

封装一下

```
function extend(Child, Parent) {

    var F = function () {};

    F.prototype = Parent.prototype;

    Child.prototype = new F();

    Child.prototype.constructor = Child;

    Child.par = Parent.prototype;

}
```

突然想到ES6中增加了类和继承，从某种程度上来讲是不是就是给原型继承披了层好看的衣服呢？

最后，摘抄了网上一段对原型链继承的总结

> 属性共享和独立的控制，当你的对象实例需要独立的属性，所有做法的本质都是在对象实例里面创建属性。若不考虑太多，你大可以在Person里面直接定义你所需要独立的属性来覆盖掉原型的属性。总之，使用原型继承的时候，要对于原型中的属性要特别注意，因为他们都是牵一发而动全身的存在。

