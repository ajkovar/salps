App = ->
  console.log('app initialized')

module.exports = App

App.prototype.beep = ->
  console.log('boop')
