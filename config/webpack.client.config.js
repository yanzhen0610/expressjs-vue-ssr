const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const base = require('./webpack.base.config');
const isProduction = process.env.NODE_ENV === 'production';
const srcPath = path.resolve(process.cwd(), 'client');

module.exports = merge(base, {
  entry: {
    app: path.join(srcPath, 'client-entry.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    crossOriginLoading: 'anonymous',
    publicPath: '/public/',
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js?[chunkhash]',
    sourceMapFilename: '[name].js.map?[hash]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: !isProduction } },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          },
          'sass-loader',
        ],
      },
    ]
  },

  plugins: [
    new MinifyPlugin({}, {
      comments: false,
    }),
    new WebpackAssetsManifest({
      output: 'manifest.json',
      space: 2,
      publicPath: true,
      integrity: true,
      integrityHashes: ['sha256', 'sha384', 'sha512'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css?[contenthash]',
    }),
  ].concat(
    isProduction
      ? []
      : [
        new webpack.HotModuleReplacementPlugin(),
      ]
  ),
});
