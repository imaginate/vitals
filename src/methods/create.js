/**
 * ---------------------------------------------------------------------------
 * VITALS.CREATE
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.create](https://github.com/imaginate/vitals/wiki/vitals.create)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #include @super is ./is.js
/// #include @super amend ./amend.js
/// #}}} @on SOLO

/// #{{{ @super create
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var create = (function createPrivateScope() {

  /// #{{{ @docrefs create
  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  /// @docref [descriptor]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
  /// #}}} @docrefs create

  /// #{{{ @submethod main
  /// @section strict
  /// @method vitals.create
  /**
   * @description
   *   A shortcut for [Object.create][create] that includes easier property
   *   value assignment, strong type declarations, and flexible default
   *   [descriptor][descriptor] options. Note that this method uses
   *   @amend#main for assigning properties to the new `object`. See
   *   @amend#main for detailed documentation on all of the available options.
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

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #proto defined');

      case 1:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');

        return _create(proto);
    }

    if ( !$is.nil(proto) && !$is.obj(proto) )
      throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');

    args = $sliceArr(arguments);
    args[0] = _create(proto);
    return amend['apply'](NIL, args);
  }
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// @section strict
  /// @method vitals.create.object
  /// @alias vitals.create.obj
  /**
   * @description
   *   A shortcut for [Object.create][create] that includes easier property
   *   value assignment, strong type declarations, and flexible default
   *   [descriptor][descriptor] options. Note that this method uses
   *   @amend#main for assigning properties to the new `object`. See
   *   @amend#main for detailed documentation on all of the available options.
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

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #proto defined', 'object');

      case 1:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object', 'object');

        return _create(proto);
    }

    if ( !$is.nil(proto) && !$is.obj(proto) )
      throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object', 'object');

    args = $sliceArr(arguments);
    args[0] = _create(proto);
    return amend['apply'](NIL, args);
  }
  create['object'] = createObject;
  create['obj'] = createObject;
  /// #}}} @submethod object

  /// #{{{ @group Create-Helpers

  /// #{{{ @group Create-Polyfills

  /// #{{{ @func _ObjectCreate
  /**
   * @private
   * @param {?Object} proto
   * @return {!Object}
   */
  var _ObjectCreate = (function _ObjectCreatePolyfillPrivateScope() {

    if ( 'create' in OBJ && $is.fun(OBJ['create']) )
      return OBJ['create'];

    /// #{{{ @func _Object
    /**
     * @private
     * @constructor
     */
    function _Object(){}
    /// #}}} @func _Object

    /// #{{{ @func ObjectCreate
    /**
     * @param {?Object} proto
     * @return {!Object}
     */
    function ObjectCreate(proto) {

      /** @type {!Object} */
      var obj;

      _Object['prototype'] = proto;
      obj = new _Object();
      _Object['prototype'] = NIL;
      return obj;
    }
    /// #}}} @func ObjectCreate

    return ObjectCreate;
  })();
  /// #}}} @func _ObjectCreate

  /// #}}} @group Create-Polyfills

  /// #{{{ @group Main-Helpers

  /// #{{{ @func _create
  /**
   * @private
   * @param {?Object} proto
   * @return {!Object}
   */
  var _create = _ObjectCreate;
  /// #}}} @func _create

  /// #}}} @group Main-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('create');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Create-Helpers

  return create;
})();
/// #{{{ @off SOLO
vitals['create'] = create;
/// #}}} @off SOLO
/// #}}} @super create

/// #{{{ @on SOLO
var vitals = create;
vitals['create'] = create;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
