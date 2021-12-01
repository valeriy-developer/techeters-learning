const {src, dest} = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const gulpif = require('gulp-if')

const config = require('../config')

// webpack
function js(bs) {
  return src(config.src.js)
    // @ts-ignore
    .pipe(webpackStream(webpackConfig(config.env)), webpack)
    .pipe(dest(config.build.js))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = js
