#### 浅拷贝和深拷贝

含义：假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

（1）递归去复制所有层级属性

```javascript
function depClone(obj){
    let oc = Array.isArray(obj)?[]:{};
    if(obj && typeof obj === 'object'){
        for(k in obj){
            if(obj.hasOwnProperty(k)){
                if(obj[k && typeof obj[k] === 'object']){
                    oc[k] = depClone(obj[k]);
                }else {
                    oc[k] = obj[k];
                }
            }
        }
    }
    return oc
}
```

（2）我们还可以借用JSON对象的parse和stringify

```javascript
function deepClone(obj) {
    let _obj = JSON.stringify(obj);
    let objClone = JSON.parse(_obj);
    return objClone;
}
```
