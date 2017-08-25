/**
 * ---------------------------------------------------------------------------
 * LOG-MAIN-START HELPER
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
var LOG = require('log-ocd')().debug;
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

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group CONFIGURE
//////////////////////////////////////////////////////////////////////////////
// CONFIGURE
//////////////////////////////////////////////////////////////////////////////

LOG.setConfig({
  'header': true,
  'ocdmap': true,
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
    'bg': 'blue',
    'accent': {
      'color': 'magenta',
      'bg': 'blue',
      'bold': true
    }
  },
  'ocdmap': {
    'color': 'white',
    'delimiter': {
      'color': 'white'
    }
  }
});

/// #}}} @group CONFIGURE

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func logMainStart
/**
 * @public
 * @param {!Object} opts
 * @return {void}
 */
function logMainStart(opts) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'opts');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step log-start-message

  LOG('Starting `vitals` unit tests', opts);

  /// #}}} @step log-start-message
}
/// #}}} @func logMainStart

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = logMainStart;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
