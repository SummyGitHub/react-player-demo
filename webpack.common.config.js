const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
  entry: {
    app: [
      path.join(__dirname, 'app/index.js')
    ],
    vendor: ['react','react-router-dom','redux','react-dom','react-redux']
  },
  output: {
    path: path.join(__dirname, './bulid'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  }
}