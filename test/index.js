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

var client = new Spocket({
  algo: test
});

client.on('message', function(data) {
  console.log(data.toString());
});

client.on('connect', function() {
  client.write('Hello world!');
});

var server = net.createServer(function(socket) {
  var spocket = Spocket.from(socket, { algo: test });
});
server.listen(1337, '127.0.0.1');

client.connect(1337, '127.0.0.1');
