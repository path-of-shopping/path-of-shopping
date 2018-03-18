/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    nodeAssets: {
      'simple-css-reset': {
        import: ['reset.css']
      }
    }
  });

  ['eot', 'svg', 'ttf', 'woff', 'woff2'].forEach((ext) => {
    app.import(`node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/fa-solid-900.${ext}`, {destDir: 'webfonts'})
  });

  return app.toTree();
};
