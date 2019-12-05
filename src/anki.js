function Anki (name) {
  this.name = name
}

Anki.prototype.getDecks = function () {
  if (this.decks) {
    return this.decks
  }
  var q = this.db.exec('SELECT decks from col')
  var getNotesFromDeck = this.getNotesFromDeck.bind(this)

  var du = JSON.parse(q[0].values[0][0])
  var keys = Object.keys(du)
  this.decks = {
    name: du[keys[0]].name,
    subdecks: keys.slice(1).map(function (key) {
      return {
        name: du[key].name,
        did: key,
        get notes() {
          if (this._notes === undefined) {
            this._notes = getNotesFromDeck(key)
          } 
          return this._notes
        },
      }
    })
  }
  return this.decks
}

Anki.prototype.getNotesFromDeck = function (key) {
  var q = this.db
    .exec(`SELECT flds from notes where id in (SELECT nid from cards where did = ${key})`
    )[0].values
    .map(function (item) {
      return {
        front: item[0].split('\u001f')[0],
        back: item[0].split('\u001f')[1]
      }
    })
  return q
}

Anki.prototype.getCardsFromDeck = function (key) {
  var q = this.db.exec(
    `SELECT * from cards where did = ${key}`
  )
  var result = q[0].values
    .map(function (item, i) {
      var thing = {}
      item.map(function (inner, j) {
        thing[q[0].columns[j]] = inner
      })
      
      return thing
    })
  return result
}

module.exports = Anki