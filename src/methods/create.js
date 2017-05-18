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

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $sliceArr = require('./helpers/slice-arr.js');
var $isNil = require('./helpers/is-nil.js');
var $is = require('./helpers/is.js');
var amend = require('./amend.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS CREATE
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
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
   * value assignment, strong type declarations, and flexible default
   * [descriptor][descriptor] options. Note that this method uses @amend#main
   * for assigning properties to the new `object`. See @amend#main for
   * detailed documentation on all of the available options.
   *
   * @public
   * @param {?Object} proto
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !$isNil.obj(proto) )
      throw $typeErr(new TypeError, 'proto', proto, '?Object');

    if (arguments.length > 1) {
      args = $sliceArr(arguments);
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
   * value assignment, strong type declarations, and flexible default
   * [descriptor][descriptor] options. Note that this method uses @amend#main
   * for assigning properties to the new `object`. See @amend#main for
   * detailed documentation on all of the available options.
   *
   * @public
   * @param {?Object} proto
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !$isNil.obj(proto) )
      throw $typeErr(new TypeError, 'proto', proto, '?Object', 'object');

    if (arguments.length > 1) {
      args = $sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    } 

    return _ObjectCreate(proto);
  }
  create['object'] = createObject;
  create['obj'] = createObject;

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
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = $newErrorMaker('create');

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = $err.type;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = $err.range;

  /// }}}2
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();
/// }}}1

module.exports = create;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
