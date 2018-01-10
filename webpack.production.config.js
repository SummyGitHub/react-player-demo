var path = require('path');
var node_module_dir = path.resolve(__dirname,'node_modules');
module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname,'app/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname,'bulid'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname,'app')
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015','stage-0','react']
        }
      }
    ]
  }
}