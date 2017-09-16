/**
 * ---------------------------------------------------------------------------
 * $PRINT HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $print
/**
 * @private
 * @param {*} val
 * @param {number=} depth
 * @return {string}
 */
var $print = (function __vitals$print__() {

  /// #{{{ @group constants

  /// #{{{ @const _INDENT
  /**
   * @private
   * @const {string}
   */
  var _INDENT = '    ';
  /// #}}} @const _INDENT

  /// #{{{ @const _MAP_TYPE
  /**
   * @private
   * @const {!RegExp}
   */
  var _MAP_TYPE = /^\[object ([a-zA-Z0-9_\$]+)\]$/;
  /// #}}} @const _MAP_TYPE

  /// #{{{ @const _END_COMMA
  /**
   * @private
   * @const {!RegExp}
   */
  var _END_COMMA = /,$/;
  /// #}}} @const _END_COMMA

  /// #}}} @group constants

  /// #{{{ @group helpers

  /// #{{{ @func _emptyHashMap
  /**
   * @private
   * @param {(!Object|!Function)} val
   * @return {boolean}
   */
  function _emptyHashMap(val) {

    /** @type {string} */
    var key;

    for (key in val) {
      if ( $own(val, key) ) {
        return $NO;
      }
    }
    return $YES;
  }
  /// #}}} @func _emptyHashMap

  /// #{{{ @func _escStr
  /**
   * @private
   * @param {string} val
   * @return {string}
   */
  function _escStr(val) {
    val = val['replace'](/\\/g, '\\\\');
    val = val['replace'](/\n/g, '\\n');
    val = val['replace'](/\r/g, '\\r');
    val = val['replace'](/\t/g, '\\t');
    val = val['replace'](/\v/g, '\\v');
    val = val['replace'](/\0/g, '\\0');
    val = val['replace'](/\b/g, '\\b');
    val = val['replace'](/\f/g, '\\f');
    return val;
  }
  /// #}}} @func _escStr

  /// #{{{ @func _getMapType
  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function _getMapType(val) {

    /** @type {string} */
    var type;

    if ( $is.fun(val) ) {
      type = 'Function';
      if ('name' in val && !!val['name']) {
        type += '(' + val['name'] + ')';
      }
      return type;
    }

    type = $objStr(val);
    return _MAP_TYPE['test'](type)
      ? type['replace'](_MAP_TYPE, '$1')
      : 'UnknownObjectType';
  }
  /// #}}} @func _getMapType

  /// #{{{ @func _mkIndent
  /**
   * @private
   * @param {number} depth
   * @return {string}
   */
  function _mkIndent(depth) {

    /** @type {string} */
    var indent;

    if (indent < 1) {
      return '';
    }

    indent = '';
    while (depth--) {
      indent += _INDENT;
    }
    return indent;
  }
  /// #}}} @func _mkIndent

  /// #}}} @group helpers

  /// #{{{ @group primitives

  /// #{{{ @func _primToStr
  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function _primToStr(val) {
    return $is.str(val)
      ? '"' + _escStr(val) + '"'
      : $mkStr(val);
  }
  /// #}}} @func _primToStr

  /// #}}} @group primitives

  /// #{{{ @group objects

  /// #{{{ @func _arrToStr
  /**
   * @private
   * @param {(!Array|!Arguments)} val
   * @param {number} depth
   * @return {string}
   */
  function _arrToStr(val, depth) {

    /** @type {string} */
    var result;
    /** @type {string} */
    var indent;
    /** @type {number} */
    var last;
    /** @type {number} */
    var i;

    last = val['length'] - 1;

    if (last < 0) {
      return '[]';
    }

    indent = _mkIndent(depth);
    depth += 1;

    result = '[';
    i = 0;
    while ($YES) {
      result += '\n' + indent + i + ': ' + $print(val[i], depth);
      if (++i > last) {
        break;
      }
      result += ',';
    }
    result += '\n' + indent + ']';

    return result;
  }
  /// #}}} @func _arrToStr

  /// #{{{ @func _keyToStr
  /**
   * @private
   * @param {*} key
   * @return {string}
   */
  function _keyToStr(key) {
    return "'" + $mkStr(key) + "'";
  }
  /// #}}} @func _keyToStr

  /// #{{{ @func _mapToStr
  /**
   * @private
   * @param {(!Object|!Function)} val
   * @param {number} depth
   * @return {string}
   */
  function _mapToStr(val, depth) {

    /** @type {string} */
    var result;

    if ( $is.regx(val) ) {
      return $mkStr(val);
    }

    result = _getMapType(val) + ': ';
    result += $is._arr(val)
      ? _arrToStr(val, depth)
      : _ownToStr(val, depth);
    return result;
  }
  /// #}}} @func _mapToStr

  /// #{{{ @func _ownToStr
  /**
   * @private
   * @param {(!Object|!Function)} val
   * @param {number} depth
   * @return {string}
   */
  function _ownToStr(val, depth) {

    /** @type {string} */
    var result;
    /** @type {string} */
    var indent;
    /** @type {string} */
    var key;

    if ( _emptyHashMap(val) ) {
      return '{}';
    }

    indent = _mkIndent(depth);
    depth += 1;

    result = '{';
    for (key in val) {
      if ( $own(val, key) ) {
        result += '\n' + indent + _keyToStr(key) + ': '
          + $print(val[key], depth) + ',';
      }
    }
    result = result['replace'](_END_COMMA, '');
    result += '\n' + indent + '}';

    return result;
  }
  /// #}}} @func _ownToStr

  /// #}}} @group objects

  /// #{{{ @func $print
  /**
   * @param {*} val
   * @param {number=} depth = `0`
   * @return {string}
   */
  function $print(val, depth) {

    if ( !$is._obj(val) ) {
      return _primToStr(val);
    }

    if ( !$is.num(depth) || depth < 0 ) {
      depth = 0;
    }

    return _mapToStr(val, depth);
  }
  /// #}}} @func $print

  return $print;
})();
/// #}}} @helper $print

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
