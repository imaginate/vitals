/**
 * ---------------------------------------------------------------------------
 * $IS-ARGS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isArgs
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var $isArgs = $ENV.HAS.ARGUMENTS_CLASS
  ? function $isArgs(val) {
      return $isObj(val) && $objStr(val) === $OBJ_STR_REF_ARGS;
    }
  /// #if{{{ @env ARGS_POLYFILL
  : $ENV.HAS.ARGUMENTS_CALLEE
    ? function $isArgs(val) {
        return $isObj(val) && 'callee' in val;
      }
    : function $isArgs(val) {
        return $NO;
      };
  /// #if}}} @env ARGS_POLYFILL
  /// #ifnot{{{ @env ARGS_POLYFILL
  : function $isArgs(val) {
      return $NO;
    };
  /// #ifnot}}} @env ARGS_POLYFILL
/// #}}} @helper $isArgs

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
