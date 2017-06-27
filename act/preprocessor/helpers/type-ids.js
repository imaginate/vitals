/**
 * ---------------------------------------------------------------------------
 * TYPE IDS
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

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
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

/// #}}} @group HELPERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @const FLAGS_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var FLAGS_TYPE_ID = freezeObject({});
/// #}}} @const FLAGS_TYPE_ID

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

/// #{{{ @const LINE_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var LINE_TYPE_ID = freezeObject({});
/// #}}} @const LINE_TYPE_ID

/// #{{{ @const LOC_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var LOC_TYPE_ID = freezeObject({});
/// #}}} @const LOC_TYPE_ID

/// #}}} @group CONSTANTS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const TYPE_IDS
/**
 * @private
 * @const {!Object<string, !Object>}
 */
var TYPE_IDS = freezeObject({

  'BLK': BLK_TYPE_ID,
  'Blk': BLK_TYPE_ID,
  'blk': BLK_TYPE_ID,
  'BLOCK': BLK_TYPE_ID,
  'Block': BLK_TYPE_ID,
  'block': BLK_TYPE_ID,

  'COND': COND_TYPE_ID,
  'Cond': COND_TYPE_ID,
  'cond': COND_TYPE_ID,
  'CONDITIONAL': COND_TYPE_ID,
  'Conditional': COND_TYPE_ID,
  'conditional': COND_TYPE_ID,

  'DEF': DEF_TYPE_ID,
  'Def': DEF_TYPE_ID,
  'def': DEF_TYPE_ID,
  'DEFINE': DEF_TYPE_ID,
  'Define': DEF_TYPE_ID,
  'define': DEF_TYPE_ID,

  'DIR': DIR_TYPE_ID,
  'Dir': DIR_TYPE_ID,
  'dir': DIR_TYPE_ID,
  'DIRECTORY': DIR_TYPE_ID,
  'Directory': DIR_TYPE_ID,
  'directory': DIR_TYPE_ID,

  'FILE': FILE_TYPE_ID,
  'File': FILE_TYPE_ID,
  'file': FILE_TYPE_ID,

  'FLAGS': FLAGS_TYPE_ID,
  'Flags': FLAGS_TYPE_ID,
  'flags': FLAGS_TYPE_ID,

  'LINE': LINE_TYPE_ID,
  'Line': LINE_TYPE_ID,
  'line': LINE_TYPE_ID,

  'LOC':      LOC_TYPE_ID,
  'Loc':      LOC_TYPE_ID,
  'loc':      LOC_TYPE_ID,
  'LOCATION': LOC_TYPE_ID,
  'Location': LOC_TYPE_ID,
  'location': LOC_TYPE_ID,

  'INCL': INCL_TYPE_ID,
  'Incl': INCL_TYPE_ID,
  'incl': INCL_TYPE_ID,
  'INCLUDE': INCL_TYPE_ID,
  'Include': INCL_TYPE_ID,
  'include': INCL_TYPE_ID,

  'INS': INS_TYPE_ID,
  'Ins': INS_TYPE_ID,
  'ins': INS_TYPE_ID,
  'INSERT': INS_TYPE_ID,
  'Insert': INS_TYPE_ID,
  'insert': INS_TYPE_ID

});
/// #}}} @const TYPE_IDS

module.exports = TYPE_IDS;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
