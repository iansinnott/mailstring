const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    react: './src/react.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};
