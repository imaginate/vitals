/**
 * ---------------------------------------------------------------------------
 * LOG HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const LOG_OCD_INST
/**
 * @private
 * @const {!Function}
 */
var LOG_OCD_INST = require('log-ocd')();
/// #}}} @const LOG_OCD_INST

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func logError
/**
 * @private
 * @param {string} result
 * @return {void}
 */
function logError(result) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'result');
  }
  if ( !isString(result) ) {
    throw setTypeError(new TypeError, 'result', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step clean-result

  result = result.replace(/\n/g, '\n    ');
  result = '  ' + result;

  /// #}}} @step clean-result

  /// #{{{ @step log-result

  console.log(result);

  /// #}}} @step log-result
}
/// #}}} @func logError

/// #}}} @group METHODS

/// #{{{ @group CONFIGURE
//////////////////////////////////////////////////////////////////////////////
// CONFIGURE
//////////////////////////////////////////////////////////////////////////////

LOG_OCD_INST.error.setConfig({
  'logger': logError,
  'throw':  false,
  'exit':   false
});

LOG_OCD_INST.error.setFormat({
  'linesAfter': 2
});

LOG_OCD_INST.fail.setConfig({
  'header': true,
  'throw': false,
  'exit': false,
  'msg': true
});

LOG_OCD_INST.fail.setFormat({
  'linesBefore': 1,
  'linesAfter': 0,
  'header': {
    'spaceBefore': 0,
    'spaceAfter':  0,
    'accentMark': ''
  },
  'msg': {
    'accentMark': '',
    'bullet': '',
    'indent': 4
  }
});

LOG_OCD_INST.fail.setStyle({
  'header': {
    'color': 'red',
    'bg':    ''
  },
  'msg': {
    'color': 'white',
    'bg':    ''
  }
});

LOG_OCD_INST.toString.setFormat({
  'lineLimit': 50
});

/// #}}} @group CONFIGURE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = LOG_OCD_INST;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
