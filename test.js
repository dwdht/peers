var tape = require('tape')
var peers = require('./')

tape('dWeb DHT Peer Tests: Encodes', function (t) {
  t.same(peers.encode([{host: '127.0.0.1', port: 80}]).length, 6)
  t.same(peers.encode([{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]).length, 12)
  t.end()
})

tape('dWeb DHT Peer Tests: encodingLength', function (t) {
  t.same(peers.encodingLength([{host: '127.0.0.1', port: 80}]), 6)
  t.same(peers.encodingLength([{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]), 12)
  t.end()
})

tape('dWeb DHT Peer Tests: Encodes + Decodes', function (t) {
  var a = [{host: '127.0.0.1', port: 80}]
  var b = [{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]
  t.same(peers.decode(peers.encode(a)), a)
  t.same(peers.decode(peers.encode(b)), b)
  t.end()
})

tape('dWeb DHT Peer Tests: Encodes + Decodes + Offset', function (t) {
  var a = [{host: '127.0.0.1', port: 80}]
  var b = [{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]
  t.same(peers.decode(peers.encode(a, Buffer(8), 2), 2), a)
  t.same(peers.decode(peers.encode(b, Buffer(14), 2), 2), b)
  t.end()
})

tape('dWeb DHT Peer Tests: Encodes + Decodes + Offset + End', function (t) {
  var a = [{host: '127.0.0.1', port: 80}]
  var b = [{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]
  t.same(peers.decode(peers.encode(a, Buffer(100)), 0, 6), a)
  t.same(peers.decode(peers.encode(b, Buffer(100)), 0, 12), b)
  t.end()
})

tape('dWeb DHT Peer Tests: Port 0 Not Allowed', function (t) {
  t.plan(1)
  var a = [{host: '127.0.0.1', port: 0}]
  t.throws(function () {
    peers.decode(peers.encode(a))
  })
  t.end()
})

tape('dWeb DHT Peer Tests: Encodes With Peer ID', function (t) {
  var p = peers.idLength(5)
  var a = [{id: Buffer('hello'), host: '127.0.0.1', port: 80}]
  var b = [{id: Buffer('hello'), host: '127.0.0.1', port: 80}, {id: Buffer('world'), host: '127.0.0.1', port: 8080}]

  t.same(p.decode(p.encode(a, Buffer(100)), 0, 11), a)
  t.same(p.decode(p.encode(b, Buffer(100)), 0, 22), b)
  t.end()
})
