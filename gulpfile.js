const browsersync = require('browser-sync').create()
const gulp = require('gulp')
const del = require('del')

const config = require('././gulp/config')

const server = require('./gulp/tasks/server').bind(null, browsersync)
const html = require('./gulp/tasks/html').bind(null, browsersync)
const css = require('./gulp/tasks/css').bind(null, browsersync)
const js = require('./gulp/tasks/js').bind(null, browsersync)
const fonts = require('./gulp/tasks/fonts').bind(null, browsersync)
const images = require('./gulp/tasks/images').bind(null, browsersync)
const staticFiles = require('./gulp/tasks/static').bind(null, browsersync)

const fontsInclude = require('./gulp/tasks/fontsInclude')

function wpBuild(done) {
  config.setEnv('production')
  config.logEnv()
  done()
}

function wpDev(done) {
  config.setEnv('development')
  config.logEnv()
  done()
}

function watchFiles() {
  gulp.watch([config.watch.css], css)
  gulp.watch([config.watch.js], js)
  gulp.watch([config.watch.img], images)
  gulp.watch([config.watch.static], staticFiles)
  gulp.watch([config.watch.html], html)
}

function clean() {
  return del(config.clean)
}

const build = gulp.series(
  clean,
  wpBuild,
  gulp.parallel(css, images, fonts, staticFiles),
  js,
  html
)

const dev = gulp.series(
  clean,
  gulp.parallel(css, images, fonts, staticFiles),
  js,
  html
)

const watch = gulp.series(wpDev, gulp.parallel(dev, watchFiles, server))

exports.fonts = fonts
exports.images = images
exports.static = staticFiles
exports.js = js
exports.css = css
exports.html = html
exports.fi = fontsInclude
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch
