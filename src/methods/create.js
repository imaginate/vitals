/**
 * ---------------------------------------------------------------------------
 * VITALS.CREATE
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.create](https://github.com/imaginate/vitals/wiki/vitals.create)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #include @super is ./is.js
/// #include @super amend ./amend.js
/// #if}}} @scope SOLO

/// #{{{ @super create
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var create = (function createPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs create
  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  /// @docref [descriptor]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
  /// #if}}} @docrefs create

  /// #{{{ @submethod main
  /// #{{{ @docs main
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
  /// #}}} @docs main
  /// #if{{{ @code main
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #proto defined');

      case 1:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');

        return $mkObj(proto);

      default:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');

        args = $sliceArr(arguments);
        args[0] = $mkObj(proto);
        return amend['apply'](NIL, args);
    }
  }
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// #{{{ @docs object
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
  /// #}}} @docs object
  /// #if{{{ @code object
  function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #proto defined', 'object');

      case 1:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object', 'object');

        return $mkObj(proto);

      default:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object', 'object');

        args = $sliceArr(arguments);
        args[0] = $mkObj(proto);
        return amend['apply'](NIL, args);
    }
  }
  create['object'] = createObject;
  create['obj'] = createObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #if{{{ @helpers create

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('create');
  /// #}}} @const _MK_ERR
  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers create

/// #ifnot{{{ @scope DOCS_ONLY
  return create;
})();
/// #ifnot{{{ @scope SOLO
vitals['create'] = create;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super create

/// #if{{{ @scope SOLO
var vitals = create;
vitals['create'] = create;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
