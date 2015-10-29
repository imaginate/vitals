/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - CREATE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.create]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/create.js}
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

var is = require('node-are').is;
var has = require('./has.js');
var merge = require('./merge.js');
var clone = require('./clone.js');


////////////////////////////////////////////////////////////////////////////////
// CREATE
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  /**
   * A shortcut for Object.create(proto[, props]) that allows you to choose the
   *   default config for the props.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)=} props - more per type:
   *   object: Defined as "propName => propVal" or "propName => propDescriptor".
   *   array:  Each value should be a property name (i.e. key).
   *   string: Converted to an array of property names. One of the chars in the
   *     following list is used as the separator (chars listed in order of use):
   *     ", "  ","  "|"  " "
   * @param {!Object=} descriptor - The default descriptor values for each prop.
   *   [default= { writable: true, enumerable: true, configurable: true }]
   * @return {!Object}
   */
  function create(proto, props, descriptor) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {(number|string)} */
    var prop;

    if ( !is('?obj', proto) ) {
      throw new TypeError('Invalid proto param in vitals.create call.');
    }

    props = is.str(props) ? _splitPropStr(props) : is.obj(props) ? props : null;
    descriptor = is.obj(descriptor) ? descriptor : null;
    descriptor = _getDescriptor(descriptor);

    if (!props) return _objCreate(proto);

    if ( is.arr(props) ) {
      prop = props.length;
      keys = props;
      props = {};
      while (prop--) {
        props[ keys[prop] ] = clone.obj(descriptor);
      }
    }
    else {
      for (prop in props) {
        if ( has(props, prop) ) {
          _setProp(props, prop, props[prop], descriptor);
        }
      }
    }

    return _objCreate(proto, props);
  }

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DATA_DESCRIPTOR = {
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var ACCESSOR_DESCRIPTOR = {
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DESCRIPTOR_PROPS = {
    get: true,
    set: true,
    value: true,
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @param {string} props - One of the chars in the following list is used as
   *   the separator (chars listed in order of use):  ", "  ","  "|"  " "
   * @return {!Array<string>}
   */
  function _splitPropStr(props) {
    return props.split(
      has(props, ', ')
        ? ', ' : has(props, ',')
          ? ',' : has(props, '|')
            ? '|' : ' '
    );
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*} val
   * @param {!Object} descriptor
   */
  function _setProp(obj, key, val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = clone.obj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = merge(prop, val);
    }
    else {
      prop.value = val;
    }

    obj[key] = prop;
  }

  /**
   * @private
   * @param {Object} descriptor
   * @return {!Object}
   */
  function _getDescriptor(descriptor) {
    return merge( clone.obj( _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR : DATA_DESCRIPTOR
    ), descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isDescriptor(obj) {

    /** @type {string} */
    var prop;

    if ( !is.obj(val) ) return false;

    for (prop in obj) {
      if ( has(obj, prop) && has(DESCRIPTOR_PROPS, prop) ) {
        return true;
      }
    }
    return false;
  }

  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return has(obj, 'get') || has(obj, 'set');
  }

  /**
   * @private
   * @param {Object} proto
   * @param {Object=} props
   * @return {!Object}
   */
  var _objCreate = !!Object.create ? Object.create : _objCreatePolyfill;

  /**
   * @private
   * @param {Object} proto
   * @param {Object=} props
   * @return {!Object}
   */
  function _objCreatePolyfill(proto, props) {

    /** @type {!Object} */
    var obj;

    _Object.prototype = proto;
    obj = new _Object(props);
    _Object.prototype = null;
    return obj;
  }

  /**
   * @private
   * @param {Object=} props
   * @constructor
   */
  function _Object(props) {

    /** @type {string} */
    var prop;

    if (props) {
      for (prop in props) {
        if ( has(props, prop) ) {
          this[prop] = props[prop].value;
        }
      }
    }
  }

  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


module.exports = create;
