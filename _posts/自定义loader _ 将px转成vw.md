```javascript
const babel = require('@babel/core')
const fs = require("fs");

  // 读取混淆代码
var code = fs.readFileSync('index.jsx', {
    encoding: "utf-8"
});

const visitor = {
    JSXAttribute: {
        enter: [styleReplace]
    }
}

const pxRegExp = /\b(\d+(\.\d+)?)px\b/;
let pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

function parseJson(obj) {
    for (let key in obj){
        var el = obj[key];
        if (typeof(el) == "object") {
            parseJson(el);
        } else {
            if (key === "value" && pxGlobalRegExp.test(obj[key])) {
                obj[key] = obj[key].replace(pxGlobalRegExp, ($0, $1) => {
                    let val = $1 / 100;
                    // 精确到几位
                    val = parseFloat(val.toFixed(6));
                    return val === 0 ? val : val + 'vw';
                });
            }
        }
    }
}

function styleReplace(path) {
    //对节点进行处理
    const node = path.node;
    //判断节点类型是否为style，不是则返回
    if(!node.name || node.name.name !== 'style') return;
    // 处理节点json
    parseJson(node.value)
}

const result = babel.transform(code, {
    plugins: ['@babel/plugin-syntax-jsx',{
        visitor: visitor
    }]
})

console.log(result.code)
```
