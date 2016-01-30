/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var fs = require('fs');
var cp = require('child_process');

var to = {};


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/helpers/cloneObj.js
// INSERT methods/helpers/errorAid.js
// INSERT methods/helpers/escape.js
// INSERT methods/helpers/inArr.js
// INSERT methods/helpers/inObj.js
// INSERT methods/helpers/inStr.js
// INSERT methods/helpers/isEol.js
// INSERT methods/helpers/match.js
// INSERT methods/helpers/merge.js
// INSERT methods/helpers/normalize.js
// INSERT methods/helpers/own.js
// INSERT methods/helpers/ownEnum.js
// INSERT methods/helpers/sliceArr.js
// INSERT methods/helpers/sliceStr.js
// INSERT methods/helpers/splitKeys.js


// *****************************************************************************
// SECTION: BASE METHODS
// *****************************************************************************

// INSERT methods/copy.js
// INSERT methods/cut.js
// INSERT methods/each.js
// INSERT methods/fill.js
// INSERT methods/fuse.js
// INSERT methods/get.js
// INSERT methods/has.js
// INSERT methods/remap.js
// INSERT methods/roll.js
// INSERT methods/slice.js
// INSERT methods/until.js


// *****************************************************************************
// SECTION: STRICT METHODS
// *****************************************************************************

// INSERT methods/amend.js
// INSERT methods/create.js
// INSERT methods/freeze.js
// INSERT methods/seal.js


// *****************************************************************************
// SECTION: FILE SYSTEM METHODS
// *****************************************************************************

// INSERT methods/fs/copy.js
// INSERT methods/fs/get.js
// INSERT methods/fs/to.js


// *****************************************************************************
// SECTION: SHELL METHODS
// *****************************************************************************

// INSERT methods/run.js


// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  amend:  amend,
  copy:   copy,
  create: create,
  cut:    cut,
  each:   each,
  fill:   fill,
  freeze: freeze,
  fuse:   fuse,
  get:    get,
  has:    has,
  remap:  remap,
  roll:   roll,
  run:    run,
  seal:   seal,
  slice:  slice,
  to:     to,
  until:  until
};
