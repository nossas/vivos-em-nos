const { join } = require('path')
const ExtractText = require('extract-text-webpack-plugin')

const setup = require('./setup')

const dist = join(__dirname, '../dist')

const s3BucketName = process.env.AWS_BUCKET || 'vivo-em-nos-staging'

module.exports = (env) => {
  const isProd = env && env.production

  return {
    entry: {
      app: './src/client.js',
      vendor: [
        // pull these to a `vendor.js` file
        'preact',
        'lodash'
      ],
    },
    output: {
      path: dist,
      filename: '[name].[hash].js',
      publicPath: isProd ? `https://vivosemnos.org/` : '/',

    },
    resolve: {
      alias: {
        // you may need `preact-compat` instead!
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'react-redux': 'preact-redux',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          // exclude: exclude,
          include: /src|node_modules\/preact-material-components|node_modules\/@material/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(sass|scss)$/,
          use: isProd ? ExtractText.extract({
            fallback: 'style-loader',
            loader: 'css-loader!postcss-loader!sass-loader',
          }) :
          [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: setup(isProd),
    devtool: !isProd ?
    // Produces an external source map (lives next to bundle output files).
    'source-map'
    // Produces no source map.
    : 'hidden-source-map',
    devServer: {
      contentBase: dist,
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
    },
  }
}
