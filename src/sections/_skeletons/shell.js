/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.2.2
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
var cp = require('child_process');


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/_helpers/errorAid.js
// INSERT methods/_helpers/isEol.js
// INSERT methods/_helpers/normalize.js
// INSERT methods/_helpers/sliceArr.js


// *****************************************************************************
// SECTION: SHELL METHODS
// *****************************************************************************

// INSERT methods/run.js


// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  run: run
};
