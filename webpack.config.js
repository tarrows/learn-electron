const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const main = {
  mode: 'development',
  target: 'electron-main',
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [{
      test: /.ts?$/,
      include: [path.resolve(__dirname, 'src')],
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
}

const renderer = {
  mode: 'development',
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src', 'renderer', 'index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'scripts'),
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['ts-loader'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
}

module.exports = [ main, renderer ];
