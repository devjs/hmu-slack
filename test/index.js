var test = require('ava');
var hmu = require('hmu-core');
var slack = require('../lib');

test('available', function(t) {
  hmu([
    {
      plugin: slack,
      input: ['test', 'foobarbaz'],
      options: {}
    }
  ]).then(function(results) {
    var expected = [
      ['slack', 'test', 'unavailable'],
      ['slack', 'foobarbaz', 'available']
    ];
    t.deepEqual(results, expected);
  });
});
