const config = require('../config')
const {src, dest} = require('gulp')
const gulpif = require('gulp-if')

function staticFiles(bs) {
  return src(config.src.static, {allowEmpty: true})
    .pipe(dest(config.build.static))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = staticFiles
