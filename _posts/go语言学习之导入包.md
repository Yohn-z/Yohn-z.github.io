---


## tags: [golang]

**1、导入包**

示例：

```go
package main

import (
    "fmt"
)

func main() {
    fmt.Println("this is a test")
}
```

通过import导入包，结果：

![](http://oss.yohn-z.cn/myblog/2020-1-22-GithubPages+Jekyll%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/20200123011528-498097.png#id=J2dLB&originHeight=43&originWidth=677&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

**2、调用函数时，省去包名**

```go
package main

import (
    . "fmt"
)

//容易导致变量重名操作
func main() {
    Println("this is a test")
}
```

"fmt" 前加一个点（.）结果：

![](http://oss.yohn-z.cn/myblog/go%E8%AF%AD%E8%A8%80%E5%8C%85/20200123012120-852284.png#id=iIbwi&originHeight=44&originWidth=677&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

**3、给包取别名**

```go
package main

//给包取别名
import io "fmt"

func main() {
	io.Println("this is a test")
}
```

import io "fmt"  fmt包别名io 结果：

![](http://oss.yohn-z.cn/myblog/go%E8%AF%AD%E8%A8%80%E5%8C%85/20200123012120-852284.png#id=QcVVF&originHeight=44&originWidth=677&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

**4、_操作， 忽略此包**

有时，用户可能需要导入一个包，但是不需要引用这个包的标识符。在这种情况，可以使用空白标识符_来重命名这个导入：_操作其实是引入该包，而不直接使用包里面的函数，而是调用了该包里面的init函数。

```go
package main

//忽略此包
import _ "fmt"
func main() {

}
```

可能对包和包初始化函数init()不太理解，我摘抄了一段网上对这方面的说法：

> 在某些需求的设计上需要在程序启动时统一调用程序引用到的所有包的初始化函数，如果需要通过开发者手动调用这些初始化函数，那么这个过程可能会发生错误或者遗漏。我们希望在被引用的包内部，由包的编写者获得代码启动的通知，在程序启动时做一些自己包内代码的初始化工作。
>  
> 例如，为了提高数学库计算三角函数的执行效率，可以在程序启动时，将三角函数的值提前在内存中建成索引表，外部程序通过查表的方式迅速获得三角函数的值。但是三角函数索引表的初始化函数的调用不希望由每一个外部使用三角函数的开发者调用，如果在三角函数的包内有一个机制可以告诉三角函数包程序何时启动，那么就可以解决初始化的问题。
>  
> Go 语言为以上问题提供了一个非常方便的特性：init() 函数。
>  
> init() 函数的特性如下：
>  
> - 每个源码可以使用 1 个 init() 函数。
> - init() 函数会在程序执行前（main() 函数执行前）被自动调用。
> - 调用顺序为 main() 中引用的包，以深度优先顺序初始化。
> 
 
> 例如，假设有这样的包引用关系：main→A→B→C，那么这些包的 init() 函数调用顺序为：
>  
> C.init→B.init→A.init→main
>  
> 说明：
>  
> - 同一个包中的多个 init() 函数的调用顺序不可预期。
> - init() 函数不能被其他函数调用。
> 
 


Go 语言包会从 main 包开始检查其引用的所有包，每个包也可能包含其他的包。Go 编译器由此构建出一个树状的包引用关系，再根据引用顺序决定编译顺序，依次编译这些包的代码。

在运行时，被最后导入的包会最先初始化并调用 init() 函数。

通过下面的代码理解包的初始化顺序。

**zyuhn.com/testgo/basic.go**

```go
package main

import (
	"fmt"

	"zyuhn.com/test"
)

func main() {
	test.TestOne()
}

func init() {
	fmt.Println("main init")
}
```

**zyuhn.com/test/test.go**

```go
package test

import (
	"fmt"
)

func TestOne() {
	fmt.Println(11111111111111111)
}

func init() {
	fmt.Println("test1 init")
}
```

其中basic.go调用了test.go中的函数，我们看一下运行basic.go结果：

![](http://oss.yohn-z.cn/myblog/go%E8%AF%AD%E8%A8%80%E5%8C%85/20200123020129-248360.png#id=RYC6x&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- test.go和basic.go中的init()被自动点用了
- 执行顺序 test.init() > main.init() >test.TestOne()

另外记录一些其他的知识

>  
> 1. 同一个folder存在不同package, 编译错误:
> 
 
> D:/go/bin/go.exe build [E:/cgss/src/pkg01]
>  
> can't load package: package pkg01: found packages pkg01 (pkg01.go) and pkg012 (pkg02.go) in E:\cgss\src\pkg01
>  
> 在同一个folder存在多个package, 则加载失败. 即使是main, 也一样
>  
> D:/go/bin/go.exe build [E:/cgss/src/test]
>  
> can't load package: package test: found packages main (cgss.go) and file01 (file01.go) in E:\cgss\src\test
>  
> 2. folder name与package name不同(即package path与package name不同), 则需要使用
> 
 
>     "import alias path"语法, 即:
>  
>     import <package_name> <package_path>
>  
> 否则编译错误: package name不是合法标识符.
>  
> D:/go/bin/go.exe build [E:/cgss/src/test]
>  
> can't load package: package test: found packages main (cgss.go) and file01 (file01.go) in E:\cgss\src\test
>  
> package main
import "fmt"import pkg012 "pkg01"
func main() { fmt.Println(pkg012.PKG_NAME)}

