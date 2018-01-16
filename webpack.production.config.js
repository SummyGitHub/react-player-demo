const path = require('path')
// const node_module_dir = path.resolve(__dirname, 'node_modules')
module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'app/index.js')
    ]
  },
  output: {
<<<<<<< HEAD
    path: path.resolve(__dirname, 'bulid'),
=======
    path: path.resolve(__dirname,'bulid'),
    publcPath: '/images/', // 指定打包的时候静态资源的路径
>>>>>>> dev
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
<<<<<<< HEAD
        include: [
          path.resolve(__dirname, 'app')
        ],
=======
>>>>>>> dev
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
}