/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.3.8
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

// INSERT browser/helpers/export.js

(function(undefined) {

  'use strict';


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/helpers/cloneObj.js
// INSERT methods/helpers/errorAid.js
// INSERT methods/helpers/escape.js
// INSERT methods/helpers/inArr.js
// INSERT methods/helpers/inObj.js
// INSERT methods/helpers/inStr.js
// INSERT methods/helpers/match.js
// INSERT methods/helpers/merge.js
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
    remap:  remap,
    roll:   roll,
    seal:   seal,
    slice:  slice,
    until:  until
  };
})() // close methods iife (do not add semicolon)
);   // close export iife
