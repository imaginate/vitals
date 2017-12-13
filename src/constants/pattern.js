/**
 * ---------------------------------------------------------------------------
 * PATTERN CONSTANTS
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @constant $PATT_END_SLASH
/**
 * @private
 * @const {!RegExp}
 */
var $PATT_END_SLASH = /[\/\\]$/;
/// #}}} @constant $PATT_END_SLASH

/// #{{{ @constant $PATT_END_SLASHES
/**
 * @private
 * @const {!RegExp}
 */
var $PATT_END_SLASHES = /[\/\\]+$/;
/// #}}} @constant $PATT_END_SLASHES

/// #{{{ @constant $PATT_FILE_NAME
/**
 * @private
 * @const {!RegExp}
 */
var $PATT_FILE_NAME = /[^\/\\]+$/;
/// #}}} @constant $PATT_FILE_NAME

/// #{{{ @constant $PATT_ROOT_DIR
/**
 * @private
 * @const {!RegExp}
 */
var $PATT_ROOT_DIR = /^(?:[a-zA-Z]:|[\/\\][\/\\]+[^\/\\]+[\/\\]+[^\/\\]+)?[\/\\]$/;
/// #}}} @constant $PATT_ROOT_DIR

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
