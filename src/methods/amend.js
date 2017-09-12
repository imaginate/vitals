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
/// #include @helper $ownsOne ../helpers/owns-one.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #include @super is ./is.js
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
   *   A shortcut for [Object.defineProperties][define-props] that includes
   *   easier property value assignment, strong type declarations, and
   *   flexible default [descriptor][descriptor] options.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, *>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each [owned][own] property within the #props `object`, the key
   *     name should be the key name of a property to be edited within or
   *     added to the #source `object` and the value should be the
   *     [descriptor][descriptor] or value to set the new or edited property
   *     to. Note that @amend#main considers a property value to be a
   *     [descriptor][descriptor] only when it is an `object` that [owns][own]
   *     at least one [descriptor][descriptor] property and that does **not**
   *     [own][own] any non-descriptor properties. The following values are
   *     the key names that mark a property as a [descriptor][descriptor]
   *     property:
   *     - `"configurable"`
   *     - `"enumerable"`
   *     - `"get"`
   *     - `"set"`
   *     - `"value"`
   *     - `"writable"`
   *   - *`!Array<string>`*!$
   *     Each indexed property within the #props `array` should be a property
   *     key name to edit within or add to the #source `object`.
   *   - *`string`*!$
   *     The #props `string` should be the property key name to edit within or
   *     add to the #source `object`.
   * @param {*=} val = `undefined`
   *   If the #val is defined, the #val sets the value for each property
   *   listed by the #props. If the #props is an `object` and a
   *   [descriptor][descriptor] that contains an [owned][own] `"value"`
   *   property or an [accessor descriptor][descriptor] is defined for a
   *   property's value, the #val does **not** apply to that specific
   *   property. If the #descriptor is defined and contains an [owned][own]
   *   `"value"` property, the value set by #val overrides the value defined
   *   within the #descriptor. If the #strongType or #setter is defined, the
   *   #val or #descriptor (or both) must be defined.
   * @param {?Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property defined by #props.
   *   If #props is an `object` and a [descriptor][descriptor] is defined for
   *   a property value, the #descriptor acts as a base for the property's
   *   [descriptor][descriptor] (i.e. any property defined within the
   *   #descriptor and not defined within a #props [descriptor][descriptor]
   *   that is of the same [descriptor type][descriptor] is set within the
   *   #props descriptor to the value defined by #descriptor). If the
   *   #strongType or #setter is defined, the #val or #descriptor (or both)
   *   must be defined.
   * @param {string=} strongType
   *   If the #strongType is defined, all new or edited properties defined by
   *   #props are assigned an [accessor descriptor][descriptor] with a *set*
   *   `function` that throws a `TypeError` instance if any new value fails an
   *   @is#main test for the data types specicified by the #strongType
   *   `string`. If the #props is an `object` and a [descriptor][descriptor]
   *   containing an *accessor* or *data* specific descriptor property is
   *   defined for a property's value, **no** descriptor values are changed
   *   for that specific property. If the #setter is defined, the #strongType
   *   check is still completed.
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
   *   If the #setter is defined, all new or edited properties defined by
   *   #props are assigned an [accessor descriptor][descriptor] with a *set*
   *   `function` that sets the property's value to the value returned by a
   *   call to the #setter `function`. The #setter is passed the following
   *   two arguments:
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
   *   The amended #source.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function amend(source, props, val, descriptor, strongType, setter) {

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
      byKeys = NO;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props,
        '!Object<string, *>|!Array<string>|string');
    }
    else if ( $is.arr(props) ) {
      if ( !_keysTypeCheckProps(props) ) {
        throw _mkTypeErr(new TYPE_ERR, 'props property', props,
          '!Array<string>');
      }
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR,
          'invalid empty key name `string` defined in #props `array`');
      }
      byKeys = YES;
    }
    else if ( !_descriptorCheckProps(props) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties for a property value within the #props');
    }
    else {
      byKeys = NO;
    }

    switch (len) {
      case 2:
        return byKey
          ? _amendProp(source, props, VOID, NIL, '', NIL)
          : byKeys
            ? _amendPropsByKey(source, props, VOID, NIL, '', NIL)
            : _amendProps(source, props, VOID, NIL, '', NIL);

      case 3:
        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = $own(descriptor, 'value')
            ? descriptor['value']
            : VOID;
        }
        else {
          descriptor = NIL;
        }

        return byKey
          ? _amendProp(source, props, val, descriptor, '', NIL)
          : byKeys
            ? _amendPropsByKey(source, props, val, descriptor, '', NIL)
            : _amendProps(source, props, val, descriptor, '', NIL);

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          setter = NIL;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else if ( $is.fun(descriptor) ) {
          strongType = '';
          setter = descriptor;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else {
          strongType = '';
          setter = NIL;
        }
        break;

      case 5:
        if ( $is.str(descriptor) ) {
          setter = $is.void(strongType)
            ? NIL
            : strongType;
          strongType = descriptor;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else {
          if ( $is.nil(strongType) || $is.fun(strongType) ) {
            setter = strongType;
            strongType = '';
          }
          else {
            if ( $is.void(strongType) ) {
              strongType = '';
            }
            setter = NIL;
          }
          if ( $is.void(descriptor) ) {
            descriptor = NIL;
          }
        }
        break;

      default:
        if ( $is.void(descriptor) ) {
          descriptor = NIL;
        }
        if ( $is.void(strongType) ) {
          strongType = '';
        }
        if ( $is.void(setter) ) {
          setter = NIL;
        }
    }

    if ( $is.obj(descriptor) ) {
      if ( !_hasOnlyDescriptorProps(descriptor) ) {
        throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
          + '`object`', _DESCRIPTOR_KEYS);
      }
      if ( _isBadDescriptor(descriptor) ) {
        throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
          + 'properties within the #descriptor');
      }
    }
    else if ( !$is.nil(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=');
    }

    if ( !$is.str(strongType) ) {
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=');
    }
    else if (strongType) {
      if ( !$is.void(val) && !is(strongType, val) ) {
        strongType = _appendEqualSign(strongType);
        throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType);
      }
      if ( !byKey && !byKeys && !_strongTypeCheckProps(strongType, props) ) {
        strongType = _appendEqualSign(strongType);
        throw _mkTypeErr(new TYPE_ERR, 'props property value', props,
          strongType);
      }
    }

    if ( !$is.nil(setter) && !$is.fun(setter) ) {
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(?function(*, *): *)=');
    }

    if ( !!descriptor && (!!strongType || !!setter) ) {
      if ( _hasAccessorProp(descriptor) ) {
        throw _mkErr(new ERR, 'conflicting accessor #descriptor and defined '
          + '#strongType and/or #setter');
      }
      else if ( $own(descriptor, 'writable') ) {
        throw _mkErr(new ERR, 'conflicting data #descriptor and defined '
          + '#strongType and/or #setter');
      }
    }

    return byKey
      ? _amendProp(source, props, val, descriptor, strongType, setter)
      : byKeys
        ? _amendPropsByKey(source, props, val, descriptor, strongType, setter)
        : _amendProps(source, props, val, descriptor, strongType, setter);
  }
  amend['main'] = amend;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod config
  /// #{{{ @docs config
  /// @section strict
  /// @method vitals.amend.config
  /// @alias vitals.amend.conf
  /// @alias vitals.amend.cfg
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that only
   *   updates the descriptors of existing properties.
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
  /// #}}} @docs config
  /// #if{{{ @code config
  function amendConfig(source, props, descriptor) {

    /** @type {boolean} */
    var byKeys;
    /** @type {boolean} */
    var byKey;
    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'config');
      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'config');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'config');
    }

    byKey = $is.str(props);

    if (byKey) {
      if (!props) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined for '
          + '#props', 'config');
      }
      if ( !$own(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined by #props '
          + '`string`', 'config');
      }
      byKeys = NO;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props, '!Object<string, '
        + '(?Object|?undefined)>|!Array<string>|string', 'config');
    }
    else if ( $is.arr(props) ) {
      if ( !_keysTypeCheckProps(props) ) {
        throw _mkTypeErr(new TYPE_ERR, 'props property', props,
          '!Array<string>', 'config');
      }
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined in '
          + '#props `array`', 'config');
      }
      if ( !_ownKeysCheckProps(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined in #props '
          + '`array`', 'config');
      }
      byKeys = YES;
    }
    else if ( !_ownCheckProps(source, props) ) {
      throw _mkErr(new ERR, 'undefined #source key name defined in #props '
        + '`object`', 'config');
    }
    else if ( !_configTypeCheckProps(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props property', props,
        '!Object<string, (?Object|?undefined)>', 'config');
    }
    else if ( !_configDescCheckProps(props) ) {
      throw _mkRangeErr(new RANGE_ERR, '!descriptor property defined in '
        + '#props `object`', _DESCRIPTOR_KEYS, 'config');
    }
    else if ( !_configBadDescCheckProps(props) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties for a property value within the #props', 'config');
    }
    else {
      byKeys = NO;
    }

    if ( len === 2 || $is.void(descriptor) || $is.nil(descriptor) ) {
      return byKey || byKeys
        ? source
        : _amendConfigs(source, props, NIL);
    }

    if ( !$is.obj(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'config');
    }
    else if ( !_hasOnlyDescriptorProps(descriptor) ) {
      throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
        + '`object`', _DESCRIPTOR_KEYS, 'config');
    }
    else if ( _isBadConfigDescriptor(descriptor) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties within the #descriptor', 'config');
    }

    return $is.empty(descriptor)
      ? byKey || byKeys
        ? source
        : _amendConfigs(source, props, NIL)
      : byKey
        ? _amendConfig(source, props, descriptor)
        : byKeys
          ? _amendConfigsByKey(source, props, descriptor)
          : _amendConfigs(source, props, descriptor);
  }
  amend['config'] = amendConfig;
  amend['conf'] = amendConfig;
  amend['cfg'] = amendConfig;
  /// #if}}} @code config
  /// #}}} @submethod config

  /// #{{{ @submethod property
  /// #{{{ @docs property
  /// @section strict
  /// @method vitals.amend.property
  /// @alias vitals.amend.prop
  /**
   * @description
   *   A shortcut for [Object.defineProperty][define-prop] that includes
   *   easier property value assignment, strong type declarations, and
   *   flexible default [descriptor][descriptor] options.
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {*=} val = `undefined`
   *   If the #descriptor is defined and contains an [owned][own] `"value"`
   *   property, the value set by #val overrides the value defined within the
   *   #descriptor. If the #strongType or the #setter is defined, the #val or
   *   the #descriptor (or both) must be defined.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   If the #strongType or the #setter is defined, the #val or the
   *   #descriptor (or both) must be defined.
   * @param {string=} strongType
   *   If the #strongType is defined, the new or edited property is assigned
   *   an [accessor descriptor][descriptor] with a *set* `function` that
   *   throws a `TypeError` instance if any new value fails an @is#main test
   *   for the data types specicified by the #strongType `string`. If the
   *   #setter is defined, the #strongType check is still completed.
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
   *   If the #setter is defined, the new or edited property is assigned an
   *   [accessor descriptor][descriptor] with a *set* `function` that sets
   *   the property's value to the value returned by a call to the #setter
   *   `function`. The #setter is passed the following two arguments:
   *   - **newValue** *`*`*
   *   - **oldValue** *`*`*
   *   If the #strongType is defined, the #setter will **not** get called
   *   until after the @is#main test is complete and successful.
   *   ```
   *   descriptor.set = function set(newValue) {
   *     if ( !!strongType && !vitals.is(strongType, newValue) ) {
   *       throw new TypeError("...");
   *     }
   *     value = setter(newValue, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs property
  /// #if{{{ @code property
  function amendProperty(source, key, val, descriptor, strongType, setter) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'property');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'property');
    }

    if ( !$is.str(key) ) {
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property');
    }
    else if (!key) {
      throw _mkErr(new ERR, 'invalid empty key name `string` defined for '
        + '#key', 'property');
    }

    switch (len) {
      case 2:
        return _amendProp(source, key, VOID, NIL, '', NIL);

      case 3:
        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = $own(descriptor, 'value')
            ? descriptor['value']
            : VOID;
        }
        else {
          descriptor = NIL;
        }

        return _amendProp(source, key, val, descriptor, '', NIL);

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          setter = NIL;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else if ( $is.fun(descriptor) ) {
          strongType = '';
          setter = descriptor;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else {
          strongType = '';
          setter = NIL;
        }
        break;

      case 5:
        if ( $is.str(descriptor) ) {
          setter = $is.void(strongType)
            ? NIL
            : strongType;
          strongType = descriptor;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else {
          if ( $is.nil(strongType) || $is.fun(strongType) ) {
            setter = strongType;
            strongType = '';
          }
          else {
            if ( $is.void(strongType) ) {
              strongType = '';
            }
            setter = NIL;
          }
          if ( $is.void(descriptor) ) {
            descriptor = NIL;
          }
        }
        break;

      default:
        if ( $is.void(descriptor) ) {
          descriptor = NIL;
        }
        if ( $is.void(strongType) ) {
          strongType = '';
        }
        if ( $is.void(setter) ) {
          setter = NIL;
        }
    }

    if ( $is.obj(descriptor) ) {
      if ( !_hasOnlyDescriptorProps(descriptor) ) {
        throw _mkRangeErr(new RANGE_ERR, 'descriptor property defined',
          _DESCRIPTOR_KEYS, 'property');
      }
      if ( _isBadDescriptor(descriptor) ) {
        throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
          + 'properties within the #descriptor', 'property');
      }
    }
    else if ( !$is.nil(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'property');
    }

    if ( !$is.str(strongType) ) {
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=',
        'property');
    }
    else if ( !!strongType && !$is.void(val) && !is(strongType, val) ) {
      strongType = _appendEqualSign(strongType);
      throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType, 'property');
    }

    if ( !$is.nil(setter) && !$is.fun(setter) ) {
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(?function(*, *): *)=', 'property');
    }

    if ( !!descriptor && (!!strongType || !!setter) ) {
      if ( _hasAccessorProp(descriptor) ) {
        throw _mkErr(new ERR, 'conflicting accessor #descriptor and defined '
          + '#strongType and/or #setter', 'property');
      }
      else if ( $own(descriptor, 'writable') ) {
        throw _mkErr(new ERR, 'conflicting data #descriptor and defined '
          + '#strongType and/or #setter', 'property');
      }
    }

    return _amendProp(source, key, val, descriptor, strongType, setter);
  }
  amend['property'] = amendProperty;
  amend['prop'] = amendProperty;
  /// #if}}} @code property
  /// #}}} @submethod property

  /// #{{{ @submethod property.config
  /// #{{{ @docs property.config
  /// @section strict
  /// @method vitals.amend.property.config
  /// @alias vitals.amend.property.conf
  /// @alias vitals.amend.property.cfg
  /// @alias vitals.amend.prop.config
  /// @alias vitals.amend.prop.conf
  /// @alias vitals.amend.prop.cfg
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
  /// #}}} @docs property.config
  /// #if{{{ @code property.config
  function amendPropertyConfig(source, key, descriptor) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property.config');
      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'property.config');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
        'property.config');
    }

    if ( !$is.str(key) ) {
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property.config');
    }
    else if (!key) {
      throw _mkErr(new ERR, 'invalid empty #key `string`', 'property.config');
    }
    else if ( !$own(source, key) ) {
      throw _mkErr(new ERR, 'undefined #source key name defined by #key',
        'property.config');
    }

    if ( len === 2 || $is.void(descriptor) || $is.nil(descriptor) ) {
      return source;
    }

    if ( !$is.obj(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'property.config');
    }
    else if ( !_hasOnlyDescriptorProps(descriptor) ) {
      throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
        + '`object`', _DESCRIPTOR_KEYS, 'property.config');
    }
    else if ( _isBadConfigDescriptor(descriptor) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties within the #descriptor', 'property.config');
    }

    return $is.empty(descriptor)
      ? source
      : _amendConfig(source, key, descriptor);
  }
  amend['property']['config'] = amendPropertyConfig;
  amend['property']['conf'] = amendPropertyConfig;
  amend['property']['cfg'] = amendPropertyConfig;
  amend['prop']['config'] = amendPropertyConfig;
  amend['prop']['conf'] = amendPropertyConfig;
  amend['prop']['cfg'] = amendPropertyConfig;
  /// #if}}} @code property.config
  /// #}}} @submethod property.config

  /// #{{{ @submethod properties
  /// #{{{ @docs properties
  /// @section strict
  /// @method vitals.amend.properties
  /// @alias vitals.amend.props
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that includes
   *   easier property value assignment, strong type declarations, and
   *   flexible default [descriptor][descriptor] options.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, *>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each [owned][own] property within the #props `object`, the key
   *     name should be the key name of a property to be edited within or
   *     added to the #source `object` and the value should be the
   *     [descriptor][descriptor] or value to set the new or edited property
   *     to. Note that @amend#properties considers a property value to be a
   *     [descriptor][descriptor] only when it is an `object` that [owns][own]
   *     at least one [descriptor][descriptor] property and that does **not**
   *     [own][own] any non-descriptor properties. The following values are
   *     the key names that mark a property as a [descriptor][descriptor]
   *     property:
   *     - `"configurable"`
   *     - `"enumerable"`
   *     - `"get"`
   *     - `"set"`
   *     - `"value"`
   *     - `"writable"`
   *   - *`!Array<string>`*!$
   *     Each indexed property within the #props `array` should be a property
   *     key name to edit within or add to the #source `object`.
   *   - *`string`*!$
   *     The #props `string` should be a list of property key names to edit
   *     within or add to the #source `object`. The first of the following
   *     values found within the #props `string` is used as the separator
   *     (values listed in order):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {*=} val = `undefined`
   *   If the #val is defined, the #val sets the value for each property
   *   listed by the #props. If the #props is an `object` and a
   *   [descriptor][descriptor] that contains an [owned][own] `"value"`
   *   property or an [accessor descriptor][descriptor] is defined for a
   *   property's value, the #val does **not** apply to that specific
   *   property. If the #descriptor is defined and contains an [owned][own]
   *   `"value"` property, the value set by #val overrides the value defined
   *   within the #descriptor. If the #strongType or #setter is defined, the
   *   #val or #descriptor (or both) must be defined.
   * @param {?Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property defined by #props.
   *   If #props is an `object` and a [descriptor][descriptor] is defined for
   *   a property value, the #descriptor acts as a base for the property's
   *   [descriptor][descriptor] (i.e. any property defined within the
   *   #descriptor and not defined within a #props [descriptor][descriptor]
   *   that is of the same [descriptor type][descriptor] is set within the
   *   #props descriptor to the value defined by #descriptor). If the
   *   #strongType or #setter is defined, the #val or #descriptor (or both)
   *   must be defined.
   * @param {string=} strongType
   *   If the #strongType is defined, all new or edited properties defined by
   *   #props are assigned an [accessor descriptor][descriptor] with a *set*
   *   `function` that throws a `TypeError` instance if any new value fails an
   *   @is#main test for the data types specicified by the #strongType
   *   `string`. If the #props is an `object` and a [descriptor][descriptor]
   *   containing an *accessor* or *data* specific descriptor property is
   *   defined for a property's value, **no** descriptor values are changed
   *   for that specific property. If the #setter is defined, the #strongType
   *   check is still completed.
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
   *   If the #setter is defined, all new or edited properties defined by
   *   #props are assigned an [accessor descriptor][descriptor] with a *set*
   *   `function` that sets the property's value to the value returned by a
   *   call to the #setter `function`. The #setter is passed the following
   *   two arguments:
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
   *   The amended #source.
   */
  /// #}}} @docs properties
  /// #if{{{ @code properties
  function amendProperties(
    source, props, val, descriptor, strongType, setter) {

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
      byKeys = YES;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props,
        '!Object<string, *>|!Array<string>|string', 'properties');
    }
    else if ( $is.arr(props) ) {
      if ( !_keysTypeCheckProps(props) ) {
        throw _mkTypeErr(new TYPE_ERR, 'props property', props,
          '!Array<string>', 'properties');
      }
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined in '
          + '#props `array`', 'properties');
      }
      byKeys = YES;
    }
    else if ( !_descriptorCheckProps(props) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties for a property value within the #props', 'properties');
    }
    else {
      byKeys = NO;
    }

    switch (len) {
      case 2:
        return byKeys
          ? _amendPropsByKey(source, props, VOID, NIL, '', NIL)
          : _amendProps(source, props, VOID, NIL, '', NIL);

      case 3:
        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = $own(descriptor, 'value')
            ? descriptor['value']
            : VOID;
        }
        else {
          descriptor = NIL;
        }

        return byKeys
          ? _amendPropsByKey(source, props, val, descriptor, '', NIL)
          : _amendProps(source, props, val, descriptor, '', NIL);

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          setter = NIL;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else if ( $is.fun(descriptor) ) {
          strongType = '';
          setter = descriptor;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else {
          strongType = '';
          setter = NIL;
        }
        break;

      case 5:
        if ( $is.str(descriptor) ) {
          setter = $is.void(strongType)
            ? NIL
            : strongType;
          strongType = descriptor;
          if ( _isDescriptor(val) ) {
            descriptor = val;
            val = $own(descriptor, 'value')
              ? descriptor['value']
              : VOID;
          }
          else {
            descriptor = NIL;
          }
        }
        else {
          if ( $is.nil(strongType) || $is.fun(strongType) ) {
            setter = strongType;
            strongType = '';
          }
          else {
            if ( $is.void(strongType) ) {
              strongType = '';
            }
            setter = NIL;
          }
          if ( $is.void(descriptor) ) {
            descriptor = NIL;
          }
        }
        break;

      default:
        if ( $is.void(descriptor) ) {
          descriptor = NIL;
        }
        if ( $is.void(strongType) ) {
          strongType = '';
        }
        if ( $is.void(setter) ) {
          setter = NIL;
        }
    }

    if ( $is.obj(descriptor) ) {
      if ( !_hasOnlyDescriptorProps(descriptor) ) {
        throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
          + '`object`', _DESCRIPTOR_KEYS, 'properties');
      }
      if ( _isBadDescriptor(descriptor) ) {
        throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
          + 'properties within the #descriptor', 'properties');
      }
    }
    else if ( !$is.nil(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'properties');
    }

    if ( !$is.str(strongType) ) {
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=',
        'properties');
    }
    else if (strongType) {
      if ( !$is.void(val) && !is(strongType, val) ) {
        strongType = _appendEqualSign(strongType);
        throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType, 'properties');
      }
      if ( !byKeys && !_strongTypeCheckProps(strongType, props) ) {
        strongType = _appendEqualSign(strongType);
        throw _mkTypeErr(new TYPE_ERR, 'props property value', props,
          strongType, 'properties');
      }
    }

    if ( !$is.nil(setter) && !$is.fun(setter) ) {
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(?function(*, *): *)=', 'properties');
    }

    if ( !!descriptor && (!!strongType || !!setter) ) {
      if ( _hasAccessorProp(descriptor) ) {
        throw _mkErr(new ERR, 'conflicting accessor #descriptor and defined '
          + '#strongType and/or #setter', 'properties');
      }
      else if ( $own(descriptor, 'writable') ) {
        throw _mkErr(new ERR, 'conflicting data #descriptor and defined '
          + '#strongType and/or #setter', 'properties');
      }
    }

    return byKeys
      ? _amendPropsByKey(source, props, val, descriptor, strongType, setter)
      : _amendProps(source, props, val, descriptor, strongType, setter);
  }
  amend['properties'] = amendProperties;
  amend['props'] = amendProperties;
  /// #if}}} @code properties
  /// #}}} @submethod properties

  /// #{{{ @submethod properties.config
  /// #{{{ @docs properties.config
  /// @section strict
  /// @method vitals.amend.properties.config
  /// @alias vitals.amend.properties.conf
  /// @alias vitals.amend.properties.cfg
  /// @alias vitals.amend.props.config
  /// @alias vitals.amend.props.conf
  /// @alias vitals.amend.props.cfg
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
  /// #}}} @docs properties.config
  /// #if{{{ @code properties.config
  function amendPropertiesConfig(source, props, descriptor) {

    /** @type {boolean} */
    var byKeys;
    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties.config');
      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'properties.config');
    }

    if ( !$is.obj(source) ) {
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
        'properties.config');
    }

    if ( $is.str(props) ) {
      if (!props) {
        throw _mkErr(new ERR, 'invalid empty `string` defined for #props',
          'properties.config');
      }
      props = $splitKeys(props);
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name defined in #props '
          + '`string`', 'properties.config');
      }
      if ( !_ownKeysCheckProps(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined in #props '
          + '`string`', 'properties.config');
      }
      byKeys = YES;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props, '!Object<string, '
        + '(?Object|?undefined)>|!Array<string>|string', 'properties.config');
    }
    else if ( $is.arr(props) ) {
      if ( !_keysTypeCheckProps(props) ) {
        throw _mkTypeErr(new TYPE_ERR, 'props property', props,
          '!Array<string>', 'properties.config');
      }
      if ( !_keysCheckProps(props) ) {
        throw _mkErr(new ERR, 'invalid empty key name `string` defined in '
          + '#props `array`', 'properties.config');
      }
      if ( !_ownKeysCheckProps(source, props) ) {
        throw _mkErr(new ERR, 'undefined #source key name defined in #props '
          + '`array`', 'properties.config');
      }
      byKeys = YES;
    }
    else if ( !_ownCheckProps(source, props) ) {
      throw _mkErr(new ERR, 'undefined #source key name defined in #props '
        + '`object`', 'properties.config');
    }
    else if ( !_configTypeCheckProps(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props property', props,
        '!Object<string, (?Object|?undefined)>', 'properties.config');
    }
    else if ( !_configDescCheckProps(props) ) {
      throw _mkRangeErr(new RANGE_ERR, '!descriptor property defined in '
        + '#props `object`', _DESCRIPTOR_KEYS, 'properties.config');
    }
    else if ( !_configBadDescCheckProps(props) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties for a property value within the #props',
        'properties.config');
    }
    else {
      byKeys = NO;
    }

    if ( len === 2 || $is.void(descriptor) || $is.nil(descriptor) ) {
      return byKeys
        ? source
        : _amendConfigs(source, props, NIL);
    }

    if ( !$is.obj(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=',
        'properties.config');
    }
    else if ( !_hasOnlyDescriptorProps(descriptor) ) {
      throw _mkRangeErr(new RANGE_ERR, '!property defined in descriptor '
        + '`object`', _DESCRIPTOR_KEYS, 'properties.config');
    }
    else if ( _isBadConfigDescriptor(descriptor) ) {
      throw _mkErr(new ERR, 'conflicting accessor and data descriptor '
        + 'properties within the #descriptor', 'properties.config');
    }

    return $is.empty(descriptor)
      ? byKeys
        ? source
        : _amendConfigs(source, props, NIL)
      : byKeys
        ? _amendConfigsByKey(source, props, descriptor)
        : _amendConfigs(source, props, descriptor);
  }
  amend['properties']['config'] = amendPropertiesConfig;
  amend['properties']['conf'] = amendPropertiesConfig;
  amend['properties']['cfg'] = amendPropertiesConfig;
  amend['props']['config'] = amendPropertiesConfig;
  amend['props']['conf'] = amendPropertiesConfig;
  amend['props']['cfg'] = amendPropertiesConfig;
  /// #if}}} @code properties.config
  /// #}}} @submethod properties.config

  /// #if{{{ @helpers amend

  /// #{{{ @group main

  /// #{{{ @func _amendProp
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*} val
   * @param {?Object} desc
   * @param {string} strongType
   * @param {?function} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, desc, strongType, setter) {

    /** @type {?function(*): boolean} */
    var typeCheck;
    /** @type {boolean} */
    var hasSetter;

    typeCheck = _mkStrongTypeCheck(strongType);
    hasSetter = !!typeCheck || !!setter;
    desc = _mkDefaultDescriptor(desc, val, hasSetter);
    if (hasSetter) {
      desc = _setupGetSet(val, desc, typeCheck, setter);
    }
    return _ObjDefineProp(obj, key, desc);
  }
  /// #}}} @func _amendProp

  /// #{{{ @func _amendProps
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {*} val
   * @param {?Object} desc
   * @param {string} strongType
   * @param {?function} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, desc, strongType, setter) {

    /** @type {?function(*): boolean} */
    var typeCheck;
    /** @type {boolean} */
    var hasSetter;

    typeCheck = _mkStrongTypeCheck(strongType);
    hasSetter = !!typeCheck || !!setter;
    desc = _mkDefaultDescriptor(desc, val, hasSetter);
    props = hasSetter
      ? _setupPropsWithSetter(props, val, desc, typeCheck, setter)
      : _setupProps(props, val, desc);
    return _ObjDefineProps(obj, props);
  }
  /// #}}} @func _amendProps

  /// #{{{ @func _amendPropsByKey
  /**
   * @private
   * @param {!Object} obj
   * @param {!Array<string>} props
   * @param {*} val
   * @param {?Object} desc
   * @param {string} strongType
   * @param {?function} setter
   * @return {!Object}
   */
  function _amendPropsByKey(obj, props, val, desc, strongType, setter) {

    /** @type {?function(*): boolean} */
    var typeCheck;
    /** @type {boolean} */
    var hasSetter;

    switch (props['length']) {
      case 0:
        return obj;
      case 1:
        return _amendProp(obj, props[0], val, desc, strongType, setter);
    }

    typeCheck = _mkStrongTypeCheck(strongType);
    hasSetter = !!typeCheck || !!setter;
    desc = _mkDefaultDescriptor(desc, val, hasSetter);
    props = hasSetter
      ? _setupPropsByKeyWithSetter(props, val, desc, typeCheck, setter)
      : _setupPropsByKey(props, desc);
    return _ObjDefineProps(obj, props);
  }
  /// #}}} @func _amendPropsByKey

  /// #{{{ @func _amendConfig
  /**
   * @private
   * @param {!Object} src
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfig(src, key, descriptor) {
    return _ObjDefineProp(src, key, descriptor);
  }
  /// #}}} @func _amendConfig

  /// #{{{ @func _amendConfigs
  /**
   * @private
   * @param {!Object} src
   * @param {!Object} props
   * @param {?Object} descriptor
   * @return {!Object}
   */
  function _amendConfigs(src, props, descriptor) {
    props = _setupConfigProps(props, descriptor);
    return $is.empty(props)
      ? src
      : _ObjDefineProps(src, props);
  }
  /// #}}} @func _amendConfigs

  /// #{{{ @func _amendConfigsByKey
  /**
   * @private
   * @param {!Object} src
   * @param {!Array<string>} keys
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfigsByKey(src, keys, descriptor) {

    /** @type {!Object} */
    var props;

    switch (keys['length']) {
      case 0:
        return src;
      case 1:
        return _ObjDefineProp(src, keys[0], descriptor);
    }

    props = _setupPropsByKey(keys, descriptor);
    return _ObjDefineProps(src, props);
  }
  /// #}}} @func _amendConfigsByKey

  /// #}}} @group main

  /// #{{{ @group descriptors

  /// #{{{ @group constants

  /// #{{{ @const _ACCESSOR_DESCRIPTOR
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var _ACCESSOR_DESCRIPTOR = {
    'enumerable': YES,
    'configurable': YES
  };
  /// #}}} @const _ACCESSOR_DESCRIPTOR

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

  /// #{{{ @const _DATA_DESCRIPTOR
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var _DATA_DESCRIPTOR = {
    'writable': YES,
    'enumerable': YES,
    'configurable': YES
  };
  /// #}}} @const _DATA_DESCRIPTOR

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
    'get': YES,
    'set': YES,
    'value': YES,
    'writable': YES,
    'enumerable': YES,
    'configurable': YES
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

  /// #{{{ @const _SETTER_KEYS
  /**
   * @description
   *   These key names mark a descriptor to skip setter assignments for.
   * @private
   * @const {!Array<string>}
   */
  var _SETTER_KEYS = [
    'get',
    'set',
    'writable'
  ];
  /// #}}} @const _SETTER_KEYS

  /// #}}} @group constants

  /// #{{{ @group setup

  /// #{{{ @func _setupDesc
  /**
   * @private
   * @param {*} val
   * @param {*} dfltVal
   * @param {!Object} dfltDesc
   * @param {boolean} isAccessor
   * @return {!Object}
   */
  function _setupDesc(val, dfltVal, dfltDesc, isAccessor) {

    /** @type {!Object} */
    var desc;

    if ( !_isDescriptor(val) ) {
      desc = $cloneObj(dfltDesc);
      if (!isAccessor) {
        desc['value'] = val;
      }
    }
    else if ( _hasAccessorProp(val) ) {
      desc = $cloneObj(val);
      if ( !_hasBoolPropVal(desc, 'enumerable') ) {
        desc['enumerable'] = dfltDesc['enumerable'];
      }
      if ( !_hasBoolPropVal(desc, 'configurable') ) {
        desc['configurable'] = dfltDesc['configurable'];
      }
      if ( $own(desc, 'value') ) {
        delete desc['value'];
      }
    }
    else if ( _hasDataProp(val) ) {
      desc = $cloneObj(val);
      if ( !$own(desc, 'value') ) {
        desc['value'] = dfltVal;
      }
      if ( !_hasBoolPropVal(desc, 'writable') ) {
        desc['writable'] = isAccessor
          ? _DATA_DESCRIPTOR['writable']
          : dfltDesc['writable'];
      }
      if ( !_hasBoolPropVal(desc, 'enumerable') ) {
        desc['enumerable'] = dfltDesc['enumerable'];
      }
      if ( !_hasBoolPropVal(desc, 'configurable') ) {
        desc['configurable'] = dfltDesc['configurable'];
      }
    }
    else {
      desc = $cloneObj(dfltDesc);
      if ( _hasBoolPropVal(val, 'enumerable') ) {
        desc['enumerable'] = val['enumerable'];
      }
      if ( _hasBoolPropVal(val, 'configurable') ) {
        desc['configurable'] = val['configurable'];
      }
    }
    return desc;
  }
  /// #}}} @func _setupDesc

  /// #{{{ @func _setupDescWithSetter
  /**
   * @private
   * @param {*} val
   * @param {*} dfltVal
   * @param {!Object} dfltDesc
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupDescWithSetter(val, dfltVal, dfltDesc, typeCheck, setter) {

    /** @type {!Object} */
    var desc;

    if ( !_isDescriptor(val) ) {
      desc = $cloneObj(dfltDesc);
      desc = _setupGetSet(val, desc, typeCheck, setter);
    }
    else if ( _hasAccessorProp(val) ) {
      desc = $cloneObj(val);
      if ( !_hasBoolPropVal(desc, 'enumerable') ) {
        desc['enumerable'] = dfltDesc['enumerable'];
      }
      if ( !_hasBoolPropVal(desc, 'configurable') ) {
        desc['configurable'] = dfltDesc['configurable'];
      }
      if ( $own(desc, 'value') ) {
        delete desc['value'];
      }
    }
    else if ( $own(val, 'writable') ) {
      desc = $cloneObj(val);
      if ( !$own(desc, 'value') ) {
        desc['value'] = dfltVal;
      }
      if ( !_hasBoolPropVal(desc, 'enumerable') ) {
        desc['enumerable'] = dfltDesc['enumerable'];
      }
      if ( !_hasBoolPropVal(desc, 'configurable') ) {
        desc['configurable'] = dfltDesc['configurable'];
      }
    }
    else {
      desc = $cloneObj(dfltDesc);
      if ( _hasBoolPropVal(val, 'enumerable') ) {
        desc['enumerable'] = val['enumerable'];
      }
      if ( _hasBoolPropVal(val, 'configurable') ) {
        desc['configurable'] = val['configurable'];
      }
      val = $own(val, 'value')
        ? val['value']
        : dfltVal;
      desc = _setupGetSet(val, desc, typeCheck, setter);
    }
    return desc;
  }
  /// #}}} @func _setupDescWithSetter

  /// #{{{ @func _setupGetSet
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupGetSet(val, descriptor, typeCheck, setter) {
    descriptor['get'] = function get() {
      return val;
    };
    descriptor['set'] = !!typeCheck && !!setter
      ? function set(newVal) {
          if ( !typeCheck(newVal) ) {
            throw _mkStrongTypeErr(new TYPE_ERR,
              'invalid data type for property value: `' + newVal + '`');
          }
          val = setter(newVal, val);
        }
      : !!typeCheck
        ? function set(newVal) {
            if ( !typeCheck(newVal) ) {
              throw _mkStrongTypeErr(new TYPE_ERR,
                'invalid data type for property value: `' + newVal + '`');
            }
            val = newVal;
          }
        : function set(newVal) {
            val = setter(newVal, val);
          };
    return descriptor;
  }
  /// #}}} @func _setupGetSet

  /// #}}} @group setup

  /// #{{{ @group tests

  /// #{{{ @func _hasAccessorProp
  /**
   * @private
   * @param {!Object} src
   * @return {boolean}
   */
  function _hasAccessorProp(src) {
    return $ownsOne(src, _ACCESSOR_KEYS);
  }
  /// #}}} @func _hasAccessorProp

  /// #{{{ @func _hasBoolPropVal
  /**
   * @private
   * @param {!Object} src
   * @param {string} key
   * @return {boolean}
   */
  function _hasBoolPropVal(src, key) {
    return $own(src, key) && $is.bool(src[key]);
  }
  /// #}}} @func _hasBoolPropVal

  /// #{{{ @func _hasDataProp
  /**
   * @private
   * @param {!Object} src
   * @return {boolean}
   */
  function _hasDataProp(src) {
    return $ownsOne(src, _DATA_KEYS);
  }
  /// #}}} @func _hasDataProp

  /// #{{{ @func _hasDescriptorProp
  /**
   * @private
   * @param {!Object} src
   * @return {boolean}
   */
  function _hasDescriptorProp(src) {
    return $ownsOne(src, _DESCRIPTOR_KEYS);
  }
  /// #}}} @func _hasDescriptorProp

  /// #{{{ @func _hasOnlyDescriptorProps
  /**
   * @private
   * @param {!Object} src
   * @return {boolean}
   */
  function _hasOnlyDescriptorProps(src) {

    /** @type {string} */
    var key;

    for (key in src) {
      if ( $own(src, key) && !$own(_DESCRIPTOR_PROPS, key) ) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _hasOnlyDescriptorProps

  /// #{{{ @func _hasSkipSetterProp
  /**
   * @private
   * @param {!Object} src
   * @return {boolean}
   */
  function _hasSkipSetterProp(src) {
    return $ownsOne(src, _SETTER_KEYS);
  }
  /// #}}} @func _hasSkipSetterProp

  /// #{{{ @func _isBadConfigDescriptor
  /**
   * @private
   * @param {!Object} desc
   * @return {boolean}
   */
  function _isBadConfigDescriptor(desc) {
    return $ownsOne(desc, _ACCESSOR_KEYS) && $ownsOne(desc, _DATA_KEYS);
  }
  /// #}}} @func _isBadConfigDescriptor

  /// #{{{ @func _isBadDescriptor
  /**
   * @private
   * @param {!Object} desc
   * @return {boolean}
   */
  function _isBadDescriptor(desc) {
    return $ownsOne(desc, _ACCESSOR_KEYS) && $own(desc, 'writable');
  }
  /// #}}} @func _isBadDescriptor

  /// #{{{ @func _isDescriptor
  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function _isDescriptor(val) {
    return $is.obj(val)
      && _hasDescriptorProp(val)
      && _hasOnlyDescriptorProps(val);
  }
  /// #}}} @func _isDescriptor

  /// #}}} @group tests

  /// #{{{ @group makers

  /// #{{{ @func _mkDefaultDescriptor
  /**
   * @private
   * @param {?Object} desc
   * @param {*} val
   * @param {boolean} hasSetter
   * @return {!Object}
   */
  function _mkDefaultDescriptor(desc, val, hasSetter) {

    /** @type {!Object} */
    var dflt;

    if (!desc) {
      if (hasSetter) {
        dflt = $cloneObj(_ACCESSOR_DESCRIPTOR);
      }
      else {
        dflt = $cloneObj(_DATA_DESCRIPTOR);
        dflt['value'] = val;
      }
    }
    else if ( hasSetter || _hasAccessorProp(desc) ) {
      dflt = $cloneObj(_ACCESSOR_DESCRIPTOR);
      if ( _hasBoolPropVal(desc, 'enumerable') ) {
        dflt['enumerable'] = desc['enumerable'];
      }
      if ( _hasBoolPropVal(desc, 'configurable') ) {
        dflt['configurable'] = desc['configurable'];
      }
      if (!hasSetter) {
        if ( _hasBoolPropVal(desc, 'get') ) {
          dflt['get'] = desc['get'];
        }
        if ( _hasBoolPropVal(desc, 'set') ) {
          dflt['set'] = desc['set'];
        }
      }
    }
    else {
      dflt = $cloneObj(_DATA_DESCRIPTOR);
      if ( _hasBoolPropVal(desc, 'writable') ) {
        dflt['writable'] = desc['writable'];
      }
      if ( _hasBoolPropVal(desc, 'enumerable') ) {
        dflt['enumerable'] = desc['enumerable'];
      }
      if ( _hasBoolPropVal(desc, 'configurable') ) {
        dflt['configurable'] = desc['configurable'];
      }
      dflt['value'] = val;
    }
    return dflt;
  }
  /// #}}} @func _mkDefaultDescriptor

  /// #{{{ @func _mkStrongTypeCheck
  /**
   * @private
   * @param {string} strongType
   * @return {?function(*): boolean}
   */
  function _mkStrongTypeCheck(strongType) {

    if (!strongType) {
      return NIL;
    }

    /// #{{{ @func strongTypeCheck
    /**
     * @param {*} newVal
     * @return {boolean}
     */
    function strongTypeCheck(newVal) {
      return is(strongType, newVal);
    }
    /// #}}} @func strongTypeCheck

    return strongTypeCheck;
  }
  /// #}}} @func _mkStrongTypeCheck

  /// #}}} @group makers

  /// #}}} @group descriptors

  /// #{{{ @group object-properties

  /// #{{{ @group polyfills

  /// #{{{ @const _HAS_DEFINE_PROPS
  /**
   * @private
   * @const {boolean}
   */
  var _HAS_DEFINE_PROPS = (function _HAS_DEFINE_PROPS_PrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {string} */
    var name;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    name = 'defineProperties';

    if ( !(name in OBJ) || !$is.fun(OBJ[name]) )
      return NO;

    name = 'defineProperty';

    if ( !(name in OBJ) || !$is.fun(OBJ[name]) )
      return NO;

    /** @dict */ 
    obj = {};
    /** @dict */ 
    descriptor = {};

    descriptor['value'] = obj;
    descriptor['enumerable'] = NO;

    try {
      OBJ[name](obj, 'key', descriptor);
      for (key in obj) {
        if (key === 'key')
          return NO;
      }
    }
    catch (e) {
      return NO;
    }

    return obj['key'] === obj;
  })();
  /// #}}} @const _HAS_DEFINE_PROPS

  /// #{{{ @func _ObjDefineProp
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  var _ObjDefineProp = (function _ObjDefinePropPrivateScope() {

    if (_HAS_DEFINE_PROPS)
      return OBJ['defineProperty'];

    return function defineProperty(obj, key, descriptor) {
      obj[key] = $own(descriptor, 'get')
        ? descriptor['get']()
        : descriptor['value'];
      return obj;
    };
  })();
  /// #}}} @func _ObjDefineProp

  /// #{{{ @func _ObjDefineProps
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object<string, !Object>} props
   * @return {!Object}
   */
  var _ObjDefineProps = (function _ObjDefinePropsPrivateScope() {

    if (_HAS_DEFINE_PROPS)
      return OBJ['defineProperties'];

    return function defineProperties(obj, props) {

      /** @type {!Object} */
      var descriptor;
      /** @type {string} */
      var key;

      for (key in props) {
        if ( $own(props, key) ) {
          descriptor = props[key];
          obj[key] = $own(descriptor, 'get')
            ? descriptor['get']()
            : descriptor['value'];
        }
      }
      return obj;
    };
  })();
  /// #}}} @func _ObjDefineProps

  /// #}}} @group polyfills

  /// #{{{ @group setup

  /// #{{{ @func _setupProps
  /**
   * @private
   * @param {!Object} props
   * @param {*} dfltVal
   * @param {!Object} dfltDesc
   * @return {!Object}
   */
  function _setupProps(props, dfltVal, dfltDesc) {

    /** @type {boolean} */
    var isAccessor;
    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};

    isAccessor = _hasAccessorProp(dfltDesc);
    for (key in props) {
      if ( $own(props, key) ) {
        newProps[key] = _setupDesc(props[key], dfltVal, dfltDesc, isAccessor);
      }
    }
    return newProps;
  }
  /// #}}} @func _setupProps

  /// #{{{ @func _setupPropsWithSetter
  /**
   * @private
   * @param {!Object} props
   * @param {*} dfltVal
   * @param {!Object} dfltDesc
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, dfltVal, dfltDesc, typeCheck, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};

    for (key in props) {
      if ( $own(props, key) ) {
        newProps[key] = _setupDescWithSetter(props[key], dfltVal, dfltDesc,
          typeCheck, setter);
      }
    }
    return newProps;
  }
  /// #}}} @func _setupPropsWithSetter

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

  /// #{{{ @func _setupPropsByKeyWithSetter
  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} dfltVal
   * @param {!Object} dfltDesc
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(
      keys, dfltVal, dfltDesc, typeCheck, setter) {

    /** @type {!Object} */
    var props;
    /** @type {!Object} */
    var desc;
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
      desc = $cloneObj(dfltDesc);
      props[key] = _setupGetSet(dfltVal, desc, typeCheck, setter);
    }
    return props;
  }
  /// #}}} @func _setupPropsByKeyWithSetter

  /// #{{{ @func _setupConfigProps
  /**
   * @private
   * @param {!Object} props
   * @param {?Object} dfltDesc
   * @return {!Object}
   */
  function _setupConfigProps(props, dfltDesc) {

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
  /// #}}} @func _setupConfigProps

  /// #}}} @group setup

  /// #{{{ @group tests

  /// #{{{ @func _hasKeys
  /**
   * @private
   * @param {!Object} src
   * @param {!Object} base
   * @return {boolean}
   */
  function _hasKeys(src, base) {

    /** @type {string} */
    var key;

    for (key in base) {
      if ( $own(base, key) && !$own(src, key) ) {
        return NO;
      }
    }
    return YES;
  }
  /// #}}} @func _hasKeys

  /// #{{{ @const _EQUAL_SIGN
  /**
   * @private
   * @const {!RegExp}
   */
  var _EQUAL_SIGN = /=/;
  /// #}}} @const _EQUAL_SIGN

  /// #{{{ @func _appendEqualSign
  /**
   * @private
   * @param {string} strongType
   * @return {string}
   */
  function _appendEqualSign(strongType) {
    return _EQUAL_SIGN['test'](strongType)
      ? strongType
      : strongType + '=';
  }
  /// #}}} @func _appendEqualSign

  /// #{{{ @func _configBadDescCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _configBadDescCheckProps(props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( $is.obj(val) && _isBadConfigDescriptor(val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _configBadDescCheckProps

  /// #{{{ @func _configDescCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _configDescCheckProps(props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( $is.obj(val) && !_hasOnlyDescriptorProps(val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _configDescCheckProps

  /// #{{{ @func _configTypeCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _configTypeCheckProps(props) {

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
  /// #}}} @func _configTypeCheckProps

  /// #{{{ @func _descriptorCheckProps
  /**
   * @private
   * @param {!Object} props
   * @return {boolean}
   */
  function _descriptorCheckProps(props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( _isDescriptor(val) && _isBadDescriptor(val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _descriptorCheckProps

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

  /// #{{{ @func _keysTypeCheckProps
  /**
   * @private
   * @param {!Array<string>} props
   * @return {boolean}
   */
  function _keysTypeCheckProps(props) {

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
  /// #}}} @func _keysTypeCheckProps

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

  /// #{{{ @func _ownKeysCheckProps
  /**
   * @private
   * @param {!Object} source
   * @param {!Array<string>} props
   * @return {boolean}
   */
  function _ownKeysCheckProps(source, props) {

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
  /// #}}} @func _ownKeysCheckProps

  /// #{{{ @func _strongTypeCheckProps
  /**
   * @private
   * @param {string} strongType
   * @param {!Object} props
   * @return {boolean}
   */
  function _strongTypeCheckProps(strongType, props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( _isDescriptor(val) ) {
          if ( _hasSkipSetterProp(val) || !$own(val, 'value') ) {
            continue;
          }
          val = val['value'];
        }
        if ( !$is.void(val) && !is(strongType, val) ) {
          return NO;
        }
      }
    }
    return YES;
  }
  /// #}}} @func _strongTypeCheckProps

  /// #}}} @group tests

  /// #}}} @group object-properties

  /// #{{{ @group errors

  /// #{{{ @func _mkStrongTypeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} msg
   * @return {!TypeError}
   */
  function _mkStrongTypeErr(err, msg) {
    err['__setter'] = YES;
    err['setter'] = YES;
    err['__type'] = YES;
    err['type'] = YES;
    err['name'] = 'TypeError';
    err['message'] = msg;
    err['msg'] = msg;
    return err;
  }
  /// #}}} @func _mkStrongTypeErr

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
