/**
 * -----------------------------------------------------------------------------
 * REGEX LIBRARY
 * -----------------------------------------------------------------------------
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

// append global helpers if they do not exist
if (!global.__basics) require('./basics');


////////////////////////////////////////////////////////////////////////////////
// EXPORT REGEX FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!RegExp=} escapeChars
 * @return {!Regex}
 */
module.exports = function newRegex(escapeChars) {
  return new Regex(escapeChars);
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE REGEX CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * Creates the Regex object.
 * @param {!RegExp=} escapeChars
 * @constructor
 */
var Regex = function(escapeChars) {

  //////////////////////////////////////////////////////////////////////////
  // PROTECTED PROPERTIES
  //////////////////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   org: *,
   *   val: *
   * }} ProtectedProp
   */

  /**
   * @typedef {!Object<string, ProtectedProp>} ProtectedProps
   */

  /**
   * Creates a protected property.
   * @param {*} val
   * @return {ProtectedProp}
   */
  var makeProp = function(val) {
    return {
      VAL: val,
      val: val
    };
  };

  /**
   * The protected properties for each public method.
   * @type {!{
   *   escape: ProtectedProps,
   *   make:   ProtectedProps
   * }}
   */
  var methods = {
    escape: {
      chars: makeProp( /([\*\+\?\.\-\:\{\}\[\]\(\)\/\,\\\^\$\=\!\|])/g )
    },
    make: {}
  };


  //////////////////////////////////////////////////////////////////////////
  // PRIVATE GETTERS & SETTERS
  //////////////////////////////////////////////////////////////////////

  /**
   * @param {string} method
   * @param {string} prop
   * @return {*}
   */
  this._get = function(method, prop) {

    ( has(methods, method) && has(methods[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_get` method',
      { argMap: true, method: method, prop: prop }
    );

    return methods[method][prop]['val'];
  };

  /**
   * @param {string} method
   * @param {string} prop
   * @param {*} val
   */
  this._set = function(method, prop, val) {

    ( has(methods, method) && has(methods[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_set` method',
      { argMap: true, method: method, prop: prop, val: val }
    );

    methods[method][prop]['val'] = val;
  };

  /**
   * @param {string} method
   * @param {string} prop
   */
  this._reset = function(method, prop) {

    ( has(methods, method) && has(methods[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_reset` method',
      { argMap: true, method: method, prop: prop }
    );

    methods[method][prop]['val'] = methods[method][prop]['VAL'];
  };


  //////////////////////////////////////////////////////////////////////////
  // INSTANCE CONFIG
  //////////////////////////////////////////////////////////////////////

  is.regex(escapeChars) && this._set('escape', 'chars', escapeChars);

};

Regex.prototype.constructor = Regex;


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} regex
 * @return {string}
 */
Regex.prototype.escape = function escape(regex) {

  is.str(regex) || log.error(
    'Invalid `Regex.escape` Call',
    'invalid type for `regex` param',
    { argMap: true, regex: regex }
  );

  return regex && regex.replace(this._get('escape', 'chars'), '\\$1');
};

/**
 * @param {!RegExp} chars
 */
Regex.prototype.setChars = function setChars(chars) {

  is.regex(val) || log.error(
    'Invalid `Regex.setChars` Call',
    'invalid type for `chars` param',
    { argMap: true, chars: chars }
  );

  this._set('escape', 'chars', chars);
};

/**
 * @type {function}
 */
Regex.prototype.resetChars = function resetChars() {
  this._reset('escape', 'chars');
};

/**
 * @param {string} regex
 * @param {string=} flags - [default= '']
 * @return {!RegExp}
 */
Regex.prototype.make = function make(regex, flags) {

  is._str(regex) || log.error(
    'Invalid `Regex.make` Call',
    'invalid type for `regex` param',
    { argMap: true, regex: regex }
  );

  flags = is._str(flags) && /^[gimy]+$/.test(flags) ? flags : '';
  return new RegExp(regex, flags);
};
