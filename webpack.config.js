var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    app:[ 
      'babel-polyfill',
      'webpack/hot/dev-server', //自动更新
      'webpack-dev-server/client?http://localhost:8080', //自动更新
      path.resolve(__dirname,'app/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname,'bulid'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname,'app')
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015','stage-0','react']
        }
      },{
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
      },{
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  plugins: [
    //提取公共代码
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'react',
        filename: 'react.js'
      }
    )
  ]
}