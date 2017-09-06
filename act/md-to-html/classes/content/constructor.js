/**
 * ---------------------------------------------------------------------------
 * CONTENT CONSTRUCTOR
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
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
var loadHelper = require('../../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const CONTENT_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var CONTENT_TYPE = loadHelper('type-id').create('content');
/// #}}} @const CONTENT_TYPE

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

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

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

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadHelper('set-constant-property');
/// #}}} @func setConstantProperty

/// #{{{ @func setProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} seal = `false`
 * @return {!Object}
 */
var setProperty = loadHelper('set-property');
/// #}}} @func setProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Content
/**
 * @public
 * @param {!Block} BLOCK
 * @param {string} SOURCE
 * @constructor
 * @struct
 */
function Content(BLOCK, SOURCE) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Content) ) {
    throw setNewError(new SyntaxError, 'Content');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'BLOCK');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'parent', '!Block');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const TYPE
  /**
   * @private
   * @const {!TypeId}
   */
  var TYPE = CONTENT_TYPE;
  /// #}}} @const TYPE

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = TYPE.ID;
  /// #}}} @const ID

  /// #{{{ @const ROOT
  /**
   * @private
   * @const {!Html}
   */
  var ROOT = BLOCK.ROOT;
  /// #}}} @const ROOT

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member BLOCK
  /**
   * @const {!Block}
   */
  setConstantProperty(this, 'BLOCK', BLOCK);
  /// #}}} @member BLOCK

  /// #{{{ @member ID
  /**
   * @const {string}
   */
  setConstantProperty(this, 'ID', ID);
  /// #}}} @member ID

  /// #{{{ @member RESULT
  /**
   * @description
   *   This parameter is only defined after `Content.prototype.parse` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a `string`.
   * @type {?string}
   */
  setProperty(this, 'RESULT', null);
  /// #}}} @member RESULT

  /// #{{{ @member ROOT
  /**
   * @const {!Html}
   */
  setConstantProperty(this, 'ROOT', ROOT);
  /// #}}} @member ROOT

  /// #{{{ @member SOURCE
  /**
   * @const {string}
   */
  setConstantProperty(this, 'SOURCE', SOURCE);
  /// #}}} @member SOURCE

  /// #{{{ @member TYPE
  /**
   * @const {!TypeId}
   */
  setConstantProperty(this, 'TYPE', TYPE);
  /// #}}} @member TYPE

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance

  /// #{{{ @step parse-source

  this.parse();

  /// #}}} @step parse-source

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Content

/// #{{{ @func isContent
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isContent = IS.content;
/// #}}} @func isContent

/// #{{{ @func newContent
/**
 * @public
 * @param {!Block} BLOCK
 * @param {string} SOURCE
 * @return {!Content}
 */
function newContent(BLOCK, SOURCE) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'BLOCK');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-content-instance

  return new Content(BLOCK, SOURCE);

  /// #}}} @step return-new-content-instance
}
/// #}}} @func newContent

/// #{{{ @step setup-content-constructor

Content.is = isContent;
Content.TYPE = CONTENT_TYPE;
Content.create = newContent;
Content.Content = Content;
Content.isContent = isContent;
Content.construct = newContent;
Content.newContent = newContent;

/// #}}} @step setup-content-constructor

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Content;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
