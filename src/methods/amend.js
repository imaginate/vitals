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
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $ownsOne ../helpers/owns-one.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
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
   *     name should be the key name of a property to be edited in or added to
   *     the #source and the value should be the [descriptor][descriptor] or
   *     value to set the new or edited property to. Note that @amend#main
   *     considers a property value to be a [descriptor][descriptor] only when
   *     it an `object` that [owns][own] at least one [descriptor][descriptor]
   *     property and does **not** [own][own] any non-descriptor properties.
   *     The following values are the key names that mark a property as a
   *     [descriptor][descriptor] property:
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
   *   Only use the #val when a key name or names (i.e. `string` or `array`)
   *   is defined for the #props. When applicable and defined, the #val sets
   *   the value for each property key name listed by the #props regardless of
   *   the [descriptor][descriptor] settings defined by the #descriptor (i.e.
   *   the #val overrides the value of a `"value"` property set within the
   *   #descriptor).
   * @param {?Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property defined by #props.
   *   If #props is an `object` and a [descriptor][descriptor] is defined for
   *   a property value, the #descriptor acts as a base for the property's
   *   [descriptor][descriptor] (i.e. any property defined within the
   *   #descriptor and not defined within a #props [descriptor][descriptor]
   *   that is of the same [descriptor type][descriptor] is set within the
   *   #props descriptor to the value defined by #descriptor).
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
   *   **not** get called until after the @is#main test is complete.
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
        throw _mkErr(new ERR,
          'invalid empty key name `string` defined for #props');
      }
      byKeys = false;
    }
    else if ( !$is.obj(props) ) {
      throw _mkTypeErr(new TYPE_ERR, 'props', props,
        '!Object<string, *>|!Array<string>|string');
    }
    else {
      byKeys = $is.arr(props);
    }

    switch (len) {
      case 2:
        return byKey
          ? _amendProp(source, props, VOID, NIL, NIL, NIL)
          : byKeys
            ? _amendPropsByKey(source, props, VOID, NIL, NIL, NIL)
            : _amendProps(source, props, NIL, NIL, NIL);

      case 3:
        if (byKey) {
          return _amendProp(source, props, val, NIL, NIL, NIL);
        }
        if (byKeys) {
          return _amendPropsByKey(source, props, val, NIL, NIL, NIL);
        }

        if ( $is.str(val) ) {
          strongType = val;
          descriptor = NIL;
          setter = NIL;
        }
        else if ( $is.fun(val) ) {
          setter = val;
          strongType = '';
          descriptor = NIL;
        }
        else {
          descriptor = val;
          strongType = '';
          setter = NIL;
        }
        break;

      case 4:
        if (byKey || byKeys) {
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = NIL;
          }
          else if ( $is.fun(descriptor) ) {
            setter = descriptor;
            descriptor = NIL;
          }
          else {
            strongType = '';
            setter = NIL;
          }
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          if ( $is.str(val) ) {
            strongType = val;
            descriptor = NIL;
          }
          else {
            strongType = '';
            descriptor = val;
          }
          val = VOID;
        }
        else {
          strongType = descriptor;
          descriptor = val;
          setter = NIL;
          val = VOID;
        }
        break;

      case 5:
        if (byKey || byKeys) {
          if ( $is.fun(strongType) ) {
            setter = strongType;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = NIL;
            }
            else {
              strongType = '';
            }
          }
        }
        else {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
          val = VOID;
        }
        break;

      default:
        if (!byKey && !byKeys) {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
          val = VOID;
        }
    }

    if ( $is.void(descriptor) ) {
      descriptor = NIL;
    }
    else if ( $is.obj(descriptor) ) {
      if ( !_hasOnlyDescriptorProps(descriptor) ) {
        throw _mkRangeErr(new RANGE_ERR, 'descriptor property defined',
          _DESCRIPTOR_KEYS);
      }
    }
    else if ( !$is.nil(descriptor) ) {
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '?Object=');
    }

    if ( $is.void(strongType) ) {
      strongType = '';
    }
    else if ( !$is.str(strongType) ) {
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=');
    }
    else if (strongType) {
      if (byKey || byKeys) {
        if ( !$is.void(val) && !is(strongType, val) ) {
          strongType = _appendEqualSign(strongType);
          throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType);
        }
      }
      else if ( !_strongTypeCheckProps(strongType, props) ) {
        strongType = _appendEqualSign(strongType);
        throw _mkTypeErr(new TYPE_ERR, 'props property value', props,
          strongType);
      }
    }

    if ( $is.void(setter) ) {
      setter = NIL;
    }
    else if ( !$is.nil(setter) && !$is.fun(setter) ) {
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(?function(*, *): *)=');
    }

    return byKey
      ? _amendProp(source, props, val, descriptor, strongType, setter)
      : byKeys
        ? _amendPropsByKey(source, props, val, descriptor, strongType, setter)
        : _amendProps(source, props, descriptor, strongType, setter);
  }
  amend['main'] = amend;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod config
  /// #{{{ @docs config
  /// @section strict
  /// @method vitals.amend.config
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that only
   *   updates the descriptors of existing properties.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, !Object>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] for its `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!Object=} descriptor
   *   Only define #descriptor (and then required) if an `array` or `string`
   *   of property names is given for #props.
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs config
  /// #if{{{ @code config
  function amendConfig(source, props, descriptor) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'config');

      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'config');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #descriptor defined', 'config');
        if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string', 'config');
        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'config');

        return _amendConfigs(source, props);

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string', 'config');

        if ( $is.arr(props) ) {
          if ( !$is.obj(descriptor) )
            throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor,
              '!Object=', 'config');

          props = _setupConfigs(props, descriptor);
        }
        else if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string', 'config');

        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'config');

        return _amendConfigs(source, props);
    }
  }
  amend['config'] = amendConfig;
  /// #if}}} @code config
  /// #}}} @submethod config

  /// #{{{ @submethod property
  /// #{{{ @docs property
  /// @section strict
  /// @method vitals.amend.property
  /// @alias vitals.amend.prop
  /**
   * @description
   *   A shortcut for [Object.defineProperty][define-prop].
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {*=} val
   *   The #val is required if the #descriptor is not defined.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   * @param {string=} strongType
   *   If the #strongType is defined, the new property is assigned an
   *   [accessor descriptor][descriptor] that includes a `set` function that
   *   throws an error if @is#main returns `false` for a new property `value`.
   *   See the below snippet for an example #strongType `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined the new property is assigned an
   *   [accessor descriptor][descriptor] that includes a `set` function that
   *   sets the property to the value returned by #setter. The #setter
   *   function will receive two params, the new value and the current value.
   *   If #strongType is defined #setter will not get called until the new
   *   value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs property
  /// #if{{{ @code property
  function amendProperty(source, key, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var byKey;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property');

      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'property');

      case 2:
        throw _mkErr(new ERR, 'no #val or #descriptor defined', 'property');

      case 3:
        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = descriptor['value'];
        }
        break;

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = VOID;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = VOID;
        }

        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = descriptor['value'];
        }
        break;

      case 5:
        if ( $is.fun(strongType) ) {
          setter = strongType;
          strongType = VOID;
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = VOID;
          }
        }

        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = descriptor['value'];
        }
        break;
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'property');
    if ( !$is.str(key) )
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property');
    if ( !$is.void(descriptor) && !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object=',
        'property');
    if ( !$is.void(strongType) && !$is.str(strongType) )
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=',
        'property');
    if ( !$is.void(setter) && !$is.fun(setter) )
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(!function(*, *): *)=', 'property');
    if ( !!strongType && !is(strongType + '=', val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType + '=',
        'property');
    if (descriptor
        && (strongType || setter)
        && $own(descriptor, 'writable') )
      throw _mkErr(new ERR, 'invalid data #descriptor used with defined ' +
        '#strongType or #setter', 'property');

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
  /// @alias vitals.amend.prop.config
  /**
   * @description
   *   A shortcut for [Object.defineProperty][define-prop] that only updates
   *   the [descriptor][descriptor] of an existing property.
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs property.config
  /// #if{{{ @code property.config
  function amendPropertyConfig(source, key, descriptor) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property.config');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'property.config');
      case 2:
        throw _mkErr(new ERR, 'no #descriptor defined', 'property.config');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
        'property.config');
    if ( !$is.str(key) )
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property.config');
    if ( !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object',
        'property.config');
    if ( !$own(source, key) )
      throw _mkErr(new ERR, 'undefined #key name in #source',
        'property.config');

    return _amendConfig(source, key, descriptor);
  }
  amend['property']['config'] = amendPropertyConfig;
  amend['prop']['config'] = amendPropertyConfig;
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
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] or new value for its
   *     `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {*=} val
   *   Only define #val (and then required) if an `array` or `string` of
   *   property names is given for #props. #val sets the value of each
   *   property in #props regardless of #descriptor settings.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property in #props unless a
   *   [descriptor][descriptor] is used for a #props `value`.
   * @param {string=} strongType
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that throws an error if @is#main returns `false` for a new
   *   property `value`. See the below snippet for an example #strongType
   *   `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that sets the property to the value returned by #setter. The
   *   #setter function will receive two params, the new value and the current
   *   value. If #strongType is defined #setter will not get called until the
   *   new value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
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
    var byKey;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties');

      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'properties');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #val defined', 'properties');

        return _amendProps(source, props, VOID, VOID, VOID);

      case 3:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (byKey)
          return _amendPropsByKey(source, props, val, VOID, VOID, VOID);

        descriptor = val;
        strongType = VOID;
        setter = VOID;

        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = VOID;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = VOID;
        }
        break;

      case 4:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (byKey) {
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = VOID;
          }
          else if ( $is.fun(descriptor) ) {
            setter = descriptor;
            descriptor = VOID;
          }
        }
        else {
          strongType = descriptor;
          descriptor = val;
          setter = VOID;
          if ( $is.fun(strongType) ) {
            setter = strongType;
            strongType = VOID;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = VOID;
            }
          }
        }
        break;

      case 5:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (byKey) {
          if ( $is.fun(strongType) ) {
            setter = strongType;
            strongType = VOID;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = VOID;
            }
          }
        }
        else {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
        }
        break;

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (!byKey) {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
        }
        break;
    }

    if ( !$is.void(descriptor) && !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object=',
        'properties');
    if ( !$is.void(strongType) && !$is.str(strongType) )
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=',
        'properties');
    if ( !$is.void(setter) && !$is.fun(setter) )
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(!function(*, *): *)=', 'properties');

    if (strongType) {
      if (byKey) {
        if ( !is(strongType + '=', val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType + '=',
            'properties');
      }
      else if ( !_strongTypeCheckProps(strongType, props) )
        throw _mkTypeErr(new TYPE_ERR, 'props property value', props,
          strongType, 'properties');
    }

    return byKey
      ? _amendPropsByKey(source, props, val, descriptor, strongType, setter)
      : _amendProps(source, props, descriptor, strongType, setter);
  }
  amend['properties'] = amendProperties;
  amend['props'] = amendProperties;
  /// #if}}} @code properties
  /// #}}} @submethod properties

  /// #{{{ @submethod properties.config
  /// #{{{ @docs properties.config
  /// @section strict
  /// @method vitals.amend.properties.config
  /// @alias vitals.amend.props.config
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that only
   *   updates the [descriptors][descriptor] of existing properties.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, !Object>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] for its `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!Object=} descriptor
   *   Only define #descriptor (and then required) if an `array` or `string`
   *   of property names is given for #props.
   * @return {!Object}
   *   The amended #source.
   */
  /// #}}} @docs properties.config
  /// #if{{{ @code properties.config
  function amendPropertiesConfig(source, props, descriptor) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties.config');

      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'properties.config');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties.config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #descriptor defined','properties.config');
        if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string',
            'properties.config');
        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'properties.config');

        return _amendConfigs(source, props);

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties.config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string',
            'properties.config');

        if ( $is.arr(props) ) {
          if ( !$is.obj(descriptor) )
            throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor,
              '!Object=', 'properties.config');

          props = _setupConfigs(props, descriptor);
        }
        else if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string',
            'properties.config');

        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'properties.config');

        return _amendConfigs(source, props);
    }
  }
  amend['properties']['config'] = amendPropertiesConfig;
  amend['props']['config'] = amendPropertiesConfig;
  /// #if}}} @code properties.config
  /// #}}} @submethod properties.config

  /// #if{{{ @helpers amend

  /// #{{{ @group main

  /// #{{{ @func _amendProp
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {?Object} descriptor
   * @param {?string} strongType
   * @param {?function} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, strongType, setter) {

    /** @type {?function(*): boolean} */
    var typeCheck;

    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    typeCheck = _getStrongTypeCheck(strongType);
    descriptor = !!typeCheck || !!setter
      ? _setupDescByKeyWithSetter(val, descriptor, typeCheck, setter || NIL)
      : _isAccessor(descriptor)
        ? $cloneObj(descriptor)
        : _setupDescByKey(val, descriptor);
    return _ObjDefineProp(obj, key, descriptor);
  }
  /// #}}} @func _amendProp

  /// #{{{ @func _amendProps
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {?Object} descriptor
   * @param {?string} strongType
   * @param {?function} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, descriptor, strongType, setter) {

    /** @type {?function(*): boolean} */
    var typeCheck;

    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    typeCheck = _getStrongTypeCheck(strongType);
    props = !!typeCheck || !!setter
      ? _setupPropsWithSetter(props, descriptor, typeCheck, setter || NIL)
      : _setupProps(props, descriptor);
    return _ObjDefineProps(obj, props);
  }
  /// #}}} @func _amendProps

  /// #{{{ @func _amendPropsByKey
  /**
   * @private
   * @param {!Object} obj
   * @param {!Array} props
   * @param {*} val
   * @param {?Object} descriptor
   * @param {?string} strongType
   * @param {?function} setter
   * @return {!Object}
   */
  function _amendPropsByKey(obj, props, val, descriptor, strongType, setter) {

    /** @type {?function(*): boolean} */
    var typeCheck;

    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    typeCheck = _getStrongTypeCheck(strongType);
    props = !!typeCheck || !!setter
      ? _setupPropsByKeyWithSetter(props, val, descriptor, typeCheck,
          setter || NIL)
      : _setupPropsByKey(props, val, descriptor);
    return _ObjDefineProps(obj, props);
  }
  /// #}}} @func _amendPropsByKey

  /// #{{{ @func _amendConfig
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfig(obj, key, descriptor) {
    return _ObjDefineProp(obj, key, descriptor);
  }
  /// #}}} @func _amendConfig

  /// #{{{ @func _amendConfigs
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  function _amendConfigs(obj, props) {
    return _ObjDefineProps(obj, props);
  }
  /// #}}} @func _amendConfigs

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
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDesc(val, descriptor) {

    /** @type {!Object} */
    var desc;

    desc = $cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      desc = $merge(desc, val);
    }
    else {
      desc['value'] = val;
    }
    return desc;
  }
  /// #}}} @func _setupDesc

  /// #{{{ @func _setupDescWithSetter
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupDescWithSetter(val, descriptor, typeCheck, setter) {

    /** @type {!Object} */
    var desc;

    desc = $cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      desc = $merge(desc, val);

      if ( _hasSkipSetterProp(desc) ) {
        return desc;
      }

      val = desc['value'];
      desc = _cloneAccessor(desc);
    }

    desc = _setupGetSet(val, desc, typeCheck, setter);
    return desc;
  }
  /// #}}} @func _setupDescWithSetter

  /// #{{{ @func _setupDescByKey
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescByKey(val, descriptor) {

    /** @type {!Object} */
    var desc;

    desc = $cloneObj(descriptor);
    desc['value'] = val;
    return desc;
  }
  /// #}}} @func _setupDescByKey

  /// #{{{ @func _setupDescByKeyWithSetter
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupDescByKeyWithSetter(val, descriptor, typeCheck, setter) {

    /** @type {!Object} */
    var desc;

    desc = $cloneObj(descriptor);
    desc = _setupGetSet(val, desc, typeCheck, setter);
    return desc;
  }
  /// #}}} @func _setupDescByKeyWithSetter

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

  /// #{{{ @func _isData
  /**
   * @private
   * @param {?Object} val
   * @return {boolean}
   */
  function _isData(val) {
    return $is.obj(val) && $ownsOne(val, _DATA_KEYS);
  }
  /// #}}} @func _isData

  /// #{{{ @func _isAccessor
  /**
   * @private
   * @param {?Object} val
   * @return {boolean}
   */
  function _isAccessor(val) {
    return $is.obj(val) && $ownsOne(val, _ACCESSOR_KEYS);
  }
  /// #}}} @func _isAccessor

  /// #}}} @group tests

  /// #{{{ @group clone

  /// #{{{ @func _cloneAccessor
  /**
   * @private
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _cloneAccessor(descriptor) {

    /** @type {!Object} */
    var accessor;
    /** @type {string} */
    var key;

    accessor = {};
    for (key in descriptor) {
      if ( $own(descriptor, key) && key !== 'value' ) {
        accessor[key] = descriptor[key];
      }
    }
    return accessor;
  }
  /// #}}} @func _cloneAccessor

  /// #}}} @group clone

  /// #{{{ @group getters

  /// #{{{ @func _getDescriptor
  /**
   * @private
   * @param {?Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var desc;

    if ( hasSetter && _isData(descriptor) ) {
      desc = {};
      if ( _hasBoolPropVal(descriptor, 'enumerable') ) {
        desc['enumerable'] = descriptor['enumerable'];
      }
      if ( _hasBoolPropVal(descriptor, 'configurable') ) {
        desc['configurable'] = descriptor['configurable'];
      }
      descriptor = desc;
    }

    desc = $cloneObj(
      hasSetter || _isAccessor(descriptor)
        ? _ACCESSOR_DESCRIPTOR
        : _DATA_DESCRIPTOR);
    return $merge(desc, descriptor);
  }
  /// #}}} @func _getDescriptor

  /// #{{{ @func _getStrongTypeCheck
  /**
   * @private
   * @param {string=} strongType
   * @return {?function(*): boolean}
   */
  function _getStrongTypeCheck(strongType) {

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
  /// #}}} @func _getStrongTypeCheck

  /// #}}} @group getters

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
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupProps(props, descriptor) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};

    for (key in props) {
      if ( $own(props, key) ) {
        newProps[key] = _setupDesc(props[key], descriptor);
      }
    }
    return newProps;
  }
  /// #}}} @func _setupProps

  /// #{{{ @func _setupPropsWithSetter
  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, typeCheck, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};

    for (key in props) {
      if ( $own(props, key) ) {
        newProps[key] = _setupDescWithSetter(props[key], descriptor,
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
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsByKey(keys, val, descriptor) {

    /** @type {!function} */
    var setupDesc;
    /** @type {!Object} */
    var props;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    setupDesc = _isAccessor(descriptor)
      ? function setupDesc(val, desc) {
          return $cloneObj(desc);
        }
      : _setupDescByKey;
    len = keys['length'];
    i = -1;
    while (++i < len) {
      key = keys[i];
      props[key] = setupDesc(val, descriptor);
    }
    return props;
  }
  /// #}}} @func _setupPropsByKey

  /// #{{{ @func _setupPropsByKeyWithSetter
  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} desc
   * @param {?function(*): boolean} typeCheck
   * @param {?function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(keys, val, desc, typeCheck, setter) {

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
      props[key] = _setupDescByKeyWithSetter(val, desc, typeCheck, setter);
    }
    return props;
  }
  /// #}}} @func _setupPropsByKeyWithSetter

  /// #{{{ @func _setupConfigs
  /**
   * @private
   * @param {!Array} keys
   * @param {!Object} desc
   * @return {!Object}
   */
  function _setupConfigs(keys, desc) {

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
      props[key] = desc;
    }
    return props;
  }
  /// #}}} @func _setupConfigs

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
    return _EQUAL_SIGN.test(strongType)
      ? strongType
      : strongType + '=';
  }
  /// #}}} @func _appendEqualSign

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
          if ( $own(val, 'writable') ) {
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
