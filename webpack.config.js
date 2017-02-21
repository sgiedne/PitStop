var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/index.js',
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        options: {
          name: './img/[hash].[ext]',
        }
      }
    ]
  }
};
