## webpack安装
- 安装本地webpack
- npm install webpack webpack-cli -D

## webpack可以0配置
- 打包工具 -> 输出打包的文件(js模块)<br>
  默认的入口文件目录 src/index.js<br>
  支持模块化
- 执行 npx webpack 打包文件<br>
  默认打包到 dist/main.js

## 手动配置webpack
- 默认配置文件的名字叫 webpack.config.js
基础配置：
```js
const path = require('path');
module.exports = {
    mode:'development', //模式 production||development
    entry:'./src/index.js', //入口文件位置
    output:{
        filename:'bundle.js', //打包后的文件名
        path:path.resolve(__dirname,'dist') //必须是一个绝对路径
    }
}
```
- 可以在 package.json 中添加 scripts 来修改运行配置
```json
{
  .
  .
  .
+  "scripts": {
+    "test": "echo \"Error: no test specified\" && exit 1",
+    "build": "webpack --config webpack.config.my.js"
+  },
  .
  .
  .
}

```
- webpack开发环境本地服务
  - 执行 npm add webpack-dev-server -D
  - 在webpack.config.js中添加配置
  ```js
  module.exports = {
    ...
    +devServer:{ //开发服务起的配置
    +    port:3000, //端口号
    +    progress:true, //进度条
    +    contentBase:'./dist', //静态服务位置
    +    open:true //在浏览器中自动打开
    +},
    ...
    }
  ```
  - 在package.json中添加配置
  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.my.js",
  + "dev": "webpack-dev-server" 
  },
  ```
- 自动生成html模板
  - 安装 npm install html-webpack-plugin -D
  - webpack.config.js添加配置：
    ```js
    +const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        ...
    +plugins:[
    +    new HtmlWebpackPlugin({
    +        template:'./src/index.html', //引用的模板
    +        filename:'index.html', //打包后文件名
    +        minify:{
    +            removeAttributeQuotes:true, //删除属性的双引号
    +            collapseWhitespace:true, //折叠空行,变成一行
    +        }, 
    +        hash:true, //文件加上hash戳
    +    })
    +],
    ...
    }
    ```
    现在的代码为：<br>
    ```js
    /**
     * webpack是node语法
     */
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        mode:'development', //模式 production||development
        entry:'./src/index.js', //入口文件位置
        devServer:{ //开发服务起的配置
            port:3000, //端口号
            progress:true, //进度条
            contentBase:'./dist', //静态服务位置
            open:true //在浏览器中自动打开
        },
        plugins:[
            new HtmlWebpackPlugin({
                template:'./src/index.html', //引用的模板
                filename:'index.html', //打包后文件名
                minify:{
                    removeAttributeQuotes:true, //删除属性的双引号
                    collapseWhitespace:true, //折叠空行,变成一行
                }, 
                hash:true, //文件加上hash戳
            })
        ],
        output:{
            filename:'bundle.[hash:4].js', //打包后的文件名 生成的文件可添加hash
            path:path.resolve(__dirname,'dist') //必须是一个绝对路径
        }
    }
    ```



