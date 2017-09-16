/**
 * ---------------------------------------------------------------------------
 * $MK-OBJ HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $mkObj
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var $mkObj = (function __vitals$mkObj__() {

  /// #{{{ @docrefs $mkObj
  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  /// #}}} @docrefs $mkObj

  /// #{{{ @func _create
  /**
   * @description
   *   Polyfills [Object.create][create] if it does not exist.
   * @private
   * @param {?Object} proto
   * @return {!Object}
   */
  var _create = $ENV.HAS.OBJECT_CREATE
    ? $OBJ['create']
    : (function __vitals$mkObjCreate__() {

        /// #{{{ @func _Obj
        /**
         * @private
         * @constructor
         */
        function _Obj(){}
        /// #}}} @func _Obj

        /// #{{{ @func create
        /**
         * @param {?Object} proto
         * @return {!Object}
         */
        function create(proto) {

          /** @type {!Object} */
          var obj;

          _Obj['prototype'] = proto;
          obj = new _Obj();
          _Obj['prototype'] = $NIL;
          return obj;
        }
        /// #}}} @func create

        return create;
      })();
  /// #}}} @func _create

  /// #{{{ @func $mkObj
  /**
   * @description
   *   Cross browser [Object.create][create] implementation.
   * @param {?Object} proto
   * @return {!Object}
   */
  function $mkObj(proto) {
    return _create(proto);
  }
  /// #}}} @func $mkObj

  return $mkObj;
})();
/// #}}} @helper $mkObj

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
