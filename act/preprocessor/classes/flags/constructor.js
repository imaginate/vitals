/**
 * ---------------------------------------------------------------------------
 * FLAGS CONSTRUCTOR
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./.load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const FLAGS_TYPE_ID
/**
 * @private
 * @const {!TypeId}
 */
var FLAGS_TYPE_ID = loadHelper('get-type-id')('flags');
/// #}}} @const FLAGS_TYPE_ID

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
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

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setStateError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} key
 * @return {!RangeError}
 */
var setStateError = setError.state;
/// #}}} @func setStateError

/// #{{{ @func setStateIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} key
 * @param {string} id
 * @return {!RangeError}
 */
var setStateIdError = setError.stateId;
/// #}}} @func setStateIdError

/// #{{{ @func setStateTagError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} key
 * @return {!RangeError}
 */
var setStateTagError = setError.stateTag;
/// #}}} @func setStateTagError

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

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func hasStateId
/**
 * @private
 * @param {string} key
 * @return {boolean}
 */
var hasStateId = loadHelper('has-state-id-key');
/// #}}} @func hasStateId

/// #{{{ @func hasStateTag
/**
 * @private
 * @param {string} key
 * @return {boolean}
 */
var hasStateTag = loadHelper('has-state-tag-key');
/// #}}} @func hasStateTag

/// #{{{ @func hasWildcard
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var hasWildcard = loadHelper('has-wildcard');
/// #}}} @func hasWildcard

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFlagsNode = loadHelper('is-flags-node');
/// #}}} @func isFlagsNode

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isStateIdKey
/**
 * @private
 * @param {string} key
 * @return {boolean}
 */
var isStateIdKey = loadHelper('is-state-id-key');
/// #}}} @func isStateIdKey

/// #{{{ @func isStateKey
/**
 * @private
 * @param {string} key
 * @return {boolean}
 */
var isStateKey = loadHelper('is-state-key');
/// #}}} @func isStateKey

/// #{{{ @func isStateObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStateObject = loadHelper('is-state-object');
/// #}}} @func isStateObject

/// #{{{ @func isStateTagKey
/**
 * @private
 * @param {string} key
 * @return {boolean}
 */
var isStateTagKey = loadHelper('is-state-tag-key');
/// #}}} @func isStateTagKey

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeApproxState
/**
 * @private
 * @param {!Flags} flags
 * @param {string} name
 * @param {boolean} state
 * @return {!Flags}
 */
function makeApproxState(flags, name, state) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !RegExp>} */
  var member;
  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var key;
  /** @type {string} */
  var src;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'state');
  }

  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');
  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');
  if ( !isBoolean(state) )
    throw setTypeError(new TypeError, 'state', 'boolean');

  /// #}}} @step verify-parameters

  /// #{{{ @step make-key

  key = trimColon(name);

  /// #}}} @step make-key

  /// #{{{ @step make-pattern

  src = escapeNonWild(key);
  src = replaceWild(src);
  src = '^' + src + '$';
  patt = new RegExp(src);
  patt.name = name;
  patt.state = state;
  freezeObject(patt);

  /// #}}} @step make-pattern

  /// #{{{ @step set-member-ref

  member = !hasStateId(name)
    ? flags.approxTags
    : hasStateTag(name)
      ? flags.approxKeys
      : flags.approxIds;

  /// #}}} @step set-member-ref

  /// #{{{ @step verify-key

  if (key in member) {

    if (member[key].source !== patt.source)
      throw setError(new RangeError,
        'conflicting processed key patterns for properties in `state`\n' +
        '    first-property:\n' +
        '        key-name: `' + member[key].name + '`\n' +
        '        regex-source: `' + member[key].source + '`\n' +
        '    second-property:\n' +
        '        key-name: `' + name + '`\n' +
        '        regex-source: `' + patt.source + '`');

    if (member[key].state !== state)
      throw setError(new RangeError,
        'conflicting `boolean` values for matching properties in `state`\n' +
        '    matching-property-names: `' + name + '`');

    return flags;
  }

  /// #}}} @step verify-key

  /// #{{{ @step append-state

  setupOffProperty(member, key, patt, true);

  /// #}}} @step append-state

  /// #{{{ @step return-instance

  return flags;

  /// #}}} @step return-instance
}
/// #}}} @func makeApproxState

/// #{{{ @func makeExactState
/**
 * @private
 * @param {!Flags} flags
 * @param {string} name
 * @param {boolean} state
 * @return {!Flags}
 */
function makeExactState(flags, name, state) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, boolean>} */
  var member;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'state');
  }

  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');
  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');
  if ( !isBoolean(state) )
    throw setTypeError(new TypeError, 'state', 'boolean');

  /// #}}} @step verify-parameters

  /// #{{{ @step make-key

  key = trimColon(name);

  /// #}}} @step make-key

  /// #{{{ @step set-member-ref

  member = !hasStateId(name)
    ? flags.exactTags
    : hasStateTag(name)
      ? flags.exactKeys
      : flags.exactIds;

  /// #}}} @step set-member-ref

  /// #{{{ @step verify-key

  if (key in member) {

    if (member[key] !== state)
      throw setError(new RangeError,
        'conflicting `boolean` values for matching properties in `state`\n' +
        '    matching-property-names: `' + name + '`');

    return flags;
  }

  /// #}}} @step verify-key

  /// #{{{ @step append-state

  setupOffProperty(member, key, state, true);

  /// #}}} @step append-state

  /// #{{{ @step return-instance

  return flags;

  /// #}}} @step return-instance
}
/// #}}} @func makeExactState

/// #{{{ @func makeState
/**
 * @private
 * @param {!Flags} flags
 * @param {string} name
 * @param {boolean} state
 * @return {!Flags}
 */
function makeState(flags, name, state) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'name');
    case 2:
      throw setNoArgError(new Error, 'state');
  }

  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');
  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');
  if ( !isBoolean(state) )
    throw setTypeError(new TypeError, 'state', 'boolean');

  /// #}}} @step verify-parameters

  /// #{{{ @step make-state

  flags = hasWildcard(name)
    ? makeApproxState(flags, name, state)
    : makeExactState(flags, name, state);

  /// #}}} @step make-state

  /// #{{{ @step return-instance

  return flags;

  /// #}}} @step return-instance
}
/// #}}} @func makeState

/// #{{{ @func makeStates
/**
 * @private
 * @param {!Flags} flags
 * @return {!Flags}
 */
function makeStates(flags) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, (boolean|!Object<string, boolean>)>} */
  var state;
  /** @type {(boolean|!Object<string, boolean>)} */
  var val;
  /** @type {string} */
  var key;
  /** @type {string} */
  var tag;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length)
    throw setNoArgError(new Error, 'flags');
  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-state-ref

  state = flags.state;

  /// #}}} @step set-state-ref

  /// #{{{ @step make-states

  for (key in state) {
    if ( hasOwnProperty(state, key) ) {
      val = state[key];
      if ( isBoolean(val) )
        makeState(flags, key, val);
      else {
        tag = trimColon(key);
        for (id in val) {
          if ( hasOwnProperty(val, id) ) {
            key = tag + ':' + trimColon(id);
            makeState(flags, key, val[id]);
          }
        }
      }
    }
  }

  /// #}}} @step make-states

  /// #{{{ @step return-instance

  return flags;

  /// #}}} @step return-instance
}
/// #}}} @func makeStates

/// #}}} @group MAKE

/// #{{{ @group OBJECT

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func setupOffProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `false`
 * @return {!Object}
 */
var setupOffProperty = loadHelper('setup-off-property');
/// #}}} @func setupOffProperty

/// #{{{ @func setupOnProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setupOnProperty = loadHelper('setup-on-property');
/// #}}} @func setupOnProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #{{{ @group PROTOTYPE

/// #{{{ @func setupPrototype
/**
 * @private
 * @param {string} classname
 * @param {!Function} constructor
 * @param {string} funcname
 *   The constructor's name.
 * @param {string} path
 *   The absolute path to the directory containing the methods for the class.
 * @return {!Function}
 */
var setupPrototype = loadHelper('setup-prototype');
/// #}}} @func setupPrototype

/// #}}} @group PROTOTYPE

/// #{{{ @group STRING

/// #{{{ @func escapeNonWild
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var escapeNonWild = loadHelper('escape-non-wildcards');
/// #}}} @func escapeNonWild

/// #{{{ @func replaceWild
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var replaceWild = loadHelper('replace-wildcards');
/// #}}} @func replaceWild

/// #{{{ @func trimColon
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var trimColon = loadHelper('trim-colon');
/// #}}} @func trimColon

/// #}}} @group STRING

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
  MAIN: resolvePath(__dirname),
  METHODS: resolvePath(__dirname, './methods')
});
/// #}}} @const DIR

/// #}}} @group PATHS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Flags
/**
 * @public
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @constructor
 * @struct
 */
function Flags(state) {

  /// #{{{ @step declare-variables

  /** @type {(boolean|!Object<string, boolean>)} */
  var val;
  /** @type {string} */
  var key;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Flags) )
    throw setNewError(new SyntaxError, 'Flags');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length)
    throw setNoArgError(new Error, 'state');
  if ( !isStateObject(state) )
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-keys

  for (key in state) {
    if ( hasOwnProperty(state, key) ) {
      val = state[key];
      if ( isBoolean(val) ) {
        if ( !isStateKey(key) ) {
          throw setStateError(new RangeError, key);
        }
      }
      else if ( !isStateTagKey(key) )
        throw setStateTagError(new RangeError, key);
      else {
        for (id in val) {
          if ( hasOwnProperty(val, id) && !isStateIdKey(id) ) {
            throw setStateIdError(new RangeError, key, id);
          }
        }
      }
    }
  }

  /// #}}} @step verify-keys

  /// #{{{ @step set-constants

  /// #{{{ @const STATE
  /**
   * @private
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  var STATE = freezeObject(state, true);
  /// #}}} @const STATE

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!TypeId}
   */
  setupOffProperty(this, 'type', FLAGS_TYPE_ID, true);
  /// #}}} @member type

  /// #{{{ @member state
  /**
   * @public
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  setupOffProperty(this, 'state', STATE, true);
  /// #}}} @member state

  /// #{{{ @member exactTags
  /**
   * @public
   * @const {!Object<string, boolean>}
   */
  setupOffProperty(this, 'exactTags', createObject(null), true);
  /// #}}} @member exactTags

  /// #{{{ @member exactIds
  /**
   * @public
   * @const {!Object<string, boolean>}
   */
  setupOffProperty(this, 'exactIds', createObject(null), true);
  /// #}}} @member exactIds

  /// #{{{ @member exactKeys
  /**
   * @public
   * @const {!Object<string, boolean>}
   */
  setupOffProperty(this, 'exactKeys', createObject(null), true);
  /// #}}} @member exactKeys

  /// #{{{ @member approxTags
  /**
   * @public
   * @const {!Object<string, !RegExp>}
   */
  setupOffProperty(this, 'approxTags', createObject(null), true);
  /// #}}} @member approxTags

  /// #{{{ @member approxIds
  /**
   * @public
   * @const {!Object<string, !RegExp>}
   */
  setupOffProperty(this, 'approxIds', createObject(null), true);
  /// #}}} @member approxIds

  /// #{{{ @member approxKeys
  /**
   * @public
   * @const {!Object<string, !RegExp>}
   */
  setupOffProperty(this, 'approxKeys', createObject(null), true);
  /// #}}} @member approxKeys

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step make-states

  makeStates(this);

  /// #}}} @step make-states

  /// #{{{ @step freeze-members

  freezeObject(this.exactIds);
  freezeObject(this.exactKeys);
  freezeObject(this.exactTags);
  freezeObject(this.approxIds);
  freezeObject(this.approxKeys);
  freezeObject(this.approxTags);

  /// #}}} @step freeze-members
}
/// #}}} @func Flags

setupPrototype('flags', Flags, 'Flags', DIR.METHODS);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Flags;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
