/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: create
 * -----------------------------------------------------------------------------
 * @section strict
 * @version 4.1.2
 * @see [vitals.create]{@link https://github.com/imaginate/vitals/wiki/vitals.create}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var sliceArr = require('./helpers/slice-arr.js');
var amend = require('./amend.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: create
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options. Note that this method uses
   *   [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend) for
   *   assigning properties to the new object. See [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
   *   for documentation about the property params.
   *
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

    if ( !_is.nil.obj(proto) ) throw _error.type('proto');

    if (arguments.length > 1) {
      args = sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    }

    return _ObjectCreate(proto);
  }

  /**
   * A shortcut for [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options. Note that this method uses
   *   [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend) for
   *   assigning properties to the new object. See [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
   *   for documentation about the property params.
   *
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

    if ( !_is.nil.obj(proto) ) throw _error.type('proto', 'object');

    if (arguments.length > 1) {
      args = sliceArr(arguments);
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
  var _error = newErrorMaker('create');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


module.exports = create;
