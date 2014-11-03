/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var App = require('./app.js');
var $ = require('jquery')

var app = new App();

app.beep();

console.log( $(document) );

