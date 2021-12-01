const config = require('../config')
const {src, dest} = require('gulp')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

function fonts() {
  src(config.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(config.build.fonts))
  return src(config.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(config.build.fonts))
}

module.exports = fonts
