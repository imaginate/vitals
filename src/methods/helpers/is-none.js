/**
 * ---------------------------------------------------------------------------
 * $IS-NONE HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

var $HAS_ARGS = require('./has-args.js');

///////////////////////////////////////////////////////////////////////// {{{2
// $IS-NONE HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $isNone = (function $isNonePrivateScope() {

  ///////////////////////////////////////////////////// {{{3
  // $IS-NONE METHODS - PRIMITIVES
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{4
  /// @func isNull
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNull(val) {
    return isUndefined(val) || val === null;
  }

  /// {{{4
  /// @func isUndefined
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isUndefined(val) {
    return val === NONE;
  }

  /// {{{4
  /// @func isBoolean
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isBoolean(val) {
    return isUndefined(val) || typeof val === 'boolean';
  }

  /// {{{4
  /// @func isString
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isString(val) {
    return isUndefined(val) || typeof val === 'string';
  }

  /// {{{4
  /// @func isNonEmptyString
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonEmptyString(val) {
    return isUndefined(val) || (!!val && typeof val === 'string');
  }

  /// {{{4
  /// @func isNumber
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNumber(val) {
    return isUndefined(val) || (typeof val === 'number' && val === val);
  }

  /// {{{4
  /// @func isNonZeroNumber
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonZeroNumber(val) {
    return isUndefined(val)
      || (!!val && typeof val === 'number' && val === val);
  }

  /// {{{4
  /// @func isNan
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNan(val) {
    return isUndefined(val) || val !== val;
  }

  ///////////////////////////////////////////////////// {{{3
  // $IS-NONE METHODS - JS OBJECTS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var objToStr = Object['prototype']['toString'];

  /// {{{4
  /// @func _isObject
  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function _isObject(val) {
    return !!val && typeof val === 'object';
  }

  /// {{{4
  /// @func isObject
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isObject(val) {
    return isUndefined(val) || _isObject(val);
  }

  /// {{{4
  /// @func isObjectOrFunction
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isObjectOrFunction(val) {

    if (!val)
      return isUndefined(val);

    switch (typeof val) {
      case 'object':
      case 'function':
        return true;
      default:
        return false;
     }
  }

  /// {{{4
  /// @func isFunction
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isFunction(val) {
    return isUndefined(val) || (!!val && typeof val === 'function');
  }

  /// {{{4
  /// @func _isArray
  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function _isArray(val) {
    return _isObject(val) && objToStr['call'](val) === '[object Array]';
  }

  /// {{{4
  /// @func isArray
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArray(val) {
    return isUndefined(val) || _isArray(val);
  }

  /// {{{4
  /// @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArrayOrArguments = $HAS_ARGS.PRIMARY
    ? function isArrayOrArguments(val) {

        if ( !_isObject(val) )
          return isUndefined(val);

        switch ( objToStr['call'](val) )
          case '[object Array]':
          case '[object Arguments]':
            return true;
          default:
            return false;
        }
      }
    : $HAS_ARGS.POLYFILL
      ? function isArrayOrArguments(val) {
          return _isObject(val)
            ? (objToStr['call'](val) === '[object Array]' || 'callee' in val)
            : isUndefined(val);
        }
      : function isArrayOrArguments(val) {
          return isUndefined(val) || _isArray(val);
        };


  /// {{{4
  /// @func isRegExp
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    return isUndefined(val)
      || (_isObject(val) && objToStr['call'](val) === '[object RegExp]');
  }

  /// {{{4
  /// @func isDate
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDate(val) {
    return isUndefined(val)
      || (_isObject(val) && objToStr['call'](val) === '[object Date]');
  }

  /// {{{4
  /// @func isError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isError(val) {
    return isUndefined(val)
      || (_isObject(val) && objToStr['call'](val) === '[object Error]');
  }

  /// {{{4
  /// @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArguments = $HAS_ARGS.PRIMARY
    ? function isArguments(val) {
        return isUndefined(val)
          || (_isObject(val)
              && objToStr['call'](val) === '[object Arguments]');
      }
    : $HAS_ARGS.POLYFILL
      ? function isArguments(val) {
          return isUndefined(val) || (_isObject(val) && 'callee' in val);
        }
      : function isArguments(val) {
          return isUndefined(val);
        };

  ///////////////////////////////////////////////////// {{{3
  // $IS-NONE METHODS - DOM OBJECTS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func isDomDocument
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomDocument(val) {
    return isUndefined(val) || (_isObject(val) && val['nodeType'] === 9);
  }

  /// {{{4
  /// @func isDomElement
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomElement(val) {
    return isUndefined(val) || (_isObject(val) && val['nodeType'] === 1);
  }

  ///////////////////////////////////////////////////// {{{3
  // $IS-NONE SETUP
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const $IS_NONE
  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var $IS_NONE = {

    // primitives
    nil:  isNull,
    none: isUndefined,
    bool: isBoolean,
    str:  isString,
    _str: isNonEmptyString,
    num:  isNumber,
    _num: isNonZeroNumber,
    nan:  isNan,

    // js objects
    obj:  isObject,
    _obj: isObjectOrFunction,
    fun:  isFunction,
    arr:  isArray,
    _arr: isArrayOrArguments,
    regx: isRegExp,
    date: isDate,
    err:  isError,
    args: isArguments,

    // dom objects
    doc:  isDomDocument,
    elem: isDomElement,
  };
  /// }}}3

  // END OF PRIVATE SCOPE FOR $IS-NONE
  return $IS_NONE;
})();
/// }}}2

module.exports = $isNone;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
