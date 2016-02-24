/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: freeze
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = freeze;

var is = require('./is');
var hasOwn = require('./has-own');

/**
 * @private
 * @param {(!Object|function)} obj
 * @return {(!Object|function)}
 */
var ObjectFreeze = (function() {

  if (!Object.freeze) return function freeze(obj) { return obj; };

  try {
    Object.freeze(function(){});
    return Object.freeze;
  }
  catch (err) {
    return function freeze(obj) {
      return is.func(obj) ? obj : Object.freeze(obj);
    };
  }
})();

/**
 * @param {(!Object|function)} obj
 * @param {boolean=} deep
 * @return {(!Object|function)}
 */
function freeze(obj, deep) {
  if ( !is.obj(obj) && !is.func(obj) ) throw new TypeError('invalid obj');
  return deep ? deepFreeze(obj) : ObjectFreeze(obj);
}

/**
 * @private
 * @param {(!Object|function)} obj
 * @return {(!Object|function)}
 */
function deepFreeze(obj) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  for (key in obj) {
    if ( hasOwn(obj, key) ) {
      val = obj[key];
      if ( is.obj(val) || is.func(val) ) deepFreeze(val);
    }
  }
  return ObjectFreeze(obj);
}
