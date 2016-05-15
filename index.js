'use strict';

var NSocket = require('net').Socket;
var inherits = require('util').inherits;
var pass = function(data) {
  return data;
};

/** The instructible Spocket class.
  * @name Spocket
  * @param {Object} [options] - Socket's options plus some extras.
  * @param {Function} [options.encode] - Function for encoding messages.
  * @param {Function} [options.decode] - Function for decoding messages.
  * @param {Object} [options.algo] - Algorithm for encoding and decoding.
  * @class
  */
function Spocket(options) {
  // Non-new initializtion
  if (!(this instanceof Spocket)) {
    return new Spocket(options);
  }

  // Setup
  NSocket.call(this, options);
  var self = this;

  // Store methods
  this._encode = options.encode || pass;
  this._decode = options.decode || pass;
  if (options.algo) {
    this._encode = options.algo.encode || pass;
    this._decode = options.algo.decode || pass;
  }

  // Emit new data
  this.on('data', function(data) {
    self.emit('message', self._decode(data));
  });
}

// Inherit methods
inherits(Spocket, NSocket);

Spocket.prototype.send = function(data, encoding, callback) {
  return this.write(this._encode(data), encoding, callback);
};

Spocket.from = function(socket, options) {
  var s = new Spocket(options);
  s._handle = socket._handle;
  s.pipe(socket);
  socket.pipe(s);
  return s;
};

module.exports = Spocket;
