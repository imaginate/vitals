/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS SETUP: HELPERS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

// GENERAL HELPERS
global.is = require('../helpers/is');
global.log = require('../helpers/log');
global.isDir = require('../helpers/is-directory');
global.merge = require('../helpers/merge');
global.assert = require('assert');
global.freeze = require('../helpers/freeze');
global.hasOwn = require('../helpers/has-own');
global.hasVal = require('../helpers/has-val');
global.isFile = require('../helpers/is-file');
global.setEol = require('../helpers/set-eol');
global.hasEnum = require('../helpers/has-enum');
global.isBuffer = require('../helpers/is-buffer');
global.sliceArr = require('../helpers/slice-arr');
global.getPrototype = require('../helpers/get-prototype');
global.getDescriptor = require('../helpers/get-descriptor');

// ERROR HELPERS
global.validErr = require('../helpers/valid-err');
global.validSetErr = require('../helpers/valid-set-err');
global.validTypeErr = require('../helpers/valid-type-err');
global.validRangeErr = require('../helpers/valid-range-err');

// REFERENCE HELPERS
global.VERSION = require('../helpers/parse-version')(process.version);

// FILE SYSTEM HELPERS
global.DUMMY = {};
global.DUMMY.base = './test/dummy';
global.DUMMY.content = '// test\n';
global.DUMMY.addBase = require('../helpers/add-dummy-base');
global.mkDummy = require('../helpers/mk-dummy');
global.rmDummy = require('../helpers/rm-dummy');
