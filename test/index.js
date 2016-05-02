'use strict';

var Spocket = require('..');
var net = require('net');

var test = {
  encode: function(obj) {
    return obj.reverse();
  },

  decode: function(obj) {
    return obj.reverse();
  }
};

var test = new Spocket({
  algo: test
});

test.on('message', function(data) {
  console.log(data.toString());
});

test.on('connect', function() {
  test.write('Hello world!');
});

var server = net.createServer(function(socket) {
  
});

test.connect('localhost:1337');
