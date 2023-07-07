const path = require('path');

const moduleName = 'ralph-module-klaviyo';
const nameShort = 'klaviyo';

const defaults = {
  name: moduleName,
  nameShort: nameShort,
  debug: true,
  enabled: true,
  companyId: ''
};

module.exports = async function(moduleOptions) {
  const options = {
    ...defaults,
    ...this.options[moduleName],
    ...moduleOptions
  };

  if (!options.enabled) {
    return false;
  }

  // Add Klaviyo script
  this.options.head.script.push({
    src:
      'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=' +
      options.companyId,
    defer: true
  });

  /*/ Add Klaviyo script for legacy forms
  this.options.head.script.push({
    src: '//www.klaviyo.com/media/js/public/klaviyo_subscribe.js',
    defer: true
  })
  */

  this.addTemplate({
    src: path.resolve(__dirname, 'module.utils.js'),
    fileName: `${moduleName}.utils.js`,
    options
  });

  this.addPlugin({
    src: path.resolve(__dirname, 'module.plugin.js'),
    fileName: `${moduleName}.plugin.js`,
    options
  });

  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),
      prefix: 'Geins',
      extensions: ['vue']
    });
  });

  return true;
};
module.exports.meta = require('../package.json');
