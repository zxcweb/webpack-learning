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