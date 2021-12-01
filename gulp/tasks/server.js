// const browsersync = require('browser-sync').create()
const foldersName = require('../foldersName')

function browserSync(bs) {
  bs.init({
    server: {
      baseDir: './' + foldersName.projectFolder + '/'
    },
    port: 8080,
    notify: false
  })
}

module.exports = browserSync
