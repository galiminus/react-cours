envify = require('envify/custom')
webpack = require("webpack")
const path = require('path');

module.exports = {
  context: __dirname + "/source",
  entry: {
    javascript: "./application.js",
    html: "./index.html"
  },
  output: {
      path: __dirname + "/build",
      filename: "/application.js"
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'source', 'source/images'],
    fallback: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
          test: /\.js$/,
          loaders: ['babel-loader'],
          include: [new RegExp(path.join(__dirname, 'source')), new RegExp(path.join(__dirname, 'tests'))]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }
    ],
  },
  preLoaders: [
     {
         test: /\.js$/,
         loaders: ['eslint'],
         include: [new RegExp(path.join(__dirname, 'source'))]
     }
  ],
  eslint: {
    failOnError: false,
    failOnWarning: false
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
