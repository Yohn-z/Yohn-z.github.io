# 一、AST是什么
**抽象语法树**（**A**bstract **S**yntax **T**ree，AST），是源代码语法结构的一种抽象表示。它以树状的形式表现编程的语法结构，树上的每个节点都表示源代码中的一种结构。
在JavaScript编译过程中，代码经过词法分析和语法分析会被映射为 AST，那么就可以通过 AST 对代码进行分析、转换。像 webpack、babel、eslint 等涉及代码分析的工具类库，其背后都有 AST 的影子。
通过在线工具 [AST explorer](https://astexplorer.net/) 我们可以将 console.log("AST") 编译为下面的结构。
![20240422024026](http://oss.yohn-z.cn/img/20240422024026.png)
# 二、如何操作AST
这里我们使用Babel操作AST，babel是一个js编译器，他可以将一种形式的JS代码转换成另外一种形式的代码。
在宏观层面上Babel的解析分为三步：Parse => transform =>Generate
我们先安装Bable的核心包
```bash
npm install @babel/core
```
并使用如下几个nodeJS工具包
```javascript
// 将JS源码转换成语法树
const parser = require("@babel/parser");
// 遍历并处理AST
const traverse = require("@babel/traverse").default;
// 操作节点，比如判断节点类型，生成新的节点等
const t = require("@babel/types");
// 将语法树转换为源代码
const generator = require("@babel/generator").default;
// 操作文件
const fs = require("fs");
```
# 三、混淆代码
这是某机票网站的一段混淆代码，一共1854行。
![20240422024052](http://oss.yohn-z.cn/img/20240422024052.png)
先利用[AST explorer](https://astexplorer.net/)查看AST语法树结构
![20240422024106](http://oss.yohn-z.cn/img/20240422024106.png)
# 四、解析并处理AST
我们使用babel将这段代码映射成AST
```javascript
  // 读取混淆代码
  var jscode = fs.readFileSync(file_path + file_name, {
      encoding: "utf-8"
  });
  // 将代码转换为AST语法树
  let ast = parser.parse(jscode);
```
接下来我们继续分析这段混淆代码
我们可以看到这一段混淆代码将所有常量加密处理后提取到一个数组中，调用的时候通过一个解密函数调用。
常量数组：
![20240422024125](http://oss.yohn-z.cn/img/20240422024125.png)
访问数组中常量的方法：
![20240422024139](http://oss.yohn-z.cn/img/20240422024139.png)
调用：
![20240422024152](http://oss.yohn-z.cn/img/20240422024152.png)
我们需要将 _0xe014 这个方法单独提取出来放在node中运行，值得注意的是该方法中存在对JS环境的检测，在我们的node直接用这个方法会报错，需要补充环境
![20240422024208](http://oss.yohn-z.cn/img/20240422024208.png)
补充完环境之后就可以愉快的使用 _0xe014  这个方法了
![20240422024229](http://oss.yohn-z.cn/img/20240422024229.png)
接下来我们需要将代码中所有形如 _0xe014('0x1', 'oybe') 这样的替换成常量数组中的对应的值
我们先看一下 _0xe014('0x1', 'oybe') 在AST中的结构
![20240422024242](http://oss.yohn-z.cn/img/20240422024242.png)
CallExpression 在AST中表示函数表达式
```javascript
interface CallExpression <: Expression {
  type: "CallExpression";
  callee: Expression | Super | Import;
  arguments: [ Expression | SpreadElement ];
}
```
callee 属性是一个表达式节点，表示函数，arguments 是一个数组，元素是表达式节点，表示函数参数列表。
接下来开始正式的解析环节：
```javascript
function traverse_all(ast) {
    // 遍历节点，当遇到下列类型的时候会调用函数
    traverse(ast, {
        CallExpression: {
            enter: [replaceFunctionToString]
        }
    })
}
```
```javascript
traverse(ast, {
  CallExpression: {
    enter: [replaceFunctionToString]
  }
})
```
```javascript
function replaceFunctionToString(path) {
  //对节点进行处理
  const node = path.node;
  //判断节点类型及函数名，不是则返回
  if (!t.isIdentifier(node.callee,{name:"_0xe014"})) return;
  //取实参值
  let first_arg  = node.arguments[0].value;
  let second_arg = node.arguments[1].value;
  //调用本地的_0x5c3a函数
  let value = _0xe014(first_arg,second_arg);
  //替换CallExpression节点，为StringLiteral类型的value
  path.replaceWith(t.StringLiteral(value));
}
```
最后我们将处理之后的AST转换为代码
```javascript
// 处理AST语法树  
traverse_all(ast);
// 将AST转换为代码
let {code} = generator(ast);
// 写入文件
fs.writeFile(file_path + 'decoded.js', code, (err)=>{})
```
所有形如 _0xe014('0x1', 'oybe') 这样值都被替换了！
![20240422024311](http://oss.yohn-z.cn/img/20240422024311.png)
