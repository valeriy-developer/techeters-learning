const config = require('../config')

const {src, dest} = require('gulp')
const gulpif = require('gulp-if')

function images(bs) {
  return src(config.src.img)
    .pipe(dest(config.build.img))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = images