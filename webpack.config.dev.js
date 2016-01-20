var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  resolve: {
    alias: {
      components: path.join(__dirname, 'src', 'components'),
      application: path.join(__dirname, 'src'),
      myRedux: path.join(__dirname, 'src', 'myRedux')
    },
    extensions: ['', '.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'], include: path.join(__dirname, 'src') },
      {
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
