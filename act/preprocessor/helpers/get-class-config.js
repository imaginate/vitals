/**
 * ---------------------------------------------------------------------------
 * GET-CLASS-CONFIG HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
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
var setError = require('./set-error-base.js');
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

/// #{{{ @group GET

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
var getKeys = loadTaskHelper('get-keys');
/// #}}} @func getKeys

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isObjectHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObjectHashMap = IS.objectHashMap;
/// #}}} @func isObjectHashMap

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @enum {string}
 * @const
 * @struct
 */
var DIR = freezeObject({
  CLASSES: resolvePath(__dirname, '../classes')
});
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @enum {string}
 * @const
 * @struct
 */
var FILE = freezeObject({
  CONFIG: resolvePath(DIR.CLASSES, './classes.json')
});
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getClassConfig
/**
 * @public
 * @param {string=} classname = `undefined`
 *   If the #classname is `undefined`, the complete config for all classes is
 *   returned. If it is a valid `string`, the config for only the #classname
 *   is returned.
 * @return {!Object}
 */
function getClassConfig(classname) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var config;

  /// #}}} @step declare-variables

  /// #{{{ @step load-classes-config

  config = getClassesConfig();

  /// #}}} @step load-classes-config

  /// #{{{ @step return-classes-config

  if ( isUndefined(classname) )
    return config;

  /// #}}} @step return-classes-config

  /// #{{{ @step verify-classname

  if ( !isString(classname) )
    throw setTypeError(new TypeError, 'classname', 'string=');
  if (!classname)
    throw setEmptyError(new Error, 'classname');
  if ( !hasOwnProperty(config, classname) )
    throw setError(new RangeError,
      'invalid `classname` config requested\n' +
      '    requested-classname: `' classname + '`\n' +
      '    valid-classnames:\n' +
      '        `' + getKeys(config).join('`\n        ') + '`');

  /// #}}} @step verify-classname

  /// #{{{ @step return-class-config

  return config[classname];

  /// #}}} @step return-class-config
}
/// #}}} @func getClassConfig

/// #{{{ @func getClassesConfig
/**
 * @private
 * @return {!Object<string, !Object>}
 */
function getClassesConfig() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Object>} */
  var config;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-config-path

  if ( !isFile(FILE.CONFIG) )
    throw setFileError(new Error, 'FILE.CONFIG', FILE.CONFIG);

  /// #}}} @step verify-config-path

  /// #{{{ @step load-config

  config = require(FILE.CONFIG);

  /// #}}} @step load-config

  /// #{{{ @step verify-config-data-type

  if ( !isObject(config) || !isObjectHashMap(config) )
    throw setError(new TypeError,
      'invalid data type defined for `' + FILE.CONFIG + '`\n' +
      '    valid-type: `!Object<string, !Object>`');

  /// #}}} @step verify-config-data-type

  /// #{{{ @step freeze-config

  freezeObject(config, true);

  /// #}}} @step freeze-config

  /// #{{{ @step return-config

  return config;

  /// #}}} @step return-config
}
/// #}}} @func getClassesConfig

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getClassConfig;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
