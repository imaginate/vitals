/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - BASE JS METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript utility library designed for simplicity, readability,
 *   elegance, performance, and reliability.
 * @version 2.0.0
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


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT _helpers/own.js
// INSERT _helpers/inObj.js
// INSERT _helpers/inArr.js
// INSERT _helpers/inStr.js
// INSERT _helpers/match.js
// INSERT _helpers/merge.js
// INSERT _helpers/errorAid.js
// INSERT _helpers/splitKeys.js


// *****************************************************************************
// SECTION: BASE JS METHODS
// *****************************************************************************

// INSERT methods/slice.js
// INSERT methods/clone.js
// INSERT methods/cut.js
// INSERT methods/each.js
// INSERT methods/fill.js
// INSERT methods/fuse.js
// INSERT methods/get.js
// INSERT methods/has.js
// INSERT methods/remap.js
// INSERT methods/until.js


// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  clone:  clone,
  cut:    cut,
  each:   each,
  fill:   fill,
  fuse:   fuse,
  get:    get,
  has:    has,
  remap:  remap,
  slice:  slice,
  until:  until
};
