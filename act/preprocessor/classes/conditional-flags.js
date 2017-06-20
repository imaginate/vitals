/**
 * ---------------------------------------------------------------------------
 * CONDITIONAL-FLAGS CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const COND_FLAGS_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var COND_FLAGS_TYPE_ID = loadHelper('type-ids').COND_FLAGS;
/// #}}} @const COND_FLAGS_TYPE_ID

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

/// #{{{ @group STATE

/// #{{{ @func capObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
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

/// #{{{ @func defineProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProperty = loadHelper('define-property');
/// #}}} @func defineProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func sealObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var sealObject = loadHelper('seal-object');
/// #}}} @func sealObject

/// #}}} @group STATE

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

/// #{{{ @func isCondNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondNode = loadHelper('is-conditional-node');
/// #}}} @func isCondNode

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group TO

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

/// #}}} @group TO

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

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #{{{ @func setNoStateError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {!Cond} cond
 * @return {!ReferenceError}
 */
var setNoStateError = setError.noState;
/// #}}} @func setNoStateError

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

/// #}}} @group HELPERS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func CondFlags
/**
 * @public
 * @param {!Object<string, (boolean|!Object<string, boolean>)>} state
 * @constructor
 * @struct
 */
function CondFlags(state) {

  /// #{{{ @step declare-variables

  /** @type {(boolean|!Object<string, boolean>)} */
  var val;
  /** @type {string} */
  var key;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isStateObject(state) )
    throw setTypeError(new TypeError, 'state',
      '!Object<string, (boolean|!Object<string, boolean>)>');

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-keys

  for (key in state) {
    if ( hasOwnProperty(state, key) ) {
      val = state[key];
      if ( isBoolean(val) ) {
        if ( !isStateKey(key) )
          throw setStateError(new RangeError, key);
      }
      else if ( !isStateTagKey(key) )
        throw setStateTagError(new RangeError, key);
      else {
        for (id in val) {
          if ( hasOwnProperty(val, id) && !isStateIdKey(id) )
            throw setStateIdError(new RangeError, key, id);
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
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': COND_FLAGS_TYPE_ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member type

  /// #{{{ @member state
  /**
   * @public
   * @const {!Object<string, (boolean|!Object<string, boolean>)>}
   */
  defineProperty(this, 'state', {
    'value': STATE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member state

  /// #{{{ @member exactTags
  /**
   * @public
   * @const {!Object<string, boolean>}
   */
  defineProperty(this, 'exactTags', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member exactTags

  /// #{{{ @member exactIds
  /**
   * @public
   * @const {!Object<string, boolean>}
   */
  defineProperty(this, 'exactIds', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member exactIds

  /// #{{{ @member exactKeys
  /**
   * @public
   * @const {!Object<string, boolean>}
   */
  defineProperty(this, 'exactKeys', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member exactKeys

  /// #{{{ @member approxTags
  /**
   * @public
   * @const {!Object<string, !RegExp>}
   */
  defineProperty(this, 'approxTags', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member approxTags

  /// #{{{ @member approxIds
  /**
   * @public
   * @const {!Object<string, !RegExp>}
   */
  defineProperty(this, 'approxIds', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member approxIds

  /// #{{{ @member approxKeys
  /**
   * @public
   * @const {!Object<string, !RegExp>}
   */
  defineProperty(this, 'approxKeys', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member approxKeys

  /// #}}} @step set-members

  /// #{{{ @step lock-instance

  capObject(this);
  sealObject(this);

  /// #}}} @step lock-instance
}
/// #}}} @func CondFlags

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

CondFlags.prototype = createObject(null);
CondFlags.prototype.constructor = CondFlags;

/// #{{{ @func CondFlags.prototype.load
/**
 * @return {void}
 */
CondFlags.prototype.load = function load() {

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

  /// #{{{ @step set-member-refs

  state = this.state;

  /// #}}} @step set-member-refs

  /// #{{{ @step load-flags

  for (key in state) {
    if ( hasOwnProperty(state, key) ) {
      val = state[key];
      if ( isBoolean(val) )
        this.add(key, val);
      else {
        tag = trimColon(key);
        for (id in val) {
          if ( hasOwnProperty(val, id) ) {
            key = tag + ':' + trimColon(id);
            this.add(key, val[id]);
          }
        }
      }
    }
  }

  /// #}}} @step load-flags

  /// #{{{ @step freeze-instance

  freezeObject(this, true);

  /// #}}} @step freeze-instance
};
/// #}}} @func CondFlags.prototype.load

/// #{{{ @func CondFlags.prototype.add
/**
 * @param {string} name
 * @param {boolean} state
 * @return {void}
 */
CondFlags.prototype.add = function add(name, state) {

  if ( hasWildcard(name) )
    this.addApprox(name, state);
  else
    this.addExact(name, state);
};
/// #}}} @func CondFlags.prototype.add

/// #{{{ @func CondFlags.prototype.addApprox
/**
 * @param {string} name
 * @param {boolean} state
 * @return {void}
 */
CondFlags.prototype.addApprox = function addApprox(name, state) {

  /// #{{{ @step declare-variables

  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var key;
  /** @type {string} */
  var src;

  /// #}}} @step declare-variables

  /// #{{{ @step make-key

  key = trimColon(name);

  /// #}}} @step make-key

  /// #{{{ @step make-pattern

  src = escapeNonWild(key);
  src = replaceWild(src);
  src = '^' + src + '$';
  patt = new RegExp(src);
  patt.state = state;

  /// #}}} @step make-pattern

  /// #{{{ @step append-property

  if ( !hasStateId(name) )
    this.approxTags[key] = patt;
  else if ( hasStateTag(name) )
    this.approxKeys[key] = patt;
  else
    this.approxIds[key] = patt;

  /// #}}} @step append-property
};
/// #}}} @func CondFlags.prototype.addApprox

/// #{{{ @func CondFlags.prototype.addExact
/**
 * @param {string} name
 * @param {boolean} state
 * @return {void}
 */
CondFlags.prototype.addExact = function addExact(name, state) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step make-key

  key = trimColon(name);

  /// #}}} @step make-key

  /// #{{{ @step append-property

  if ( !hasStateId(name) )
    this.exactTags[key] = state;
  else if ( hasStateTag(name) )
    this.exactKeys[key] = state;
  else
    this.exactIds[key] = state;

  /// #}}} @step append-property
};
/// #}}} @func CondFlags.prototype.addExact

/// #{{{ @func CondFlags.prototype.getKey
/**
 * @param {string} key
 * @return {(boolean|undefined)}
 */
CondFlags.prototype.getKey = function getKey(key) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !RegExp>} */
  var approx;
  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var item;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');

  /// #}}} @step verify-parameters

  /// #{{{ @step check-exact

  if ( hasOwnProperty(this.exactKeys, key) )
    return this.exactKeys[key];

  /// #}}} @step check-exact

  /// #{{{ @step check-approx

  approx = this.approxKeys;

  for (item in approx) {
    if ( hasOwnProperty(approx, item) ) {
      patt = approx[item];
      if ( patt.test(key) )
        return patt.state;
    }
  }

  /// #}}} @step check-approx
};
/// #}}} @func CondFlags.prototype.getKey

/// #{{{ @func CondFlags.prototype.getTag
/**
 * @param {string} tag
 * @return {(boolean|undefined)}
 */
CondFlags.prototype.getTag = function getTag(tag) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !RegExp>} */
  var approx;
  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var item;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isString(tag) )
    throw setTypeError(new TypeError, 'tag', 'string');

  /// #}}} @step verify-parameters

  /// #{{{ @step check-exact

  if ( hasOwnProperty(this.exactTags, tag) )
    return this.exactTags[tag];

  /// #}}} @step check-exact

  /// #{{{ @step check-approx

  approx = this.approxTags;

  for (item in approx) {
    if ( hasOwnProperty(approx, item) ) {
      patt = approx[item];
      if ( patt.test(tag) )
        return patt.state;
    }
  }

  /// #}}} @step check-approx
};
/// #}}} @func CondFlags.prototype.getTag

/// #{{{ @func CondFlags.prototype.getId
/**
 * @param {string} id
 * @return {(boolean|undefined)}
 */
CondFlags.prototype.getId = function getId(id) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !RegExp>} */
  var approx;
  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var item;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isString(id) )
    throw setTypeError(new TypeError, 'id', 'string');

  /// #}}} @step verify-parameters

  /// #{{{ @step check-exact

  if ( hasOwnProperty(this.exactIds, id) )
    return this.exactIds[id];

  /// #}}} @step check-exact

  /// #{{{ @step check-approx

  approx = this.approxIds;

  for (item in approx) {
    if ( hasOwnProperty(approx, item) ) {
      patt = approx[item];
      if ( patt.test(id) )
        return patt.state;
    }
  }

  /// #}}} @step check-approx
};
/// #}}} @func CondFlags.prototype.getId

/// #{{{ @func CondFlags.prototype.isOn
/**
 * @param {!Cond} cond
 * @return {boolean}
 */
CondFlags.prototype.isOn = function isOn(cond) {

  /// #{{{ @step declare-variables

  /** @type {(boolean|undefined)} */
  var state;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isCondNode(cond) )
    throw setTypeError(new TypeError, 'cond', '!Cond');

  /// #}}} @step verify-parameters

  /// #{{{ @step get-state

  state = this.getKey(cond.key);
  if ( isUndefined(state) ) {
    state = this.getTag(cond.tag);
    if ( isUndefined(state) ) {
      state = this.getId(cond.id);
      if ( isUndefined(state) )
        throw setNoStateError(new ReferenceError, cond);
    }
  }

  /// #}}} @step get-state

  /// #{{{ @step return-state

  return cond.action
    ? state
    : !state;

  /// #}}} @step return-state
};
/// #}}} @func CondFlags.prototype.isOn

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = CondFlags;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
