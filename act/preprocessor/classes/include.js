/**
 * ---------------------------------------------------------------------------
 * INCLUDE CLASS
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

/// #{{{ @const INCL_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var INCL_TYPE_ID = loadHelper('type-ids').INCL;
/// #}}} @const INCL_TYPE_ID

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

/// #{{{ @group COPY

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = loadHelper('clone-object');
/// #}}} @func cloneObject

/// #}}} @group COPY

/// #{{{ @group GET

/// #{{{ @func getPathNode
/**
 * @private
 * @param {(!Dir|!File)} src
 * @param {string} path
 * @return {(?Dir|?File)}
 */
var getPathNode = loadHelper('get-path-node');
/// #}}} @func getPathNode

/// #{{{ @func getIdComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getIdComponent = loadHelper('get-id-component');
/// #}}} @func getIdComponent

/// #{{{ @func getPathComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getPathComponent = loadHelper('get-path-component');
/// #}}} @func getPathComponent

/// #{{{ @func getTagComponent
/**
 * @private
 * @param {(string|!Line)} text
 * @return {string}
 */
var getTagComponent = loadHelper('get-tag-component');
/// #}}} @func getTagComponent

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasAnyPathComponent
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasAnyPathComponent = loadHelper('has-any-path-component');
/// #}}} @func hasAnyPathComponent

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #{{{ @func hasValidInclude
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasValidInclude = loadHelper('has-valid-include');
/// #}}} @func hasValidInclude

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isBlkNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlkNode = loadHelper('is-block-node');
/// #}}} @func isBlkNode

/// #{{{ @func isCondNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondNode = loadHelper('is-conditional-node');
/// #}}} @func isCondNode

/// #{{{ @func isCondFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondFlagsNode = loadHelper('is-conditional-flags-node');
/// #}}} @func isCondFlagsNode

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isLineNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isLineNode = loadHelper('is-line-node');
/// #}}} @func isLineNode

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

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
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

/// #{{{ @func setCmdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setCmdError = setError.cmd;
/// #}}} @func setCmdError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setIdError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setIdError = setError.id;
/// #}}} @func setIdError

/// #{{{ @func setInclError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {!Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
var setInclError = setError.incl;
/// #}}} @func setInclError

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

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

/// #{{{ @func setNoBlkError
/**
 * @private
 * @param {!Error} err
 * @param {!Line} line
 * @param {string} key
 * @param {!File} file
 * @return {!Error}
 */
var setNoBlkError = setError.noBlk;
/// #}}} @func setNoBlkError

/// #{{{ @func setPathCompError
/**
 * @private
 * @param {(!SyntaxError|!Error)} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {(!SyntaxError|!Error)}
 */
var setPathCompError = setError.pathComp;
/// #}}} @func setPathCompError

/// #{{{ @func setTagError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
var setTagError = setError.tag;
/// #}}} @func setTagError

/// #{{{ @func setTreeError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {?Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
var setTreeError = setError.tree;
/// #}}} @func setTreeError

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

/// #{{{ @func Incl
/**
 * @public
 * @param {!Line} line
 * @param {!File} file
 * @param {(?Blk|?Cond)=} parent
 * @constructor
 * @struct
 */
function Incl(line, file, parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Incl) )
    throw setNewError(new SyntaxError, 'Incl');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if ( !isLineNode(line) )
    throw setTypeError(new TypeError, 'line', '!Line');
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');
  if (!isUndefined(parent)
      && !isNull(parent)
      && !isBlkNode(parent)
      && !isCondNode(parent) )
    throw setTypeError(new TypeError, 'parent', '(?Blk|?Cond)=');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {(?Blk|?Cond)}
   */
  var PARENT = !!parent
    ? parent
    : null;
  /// #}}} @const PARENT

  /// #{{{ @const FILE
  /**
   * @private
   * @const {!File}
   */
  var FILE = file;
  /// #}}} @const FILE

  /// #{{{ @const LINE
  /**
   * @private
   * @const {!Line}
   */
  var LINE = line;
  /// #}}} @const LINE

  /// #{{{ @const TEXT
  /**
   * @private
   * @const {string}
   */
  var TEXT = LINE.text;
  /// #}}} @const TEXT

  /// #{{{ @const TAG
  /**
   * @private
   * @const {string}
   */
  var TAG = getTagComponent(TEXT);
  /// #}}} @const TAG

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = getIdComponent(TEXT);
  /// #}}} @const ID

  /// #{{{ @const KEY
  /**
   * @private
   * @const {string}
   */
  var KEY = TAG + ':' + ID;
  /// #}}} @const KEY

  /// #{{{ @const PATH
  /**
   * @private
   * @const {string}
   */
  var PATH = getPathComponent(TEXT);
  /// #}}} @const PATH

  /// #{{{ @const NODE
  /**
   * @private
   * @const {(?Dir|?File)}
   */
  var NODE = !!PATH
    ? getPathNode(FILE, PATH)
    : null;
  /// #}}} @const NODE

  /// #{{{ @const LINK
  /**
   * @private
   * @const {?File}
   */
  var LINK = isFileNode(NODE)
    ? NODE
    : null;
  /// #}}} @const LINK

  /// #}}} @step set-constants

  /// #{{{ @step verify-syntax

  if (!TAG)
    throw setTagError(new SyntaxError, LINE);
  if (!ID)
    throw setIdError(new SyntaxError, LINE);
  if (!PATH)
    throw setPathCompError(new SyntaxError, LINE);
  if ( !hasValidInclude(TEXT) )
    throw setCmdError(new SyntaxError, LINE);

  /// #}}} @step verify-syntax

  /// #{{{ @step verify-path-node

  if (!LINK)
    throw setPathCompError(new Error, LINE);

  /// #}}} @step verify-path-node

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': INCL_TYPE_ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member type

  /// #{{{ @member tag
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'tag', {
    'value': TAG,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member tag

  /// #{{{ @member id
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'id', {
    'value': ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member id

  /// #{{{ @member key
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'key', {
    'value': KEY,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member key

  /// #{{{ @member path
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'path', {
    'value': PATH,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member path

  /// #{{{ @member file
  /**
   * @public
   * @const {!File}
   */
  defineProperty(this, 'file', {
    'value': FILE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member file

  /// #{{{ @member line
  /**
   * @public
   * @const {!Line}
   */
  defineProperty(this, 'line', {
    'value': LINE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member line

  /// #{{{ @member parent
  /**
   * @public
   * @const {(?Blk|?Cond)}
   */
  defineProperty(this, 'parent', {
    'value': PARENT,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member parent

  /// #{{{ @member link
  /**
   * @public
   * @const {!File}
   */
  defineProperty(this, 'link', {
    'value': LINK,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member link

  /// #{{{ @member cmd
  /**
   * @public
   * @const {?Blk}
   */
  defineProperty(this, 'cmd', {
    'value': null,
    'writable': true,
    'enumerable': true,
    'configurable': true
  });
  /// #}}} @member cmd

  /// #}}} @step set-members

  /// #{{{ @step lock-instance

  capObject(this);
  sealObject(this);

  /// #}}} @step lock-instance

  /// #{{{ @step catch-include-loop

  if (FILE === LINK)
    throw setTreeError(new ReferenceError, null, this);

  /// #}}} @step catch-include-loop
}
/// #}}} @func Incl

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Incl.prototype = createObject(null);
Incl.prototype.constructor = Incl;

/// #{{{ @func Incl.prototype.load
/**
 * @return {!Incl}
 */
Incl.prototype.load = function load() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Blk>} */
  var blks;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  blks = this.link.blks;
  key = this.key;

  /// #}}} @step set-member-refs

  /// #{{{ @step verify-cmd

  if ( !hasOwnProperty(blks, key) )
    throw setNoBlkError(new Error, this.line, key, this.link);

  /// #}}} @step verify-cmd

  /// #{{{ @step set-members

  /// #{{{ @member cmd
  /**
   * @public
   * @const {!Blk}
   */
  defineProperty(this, 'cmd', {
    'value': blks[key],
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member cmd

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func Incl.prototype.load

/// #{{{ @func Incl.prototype.run
/**
 * @param {!CondFlags} condFlags
 * @param {!Object<string, ?Incl>} inclFiles
 * @param {!Object<string, !Incl>} inclNodes
 * @return {string}
 */
Incl.prototype.run = function run(condFlags, inclFiles, inclNodes) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var tree;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isCondFlagsNode(condFlags) )
    throw setTypeError(new TypeError, 'condFlags', '!CondFlags');
  if ( !isObject(inclFiles) )
    throw setTypeError(new TypeError, 'inclFiles', '!Object<string, ?Incl>');
  if ( !isObject(inclNodes) )
    throw setTypeError(new TypeError, 'inclNodes', '!Object<string, !Incl>');

  /// #}}} @step verify-parameters

  /// #{{{ @step load-include

  if (!this.cmd)
    this.load();

  /// #}}} @step load-include

  /// #{{{ @step set-member-refs

  tree = this.link.tree;
  key = this.key;

  /// #}}} @step set-member-refs

  /// #{{{ @step catch-include-loop

  if ( hasOwnProperty(inclFiles, tree) )
    throw setTreeError(new ReferenceError, inclFiles[tree], this);

  /// #}}} @step catch-include-loop

  /// #{{{ @step catch-include-duplicate

  if ( hasOwnProperty(inclNodes, key) )
    throw setInclError(new ReferenceError, inclNodes[tree], this);

  /// #}}} @step catch-include-duplicate

  /// #{{{ @step update-include-management

  inclFiles = cloneObject(inclFiles);
  inclFiles[tree] = this;
  inclFiles = freezeObject(inclFiles);

  defineProperty(inclNodes, key, {
    'value': this,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });

  /// #}}} @step update-include-management

  /// #{{{ @step get-results

  result = this.cmd.run(condFlags, inclFiles, inclNodes);

  /// #}}} @step get-results

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
};
/// #}}} @func Incl.prototype.run

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Incl;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
