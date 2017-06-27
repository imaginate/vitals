/**
 * ---------------------------------------------------------------------------
 * CORE CONSTANTS
 * ---------------------------------------------------------------------------
 * @file
 *   This file contains the core constants that are required by all `vitals`
 *   helpers and methods. They must be defined before any `function` within
 *   `vitals`. The order in which each core constant is defined is also
 *   important (e.g. if `ARR` was defined after `ARR_PROTO`, `vitals` would
 *   fail because `ARR_PROTO` references `ARR` to lookup the `prototype` for
 *   the global `Array` constructor.
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @core constants
/// #include @constant VERSION ../constants/version.js
/// #include @constant ENV ../constants/env.js
/// #include @constant ROOT ../constants/env.js
/// #include @constant ARR ../constants/constructor.js
/// #include @constant ARR_PROTO ../constants/prototype.js
/// #include @constant ERR ../constants/constructor.js
/// #include @constant FUN ../constants/constructor.js
/// #include @constant FUN_PROTO ../constants/prototype.js
/// #include @constant NIL ../constants/special.js
/// #include @constant NO ../constants/special.js
/// #include @constant NUM ../constants/constructor.js
/// #include @constant NUM_PROTO ../constants/prototype.js
/// #include @constant OBJ ../constants/constructor.js
/// #include @constant OBJ_PROTO ../constants/prototype.js
/// #include @constant RANGE_ERR ../constants/constructor.js
/// #include @constant REGX ../constants/constructor.js
/// #include @constant REGX_PROTO ../constants/prototype.js
/// #include @constant STR ../constants/constructor.js
/// #include @constant STR_PROTO ../constants/prototype.js
/// #include @constant TYPE_ERR ../constants/constructor.js
/// #include @constant VOID ../constants/special.js
/// #include @constant YES ../constants/special.js
/// #if{{{ @env NODE
/// #include @constant BUFF ../constants/constructor.js
/// #include @constant CP ../constants/node.js
/// #include @constant FS ../constants/node.js
/// #include @constant PATH ../constants/node.js
/// #if}}} @env NODE
/// #}}} @core constants

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
