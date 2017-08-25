/**
 * ---------------------------------------------------------------------------
 * LOG-MAIN-END HELPER
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

/// #{{{ @const LOG
/**
 * @private
 * @const {!Function}
 */
var LOG = require('log-ocd')().pass;
/// #}}} @const LOG

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

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
var setWholeError = setError.whole;
/// #}}} @func setWholeError

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group CONFIGURE
//////////////////////////////////////////////////////////////////////////////
// CONFIGURE
//////////////////////////////////////////////////////////////////////////////

LOG.setConfig({
  'header': true,
  'ocdmap': false,
  'style': true,
  'stack': false,
  'throw': false,
  'exit': false,
  'msg': false
});

LOG.setFormat({
  'linesBefore': 1,
  'linesAfter': 1,
  'header': {
    'spaceBefore': 1,
    'spaceAfter': 6,
    'accentMark': '`'
  }
});

LOG.setStyle({
  'header': {
    'color': 'white',
    'bg': 'green',
    'accent': {
      'color': 'yellow',
      'bg': 'green',
      'bold': true
    }
  }
});

/// #}}} @group CONFIGURE

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func logMainEnd
/**
 * @public
 * @param {number} failures
 * @param {!Object} opts
 * @return {void}
 */
function logMainEnd(failures, opts) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'failures');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  if ( !isNumber(failures) ) {
    throw setTypeError(new TypeError, 'failures', 'number');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  if ( !isWholeNumber(failures) ) {
    throw setWholeError(new RangeError, 'failures', failures);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step log-end-message

  LOG('Completed `vitals` unit tests');

  /// #}}} @step log-end-message
}
/// #}}} @func logMainEnd

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = logMainEnd;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
