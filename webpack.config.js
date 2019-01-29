const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: __dirname + "/src/index.ts", //ビルドするファイル
  output: {
    path: __dirname + '/dist', //ビルドしたファイルを吐き出す場所
    filename: 'bundle.js' //ビルドした後のファイル名
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  target: 'node',
  externals: [nodeExternals()], // exporess関係でビルド時WARNINGが出る対策&ビルドスピードアップ
}