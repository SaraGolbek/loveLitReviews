const { environment } = require('@rails/webpacker');
const path = require('path');

environment.config.merge({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
    }
  }
});

module.exports = environment;
