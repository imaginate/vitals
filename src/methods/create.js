/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - CREATE
 * -----------------------------------------------------------------------------
 * @version 2.3.0
 * @see [vitals.create]{@link https://github.com/imaginate/vitals/blob/master/src/methods/create.js}
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

var newErrorAid = require('./_helpers/errorAid.js');
var _sliceArr = require('./_helpers/sliceArr.js');
var is = require('node-are').is;
var amend = require('./amend.js');


////////////////////////////////////////////////////////////////////////////////
// CREATE
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.create that includes easier property assignment,
   *   strong type assignment, and more flexible default descriptor options.
   *   Note that this method uses [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for assigning properties to the new object. See [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for documentation about the property params.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !is('?obj', proto) ) throw _error.type('proto');

    if (arguments.length > 1) {
      args = _sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    }

    return _ObjectCreate(proto);
  }

  /**
   * A shortcut for Object.create that includes easier property assignment,
   *   strong type assignment, and more flexible default descriptor options.
   *   Note that this method uses [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for assigning properties to the new object. See [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for documentation about the property params.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  create.object = function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !is('?obj', proto) ) throw _error.type('proto', 'object');

    if (arguments.length > 1) {
      args = _sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    } 

    return _ObjectCreate(proto);
  }
  // define shorthand
  create.obj = create.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.CREATE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} proto
   * @return {!Object}
   */
  var _ObjectCreate = Object.create || function ObjectCreate(proto) {

    /** @type {!Object} */
    var obj;

    _Object.prototype = proto;
    obj = new _Object();
    _Object.prototype = null;
    return obj;
  };

  /**
   * @private
   * @constructor
   */
  function _Object(){}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('create');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


module.exports = create;
