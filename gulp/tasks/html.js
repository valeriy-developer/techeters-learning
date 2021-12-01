const config = require('../config')
const prettify = require('gulp-prettify')
const {src, dest} = require('gulp')
const gulpif = require('gulp-if')
const inject = require('gulp-inject-string')

function html(bs) {
  const replaceCss = 'app.' + config.hash + '.css'

  return src([config.src.templates + '/**/[^_]*.html'])
    .pipe(gulpif(config.production, inject.replace('app.css', replaceCss)))
    .pipe(
      prettify({
        indentSize: 2,
        wrapAttributes: 'auto', // 'force'
        preserveNewlines: false,
        // unformatted: [],
        endWithNewline: true,
      })
    )
    .pipe(dest(config.build.html))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = html
