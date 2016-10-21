var https = require('https');
var Promise = require('any-promise');
var routine = require('promise-routine');

module.exports = function slack(input) {
  return routine(function getStatus(team) {
    return new Promise(function(resolve, reject) {
      var req = https.request({
        hostname: team + '.slack.com',
        path: '/'
      }, function(resp) {
        resolve(['slack', team, resp.statusCode === 404 ? 'free' : 'taken']);
      });

      req.end();
      req.on('error', e => reject(e));
    });
  }, input);
};
