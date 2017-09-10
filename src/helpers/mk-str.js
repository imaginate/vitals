/**
 * ---------------------------------------------------------------------------
 * $MK-STR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $mkStr
/**
 * @private
 * @param {*} val
 * @return {string}
 */
function $mkStr(val) {

  if ( $is.str(val) ) {
    return val;
  }

  if ( $is.obj(val) || $is.fun(val) ) {
    if ( !('toString' in val) || !$is.fun(val['toString']) ) {
      return STR(val);
    }
    val = val['toString']();
    return $is.str(val)
      ? val
      : STR(val);
  }

  return $is.void(val)
    ? 'undefined'
    : $is.nil(val)
      ? 'null'
      : $is.bool(val)
        ? val
          ? 'true'
          : 'false'
        : $is.nan(val)
          ? 'NaN'
          : STR(val);
}
/// #}}} @helper $mkStr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
