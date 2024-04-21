---


## tags: [golang]

在Go语言中，对于字符串的拼接处理有很多种方法，以下列举我收集到的集中方法

**方法一：+号拼接**

```go
func StringSplicing() string{
    var s string
    s+="go" + "lang"
    s+="语言"+"学习"
    return s
}
```

**方法二：fmt 拼接**

```go
func StringSplicing() string{
    return fmt.Sprint("go","lang","语言",学习")
}
```

**方法三：使用strings.Join函数进行拼接**

```go
func StringSplicing() string{
	s:=[]string{"go","lang","语言","学习"}
	return strings.Join(s,"")
}
```

**方法四：buffer 拼接**

这种被用的也很多，使用的是bytes.Buffer进行的字符串拼接，它是非常灵活的一个结构体，不止可以拼接字符串，还是可以byte,rune等，并且实现了io.Writer接口，写入也非常方便。

```go
func StringSplicing() string {
	ss := []string{"sh","hn","test"}
	var buffer bytes.Buffer
	for _, s := range ss {
		fmt.Fprint(&buffer, s)
	}
	return buffer.String()
}
```

**方法五：builder拼接**

为了改进buffer拼接的性能，从go 1.10 版本开始，增加了一个builder类型，用于提升字符串拼接的性能。它的使用和buffer几乎一样。

```go
func StringSplicing() string {	
 	var b strings.Builder
	b.WriteString("func")
	b.WriteString("tion")
	fmt.Fprint(&b," my")
	fmt.Fprint(&b,23333)
	return b.String()
}
```
