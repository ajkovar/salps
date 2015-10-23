App = require('./app.coffee')
$ = require('jquery')
Bacon = require 'baconjs'

console.log Bacon

app = new App()

app.beep()

Bacon.$.asEventStream("click", document).onValue ->
  console.log 'click'

