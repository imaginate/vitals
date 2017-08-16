/**
 * ---------------------------------------------------------------------------
 * TEST-WRAPPER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const ARGV
/**
 * @private
 * @const {!Object<string, *>}
 * @struct
 */
var ARGV = {
  LAST: process.argv.length - 1,
  LEN: process.argv.length,
  OPTS: process.argv[process.argv.length - 1]
};
/// #}}} @const ARGV

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
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

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freezeObject = require('./freeze-object.js');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #{{{ @group STRING

/// #{{{ @func fromJsonString
/**
 * @private
 * @param {string} src
 * @param {(?function(string, *): *)=} filter = `null`
 * @return {!Object}
 */
var fromJsonString = require('./from-json-string.js');
/// #}}} @func fromJsonString

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const REPO
/**
 * @private
 * @const {string}
 */
var REPO = require('./get-repo-root.js')();
/// #}}} @const REPO

/// #{{{ @const DIR
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var DIR = freezeObject({
  TEST: resolvePath(REPO, 'test')
});
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var FILE = freezeObject({
  TEST: resolvePath(REPO, 'test/main.js')
});
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func runTest
/**
 * @private
 * @param {?Object=} opts
 * @return {void}
 */
var runTest = require(FILE.TEST);
/// #}}} @func runTest

/// #{{{ @func testWrapper
/**
 * @private
 * @param {string} optsString
 * @return {void}
 */
function testWrapper(optsString) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var opts;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'optsString');
  }
  if ( !isString(optsString) ) {
    throw setTypeError(new TypeError, 'optsString', 'string');
  }
  if (!optsString) {
    throw setEmptyError(new Error, 'optsString');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-test-options

  opts = fromJsonString(optsString);

  /// #}}} @step make-test-options

  /// #{{{ @step run-test

  runTest(opts);

  /// #}}} @step run-test
}
/// #}}} @func testWrapper

/// #}}} @group METHODS

/// #{{{ @group INIT
//////////////////////////////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////////////////////////////

testWrapper(ARGV.OPTS);

/// #}}} @group INIT

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
