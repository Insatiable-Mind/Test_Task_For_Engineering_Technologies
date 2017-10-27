module.exports = {
  entry: './scripts/main.js',

  output: {
    filename: './scripts/app.js',
  },

  watch: true,

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader" },
    ],
};