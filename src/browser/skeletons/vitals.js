/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 3.0.0-beta.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

// INSERT browser/helpers/export.js

(function(undefined) {


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/helpers/own.js
// INSERT methods/helpers/clone-obj.js
// INSERT methods/helpers/error-aid.js
// INSERT methods/helpers/escape.js
// INSERT methods/helpers/in-arr.js
// INSERT methods/helpers/in-obj.js
// INSERT methods/helpers/in-str.js
// INSERT methods/helpers/is.js
// INSERT methods/helpers/match.js
// INSERT methods/helpers/merge.js
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
// SECTION: END
// *****************************************************************************

  return {
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
    same:   same,
    seal:   seal,
    slice:  slice,
    to:     to,
    until:  until
  };
})() // close methods iife (do not add semicolon)
);   // close export iife