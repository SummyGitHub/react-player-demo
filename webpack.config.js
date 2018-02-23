let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let autoprefixer = require('autoprefixer')
module.exports = {
  entry: {
    app:[ 
      // 'babel-polyfill',
      // 'webpack/hot/dev-server', //自动更新
      // 'webpack-dev-server/client?http://localhost:8080', //自动更新
      'react-hot-loader/patch',
      path.resolve(__dirname,'app/index.js')
    ],
    vendor: ['react','react-router-dom','redux','react-dom','react-redux']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js', //利用hash来实现缓存更改自动更新
    chunkFilename: '[name].[chunkhash].js' //将一个大的js文件变成多个chunk片段 这里使用chunkhash代替hash是为了解决
  },
  resolve: {
    alias: {
      'pages': path.resolve(__dirname,'app/pages'),
      'components': path.resolve(__dirname,'app/components'),
      'router': path.resolve(__dirname,'app/router'),
      'actions': path.resolve(__dirname,'app/redux/actions'),
      'reducers': path.resolve(__dirname,'app/redux/reducers'),
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      },
      // {
      //   test: /\.jsx?$/,
      //   loader: 'babel-loader',
      //   include: [
      //     path.resolve(__dirname, 'app')
      //   ],
      //   query: {
      //     plugins: ['transform-runtime'],
      //     presets: ['es2015', 'stage-0', 'react']
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },{
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                autoprefixer()  //css浏览器兼容
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },{
        /**
         * url-loader 一般用于将小图片转成base64格式，如此处，小于10000k的图片将使用url-loader直接以base64的形式内联在代码中，可以减少一次http请求。
         * *file-loader用于大图片、其他文件等，url-loader是file-loader的上层封装
         */
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svg2)(\?.+)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'vendor',  //将公共代码都打包到vendor.js中
      }
    ),

    //设定页面模板
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // new webpack.HotModuleReplacementPlugin()  //--hot的另一种表达方式

    //这种配置方式并没有起到作用
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: [autoprefixer({browsers: ['last 2 version']})]
    //   }
    // })
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,  //任意404响应都被代替成index.html
    contentBase: path.join(__dirname,'./bulid'),
    host: '0.0.0.0',
    // hot: true  //--hot的另一种表达方式
    // proxy: {
    //   "/api": "http://localhost:3000"
    // } //若有后端服务
  }
}