# Spocket
> Socket with easy message encoding and decoding.

Spocket, a drop-in replacement for net's `Socket` class, provides a simplistic and modular way to encode and decode messages through plain JavaScript functions (or npm-hosted algorithms).

```javascript
const example = new Spocket({ ...opts });

// ...

example.on('message', function(data) {
  console.log(data.foo.bar);
});

example.send({
  foo: 123,
  bar: {
    baz: 'Qux!'
  }
});
```

You can also create a `Spocket` from a `Socket`:
```javascript
var example = Spocket.from(socket, { ...opts });
```

## Installation
```shell
$ npm install --save spocket
```

## Usage
```javascript
import Spocket from 'spocket';
```

### `Spocket([opts])` <sub>(extends [`net.Socket`][net-socket])</sub>
The `Spocket` class is _drop-in compatible_ with `net.Socket`, because it actually is a `net.Socket` class with a few additions.  Events, methods, and properties from `net.Socket` all work.
 - `opts` (`Object`) Any of `net.Socket`'s options or `Spocket`'s extras.
 - `opts.encode` (`Function`) A function used to encode messages.
 - `opts.decode` (`Function`) A function used to decode messages.
 - `opts.algo` (`Object`) An alternative algorithm object for encoding and decoding.

Example:
```javascript
new Spocket({
  // An option passed to net.Socket
  writable: false,

  // Encoding and decoding
  encode: function(object) { ... },
  decode: function(buffer) { ... },

  // Algorithm object, alternative to the above.
  algo: websocket,
});
```

#### Event: 'message'
This event is emitted after `'data'` with the decoded message.
 - `data` (Anything) Decoded message.

Example:
```javascript
foo.on('message', function(data) {
  console.log(data.foo.bar);
});
```

#### `Spocket#send(message, [encoding, callback])`
The same as `net.Socket#write` except that `message` gets encoded.

Example:
```javascript
foo.send({
  foo: 123,
  bar: {
    baz: 'Qux!',
  },
})
```

#### `Spocket.from(socket, options)`
Turn a `net.Socket` into a `Spocket`.
 - `socket` (`net.Socket`) A [`net.Socket`][net-socket] to create the `Spocket` from.
 - `options` (`Object`) The new `Spocket`'s options.

Example:
```javascript
net.createServer(function(socket) {
  var client = Spocket.from(socket, { ...opts });
  // ...
});
```
(See [`dap`][dap] for creating Spocket-based servers)

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

## License
[MIT](LICENSE) &copy; Jamen Marzonie

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
  [net-socket]: https://nodejs.org/api/net.html#net_class_net_socket
  [dap]: https://github.com/devjs/dap
