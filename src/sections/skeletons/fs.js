/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - FILE SYSTEM METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var is = require('node-are').is;
var fs = require('fs');

var copy = {};
var get = {};
var to = {};


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

// INSERT methods/helpers/errorAid.js
// INSERT methods/helpers/isEol.js
// INSERT methods/helpers/normalize.js
// INSERT methods/helpers/own.js


// *****************************************************************************
// SECTION: FILE SYSTEM METHODS
// *****************************************************************************

// INSERT methods/fs/copy.js
// INSERT methods/fs/get.js
// INSERT methods/fs/to.js


// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  copy:   copy,
  get:    get,
  to:     to
};
