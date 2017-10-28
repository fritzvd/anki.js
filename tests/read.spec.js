var test = require('tape')
var ankijs = require('../src/index.js')
var fs = require('fs')

test('testing reading out of the decks', function (t) {
    t.plan(3)
    var apkgfile = fs.readFileSync(__dirname + '/example.apkg')
    var anki = ankijs.read(apkgfile)

    t.equals(anki.getDecks().name,
        'Default',
        'Have name "Default"'
    )
    t.equals(anki.getDecks().subdecks.length,
        2,
        'Have 2 dekcs.'
    )
    t.equals(anki.getDecks().subdecks[0].notes.length,
        2,
        'Subdeck, should have 2 notes'
    )
})

test('testing reading the notes', function (t) {
    t.plan(2)
    var apkgfile = fs.readFileSync(__dirname + '/example.apkg')
    var anki = ankijs.read(apkgfile)
    
    var notes = [
        { front: 'Test it', back: 'It works' },
        { front: 'Another', back: 'Test' } 
    ]
    t.equals(anki.getNotesFromDeck(1509107872731)[0].front,
        notes[0].front,
        'front note should be filled'
    )
    t.equals(anki.getNotesFromDeck(1509107872731)[0].back,
        notes[0].back,
        'back note should be filled'
    )
})

test('testing reading the cards', function (t) {
    t.plan(2)
    var apkgfile = fs.readFileSync(__dirname + '/example.apkg')
    var anki = ankijs.read(apkgfile)
    var card = {
        id: 1509107877200,
        nid: 1509107860914,
        did: 1509107872731,
        ord: 0,
        mod: 1509107877,
        usn: -1,
        type: 0,
        queue: 0,
        due: 144,
        ivl: 0,
        factor: 0,
        reps: 0,
        lapses: 0,
        left: 0,
        odue: 0,
        odid: 0,
        flags: 0,
        data: ''
    }
    t.deepEquals(anki.getCardsFromDeck(1509107872731)[0],
        card,
        'Card should resemble the mocked card'
    )
    t.deepEquals(
        Object.keys(anki.getCardsFromDeck(1509107872731)[1]),
        Object.keys(card),
        'Should have the right properties'
    )
})