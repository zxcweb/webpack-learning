/**
 * webpack是node语法
 */
const path = require('path');
const webpack = require('webpack');
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
            filename:'css/main.css', // 输出css文件名 
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g, //默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化css的css处理器，默认为cssnano
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
        }),
        // new webpack.ProvidePlugin({ // 在每个模块中注入$
        //     $:'jquery'
        // })
    ],
    externals:{ // 不需要打包的模块
        jquery:"$"
    },
    module:{ //处理模块
        rules:[ // 规则 
            {
                test:/\.html$/,
                // 解决html中图片路径问题
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/i,
                // 可以做一个限制，当图片小于多少k时，用base64来转化
                // 否则用file-loader产生真是图片
                use:{
                    loader:'url-loader',
                    options:{
                        limit:1*1024,
                        outputPath:'img/',
                        publicPath:'http://www.baidu.com'
                    }
                }
            },
            {
                test:require.resolve('jquery'),
                use:'expose-loader?$!'
            },
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',
            //         options:{
            //             enforce:'pre'// 强制改变顺序
            //         }
            //     },
            // },
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
        path:path.resolve(__dirname,'dist'), //必须是一个绝对路径
        // publicPath:'http://www.baidu.com/'
    }
}