const { environment } = require('@rails/webpacker');
const path = require('path');

environment.append('resolve', {
  alias: {
    '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
  }
});

module.exports = environment;
