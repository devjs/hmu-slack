'use strict';
var Promise = require('bluebird');
var request = require('request');
var routine = require('promise-routine');

module.exports = function slack(input) {
  var getStatus = function getStatus(team) {
    return new Promise(function(resolve) {
      request('https://' + team + '.slack.com', function(_, res) {
        var available = (res.statusCode === 404 ? 'free' : 'taken');
        resolve(['slack', team, available]);
      });
    });
  };

  return routine(getStatus, input);
};
