/**
 * ---------------------------------------------------------------------------
 * $SPLIT-KEYS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $splitKeys
/**
 * @private
 * @param {string} keys
 *   The #keys are split using one of the values in the following list as the
 *   separator (values listed in order of rank):
 *   - `", "`
 *   - `","`
 *   - `"|"`
 *   - `" "`
 * @return {!Array<string>}
 */
function $splitKeys(keys) {

  /** @type {string} */
  var separator;

  if (!keys)
    return [ '' ];

  separator = $strIncl(keys, ', ')
    ? ', '
    : $strIncl(keys, ',')
      ? ','
      : $strIncl(keys, '|')
        ? '|'
        : ' ';
  return keys['split'](separator);
}
/// #}}} @helper $splitKeys

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
