const path = require('path');

// Import Mixins to export
// const { default: MyMixin } = require('./components/mixins/MyMixin');

// Change this to match your module name
const moduleName = 'ralph-module-klaviyo';
const nameShort = 'klaviyo';

const defaults = {
  name: moduleName,
  nameShort: nameShort,
  debug: true,
  companyId: '',
  apiKey: '',
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

  console.log('MODULE options', options);
  
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
  })
  
  
  this.addPlugin({
    src: path.resolve(__dirname, 'module.plugin.js'),
    fileName: `${moduleName}.plugin.js`,
    options
  });
  /*
  // Add Mixins
  this.nuxt.hook('vue:extend', Component => {
    Component.mixin(MyMixin);
  });
  */


  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),      
      prefix: 'Geins',
      extensions: ['vue']
    });
  });

  /*
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),      
      prefix: 'my',
      extensions: ['js']
    });
  });
*/

  return true;
};
module.exports.meta = require('../package.json');

// Export Mixins
// module.exports.MyMixin = MyMixin;
