/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - TO
 * -----------------------------------------------------------------------------
 * @section base
 * @version 3.0.0-beta
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/wiki/vitals.to}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @toright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorAid = require('./helpers/error-aid.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// TO
////////////////////////////////////////////////////////////////////////////////

var to = (function toPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.string    (to.str)
  // - to.number    (to.num)
  // - to.boolean   (to.bool)
  // - to.array     (to.arr)
  // - to.regexp    (to.re|to.regex)
  // - to.upperCase (to.upper)
  // - to.lowerCase (to.lower)
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  var to = {};

  /**
   * Converts a value to a string.
   *
   * @public
   * @param {*} val
   * @param {string=} joiner - Only valid if an array val is used.
   * @return {string}
   */
  to.string = function toString(val, joiner) {

    if (!arguments.length) throw _error('Missing a val', 'string');

    if ( !_is.un.str(joiner) ) throw _error.type('joiner', 'string');

    return _is.arr(val) && _is.str(joiner) ? val.join(joiner) : String(val);
  };
  // define shorthand
  to.str = to.string;

  /**
   * Converts a value to a number.
   *
   * @public
   * @param {*} val
   * @return {number}
   */
  to.number = function toNumber(val) {

    if (!arguments.length) throw _error('Missing a val', 'number');

    return Number(val);
  };
  // define shorthand
  to.num = to.number;

  /**
   * Converts a value to a boolean.
   *
   * @public
   * @param {*} val
   * @return {boolean}
   */
  to.boolean = function toBoolean(val) {

    if (!arguments.length) throw _error('Missing a val', 'boolean');

    return !!val;
  };
  // define shorthand
  to.bool = to.boolean;

  /**
   * Converts a value to an array.
   *
   * @public
   * @param {(string|number)} val
   * @param {*=} separator - Only valid if a string val is used.
   * @return {!Array}
   */
  to.array = function toArray(val, separator) {

    if (!arguments.length) throw _error('Missing a val', 'array');

    if ( _is.num(val) ) return new Array(val);

    if ( !_is.str(val) ) throw _error.type('val', 'array');

    if ( _is.undefined(separator) ) return val.split();

    separator = _is.regex(separator) ? separator : String(separator);
    return val.split(separator);
  };
  // define shorthand
  to.arr = to.array;

  /**
   * Converts a string to a regex.
   *
   * @public
   * @param {string} source
   * @param {string=} flags
   * @return {!RegExp}
   */
  to.regexp = function toRegExp(source, flags) {

    if (!arguments.length) throw _error('Missing a source', 'regexp');

    if ( !_is.str(source)   ) throw _error.type('source', 'regexp');
    if ( !_is.un.str(flags) ) throw _error.type('flags',  'regexp');

    return flags ? new RegExp(source, flags) : new RegExp(source);
  };
  // define shorthand
  to.regex = to.regexp;
  to.re = to.regexp;

  /**
   * Converts a string to upper case.
   *
   * @public
   * @param {string} str
   * @return {string}
   */
  to.upperCase = function toUpperCase(str) {

    if (!arguments.length) throw _error('Missing a str', 'upperCase');
    if ( !_is.str(str) ) throw _error.type('source', 'upperCase');

    return str.toUpperCase();
  };
  // define shorthand
  to.upper = to.upperCase;

  /**
   * Converts a string to lower case.
   *
   * @public
   * @param {string} str
   * @return {string}
   */
  to.lowerCase = function toLowerCase(str) {

    if (!arguments.length) throw _error('Missing a str', 'lowerCase');
    if ( !_is.str(str) ) throw _error.type('source', 'lowerCase');

    return str.toLowerCase();
  };
  // define shorthand
  to.lower = to.lowerCase;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('to');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR TO
  return to;
})();


module.exports = to;
