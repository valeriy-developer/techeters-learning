const {src, dest} = require('gulp')
const config = require('../config')
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const groupMedia = require('gulp-group-css-media-queries')
const cleanCss = require('gulp-clean-css')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

function css(bs) {
  return src(config.src.css)
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(
      scss({
        outputStyle: config.production ? 'compressed' : 'expanded',
      }).on('error', scss.logError)
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(cleanCss())
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulpif(config.production, rename('app.' + config.hash + '.css')))
    .pipe(dest(config.build.css))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = css
