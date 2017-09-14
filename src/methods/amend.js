/**
 * ---------------------------------------------------------------------------
 * VITALS.AMEND
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 5.0.0
 * @see [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
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
/// #if}}} @scope SOLO

/// #{{{ @super amend
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var amend = (function amendPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs amend
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [descriptor]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
  /// @docref [define-prop]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  /// @docref [define-props]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  /// #if}}} @docrefs amend

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section strict
  /// @method vitals.amend
  /// @alias vitals.amend.main
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] and
   *   [Object.defineProperty][define-prop] that only updates the
   *   [descriptor][descriptor] of existing properties.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, (?Object|?undefined)>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, (?Object|?undefined)>`*!$
   *     For each [owned][own] property within the #props `object`, the key
   *     name should be the key name of a property to be edited within the
   *     #source `object` and the value should be the new
   *     [descriptor][descriptor] settings for the edited property. If a
   *     property's value (within the #props `object`) is `null`, the value
   *     set for the #descriptor is used. If a property's value (within the
   *     #props `object`) is `undefined`, it is skipped.
   *   - *`!Array<string>`*!$
   *     Each indexed property within the #props `array` should be a property
   *     key name to edit within the #source `object`.
   *   - *`string`*!$
   *     The #props `string` should be the property key name to edit within
   *     the #source `object`.
   * @param {?Object=} descriptor = `null`
   *   If the #props is an `array` or `string`, the #descriptor is the new
   *   [descriptor][descriptor] settings for each property key name defined by
   *   the #props. If the #props is an `object`, the #descriptor is the new
   *   [descriptor][descriptor] settings **only** for the properties within
   *   the #props with a value of `null`. If the #descriptor is `null`, no
   *   updates occur with exception for the properties with a
   *   [descriptor][descriptor] value within a #props `object`.
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function amend(source, props, descriptor) {

    /** @type {boolean} */
    var byKeys;
    /** @type {boolean} */
    var byKey;
    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #props defined');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object');
    }

    byKey = $is.str(props);

    if (byKey) {
      if (!props) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined for '
          + '#props');
      }
      if ( !$own(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined by #props '
          + '`string`');
      }
      byKeys = NO;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props, '!Object<string, '
        + '(?Object|?undefined)>|!Array<string>|string');
    }
    else if ( $is.arr(props) ) {
      if ( !_typeCheckKeys(props) ) {
        throw _mkTypeErr(new TYPE_ERR, 'props property', props,
          '!Array<string>');
      }
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined in '
          + '#props `array`');
      }
      if ( !_ownCheckKeys(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined in #props '
          + '`array`');
      }
      byKeys = YES;
    }
    else if ( !_ownCheckProps(source, props) ) {
      throw _mkErr(new ERR, 'undefined #source key name defined in #props '
        + '`object`');
    }
    else if ( !_typeCheckProps(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props property', props,
        '!Object<string, (?Object|?undefined)>');
    }
    else if ( !_notDescCheckProps(props) ) {
      throw _mkRangeErr(new RANGE_ERR, '!descriptor property defined in '
        + '#props `object`', _DESCRIPTOR_KEYS);
    }
    else if ( !_descConflictCheckProps(props) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties for a property value within the #props');
    }
    else {
      byKeys = NO;
    }

    if ( len === 2 || $is.void(descriptor) || $is.nil(descriptor) ) {
      return byKey || byKeys
        ? source
        : _amendProps(source, props, NIL);
    }

    if ( !$is.obj(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=');
    }
    else if ( !_hasOnlyDescProps(descriptor) ) {
      throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
        + '`object`', _DESCRIPTOR_KEYS);
    }
    else if ( _hasDescConflict(descriptor) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties within the #descriptor');
    }

    return $is.empty(descriptor)
      ? byKey || byKeys
        ? source
        : _amendProps(source, props, NIL)
      : byKey
        ? _amendKey(source, props, descriptor)
        : byKeys
          ? _amendKeys(source, props, descriptor)
          : _amendProps(source, props, descriptor);
  }
  amend['main'] = amend;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod property
  /// #{{{ @docs property
  /// @section strict
  /// @method vitals.amend.property
  /// @alias vitals.amend.prop
  /**
   * @description
   *   A shortcut for [Object.defineProperty][define-prop] that only updates
   *   the [descriptor][descriptor] of an existing property.
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {?Object=} descriptor = `null`
   *   The #descriptor is the new [descriptor][descriptor] settings for the
   *   property defined by #key. If the #descriptor is `null`, no updates
   *   occur.
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs property
  /// #if{{{ @code property
  function amendProperty(source, key, descriptor) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property');
      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'property');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'property');
    }

    if ( !$is.str(key) ) {
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property');
    }
    else if (!key) {
      throw _mkErr(new ERR, 'invalid empty #key `string`', 'property');
    }
    else if ( !$own(source, key) ) {
      throw _mkErr(new ERR, 'undefined #source key name defined by #key',
        'property');
    }

    if ( len === 2 || $is.void(descriptor) || $is.nil(descriptor) ) {
      return source;
    }

    if ( !$is.obj(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'property');
    }
    else if ( !_hasOnlyDescProps(descriptor) ) {
      throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
        + '`object`', _DESCRIPTOR_KEYS, 'property');
    }
    else if ( _hasDescConflict(descriptor) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties within the #descriptor', 'property');
    }

    return $is.empty(descriptor)
      ? source
      : _amendKey(source, key, descriptor);
  }
  amend['property'] = amendProperty;
  amend['prop'] = amendProperty;
  /// #if}}} @code property
  /// #}}} @submethod property

  /// #{{{ @submethod properties
  /// #{{{ @docs properties
  /// @section strict
  /// @method vitals.amend.properties
  /// @alias vitals.amend.props
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that only
   *   updates the [descriptors][descriptor] of existing properties.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, (?Object|?undefined)>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, (?Object|?undefined)>`*!$
   *     For each [owned][own] property within the #props `object`, the key
   *     name should be the key name of a property to be edited within the
   *     #source `object` and the value should be the new
   *     [descriptor][descriptor] settings for the edited property. If a
   *     property's value (within the #props `object`) is `null`, the value
   *     set for the #descriptor is used. If a property's value (within the
   *     #props `object`) is `undefined`, it is skipped.
   *   - *`!Array<string>`*!$
   *     Each indexed property within the #props `array` should be a property
   *     key name to edit within the #source `object`.
   *   - *`string`*!$
   *     The #props `string` should be a list of property key names to edit
   *     within the #source `object`. The first of the following values found
   *     within the #props `string` is used as the separator (values listed in
   *     order):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {?Object=} descriptor = `null`
   *   If the #props is an `array` or `string`, the #descriptor is the new
   *   [descriptor][descriptor] settings for each property key name defined by
   *   the #props. If the #props is an `object`, the #descriptor is the new
   *   [descriptor][descriptor] settings **only** for the properties within
   *   the #props with a value of `null`. If the #descriptor is `null`, no
   *   updates occur with exception for the properties with a
   *   [descriptor][descriptor] value within a #props `object`.
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs properties
  /// #if{{{ @code properties
  function amendProperties(source, props, descriptor) {

    /** @type {boolean} */
    var byKeys;
    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties');
      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'properties');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
        'properties');
    }

    if ( $is.str(props) ) {
      if (!props) {
        throw _mkErr(new ERR, 'invalid empty `string` defined for #props',
          'properties');
      }
      props = $splitKeys(props);
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name defined in #props '
          + '`string`', 'properties');
      }
      if ( !_ownCheckKeys(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined in #props '
          + '`string`', 'properties');
      }
      byKeys = YES;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props, '!Object<string, '
        + '(?Object|?undefined)>|!Array<string>|string', 'properties');
    }
    else if ( $is.arr(props) ) {
      if ( !_typeCheckKeys(props) ) {
        throw _mkTypeErr(new TYPE_ERR, 'props property', props,
          '!Array<string>', 'properties');
      }
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined in '
          + '#props `array`', 'properties');
      }
      if ( !_ownCheckKeys(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined in #props '
          + '`array`', 'properties');
      }
      byKeys = YES;
    }
    else if ( !_ownCheckProps(source, props) ) {
      throw _mkErr(new ERR, 'undefined #source key name defined in #props '
        + '`object`', 'properties');
    }
    else if ( !_typeCheckProps(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props property', props,
        '!Object<string, (?Object|?undefined)>', 'properties');
    }
    else if ( !_notDescCheckProps(props) ) {
      throw _mkRangeErr(new RANGE_ERR, '!descriptor property defined in '
        + '#props `object`', _DESCRIPTOR_KEYS, 'properties');
    }
    else if ( !_descConflictCheckProps(props) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties for a property value within the #props', 'properties');
    }
    else {
      byKeys = NO;
    }

    if ( len === 2 || $is.void(descriptor) || $is.nil(descriptor) ) {
      return byKeys
        ? source
        : _amendProps(source, props, NIL);
    }

    if ( !$is.obj(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'properties');
    }
    else if ( !_hasOnlyDescProps(descriptor) ) {
      throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
        + '`object`', _DESCRIPTOR_KEYS, 'properties');
    }
    else if ( _hasDescConflict(descriptor) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties within the #descriptor', 'properties');
    }

    return $is.empty(descriptor)
      ? byKeys
        ? source
        : _amendProps(source, props, NIL)
      : byKeys
        ? _amendKeys(source, props, descriptor)
        : _amendProps(source, props, descriptor);
  }
  amend['properties'] = amendProperties;
  amend['props'] = amendProperties;
  /// #if}}} @code properties
  /// #}}} @submethod properties

  /// #if{{{ @helpers amend

  /// #{{{ @group main

  /// #{{{ @func _amendKey
  /**
   * @private
   * @param {!Object} src
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendKey(src, key, descriptor) {
    return $defProp(src, key, descriptor);
  }
  /// #}}} @func _amendKey

  /// #{{{ @func _amendKeys
  /**
   * @private
   * @param {!Object} src
   * @param {!Array<string>} keys
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendKeys(src, keys, descriptor) {

    /** @type {!Object} */
    var props;

    switch (keys['length']) {
      case 0:
        return src;
      case 1:
        return $defProp(src, keys[0], descriptor);
    }

    props = _setupPropsByKey(keys, descriptor);
    return $defProps(src, props);
  }
  /// #}}} @func _amendKeys

  /// #{{{ @func _amendProps
  /**
   * @private
   * @param {!Object} src
   * @param {!Object} props
   * @param {?Object} descriptor
   * @return {!Object}
   */
  function _amendProps(src, props, descriptor) {
    props = _setupProps(props, descriptor);
    return $is.empty(props)
      ? src
      : $defProps(src, props);
  }
  /// #}}} @func _amendProps

  /// #}}} @group main

  /// #{{{ @group constants

  /// #{{{ @const _ACCESSOR_KEYS
  /**
   * @private
   * @const {!Array<string>}
   */
  var _ACCESSOR_KEYS = [
    'get',
    'set'
  ];
  /// #}}} @const _ACCESSOR_KEYS

  /// #{{{ @const _DATA_KEYS
  /**
   * @private
   * @const {!Array<string>}
   */
  var _DATA_KEYS = [
    'value',
    'writable'
  ];
  /// #}}} @const _DATA_KEYS

  /// #{{{ @const _DESCRIPTOR_PROPS
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var _DESCRIPTOR_PROPS = {
    'configurable': YES,
    'enumerable': YES,
    'get': YES,
    'set': YES,
    'value': YES,
    'writable': YES
  };
  /// #}}} @const _DESCRIPTOR_PROPS

  /// #{{{ @const _DESCRIPTOR_KEYS
  /**
   * @private
   * @const {!Array<string>}
   */
  var _DESCRIPTOR_KEYS = [
    'configurable',
    'enumerable',
    'get',
    'set',
    'value',
    'writable'
  ];
  /// #}}} @const _DESCRIPTOR_KEYS

  /// #}}} @group constants

  /// #{{{ @group setup

  /// #{{{ @func _setupProps
  /**
   * @private
   * @param {!Object} props
   * @param {?Object} dfltDesc
   * @return {!Object}
   */
  function _setupProps(props, dfltDesc) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;
    /** @type {(?Object|undefined)} */
    var val;

    newProps = {};

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if (!!val) {
          if ( !$is.empty(val) ) {
            newProps[key] = $cloneObj(val);
          }
        }
        else if ( !$is.void(val) && !!dfltDesc ) {
          newProps[key] = $cloneObj(dfltDesc);
        }
      }
    }
    return newProps;
  }
  /// #}}} @func _setupProps

  /// #{{{ @func _setupPropsByKey
  /**
   * @private
   * @param {!Array<string>} keys
   * @param {!Object} dfltDesc
   * @return {!Object}
   */
  function _setupPropsByKey(keys, dfltDesc) {

    /** @type {!Object} */
    var props;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys['length'];
    i = -1;
    while (++i < len) {
      key = keys[i];
      props[key] = $cloneObj(dfltDesc);
    }
    return props;
  }
  /// #}}} @func _setupPropsByKey

  /// #}}} @group setup

  /// #{{{ @group tests

  /// #{{{ @func _descConflictCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _descConflictCheckProps(props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( $is.obj(val) && _hasDescConflict(val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _descConflictCheckProps

  /// #{{{ @func _hasDescConflict
  /**
   * @private
   * @param {!Object} desc
   * @return {boolean}
   */
  function _hasDescConflict(desc) {
    return $ownsOne(desc, _ACCESSOR_KEYS) && $ownsOne(desc, _DATA_KEYS);
  }
  /// #}}} @func _hasDescConflict

  /// #{{{ @func _hasOnlyDescProps
  /**
   * @private
   * @param {!Object} src
   * @return {boolean}
   */
  function _hasOnlyDescProps(src) {

    /** @type {string} */
    var key;

    for (key in src) {
      if ( $own(src, key) && !$own(_DESCRIPTOR_PROPS, key) ) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _hasOnlyDescProps

  /// #{{{ @func _keysCheckProps
  /**
   * @private
   * @param {!Array<string>} props
   * @return {boolean}
   */
  function _keysCheckProps(props) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = props['length'];
    i = -1;
    while (++i < len) {
      if (!props[i]) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _keysCheckProps

  /// #{{{ @func _notDescCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _notDescCheckProps(props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( $is.obj(val) && !_hasOnlyDescProps(val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _notDescCheckProps

  /// #{{{ @func _ownCheckKeys
  /**
   * @private
   * @param {!Object} source
   * @param {!Array<string>} props
   * @return {boolean}
   */
  function _ownCheckKeys(source, props) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = props['length'];
    i = -1;
    while (++i < len) {
      if ( !$own(source, props[i]) ) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _ownCheckKeys

  /// #{{{ @func _ownCheckProps
  /**
   * @private
   * @param {!Object} source
   * @param {!Object} props
   * @return {boolean}
   */
  function _ownCheckProps(source, props) {

    /** @type {string} */
    var key;

    for (key in props) {
      if ( $own(props, key) && !$own(source, key) && !$is.void(props[key]) ) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _ownCheckProps

  /// #{{{ @func _typeCheckKeys
  /**
   * @private
   * @param {!Array<string>} props
   * @return {boolean}
   */
  function _typeCheckKeys(props) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = props['length'];
    i = -1;
    while (++i < len) {
      if ( !$is.str(props[i]) ) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _typeCheckKeys

  /// #{{{ @func _typeCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _typeCheckProps(props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( !$is.void(val) && !$is.nil(val) && !$is.obj(val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _typeCheckProps

  /// #}}} @group tests

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('amend');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

  /// #insert @code MK_RANGE_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers amend

/// #ifnot{{{ @scope DOCS_ONLY
  return amend;
})();
/// #ifnot{{{ @scope SOLO
vitals['amend'] = amend;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super amend

/// #if{{{ @scope SOLO
var vitals = amend;
vitals['amend'] = amend;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
