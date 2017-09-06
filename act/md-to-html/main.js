/**
 * ---------------------------------------------------------------------------
 * MARKDOWN-TO-HTML
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group SETUP
//////////////////////////////////////////////////////////////////////////////
// SETUP
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @step setup-classes

require('./helpers/setup-classes.js')();

/// #}}} @step setup-classes

/// #}}} @group SETUP

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} name
 * @return {!Function}
 */
var loadClass = require('./helpers/load-class.js');
/// #}}} @func loadClass

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const CONFIG
/**
 * @private
 * @const {!Object}
 */
var CONFIG = loadHelper('freeze-object')(require('./config.json'), true);
/// #}}} @const CONFIG

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

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
var setError = loadHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setIndexError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} index
 * @param {number=} min = `0`
 * @return {!RangeError}
 */
var setIndexError = setError.index;
/// #}}} @func setIndexError

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

/// #{{{ @group HAS

/// #{{{ @func hasOption
/**
 * @private
 * @param {!Object} opts
 * @param {string} key
 * @return {boolean}
 */
var hasOption = loadHelper('has-option');
/// #}}} @func hasOption

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isPlainObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isPlainObject = IS.plainObject;
/// #}}} @func isPlainObject

/// #{{{ @func isStringList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringList = IS.stringList;
/// #}}} @func isStringList

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = loadHelper('clone-object');
/// #}}} @func cloneObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group SPECIAL

/// #{{{ @func newHtml
/**
 * @private
 * @param {!Array<string>} lines
 * @param {!Object} opts
 * @param {number} opts.indent
 * @param {number} opts.depth
 * @param {boolean} opts.github
 * @return {!Html}
 */
var newHtml = loadClass('html').create;
/// #}}} @func newHtml

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group DEFAULTS
//////////////////////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLTS
/**
 * @private
 * @const {!Object<string, *>}
 * @dict
 */
var DFLTS = freezeObject({
  'depth': CONFIG.defaults.initialIndentDepth,
  'github': CONFIG.defaults.outputGithubMarkdown,
  'indent': CONFIG.defaults.indentWhitespaceCount
});
/// #}}} @const DFLTS

/// #}}} @group DEFAULTS

/// #{{{ @group MAIN
//////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func markdownToHtml
/**
 * @public
 * @param {!Array<string>} lines
 * @param {?Object=} opts
 * @param {number=} opts.indent = `2`
 * @param {number=} opts.depth = `0`
 * @param {boolean=} opts.github = `false`
 * @return {string}
 */
function markdownToHtml(lines, opts) {

  /// #{{{ @step declare-variables

  /** @type {!Html} */
  var html;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'lines');

    case 1:
      opts = cloneObject(DFLTS);
      break;

    default:
      if ( isNull(opts) || isUndefined(opts) ) {
        opts = cloneObject(DFLTS);
        break;
      }

      if ( !isPlainObject(opts) ) {
        throw setTypeError(new TypeError, 'opts', '?Object=');
      }

      opts = cloneObject(opts);

      if ( !hasOption(opts, 'depth') ) {
        opts['depth'] = DFLTS['depth'];
      }
      else if ( !isNumber(opts['depth']) ) {
        throw setTypeError(new TypeError, 'opts.depth', 'number=');
      }
      else if ( !isWholeNumber(opts['depth']) || opts['depth'] < 0 ) {
        throw setIndexError(new RangeError, 'opts.depth', opts['depth'], 0);
      }

      if ( !hasOption(opts, 'github') ) {
        opts['github'] = DFLTS['github'];
      }
      else if ( !isBoolean(opts['github']) ) {
        throw setTypeError(new TypeError, 'opts.github', 'boolean=');
      }

      if ( !hasOption(opts, 'indent') ) {
        opts['indent'] = DFLTS['indent'];
      }
      else if ( !isNumber(opts['indent']) ) {
        throw setTypeError(new TypeError, 'opts.indent', 'number=');
      }
      else if ( !isWholeNumber(opts['indent']) || opts['indent'] < 0 ) {
        throw setIndexError(new RangeError, 'opts.indent', opts['indent'], 0);
      }
  }

  if ( !isArray(lines) || !isStringList(lines) ) {
    throw setTypeError(new TypeError, 'lines', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-lines-length

  if (!lines.length) {
    return '';
  }

  /// #}}} @step check-lines-length

  /// #{{{ @step make-new-html-instance

  html = newHtml(lines, opts);

  /// #}}} @step make-new-html-instance

  /// #{{{ @step return-parsed-result

  return html.RESULT;

  /// #}}} @step return-parsed-result
}
/// #}}} @func markdownToHtml

/// #}}} @group MAIN

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = markdownToHtml;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
