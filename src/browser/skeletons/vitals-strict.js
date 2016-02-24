/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - STRICT METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

// INSERT browser/helpers/export.js

(function(undefined) {


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/helpers/clone-obj.js
// INSERT methods/helpers/in-str.js
// INSERT methods/helpers/is.js
// INSERT methods/helpers/match.js
// INSERT methods/helpers/merge.js
// INSERT methods/helpers/new-error-maker.js
// INSERT methods/helpers/own.js
// INSERT methods/helpers/slice-arr.js
// INSERT methods/helpers/split-keys.js
// INSERT methods/is.js


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
    create: create,
    freeze: freeze,
    seal:   seal
  };
})() // close methods iife (do not add semicolon)
);   // close export iife
