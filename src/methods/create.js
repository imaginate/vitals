/**
 * ---------------------------------------------------------------------------
 * VITALS.CREATE
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 5.0.0
 * @see [vitals.create](https://github.com/imaginate/vitals/wiki/vitals.create)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $defProp ../helpers/def-prop.js
/// #include @helper $defProps ../helpers/def-props.js
/// #include @helper $ownsOne ../helpers/owns-one.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #include @super is ./is.js
/// #include @super assign ./assign.js
/// #if}}} @scope SOLO

/// #{{{ @super create
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var create = (function createPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs create
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  /// @docref [descriptor]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
  /// @docref [define-prop]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  /// @docref [define-props]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  /// #if}}} @docrefs create

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section strict
  /// @method vitals.create
  /// @alias vitals.create.main
  /// @alias vitals.create.object
  /// @alias vitals.create.obj
  /**
   * @description
   *   A shortcut for [Object.create][create] that includes easier property
   *   value assignment, strong type declarations, and flexible default
   *   [descriptor][descriptor] options. Note that this method uses
   *   @assign#main for defining properties in the new `object`.
   * @public
   * @param {?Object} proto
   *   The #proto is the prototype for the created `object`.
   * @param {(!Object<string, *>|!Array<string>|string)=} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each [owned][own] property within the #props `object`, the key
   *     name should be the key of a property to be defined within the created
   *     `object` and the value should be the [descriptor][descriptor] or
   *     value to set the new property to. Note that @create#main considers a
   *     property value to be a [descriptor][descriptor] only when it is an
   *     `object` that [owns][own] at least one [descriptor][descriptor]
   *     property and that does **not** [own][own] any non-descriptor
   *     properties. The following values are the key names that mark a
   *     property as a [descriptor][descriptor] property:
   *     - `"configurable"`
   *     - `"enumerable"`
   *     - `"get"`
   *     - `"set"`
   *     - `"value"`
   *     - `"writable"`
   *   - *`!Array<string>`*!$
   *     Each indexed property within the #props `array` should be a property
   *     key name to define within the created `object`.
   *   - *`string`*!$
   *     The #props `string` should be the property key name to define within
   *     the created `object`.
   *   - *`undefined`*!$
   *     No properties are assigned to the created `object`.
   * @param {*=} val = `undefined`
   *   If the #val is defined, the #val sets the value for each property
   *   listed by the #props. If the #props is an `object` and a
   *   [descriptor][descriptor] that contains an [owned][own] `"value"`
   *   property or an [accessor descriptor][descriptor] is defined for a
   *   property's value, the #val does **not** apply to that specific
   *   property. If the #descriptor is defined and contains an [owned][own]
   *   `"value"` property, the value set by #val overrides the value defined
   *   within the #descriptor. If the #strongType or the #setter is defined,
   *   the #val or the #descriptor (or both) must be defined.
   * @param {?Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property defined by #props.
   *   If #props is an `object` and a [descriptor][descriptor] is defined for
   *   a property value, the #descriptor acts as a base for the property's
   *   [descriptor][descriptor] (i.e. any property defined within the
   *   #descriptor and not defined within a #props [descriptor][descriptor]
   *   that is of the same [descriptor type][descriptor] is set within the
   *   #props descriptor to the value defined by the #descriptor). If the
   *   #strongType or the #setter is defined, the #val or the #descriptor (or
   *   both) must be defined.
   * @param {string=} strongType
   *   If the #strongType is defined, all properties defined by the #props are
   *   assigned an [accessor descriptor][descriptor] with a *set* `function`
   *   that throws a `TypeError` instance if any new value fails an @is#main
   *   test for the data types specicified by the #strongType `string`. If the
   *   #props is an `object` and a [descriptor][descriptor] containing an
   *   *accessor* or *data* specific descriptor property is defined for a
   *   property's value, **no** descriptor values are changed for that
   *   specific property. If the #setter is defined, the #strongType check is
   *   still completed.
   *   ```
   *   descriptor.set = function set(newValue) {
   *     if ( !vitals.is(strongType, newValue) ) {
   *       throw new TypeError("...");
   *     }
   *     value = !!setter
   *       ? setter(newValue, value)
   *       : newValue;
   *   };
   *   ```
   * @param {(?function(*, *): *)=} setter
   *   If the #setter is defined, all properties defined by the #props are
   *   assigned an [accessor descriptor][descriptor] with a *set* `function`
   *   that sets the property's value to the value returned by a call to the
   *   #setter `function`. The #setter is passed the following two arguments:
   *   - **newValue** *`*`*
   *   - **oldValue** *`*`*
   *   If the #props is an `object` and a [descriptor][descriptor] containing
   *   an *accessor* or *data* specific descriptor property is defined for a
   *   property's value, **no** descriptor values are changed for that
   *   specific property. If the #strongType is defined, the #setter will
   *   **not** get called until after the @is#main test is complete and
   *   successful.
   *   ```
   *   descriptor.set = function set(newValue) {
   *     if ( !!strongType && !vitals.is(strongType, newValue) ) {
   *       throw new TypeError("...");
   *     }
   *     value = setter(newValue, value);
   *   };
   *   ```
   * @return {!Object}
   *   The created `object`.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var obj;
    /** @type {number} */
    var len;

    len = arguments['length'];

    if (len < 1) {
      throw _mkErr(new ERR, 'no #proto defined');
    }
    if ( !$is.nil(proto) && !$is.obj(proto) ) {
      throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');
    }

    obj = $mkObj(proto);

    switch (len) {
      case 1:
        return obj;
      case 2:
        return assign(obj, props);
      case 3:
        return assign(obj, props, val);
      case 4:
        return assign(obj, props, val, descriptor);
      case 5:
        return assign(obj, props, val, descriptor, strongType);
      default:
        return assign(obj, props, val, descriptor, strongType, setter);
    }
  }
  create['main'] = create;
  create['object'] = create;
  create['obj'] = create;
  /// #if}}} @code main
  /// #}}} @submethod main

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

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

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
