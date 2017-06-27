/**
 * ---------------------------------------------------------------------------
 * $WRITE-FILE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $writeFile
/**
 * @private
 * @param {string} path
 * @param {string} contents
 * @param {string=} encoding
 * @return {void}
 */
var $writeFile = FS['writeFileSync'];
/// #}}} @helper $writeFile

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
