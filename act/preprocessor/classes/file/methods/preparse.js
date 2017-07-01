/**
 * ---------------------------------------------------------------------------
 * PREPARSE METHOD
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

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} name
 * @return {!Function}
 */
var loadClass = loadHelper('load-class');
/// #}}} @func loadClass

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
var IS = loadHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group CONSTRUCTORS

/// #{{{ @func Line
/**
 * @private
 * @param {string} text
 * @param {!Loc} before
 * @param {?Loc=} after
 * @constructor
 * @struct
 */
var Line = loadClass('line');
/// #}}} @func Line

/// #{{{ @func Loc
/**
 * @private
 * @param {number} linenum
 * @param {!File} file
 * @constructor
 * @struct
 */
var Loc = loadClass('location');
/// #}}} @func Loc

/// #{{{ @func Ins
/**
 * @private
 * @param {!Line} line
 * @param {number} index
 * @param {!File} file
 * @constructor
 * @struct
 */
var Ins = loadClass('insert');
/// #}}} @func Ins

/// #}}} @group CONSTRUCTORS

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

/// #{{{ @func setPhaseError
/**
 * @private
 * @param {!Error} err
 * @param {string} func
 * @param {(!File|!Blk|!Cond|!Def|!Incl|!Ins)} node
 * @return {!Error}
 */
var setPhaseError = setError.phase;
/// #}}} @func setPhaseError

/// #}}} @group ERROR

/// #{{{ @group HAS

/// #{{{ @func hasInsert
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasInsert = loadHelper('has-insert-command');
/// #}}} @func hasInsert

/// #}}} @group HAS

/// #{{{ @group OBJECT

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

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func File.prototype.preparse
/**
 * @public
 * @this {!File}
 * @return {!File}
 */
function preparse() {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Ins>} */
  var inserts;
  /** @type {!Ins} */
  var insert;
  /** @type {!Array<!Line>} */
  var lines;
  /** @type {!Line} */
  var line;
  /** @type {!Loc} */
  var loc;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-phase

  if (this.inserts)
    throw setPhaseError(new Error, 'preparse', this);

  /// #}}} @step verify-phase

  /// #{{{ @step set-member-refs

  lines = this.lines;

  /// #}}} @step set-member-refs

  /// #{{{ @step make-inserts

  inserts = [];
  i = lines.length;
  while (i--) {
    line = lines[i];
    if ( hasInsert(line.text) ) {
      insert = new Ins(line, i, this);
      lines.splice.apply(lines, insert.args);
      inserts.push(insert);
    }
  }

  /// #}}} @step make-inserts

  /// #{{{ @step freeze-inserts

  freezeObject(inserts);

  /// #}}} @step freeze-inserts

  /// #{{{ @step set-inserts

  /// #{{{ @member inserts
  /**
   * @public
   * @const {!Array<!Ins>}
   */
  setupOffProperty(this, 'inserts', inserts, true);
  /// #}}} @member inserts

  /// #}}} @step set-inserts

  /// #{{{ @step update-lines

  len = lines.length;
  i = -1;
  while (++i < len) {
    line = lines[i];
    loc = new Loc(i + 1, this);
    lines[i] = new Line(line.text, line.before, loc);
  }

  /// #}}} @step update-lines

  /// #{{{ @step freeze-instance

  freezeObject(lines);
  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func File.prototype.preparse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = preparse;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
