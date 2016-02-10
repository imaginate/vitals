/**
 * -----------------------------------------------------------------------------
 * ACT TASK: docs
 * -----------------------------------------------------------------------------
 * @file Use `$ act docs` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;



exports['desc'] = 'builds the wiki docs';
exports['value'] = 'method';
exports['default'] = '-build';
exports['methods'] = {
  'build': {
    'desc': 'builds the wiki docs from JSDoc',
    'value': 'method',
    'method': buildDocs
  },
  'version': {
    'desc': 'updates the wiki docs version',
    'method': versionDocs
  }
};
