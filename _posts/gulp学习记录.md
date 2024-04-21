---


## tags: [gulp]

进入指定文件夹使用npm下载gulp `npm install gulp`

创建目录结构

![](http://oss.yohn-z.cn/myblog/gulp/20200201175206-683558.png#alt=1580550725231)

在gulpfile.js下编写代码

```
//引用gulp模块
const gulp = require('gulp')
//使用gulp.task建立任务


gulp.task('first', cb => {
    console.log('gulp执行。。。');
    gulp.src('./src/css/base.css')
        .pipe(gulp.dest('dist/css'));
    cb();
});
```

打开命令行在该文件目录下全局安装gulp-cli `npm install gulp-cli -g`

然后执行 `gulp first`

gulp中一般使用插件来完成任务

![](http://oss.yohn-z.cn/myblog/gulp/20200201180050-768753.png#alt=1580551249378)

使用htmlmin插件

npm install --save gulp-htmlmin

这些安装的插件，都将在package-lock.json中被

存一个插件网址  [gulp插件](https://www.npmjs.com/package)

附上一段较为完整的gulpfile.js代码

```
//引用gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
//使用gulp.task建立任务


gulp.task('first', cb => {
    console.log('gulp执行。。。');
    gulp.src('./src/css/base.css')
        .pipe(gulp.dest('dist/css'));
    cb();
});

//html任务
//html 压缩
//抽取 html公共代码
gulp.task('htmlmin', cb => {
    gulp.src('./src/*.html')
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace : true }))
        .pipe(gulp.dest('dist'));
        cb();
})

//css任务
//less语法转换
//css代码压缩
gulp.task('cssmin', cb => {
    gulp.src(['./src/css/*.less','./src/css/*.css'])
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    cb();
})

//js功能
//1、es6代码转换
//代码压缩
gulp.task('jsmin', cb => {
    gulp.src('./src/js/*.js')
        .pipe(babel({
         presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))

    cb();
})

// 复制文件夹
gulp.task('copy', cb => {

	gulp.src('./src/images/*')
		.pipe(gulp.dest('dist/images'));

	gulp.src('./src/lib/*')
        .pipe(gulp.dest('dist/lib'));
    cb();
        
});

// 构建任务
//gulp.task('default', ['htmlmin', 'cssmin', 'jsmin', 'copy']);


gulp.task('default', gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy', function(done){
	console.log("AB");
	done();
}));
```
