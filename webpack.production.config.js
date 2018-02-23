const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let UglifyJSPlugin = require('Uglifyjs-webpack-plugin')  //压缩js文件
let CleanWebpackPlugin = require('clean-webpack-plugin')  //清除打包目录中的文件
let ExtractTextPlugin = require('extract-text-webpack-plugin')  //将css从js中抽取c出来，形成新的css文件
let webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  //入口
  entry: {
    app: [
      path.resolve(__dirname,'app/index.js')
    ],
    vendor: ['react','react-router-dom','redux','react-dom','react-redux']
  },

  //输出
  output: {
    path: path.resolve(__dirname,'bulid'),
    // publcPath: '/images/', // 指定打包的时候静态资源的路径
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  //模块加载
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8189
          }
        }]
      }
    ]
  },
  plugins: [

    /**
     * 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使
     * 调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体
     * 用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
     */
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('production')
    }),

    //指定渲染模板
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    //提取公共代码为vendor.js文件
    new webpack.optimize.CommonsChunkPlugin({name:'vendor'}),

    new UglifyJSPlugin(),

    new CleanWebpackPlugin(['bulid']),
    
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true
    })
  ],

  //文件路径的别名
  resolve: {
    alias: {
      'pages': path.resolve(__dirname,'app/pages'),
      'components': path.resolve(__dirname,'app/components'),
      'router': path.resolve(__dirname,'app/router'),
      'actions': path.resolve(__dirname,'app/redux/actions'),
      'reducers': path.resolve(__dirname,'app/redux/reducers')
    }
  }
}