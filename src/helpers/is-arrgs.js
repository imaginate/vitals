/**
 * ---------------------------------------------------------------------------
 * $IS-ARRGS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isArrgs
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var $isArrgs = $ENV.HAS.ARGUMENTS_CLASS
  ? function $isArrgs(val) {
      if ( $isObj(val) ) {
        switch ( $objStr(val) ) {
          case $OBJ_STR_REF_ARR:
          case $OBJ_STR_REF_ARGS:
            return $YES;
        }
      }
      return $NO;
    }
  /// #if{{{ @env ARGS_POLYFILL
  : $ENV.HAS.ARGUMENTS_CALLEE
    ? function $isArrgs(val) {
        return $isObj(val) && (
          $objStr(val) === $OBJ_STR_REF_ARR
          || 'callee' in val );
      }
    : function $isArrgs(val) {
        return $isObj(val) && $objStr(val) === $OBJ_STR_REF_ARR;
      };
  /// #if}}} @env ARGS_POLYFILL
  /// #ifnot{{{ @env ARGS_POLYFILL
  : function $isArrgs(val) {
      return $isObj(val) && $objStr(val) === $OBJ_STR_REF_ARR;
    };
  /// #ifnot}}} @env ARGS_POLYFILL
/// #}}} @helper $isArrgs

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
