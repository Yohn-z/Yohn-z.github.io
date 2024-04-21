### 什么是OpenApi
1、OpenAPI规范，也称作OAS，是一种API文档标准
2、OpenAPI以前被称为Swagger
3、Swagger 规范已于2015 年捐赠给 Linux 基金会后改名为 OpenAPI，并定义最新的规范为 OpenAPI 3.0
### OpenAPI相关资料
1、OpenAPI规范信息如下：
![20240422014105](http://oss.yohn-z.cn/img/20240422014105.png)
2、OpenAPI文章可查看 [OpenAPI官网](https://www.openapis.org/) 或  [OpenAPI 规范（中文）](https://openapi.apifox.cn/)
3、实时预览OpenAPI在线编辑的效果，可以尝试使用  [Swagger Editor](https://editor.swagger.io/)
![20240422014130](http://oss.yohn-z.cn/img/20240422014130.png)
4、[Swagger Editor](https://editor.swagger.io/) 生成代码
![20240422014146](http://oss.yohn-z.cn/img/20240422014146.png)
### 如何解析 Swagger / OpenAPI
##### 1、umijs/plugin-openapi 插件
umijs封装了一个openapi插件，通过输入一个 openapi 的规范文件，就可以完成自动化创建 service（API接口代码）以及Mock模拟请求和数据。相关文档可查看 [OpenAPI - Ant Design Pro](https://pro.ant.design/zh-CN/docs/openapi/)，简单使用流程如下：
引入一个 openAPI 的插件，在Ant Design Pro V5中自带了该插件，其他版本请使用如下方式引入
```
yarn add @umijs/plugin-openapi
 
// npm
npm i @umijs/plugin-openapi --save
```
然后在 config/config.ts 中配置 openAPI 的相关配置。
```
openAPI: {
   requestLibPath: "import { request } from 'umi'",
   // 或者使用在线的版本
   // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
   schemaPath: join(__dirname, 'oneapi.json'),
   mock: true,
}
```
注：mock配置为 true 之后会自动生成一些 mock 的文件。
还需要在 package.json 的 scripts 中增加一个命令。
```
"openapi": "umi openapi",
```
执行 npm run openapi 来生成相关的接口和文档。
生成的API接口代码存放在services目录下，接口请求代码相关说明请参考 [UMI MAX Request](https://umijs.org/docs/max/request)。
TS类型文件（typings.d.ts）：
![20240422014304](http://oss.yohn-z.cn/img/20240422014304.png)
接口请求代码（xxxControll.ts）：
![20240422014332](http://oss.yohn-z.cn/img/20240422014332.png)
mock配置为 true 后，执行 npm run openapi  会生成mock文件，mock文件规范可参考 [UMI MOCK](https://umijs.org/docs/guides/mock)。
![20240422014410](http://oss.yohn-z.cn/img/20240422014410.png)
可以访问 /umi/plugin/openapi 来查看文档：
![20240422014544](http://oss.yohn-z.cn/img/20240422014544.png)

另外，openapi文档可通过 [Swagger Editor](https://editor.swagger.io/) 编写，或通过[Apifox](https://link.juejin.cn/?target=https%3A%2F%2Fwww.apifox.cn%2F) 进行可视化编辑。
##### 2、本地化工具生成
OpenApi社区开源了OpenApi Generator，我们可以通过 OpenAPI Generator，通过提供OpenAPI 规范(上文提到的OAS2和OAS3)来自动生成 API 客户端库、文档及配置。
比如我们前端依赖axios作为请求库，那么我们可以通过指定类型来生成ts+axios的请求相关的代码，具体可查阅[openapi-generator](https://github.com/openapitools/openapi-generator)。
如果不熟悉前端，但又有生成其他代码的需求如Go、Java，则可推荐使用 [Apifox](https://link.juejin.cn/?target=https%3A%2F%2Fwww.apifox.cn%2F) 。
> Apifox 不仅支持mock功能和接口调试，还支持代码生成，代码生成引擎使用的也就是我们提到的openapi-generator，可以根据接口/模型定义，自动生成各种语言/框架（如 TypeScript、Java、Go、Swift 等130 种语言及框架）的业务代码，比如接口请求代码

Apifox界面如下
![20240422014559](http://oss.yohn-z.cn/img/20240422014559.png)

可以修改参数类型
![20240422014612](http://oss.yohn-z.cn/img/20240422014612.png)
导出为OpenAPI格式文档
![20240422014627](http://oss.yohn-z.cn/img/20240422014627.png)
生成代码
![20240422014644](http://oss.yohn-z.cn/img/20240422014644.png)
可生成多种类型的请求接口代码/业务代码
![20240422014700](http://oss.yohn-z.cn/img/20240422014700.png)
