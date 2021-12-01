/*eslint-disable*/
const fs = require('fs')
const config = require('../config')
const foldersName = require('../foldersName')

function fontsStyle(cb) {
  const path = foldersName.sourceFolder + '/scss/helpers/fonts-include.scss'

  fs.writeFile(path, '', cb)
  return fs.readdir(config.build.fonts, function (err, items) {
    if (items) {
      let cFontname
      for (let i = 0; i < items.length; i++) {
        let fontname = items[i].split('.')[0]
        // fontname = fontname[0]
        if (cFontname !== fontname) {
          fs.appendFile(
            path,
            '@include font("' +
              fontname +
              '", "' +
              fontname +
              '", "400", "normal");\r\n',
            cb
          )
        }
        cFontname = fontname
      }
    }
  })
  cb()
}

module.exports = fontsStyle
