/**
 * -----------------------------------------------------------------------------
 * VITALS TESTS: BASE SETUP
 * -----------------------------------------------------------------------------
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

// appends global helpers
require('./helpers/basics');
require('./helpers/display');

/** @type {!Object} */
var retrieve = require('../helpers/retrieve');

/**
 * @global
 * @type {!Object}
 */
global.assert = require('assert');

/**
 * @global
 * @type {!Object}
 */
global.vitals = {};

each(retrieve.dirpaths('test'), function(section) {
  each(retrieve.filepaths('src/' + section, {
    invalidNames: '_*|index',
    validExts:    'js'
  }), function(method) {
    method = method.replace(/\.js$/, '');
    global.vitals[method] = require('../src/' + section + '/' + method);
  });
});
