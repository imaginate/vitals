/**
 * ---------------------------------------------------------------------------
 * TYPE IDS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #{{{ @group OBJECT-CONTROL
//////////////////////////////////////////////////////////////////////////////
// OBJECT-CONTROL
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func freezeObject
/**
 * @private
 * @param {?Object} src
 * @param {boolean=} deep
 * @return {?Object}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT-CONTROL

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var DIR_TYPE_ID = freezeObject({});
/// #}}} @const DIR_TYPE_ID

/// #{{{ @const FILE_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var FILE_TYPE_ID = freezeObject({});
/// #}}} @const FILE_TYPE_ID

/// #{{{ @const LINE_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var LINE_TYPE_ID = freezeObject({});
/// #}}} @const LINE_TYPE_ID

/// #{{{ @const BLK_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var BLK_TYPE_ID = freezeObject({});
/// #}}} @const BLK_TYPE_ID

/// #{{{ @const COND_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var COND_TYPE_ID = freezeObject({});
/// #}}} @const COND_TYPE_ID

/// #{{{ @const DEF_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var DEF_TYPE_ID = freezeObject({});
/// #}}} @const DEF_TYPE_ID

/// #{{{ @const INCL_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var INCL_TYPE_ID = freezeObject({});
/// #}}} @const INCL_TYPE_ID

/// #{{{ @const INS_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var INS_TYPE_ID = freezeObject({});
/// #}}} @const INS_TYPE_ID

/// #}}} @group CONSTANTS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const TYPE_IDS
/**
 * @private
 * @const {!Object}
 */
var TYPE_IDS = freezeObject({

  'directory': DIR_TYPE_ID,
  'dir': DIR_TYPE_ID,

  'file': FILE_TYPE_ID,

  'line': LINE_TYPE_ID,

  'block': BLK_TYPE_ID,
  'blk': BLK_TYPE_ID,

  'conditional': COND_TYPE_ID,
  'cond': COND_TYPE_ID,

  'define': DEF_TYPE_ID,
  'def': DEF_TYPE_ID,

  'include': INCL_TYPE_ID,
  'incl': INCL_TYPE_ID,

  'insert': INS_TYPE_ID,
  'ins': INS_TYPE_ID

});
/// #}}} @const TYPE_IDS

module.exports = TYPE_IDS;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
