var zip = require('zip')
var sql = require('sql.js')
var Anki = require('./anki')

function ankiRead (ankiFile) {
  if (!ankiFile) {
    err('File is empty or invalid')
  }

  var reader = zip.Reader(ankiFile)

  var db

  reader.forEach(function (entry) {
    if (entry.getName() == 'collection.anki2'){
      var buf = entry.getData()
      db = new sql.Database(new Uint8Array(buf))
    }
  })
  return Object.create(Anki.prototype, {
    db: {
      value: db
    }
  })
  
}

module.exports = ankiRead;