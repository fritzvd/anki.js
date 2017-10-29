# anki.js

Helper library for working with anki's apkg files.

# Install
Install through npm 
```
npm install anki.js
```

in your js file include through
```js
var anki = require('anki.js')
```

## API
The api is now a mapping on the sqlite database that is the core of an APKG package.

To read the cards/notes/decks etc, it is expected that the user figures out a way to open, download or store the file into a Buffer that can be fed to the [anki.read](#anki.read) function.

### anki.read(openedFile)
openedFile is expected to be a file that is loaded into a Buffer
returns an Anki object

### anki.Anki.getDecks()
returns all decks available to this exported file

TODO: still needs to be able to export different decks in one go..


