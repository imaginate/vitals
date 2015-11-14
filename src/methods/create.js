/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - CREATE
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.create]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/create.js}
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

var newErrorAid = require('../_helpers/errorAid.js');
var _splitKeys = require('../_helpers/splitKeys.js');
var _cloneObj = require('../_helpers/cloneObj.js');
var _merge = require('../_helpers/merge.js');
var _own = require('../_helpers/own.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// CREATE
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.create(proto[, props]) that allows you to choose the
   *   default configuration for the properties.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)=} props - If defined the
   *   details for the props param are as follows (per props type):
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

    if ( !is('?obj', proto) ) throw _error.type('proto');

    if ( is.str(props) ) props = _splitKeys(props);

    if ( !is('!obj=', props)      ) throw _error.type('props');
    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');

    return _create(proto, props, descriptor);
  }

  /**
   * A shortcut for Object.create(proto[, props]) that allows you to choose the
   *   default configuration for the properties.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)=} props - If defined the
   *   details for the props param are as follows (per props type):
   *   object: Defined as "propName => propVal" or "propName => propDescriptor".
   *   array:  Each value should be a property name (i.e. key).
   *   string: Converted to an array of property names. One of the chars in the
   *     following list is used as the separator (chars listed in order of use):
   *     ", "  ","  "|"  " "
   * @param {!Object=} descriptor - The default descriptor values for each prop.
   *   [default= { writable: true, enumerable: true, configurable: true }]
   * @return {!Object}
   */
  create.object = function createObject(proto, props, descriptor) {

    if ( !is('?obj', proto) ) throw _error.type('proto', 'object');

    if ( is.str(props) ) props = _splitKeys(props);

    if ( !is('!obj=', props)      ) throw _error.type('props',      'object');
    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor', 'object');

    return _create(proto, props, descriptor);
  }
  // define shorthand
  create.obj = create.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)=} props
   * @param {!Object=} descriptor
   * @return {!Object}
   */
  function _create(proto, props, descriptor) {

    if (!props) return _ObjectCreate(proto);

    descriptor = _getDescriptor(descriptor || null);
    props = is.arr(props)
      ? _setupPropsWithKeys(props, descriptor)
      : _setupPropsWithVals(props, descriptor);

    return _ObjectCreate(proto, props);
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsWithKeys(keys, descriptor) {

    /** @type {!Object} */
    var props;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys.length;
    i = -1;
    while (++i < len) {
      key = keys[i];
      props[key] = _cloneObj(descriptor);
    }
    return props;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsWithVals(props, descriptor) {

    /** @type {string} */
    var key;

    for (key in props) {
      if ( _own(props, key) ) {
        props[key] = _getPropWithVal(key, props[key], descriptor);
      }
    }
    return props;
  }

  /**
   * @private
   * @param {string} key
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _getPropWithVal(key, val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = _merge(prop, val);
    }
    else {
      prop.value = val;
    }

    return prop;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - DESCRIPTORS
  //////////////////////////////////////////////////////////

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
   * @param {Object} descriptor
   * @return {!Object}
   */
  function _getDescriptor(descriptor) {

    /** @type {!Object} */
    var defaultDescriptor;

    defaultDescriptor = _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = _cloneObj(defaultDescriptor);

    return _merge(defaultDescriptor, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isDescriptor(obj) {

    /** @type {string} */
    var key;

    if ( !is.obj(val) ) return false;

    for (key in obj) {
      if ( _own(obj, key) && _own(DESCRIPTOR_PROPS, key) ) return true;
    }
    return false;
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return _own(obj, 'get') || _own(obj, 'set');
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.CREATE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} proto
   * @param {Object=} props
   * @return {!Object}
   */
  var _ObjectCreate = !!Object.create
    ? Object.create
    : function ObjectCreate(proto, props) {

      /** @type {!Object} */
      var obj;

      _Object.prototype = proto;
      obj = new _Object(props);
      _Object.prototype = null;
      return obj;
    };

  /**
   * @private
   * @param {Object=} props
   * @constructor
   */
  function _Object(props) {

    /** @type {string} */
    var key;

    if (props) {
      for (key in props) {
        if ( _own(props, key) ) {
          this[key] = props[key].value;
        }
      }
    }
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('create');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


module.exports = create;
