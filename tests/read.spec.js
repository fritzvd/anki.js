var test = require('tape')
var ankijs = require('../src/index.js')
var fs = require('fs')

test('testing reading out of the decks', function (t) {
    t.plan(3)
    var apkgfile = fs.readFileSync(__dirname + '/example.apkg')
    var anki = ankijs.read(apkgfile)

    t.assert(anki.getDecks().name, 'Default')
    t.assert(anki.getDecks().subdecks.length, 2)
    t.assert(anki.getDecks().subdecks[0].notes.length, 2)
})

test('testing reading the notes', function (t) {
    t.plan(2)
    var apkgfile = fs.readFileSync(__dirname + '/example.apkg')
    var anki = ankijs.read(apkgfile)
    
    var notes = [
        { front: 'Test it', back: 'It works' },
        { front: 'Another', back: 'Test' } 
    ]
    t.assert(anki.getNotesFromDeck(1509107872731)[0].front, notes[0].front)
    t.assert(anki.getNotesFromDeck(1509107872731)[0].back, notes[0].back)
})

test('testing reading the cards', function (t) {
    t.plan(1)
    var apkgfile = fs.readFileSync(__dirname + '/example.apkg')
    var anki = ankijs.read(apkgfile)
    var card = [ 1509107877200,
        1509107860914,
        1509107872731,
        0,
        1509107877,
        -1,
        0,
        0,
        144,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        '' ]
    t.deepEquals(anki.getCardsFromDeck(1509107872731)[0], card)
    // t.assert(anki.getCardsFromDeck(1509107872731)[0])
})