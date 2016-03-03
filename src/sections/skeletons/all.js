/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.1.2
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var fs = require('fs');
var cp = require('child_process');


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/helpers/clone-obj.js
// INSERT methods/helpers/escape.js
// INSERT methods/helpers/in-arr.js
// INSERT methods/helpers/in-obj.js
// INSERT methods/helpers/in-str.js
// INSERT methods/helpers/is.js
// INSERT methods/fs/helpers/is.js
// INSERT methods/helpers/match.js
// INSERT methods/helpers/merge.js
// INSERT methods/helpers/new-error-maker.js
// INSERT methods/helpers/normalize.js
// INSERT methods/helpers/own.js
// INSERT methods/helpers/own-enum.js
// INSERT methods/helpers/slice-arr.js
// INSERT methods/helpers/slice-str.js
// INSERT methods/helpers/split-keys.js


// *****************************************************************************
// SECTION: BASE METHODS
// *****************************************************************************

// INSERT methods/is.js
// INSERT methods/copy.js
// INSERT methods/cut.js
// INSERT methods/each.js
// INSERT methods/fill.js
// INSERT methods/fuse.js
// INSERT methods/get.js
// INSERT methods/has.js
// INSERT methods/remap.js
// INSERT methods/roll.js
// INSERT methods/same.js
// INSERT methods/slice.js
// INSERT methods/to.js
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
// INSERT methods/fs/is.js
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
  is:     is,
  remap:  remap,
  roll:   roll,
  run:    run,
  same:   same,
  seal:   seal,
  slice:  slice,
  to:     to,
  until:  until
};
