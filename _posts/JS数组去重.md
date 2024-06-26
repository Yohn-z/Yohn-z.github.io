看了下数组去重的知识，整理了一些我认为常用的方法，以及优化方案。

#### 1、使用ES6 Set集合

```
//使用ES6中的Set方法，无法去除对象
function removeDuplication_two(arr) {
    return Array.from(new Set(arr))
}
```

去重前后数组对比：

```
[
  1,         1,          'true',
  'true',    'true',     true,
  true,      15,         15,
  false,     false,      undefined,
  undefined, null,       null,
  'NaN',     NaN,        NaN,
  'NaN',     'NaN',      0,
  0,         'a',        'a',
  { a: 1 },  { a: '1' }, {},
  {}
]
[
  1,          'true',
  true,       15,
  false,      undefined,
  null,       'NaN',
  NaN,        0,
  'a',        { a: 1 },
  { a: '1' }, {},
  {}
]
```

#### 2、使用indexOf方法

```
//使用indexOf去除重复
function removeDuplication_three(arr){
    let oc = []
    let f = true
    for(let i=0;i<arr.length;i++){
        if(oc.indexOf(arr[i]) === -1){
            if(arr[i] !== arr[i] && f === true){
                oc.push(arr[i])
                f = false
            }else {
                if(arr[i] === arr[i]) {
                    oc.push(arr[i])
                }
            }
            
        }
    }
    return oc
}
```

我修正了关于对NaN的去重，使用f标记是否为第一次遇到NaN，如果不是第一次遇到则不加入新的数组中

数组去重前后结果：

```
[
  1,         1,          'true',
  'true',    'true',     true,
  true,      15,         15,
  false,     false,      undefined,
  undefined, null,       null,
  'NaN',     NaN,        NaN,
  'NaN',     'NaN',      0,
  0,         'a',        'a',
  { a: 1 },  { a: '1' }, {},
  {}
]
[
  1,          'true',
  true,       15,
  false,      undefined,
  null,       'NaN',
  NaN,        0,
  'a',        { a: 1 },
  { a: '1' }, {},
  {}
]
```

#### 3、使用splice方法

该方法会改变原有数组

我已经将其优化，使得该方法可以针对NaN、对象去重

```
//普通的方法遍历匹配+splice移除元素(改进版本)
function removeDuplication_one(arr) {
    let flag = true
    for(let i=0;i<arr.length;i++){
        for(let j=i+1;j<arr.length;j++){
            if(arr[i] === arr[j] || isObjEq(arr[i],arr[j])){
                if(flag === true && (arr[i] !== arr[i] || arr[j] !== arr[j])) {
                    flag = false
                } else {
                    arr.splice(j,1)
                    j--
                }

            }
        }
    }
    return arr

}
```

其中isObjEq() 方法判断两个对象是否相等

```
//判断对象是否相等
function isObjEq(obj1,obj2){
    let obj1_s = JSON.stringify(obj1)
    let obj2_s = JSON.stringify(obj2)
    if(obj1_s === obj2_s){
        return true
    }
    return false
}
```

数组去重前后结果：

```
[
  1,         1,          'true',
  'true',    'true',     true,
  true,      15,         15,
  false,     false,      undefined,
  undefined, null,       null,
  'NaN',     NaN,        NaN,
  'NaN',     'NaN',      0,
  0,         'a',        'a',
  { a: 1 },  { a: '1' }, {},
  {}
]
[
  1,          'true',
  true,       15,
  false,      undefined,
  null,       'NaN',
  NaN,        0,
  'a',        { a: 1 },
  { a: '1' }, {}
]
```
