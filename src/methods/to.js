/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: to
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.1
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/wiki/vitals.to}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @toright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var splitKeys = require('./helpers/split-keys.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: to
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
   * Converts a primitive value to a number.
   *
   * @public
   * @param {?(string|number|boolean)} val - Only [valid strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Convert_numeric_strings_to_numbers)
   *   allowed.
   * @return {number} `NaN` values will not be returned.
   */
  to.number = function toNumber(val) {

    if (!arguments.length) throw _error('Missing a val', 'number');

    if ( _is.num(val) ) return val;
    if ( _is.nil.bool(val) ) return val ? 1 : 0;

    if ( !_is.str(val) ) throw _error.type('val', 'number');

    val = Number(val);

    if ( _is.nan(val) ) throw _error.range('val', 'see github.com/imaginate/vitals/wiki/vitals.to#tonumber', 'number');

    return val;
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
   * @param {(string|number)} val - Details per val type:
   *   - string: [String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
   *     is called on the string.
   *   - number: A new array of val length is returned.
   * @param {*=} separator - Only used with a string val. If no separator is
   *   defined one of the following values is used (values listed in order of
   *   rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array}
   */
  to.array = function toArray(val, separator) {

    if (!arguments.length) throw _error('Missing a val', 'array');

    if ( _is.num(val) ) return new Array(val);

    if ( !_is.str(val) ) throw _error.type('val', 'array');

    if ( _is.undefined(separator) ) return splitKeys(val);

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
  var _error = newErrorMaker('to');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR TO
  return to;
})();


module.exports = to;
