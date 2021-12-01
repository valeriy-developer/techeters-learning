const path = require('path')
const EntrypointsPlugin = require('emotion-webpack-entrypoints-plugin')

function createConfig(env) {
  const isProduction = env === 'production'

  const devName = '[name].js'
  const buildName = '[name].[contenthash:8].js'

  const filename = env === 'production' ? buildName : devName

  if (env === undefined) {
    env = process.env.NODE_ENV
  }

  const webpackConfig = {
    entry: {
      app: path.resolve(__dirname, 'src/js/app.js'),
    }, // If you need support IE11
    output: {
      filename,
      path: path.resolve(__dirname, 'build/js/'),
      publicPath: './js/',
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/js'),
        '@core': path.resolve(__dirname, 'src/js/core'),
      },
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            ignorePattern: __dirname + '/src/js/lib/',
            formatter: require.resolve('eslint-formatter-pretty'),
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.glsl$/,
          exclude: '/node_modules/',
          loader: 'webpack-glsl-loader',
        },
      ],
    },
    mode: isProduction ? 'development' : 'production',
    devtool: !isProduction ? 'eval-cheap-module-source-map' : false,
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    },
    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
      minimize: isProduction,
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        minSize: 1,
      },
    },
    plugins: [
      new EntrypointsPlugin({
        dir: path.resolve(__dirname, 'src/templates'),
        path: './js',
      }),
    ],
  }

  return webpackConfig
}

module.exports = createConfig
