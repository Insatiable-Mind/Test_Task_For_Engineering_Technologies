module.exports = {
  entry: './scripts/main.js',

  output: {
    filename: './scripts/app.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader" }
    ]
  }
};