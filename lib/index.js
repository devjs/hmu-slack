'use strict';

const plugin = require('hmu-plugin')('slack');
const https = require('https');
const color = plugin.c;

module.exports = function slack(teams) {
  teams.forEach(team => {
    plugin.status(`https://${team}.slack.com`, 404, https)
      .then(available => {
        plugin.log(`${team} ${available ? color.green('available') : color.red('unavailable')}`);
      }, plugin.error);
  });
};
