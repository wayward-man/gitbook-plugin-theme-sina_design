const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: __dirname + "/theme/index.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname,//打包后的文件存放的地方
        filename: "../../_assets/website/theme.js"//打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
  plugins:[
        new uglify()
    ]
};