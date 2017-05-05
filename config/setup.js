const { join } = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
const SWPrecache = require('sw-precache-webpack-plugin')
const Dashboard = require('webpack-dashboard/plugin')
const Clean = require('clean-webpack-plugin')
const Copy = require('copy-webpack-plugin')
const HTML = require('html-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const uglify = require('./uglify')

const publishS3 = process.env.PUBLISH_S3 || 'false'
const s3BucketName = process.env.AWS_BUCKET || 'vivo-em-nos-staging'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'xxx'
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || 'yyy'
const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID || 'zzz'
const serverDomain = process.env.SERVER_DOMAIN || 'http://localhost:5001'
const graphqlUrl = process.env.GRAPHQL_URL || 'http://localhost:3003/graphql'
const commitSha = process.env.DRONE_COMMIT_SHA || ''
const root = join(__dirname, '..')

module.exports = (isProd) => {
  // base plugins array
  const plugins = [
    new Clean(['dist'], { root }),
    new Copy([{ context: 'src/static/', from: '**/*.*' }]),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      'process.env.SERVER_DOMAIN': JSON.stringify(serverDomain),
      'process.env.GRAPHQL_URL': JSON.stringify(graphqlUrl),
      'process.env.SERVER_DOMAIN': JSON.stringify(serverDomain),
    }),
    new HTML({ template: 'src/index.html' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({ browsers: ['last 2 version'] }),
        ],
      },
    }),
  ]

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.optimize.UglifyJsPlugin(uglify),
      new ExtractText('styles.[hash].css'),
      new SWPrecache({
        cacheId: commitSha,
        filename: 'service-worker.js',
        dontCacheBustUrlsMatching: /./,
        navigateFallback: 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/],
      })
    )

    if (publishS3 === 'true') {
      plugins.push(
        new S3Plugin({
          include: /\.html$|\.js$|\.css$|\.svg$|\.ttf$|\.eot$|\.png$|\.otf|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          s3Options: {
            accessKeyId,
            secretAccessKey,
            region: 'sa-east-1',
          },
          directory: './dist/',
          s3UploadOptions: {
            Bucket: s3BucketName,
          },
          cloudfrontInvalidateOptions: {
            DistributionId: distributionId,
            Items: ['/*'],
          },
        })
      )
    }
  } else {
    // dev only
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new Dashboard()
    )
  }

  return plugins
}
