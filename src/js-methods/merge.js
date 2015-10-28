/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - MERGE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.merge]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/merge.js}
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
var has = require('./has.js');


////////////////////////////////////////////////////////////////////////////////
// MERGE
////////////////////////////////////////////////////////////////////////////////

/**
 * Appends an object's properties to an existing object.
 * @private
 * @param {!(Object|function)} dest
 * @param {...?(Object|function)} source
 * @return {!(Object|function)}
 */
function merge(dest, source) {

  /** @type {string} */
  var prop;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is._obj(dest) ) {
    throw new TypeError('Invalid dest param in vitals.merge call.');
  }

  len = arguments.length;
  i = 0;
  while(++i < len) {
    source = arguments[i];
    if (source) {
      if ( !is._obj(source) ) {
        throw new TypeError(
          'Invalid source[' + i + '] param in vitals.merge call.'
        );
      }
      for (prop in source) {
        if ( has(source, prop) ) {
          dest[prop] = source[prop];
        }
      }
    }
  }
  return dest;
}


module.exports = merge;
