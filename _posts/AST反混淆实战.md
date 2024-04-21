# 一、AST是什么
![20240422012719](http://oss.yohn-z.cn/yohn-z/myblog/YYYY/MM/DD/20240422012719.png)
**抽象语法树**（**A**bstract **S**yntax **T**ree，AST），是源代码语法结构的一种抽象表示。它以树状的形式表现编程的语法结构，树上的每个节点都表示源代码中的一种结构。
在JavaScript编译过程中，代码经过词法分析和语法分析会被映射为 AST，那么就可以通过 AST 对代码进行分析、转换。像 webpack、babel、eslint 等涉及代码分析的工具类库，其背后都有 AST 的影子。
通过在线工具 [AST explorer](https://astexplorer.net/) 我们可以将 console.log("AST") 编译为下面的结构。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1640053090579-5bb1ff5c-60a2-4bfd-996e-d2a4869fb886.png#clientId=u2ce23ff4-5059-4&from=paste&height=532&id=ub84bfd23&originHeight=532&originWidth=570&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8728&status=done&style=none&taskId=u1b09b5bd-52a2-428c-8306-5c2f36dd4df&title=&width=570)
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
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639971088757-3b3c915d-8afb-4b4a-b23f-4fbcfeaddcec.png#clientId=ub3c60e5d-8f94-4&from=paste&height=203&id=u8d96bd22&originHeight=203&originWidth=597&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17629&status=done&style=none&taskId=u00a464a4-d564-409b-a165-4d4e7ad4f68&title=&width=597)
先利用[AST explorer](https://astexplorer.net/)查看AST语法树结构
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639971713427-26e68253-0fa3-4f89-be7e-b3c782d84408.png#clientId=ub3c60e5d-8f94-4&from=paste&height=891&id=u6f05208a&originHeight=891&originWidth=1915&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63479&status=done&style=none&taskId=u86e32427-bfcd-4d75-b4c1-85aea2edfec&title=&width=1915)
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
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639981301702-fbaf21ad-a12a-49be-b622-dcae2a0517ff.png#clientId=u304ce287-a964-4&from=paste&height=248&id=ued6e7295&originHeight=248&originWidth=255&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11443&status=done&style=none&taskId=ub8310a2d-0537-442f-9077-f882b32b163&title=&width=255)
访问数组中常量的方法：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639981629289-0e3fd975-2640-4df6-b6fe-e31e446ca0e2.png#clientId=u304ce287-a964-4&from=paste&height=268&id=uf13218c5&originHeight=268&originWidth=503&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24302&status=done&style=none&taskId=ua72d471f-a39c-45d3-bc0d-6ae689c0b42&title=&width=503)
调用：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639981660092-51c05da7-6138-4ced-9462-480e1a13d0a5.png#clientId=u304ce287-a964-4&from=paste&height=203&id=u3b278d66&originHeight=203&originWidth=766&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31388&status=done&style=none&taskId=u7abe5ab4-05aa-4369-842a-f1aaae030a8&title=&width=766)
我们需要将 _0xe014 这个方法单独提取出来放在node中运行，值得注意的是该方法中存在对JS环境的检测，在我们的node直接用这个方法会报错，需要补充环境
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639981885935-b7651d8e-76c9-4071-ab37-ccc427a6e185.png#clientId=u304ce287-a964-4&from=paste&height=383&id=u56e53b6f&originHeight=383&originWidth=938&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39635&status=done&style=none&taskId=u8e678480-744e-40ef-9511-de20e4ad374&title=&width=938)
补充完环境之后就可以愉快的使用 _0xe014  这个方法了
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1639982080422-b8676b4a-41ab-43e3-8255-359b1b4f9741.png#clientId=u304ce287-a964-4&from=paste&height=191&id=uf2e86214&originHeight=191&originWidth=508&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11783&status=done&style=none&taskId=u1f480ff7-b537-4b00-a5f8-2e83f022a41&title=&width=508)
接下来我们需要将代码中所有形如 _0xe014('0x1', 'oybe') 这样的替换成常量数组中的对应的值
我们先看一下 _0xe014('0x1', 'oybe') 在AST中的结构
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1640057158025-0db177ea-de3c-4c22-a8f4-ab46b68c5127.png#clientId=u2ce23ff4-5059-4&from=paste&height=359&id=ub3b9a18c&originHeight=359&originWidth=478&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5637&status=done&style=none&taskId=ue15ae647-7c19-464f-ae4d-cb5e56981f7&title=&width=478)
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
![image.png](https://cdn.nlark.com/yuque/0/2021/png/22909139/1640060248017-a4c29ba6-a60c-48c7-9f92-f22a11739eb0.png#clientId=u2ce23ff4-5059-4&from=paste&height=561&id=uc5219985&originHeight=561&originWidth=804&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51876&status=done&style=none&taskId=u92f94fe2-50cb-48c4-ac43-f721be9c7ac&title=&width=804)
更多反混淆处理详见下一篇：AST反混淆实战（二）
