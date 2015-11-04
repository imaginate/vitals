/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - AMEND
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/amend.js}
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
var clone = require('./clone.js');


////////////////////////////////////////////////////////////////////////////////
// AMEND
////////////////////////////////////////////////////////////////////////////////

var amend = (function amendPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - amend
  // - amend.property   (amend.prop)
  // - amend.properties (amend.props)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.defineProperty and Object.defineProperties that
   *   includes easier property assignment, static type assignment, and more
   *   flexible default descriptor options.
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   object: Defined as "propName => propVal" or "propName => propDescriptor".
   *   array:  An array of key names to define.
   *   string: Converted to an array of key names to define. Use the following
   *     list of chars for the separator (chars listed in order of rank):
   *     ", "  ","  "|"  " "
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - The default descriptor values for each prop.
   *   [default= { writable: true, enumerable: true, configurable: true }]
   * @param {string=} staticType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that only sets the property if the new value passes an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( is(staticType, newVal) ) {
   *         value = newVal;
   *       }
   *     };
   *     ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the staticType param is defined this
   *   setter will not get called until the new value passes the type test.
   * @return {!Object}
   */
  function amend(obj, props, val, descriptor, staticType, setter) {

    if ( !is.obj(obj) ) throw _error.type('obj');

    if ( is.str(props) ) props = _splitProps(props);

    if ( !is.obj(props) ) throw _error.type('props');

    // Set the descriptor, staticType, & setter values
    if ( is.arr(props) ) {
      if (arguments.length < 3) throw _error('No val defined');
      if (arguments.length === 4) {
        if ( is.str(descriptor) ) {
          staticType = descriptor;
          descriptor = undefined;
        }
        else if ( is.func(descriptor) ) {
          setter = descriptor;
          descriptor = undefined;
        }
      }
      else if (arguments.length === 5) {
        if ( is.func(staticType) ) {
          setter = staticType;
          if ( is.str(descriptor) ) {
            staticType = descriptor;
            descriptor = undefined;
          }
          else {
            staticType = undefined;
          }
        }
      }
    }
    else if (arguments.length > 2) {
      setter = staticType;
      staticType = descriptor;
      descriptor = val;
      val = undefined;
      if (arguments.length === 3) {
        if ( is.str(descriptor) ) {
          staticType = descriptor;
          descriptor = undefined;
        }
        else if ( is.func(descriptor) ) {
          setter = descriptor;
          descriptor = undefined;
        }
      }
      else if (arguments.length === 4) {
        if ( is.func(staticType) ) {
          setter = staticType;
          if ( is.str(descriptor) ) {
            staticType = descriptor;
            descriptor = undefined;
          }
          else {
            staticType = undefined;
          }
        }
      }
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');
    if ( !is('str=',  staticType) ) throw _error.type('staticType');
    if ( !is('func=', setter)     ) throw _error.type('setter');

    return _amendProps(obj, props, val, descriptor, staticType, setter);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  function _merge(dest, obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) ) {
        dest[key] = obj[key];
      }
    }
    return dest;
  }

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _own = has.key;

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('amend');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();


module.exports = amend;
