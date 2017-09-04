/**
 * ---------------------------------------------------------------------------
 * PARAGRAPH CONSTRUCTOR
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

/// #{{{ @const P_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var P_TYPE = loadHelper('type-id').create('p');
/// #}}} @const P_TYPE

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

/// #}}} @group IS

/// #{{{ @group OBJECT

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

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Paragraph
/**
 * @private
 * @param {!Block} base
 * @constructor
 * @struct
 */
function Paragraph(base) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Paragraph) ) {
    throw setNewError(new SyntaxError, 'Paragraph');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'base');
  }
  if ( !isBlock(base) || base.ID !== 'p' ) {
    throw setTypeError(new TypeError, 'base', '!Block');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-to-base-block-instance

  this = base;

  /// #}}} @step set-to-base-block-instance

  /// #{{{ @step update-members

  /// #{{{ @member TYPE
  /**
   * @const {!TypeId}
   */
  setConstantProperty(this, 'TYPE', P_TYPE);
  /// #}}} @member TYPE

  /// #}}} @step update-members
}
/// #}}} @func Paragraph

/// #{{{ @func isParagraph
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isParagraph = IS.paragraph;
/// #}}} @func isParagraph

/// #{{{ @func newParagraph
/**
 * @public
 * @param {!Block} base
 * @return {!Paragraph}
 */
function newParagraph(base) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'base');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-paragraph-instance

  return new Paragraph(base);

  /// #}}} @step return-new-paragraph-instance
}
/// #}}} @func newParagraph

/// #{{{ @step setup-paragraph-constructor

Paragraph.is = isParagraph;
Paragraph.TYPE = P_TYPE;
Paragraph.create = newParagraph;
Paragraph.Paragraph = Paragraph;
Paragraph.construct = newParagraph;
Paragraph.isParagraph = isParagraph;
Paragraph.newParagraph = newParagraph;

/// #}}} @step setup-paragraph-constructor

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Paragraph;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
