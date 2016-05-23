var test = require('tape');
var nock = require('nock');
var hmu = require('hmu-core');
var slack = require('.');

test('hmu-slack', function(t) {
  t.plan(1);

  nock('https://foo.slack.com').get('/').reply(200, {});
  nock('https://bar.slack.com').get('/').reply(404, {});

  hmu([{
    plugin: slack,
    input: ['foo', 'bar']
  }]).then(function(output) {
    t.same(output, [
      ['slack', 'foo', 'taken'],
      ['slack', 'bar', 'free']
    ], 'correct output');
  });
});
