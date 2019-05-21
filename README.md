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
- 默认配置文件的名字叫 webpack.config.js，基础配置：
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
    <br>
    webpack.config.js
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
    <br>
    package.json

    ```json
    {
        "name": "webpack-learning",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "build": "webpack --config webpack.config.js",
            "dev": "webpack-dev-server"
        },
        "repository": {
            "type": "git",
            "url": "git+https://github.com/zxcweb/webpack-learning.git"
        },
        "author": "",
        "license": "ISC",
        "bugs": {
            "url": "https://github.com/zxcweb/webpack-learning/issues"
        },
        "homepage": "https://github.com/zxcweb/webpack-learning#readme",
        "devDependencies": {
            "html-webpack-plugin": "^3.2.0",
            "webpack": "^4.31.0",
            "webpack-cli": "^3.3.2",
            "webpack-dev-server": "^3.4.1"
        }
    } 
    ```

- webpack 配置css样式
  - 安装 npm install css-loader style-loader -D
  - webpack.config.js中添加配置<br>
    ```js 
    +module:{ //处理模块
    +    rules:[ // 规则 
    +        // css-loader 解析@import语法
    +        // style-loader 把css插入到head的标签中
    +        // loader默认从下往上执行
    +        {
    +            test:/\.css$/,
    +            use:[{
    +                loader:'style-loader',
    +                insertAt:'top'//插入到head上边
    +            },{
    +                loader:'css-loader'
    +            }]
    +        }
    +    ]
    +},
    ```
    - less sass等相同配置
    - 如何抽离css为单独文件
      - 安装 npm install mini-css-extract-plugin -D
      - webpack.config.js配置<br>
        ```js
        plugins:[
            new HtmlWebpackPlugin({
                template:'./src/index.html', //引用的模板
                filename:'index.html', //打包后文件名
                minify:{
                    removeAttributeQuotes:true, //删除属性的双引号
                    collapseWhitespace:true, //折叠空行,变成一行
                }, 
                hash:true, //文件加上hash戳
            }),
        +    new MiniCssExtractPlugin({
        +        filename:'main.css', // 输出css文件名 
        +    })
        ],
        module:{ //处理模块
            rules:[ // 规则 
                // css-loader 解析@import语法
                // style-loader 把css插入到head的标签中
                // loader默认从下往上执行
                {
                    test:/\.css$/,
                    use:[
            +            MiniCssExtractPlugin.loader,
            -            {
            -                loader:'style-loader',
            -                insertAt:'top'//插入到head上边
            -            },

                        {
                            loader:'css-loader'
                        }
                    ]
                }
            ]
        },
        ```        
    - 自动添加浏览器兼容前缀
      - 安装 npm install postcss-loader autoprefixer -D
      - webpack.config.js配置如下：<br>
        ```js
        use:[
            MiniCssExtractPlugin.loader,
            {
                loader:'css-loader'
            },
        +    {
        +        loader:'postcss-loader'
        +    }
        ]
        ```
      - 根目录下添加postcss.config.js,配置如下<br>
        ```js
        module.exports = {
            plugins:[
                require('autoprefixer')
            ]
        }
        ```
    - 压缩css代码 <br>
      - 安装 npm install optimize-css-assets-webpack-plugin -D
      - webpack.config.js配置如下：<br>
        ```js
        plugins:[
            new HtmlWebpackPlugin({
                template:'./src/index.html', //引用的模板
                filename:'index.html', //打包后文件名
                minify:{
                    removeAttributeQuotes:true, //删除属性的双引号
                    collapseWhitespace:true, //折叠空行,变成一行
                }, 
                hash:true, //文件加上hash戳
            }),
            new MiniCssExtractPlugin({
                filename:'main.css', // 输出css文件名 
            }),
        +    new OptimizeCssAssetsPlugin({
        +        assetNameRegExp: /\.css$/g, //默认为/\.css$/g
        +        cssProcessor: require('cssnano'), //用于优化\最小化css的css处理器，默认为cssnano
        +        cssProcessorPluginOptions: {
        +            preset: ['default', { discardComments: { removeAll: true } }],
        +        },
        +    })
        ],
        ```
        目前整体配置如下：<br>
        ```js
        /**
         * webpack是node语法
        */
        const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
        const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
        module.exports = {
            mode:'production', //模式 production||development
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
                }),
                new MiniCssExtractPlugin({
                    filename:'main.css', // 输出css文件名 
                }),
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g, //默认为/\.css$/g
                    cssProcessor: require('cssnano'), //用于优化\最小化css的css处理器，默认为cssnano
                    cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                    },
                })
            ],
            module:{ //处理模块
                rules:[ // 规则 
                    // css-loader 解析@import语法
                    // style-loader 把css插入到head的标签中
                    // loader默认从下往上执行
                    {
                        test:/\.css$/,
                        use:[
                            MiniCssExtractPlugin.loader,
                            {
                                loader:'css-loader'
                            },
                            {
                                loader:'postcss-loader'
                            }
                        ]
                    }
                ]
            },
            optimization: { // 优化项
                minimizer: [
                    new UglifyJsPlugin({
                        cache:true, //是否利用缓存
                        parallel:true, //是否并发打包
                        sourceMap:true 
                    }),
                ],
            },
            output:{
                filename:'bundle.[hash:4].js', //打包后的文件名 生成的文件可添加hash
                path:path.resolve(__dirname,'dist') //必须是一个绝对路径
            }
        }
        ```

- webpack 配置js模块
  - es6转化es5
    - 安装 npm install babel-loader @babel/core @babel/preset-env -D
    - wcj配置如下：<br>
        ```js
        module:{ //处理模块
            rules:[ // 规则 
        +        {
        +            test:/\.js$/,
        +            use:{
        +                loader:'babel-loader',
        +                options:{ // 用babel-loader es6->es5
        +                    presets:[
        +                        '@babel/preset-env'
        +                    ]
        +                }
        +            }
        +        },
                // css-loader 解析@import语法
                // style-loader 把css插入到head的标签中
                // loader默认从下往上执行
                {
                    test:/\.css$/,
                    use:[
                        MiniCssExtractPlugin.loader,
                        {
                            loader:'css-loader'
                        },
                        {
                            loader:'postcss-loader'
                        }
                    ]
                }
            ]
        },
        ```
  - ECAM提案中的内容转化es5
    - 安装 npm install @babel/plugin-proposal-class-properties -D
    - 配置代码如下：<br>
        ```js
        {
            test:/\.js$/,
            use:{
                loader:'babel-loader',
                options:{ // 用babel-loader es6->es5
                    presets:[
                        '@babel/preset-env'
                    ],
        +            plugins:[
        +                '@babel/plugin-proposal-class-properties'
        +            ]
                }
            }
        },
        ```
    - 提案中的内容都有babel插件<br>
      '@babel/plugin-proposal-decorators'// 提案中的装饰器 
  - 支持高级语法的配置（generator函数等）    
    - 安装 npm install @babel/plugin-transform-runtime -D(暂时不讲)
    - 安装 npm install @babel/polyfill --save (不需要-D，生产环境要用)<br>
      在js中引用即可使用<br>
        ```js
        import '@babel/polyfill';
        alert('aaa'.includes("a"));
        ```



- 配置eslint
  - 安装 npm install eslint eslint-loader -D
  - 去[eslint官网](https://cn.eslint.org/demo/)eslint官网下载 .eslintrc.json 文件<br>
    将文件拷贝到根目录下加上.
  - wcj配置如下
    ```js
    {
        test:/\.js$/,
        use:{
            loader:'eslint-loader',
            options:{
                enforce:'pre'// 强制改变顺序
            }
        },
    },
    ```

- 第三方模块引用（全局变量的引入问题，以jQuery为例）
  - 安装jQuery npm install jquery --save
  - 安装 npm install expose-loader --save 为了把$暴漏全局
  - wcj配置如下
    ```js
    +{
    +    test:require.resolve('jquery'),
    +    use:'expose-loader?$!'
    +},
    ```
  - 或者另一种方式在每个模块注入jquery
    - wcj中配置如下
        ```js
        +new webpack.ProvidePlugin({ // 在每个模块中注入$
        +    $:'jquery'
        +})
        ```
  - 或者我们在html中直接引入第三方cdn <br>
    这时候我们需要添加配置让webpack不打包第三方插件jquery<br>
    ```js
    externals:{ // 不需要打包的模块
        jquery:"$"
    },
    ```
    当前所有配置如下：
    ```js
    /**
        * webpack是node语法
    */
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
            }),
            new MiniCssExtractPlugin({
                filename:'main.css', // 输出css文件名 
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g, //默认为/\.css$/g
                cssProcessor: require('cssnano'), //用于优化\最小化css的css处理器，默认为cssnano
                cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
                },
            }),
            new webpack.ProvidePlugin({ // 在每个模块中注入$
                $:'jquery'
            })
        ],
        module:{ //处理模块
            rules:[ // 规则 
                {
                    test:require.resolve('jquery'),
                    use:'expose-loader?$!'
                },
                {
                    test:/\.js$/,
                    use:{
                        loader:'eslint-loader',
                        options:{
                            enforce:'pre'// 强制改变顺序
                        }
                    },
                },
                {
                    test:/\.js$/,
                    use:{
                        loader:'babel-loader',
                        options:{ // 用babel-loader es6->es5
                            presets:[
                                '@babel/preset-env'
                            ],
                            plugins:[
                                ['@babel/plugin-proposal-decorators',{legacy:true}],// 提案中的装饰器 
                                ['@babel/plugin-proposal-class-properties',{loose:true}], // es7提案类属性
                            ]
                        }
                    },
                    include:path.resolve(__dirname,'src'),
                    exclude:/node_modules/
                },
                // css-loader 解析@import语法
                // style-loader 把css插入到head的标签中
                // loader默认从下往上执行
                {
                    test:/\.css$/,
                    use:[
                        MiniCssExtractPlugin.loader,
                        {
                            loader:'css-loader'
                        },
                        {
                            loader:'postcss-loader'
                        }
                    ]
                }
            ]
        },
        optimization: { // 优化项
            minimizer: [
                new UglifyJsPlugin({
                    cache:true, //是否利用缓存
                    parallel:true, //是否并发打包
                    sourceMap:true 
                }),
            ],
        },
        output:{
            filename:'bundle.[hash:4].js', //打包后的文件名 生成的文件可添加hash
            path:path.resolve(__dirname,'dist') //必须是一个绝对路径
        }
    }
    ```