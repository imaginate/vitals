/**
 * ---------------------------------------------------------------------------
 * GET-SECTIONS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const INTRO
/**
 * @private
 * @const {!RegExp}
 */
var INTRO = /^\/\*\*[ \t]*\n([\s\S]+?)\n[ \t]*\*\/[\s\S]*$/;
/// #}}} @const INTRO

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const SECTION
/**
 * @private
 * @const {!RegExp}
 */
var SECTION = /^[ \t]*\*[ \t]+@section[ \t]+([a-zA-Z0-9_\-]+)[ \t]*$/;
/// #}}} @const SECTION

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

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setFileError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setFileError = setError.file;
/// #}}} @func setFileError

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

/// #{{{ @group FS

/// #{{{ @func getFileContent
/**
 * @private
 * @param {string} path
 * @param {boolean=} buffer = `false`
 * @return {(!Buffer|string)}
 */
var getFileContent = require('./get-file-content.js');
/// #}}} @func getFileContent

/// #}}} @group FS

/// #{{{ @group IS

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = require('./for-each-property.js');
/// #}}} @func forEachProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getSections
/**
 * @public
 * @param {string} path
 * @return {!Array<string>}
 */
function getSections(path) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var section;
  /** @type {string} */
  var content;
  /** @type {!Array<string>} */
  var lines;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'path');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if (!path) {
    throw setEmptyError(new Error, 'path');
  }
  if ( !isFile(path) ) {
    throw setFileError(new Error, 'path', path);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-file-content

  content = getFileContent(path, false);

  /// #}}} @step get-file-content

  /// #{{{ @step get-intro-lines

  lines = INTRO.test(content)
    ? content.replace(INTRO, '$1').split('\n')
    : [];

  /// #}}} @step get-intro-lines

  /// #{{{ @step get-each-section

  sections = [];
  forEachProperty(lines, function appendSection(line) {
    if ( SECTION.test(line) ) {
      section = line.replace(SECTION, '$1');
      sections.push(section);
    }
  });

  /// #}}} @step get-each-section

  /// #{{{ @step return-sections

  return sections;

  /// #}}} @step return-sections
}
/// #}}} @func getSections

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getSections;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
