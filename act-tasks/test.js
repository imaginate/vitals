/**
 * -----------------------------------------------------------------------------
 * ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ act test` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var cp = require('child_process');
var is = require('node-are').is;
var log = require('log-ocd')();
var fuse = require('node-vitals')('fuse');

log.error.setConfig({
  'throw': false,
  'exit':  true
});

exports['desc'] = 'run vitals unit tests';
exports['value'] = 'vitals-method';
exports['default'] = '-method';
exports['methods'] = {
  'method': {
    'desc': 'unit tests for one method',
    'value': 'vitals-method',
    'method': methodTests
  },
  'methods': {
    'desc': 'unit tests for all methods',
    'method': methodsTests
  },
  'section': {
    'desc': 'unit tests for one section',
    'value': 'vitals-section',
    'method': sectionTests
  },
  'sections': {
    'desc': 'unit tests for all sections',
    'method': sectionsTests
  },
  'browser': {
    'desc': 'unit tests for all browser versions',
    'method': browserTests
  }
};
exports['done'] = false; // turn auto complete logs off
