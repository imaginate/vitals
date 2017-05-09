/**
 * ---------------------------------------------------------------------------
 * VITALS CREATE
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.create](https://github.com/imaginate/vitals/wiki/vitals.create)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var sliceArr = require('./helpers/slice-arr.js');
var amend = require('./amend.js');
var _is = require('./helpers/is.js');


///////////////////////////////////////////////////////////////////////// {{{1
// VITALS CREATE
//////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /* {{{2 Create References
   * @ref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   * @ref [descriptor]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
   */

  /// {{{2
  /// @method create
  /**
   * A shortcut for [Object.create][create] that includes easier property
   * value assignment, strong type declarations, and flexible default [descriptor][descriptor]
   * options. Note that this method uses @amend#main for assigning properties
   * to the new `object`. See @amend#main for detailed documentation on all of
   * the available options.
   *
   * @public
   * @param {?Object} proto
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !_is.nil.obj(proto) )
      throw _error.type('proto');

    if (arguments.length > 1) {
      args = sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    }

    return _ObjectCreate(proto);
  }

  /// {{{2
  /// @method create.object
  /// @alias create.obj
  /**
   * A shortcut for [Object.create][create] that includes easier property
   * value assignment, strong type declarations, and flexible default [descriptor][descriptor]
   * options. Note that this method uses @amend#main for assigning properties
   * to the new `object`. See @amend#main for detailed documentation on all of
   * the available options.
   *
   * @public
   * @param {?Object} proto
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  create.object = function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !_is.nil.obj(proto) )
      throw _error.type('proto', 'object');

    if (arguments.length > 1) {
      args = sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    } 

    return _ObjectCreate(proto);
  }
  // define shorthand
  create.obj = create.object;

  ///////////////////////////////////////////////////// {{{2
  // CREATE HELPERS - OBJECT.CREATE POLYFILL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _ObjectCreate
  /**
   * @private
   * @param {?Object} proto
   * @return {!Object}
   */
  var _ObjectCreate = 'create' in Object && _is.func(Object.create)
    ? Object.create
    : function ObjectCreate(proto) {

        /** @type {!Object} */
        var obj;

        _Object.prototype = proto;
        obj = new _Object();
        _Object.prototype = null;
        return obj;
      };

  /// {{{3
  /// @func _Object
  /**
   * @private
   * @constructor
   */
  function _Object(){}

  ///////////////////////////////////////////////////// {{{2
  // CREATE HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _error
  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('create');

  /// }}}2
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();
/// }}}1

module.exports = create;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
