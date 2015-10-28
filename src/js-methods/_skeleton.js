/**
 * -----------------------------------------------------------------------------
 * VITALS - METHODS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
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

'use strict';

var is = require('node-are').is;
var are = require('node-are').are;


// *****************************************************************************
// SECTION: METHODS
// *****************************************************************************

// INSERT has.js
// INSERT merge.js
// INSERT slice.js
// INSERT typeOf.js
// INSERT clone.js
// INSERT create.js
// INSERT cut.js
// INSERT each.js
// INSERT fill.js
// INSERT freeze.js
// INSERT get.js
// INSERT remap.js
// INSERT seal.js


module.exports = {
  clone:  clone,
  create: create,
  cut:    cut,
  each:   each,
  fill:   fill,
  freeze: freeze,
  get:    get,
  has:    has,
  merge:  merge,
  remap:  remap,
  seal:   seal,
  slice:  slice
};
