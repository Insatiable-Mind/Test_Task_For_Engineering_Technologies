const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './scripts/main.js',

  output: {
    filename: './scripts/app.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader" }
    ],

    rules: [{
        test: /\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader"
        }]
    }]
  },

  watch: true,

  plugins: [
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: './'
      }),
  ]
};