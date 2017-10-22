'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DotEnv = require('dotenv-webpack')

const PROJECT_ROOT = path.resolve(__dirname)
const PACKAGE_VERSION = String(require('./package.json').version)

module.exports = () => {
  const clientConfig = {
    devtool: 'source-map',
    context: path.join(PROJECT_ROOT, 'src/client'),
    entry: {
      client: []
    },
    output: {
      path: path.join(PROJECT_ROOT, 'dist/public'),
      filename: '[hash].[name].js',
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.PKG_VERSION': JSON.stringify(PACKAGE_VERSION)
      }),
      new DotEnv({ path: path.join(PROJECT_ROOT, './.env')})
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [path.join(PROJECT_ROOT, 'src')],
          query:{
            presets: ["es2015", 'stage-0', 'react'],
            plugins: [],
          }
        },
        {
          test: /\.yaml$/,
          include: path.resolve('data'),
          loader: 'yaml',
        },
        {
          test: /\.(ico)$/,
          loader: "static-loader"
        },
        {
          test: /\.css/,
          use: [
            "style-loader",
            "css-loader"
          ]
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=image/svg+xml'
        },
      ]
    }
  }

  switch(process.env.NODE_ENV){
    case 'development':
      clientConfig.devtool = 'eval'
      clientConfig.output.filename = 'client.js'
      clientConfig.output.publicPath = 'http://localhost:8080/'
      clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      )

      clientConfig.entry.client.push(
        'babel-polyfill',
        'webpack-hot-middleware/client?reload=true',
        './client.js'
      )

      break

    default:
      clientConfig.plugins.push(
        //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor1','vendor2','vendor3','vendor5','vendor6','vendor7','vendor8','vendor9','vendor10','vendor11','vendor12','vendor13','vendor14','vendor15', 'manifest'],
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //   comments: false,
        //   sourceMap: false,
        //   mangle: false
        // }),
        new HtmlWebpackPlugin({
          title: 'Template Title',
          template: path.join(PROJECT_ROOT, 'src/client/index.template.html'),
          inject: 'body',
          filename: path.join(PROJECT_ROOT, 'dist/public/index.html'),
          minify: { collapseWhitespace: true, minifyCSS: true, minifyJS: true},
          favicon: path.join(PROJECT_ROOT,'src/client/favicon.ico')
        }),
        new CopyWebpackPlugin([{
          from: path.join(PROJECT_ROOT, 'src/server.js'),
          to: path.join(PROJECT_ROOT, 'dist/')
        }])
      )

      clientConfig.entry = {
        client: [
          'babel-polyfill',
          './client.js'
        ],
        vendor1: ['react'],
        vendor2: ['react-dom'],
        vendor3: ['reactables'],
        vendor5: ['prop-types'],
        vendor6: ['redux'],
        vendor7: ['react-redux'],
        vendor8: ['redux-saga'],
        vendor9: ['react-router-dom'],
        vendor11: ['lodash'],
        vendor12: ['isomorphic-fetch'],
        vendor13: ['moment'],
        vendor14: ['react-transition-group'],
        vendor15: ['socket.io-client']
      }
      break
  }

  return clientConfig
}
