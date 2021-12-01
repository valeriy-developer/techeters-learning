const config = require('../config')

const {src, dest} = require('gulp')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const gulpif = require('gulp-if')

function images(bs) {
  return src(config.src.img)
    .pipe(
      gulpif(
        config.production,
        webp({
          quality: 92,
        })
      )
    )
    .pipe(dest(config.build.img))
    .pipe(gulpif(config.production, src(config.src.img)))
    .pipe(
      gulpif(
        config.production,
        imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({quality: 92, progressive: true}),
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.svgo({
            plugins: [{removeViewBox: false}, {cleanupIDs: false}],
          }),
        ])
      )
    )
    .pipe(gulpif(config.production, dest(config.build.img)))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = images
