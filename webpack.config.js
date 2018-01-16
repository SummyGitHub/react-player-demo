let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    app:[ 
      // 'babel-polyfill',
      // 'webpack/hot/dev-server', //自动更新
      // 'webpack-dev-server/client?http://localhost:8080', //自动更新
      'react-hot-loader/patch',
      path.resolve(__dirname,'app/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory=true',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIndentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },{
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svg2)(\?.+)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'react',
        filename: 'react.js'
      }
    ),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // new webpack.HotModuleReplacementPlugin()  //--hot的另一种表达方式
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