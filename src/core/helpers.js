/**
 * ---------------------------------------------------------------------------
 * CORE HELPERS
 * ---------------------------------------------------------------------------
 * @file
 *   This file contains the core helpers that are required by all other
 *   helpers and `vitals` methods. They must be defined before all other
 *   functions in `vitals`. Their only dependency is upon the core constants
 *   (i.e. the core constants must be defined prior to the core helpers). The
 *   order in which each core helper is defined is also important (e.g. if
 *   `$objStr` was defined after `$is`, `vitals` would fail because `$is`
 *   relies upon `$objStr` within an IIFE, an immediately-invoked function
 *   expression, to polyfill its test for `arguments` instances).
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @core helpers
/// #include @helper $objStr ../helpers/obj-str.js
/// #include @helper $own ../helpers/own.js
/// #include @helper $hasEnum ../helpers/has-enum.js
/// #include @helper $ownEnum ../helpers/own-enum.js
/// #include @helper $is ../helpers/is.js
/// #include @helper $mkStr ../helpers/mk-str.js
/// #include @helper $print ../helpers/print.js
/// #include @helper $mkObj ../helpers/mk-obj.js
/// #include @helper $mkErr ../helpers/mk-err.js
/// #include @helper $strIncl ../helpers/str-incl.js
/// #if{{{ @scope FS
/// #include @helper $hasHome ../helpers/has-home.js
/// #include @helper $hasUncDrive ../helpers/has-unc-drive.js
/// #include @helper $hasWinDrive ../helpers/has-win-drive.js
/// #include @helper $hasDrive ../helpers/has-drive.js
/// #include @helper $cleanpath ../helpers/cleanpath.js
/// #include @helper $getCwd ../helpers/get-cwd.js
/// #include @helper $getDrive ../helpers/get-drive.js
/// #include @helper $getHome ../helpers/get-home.js
/// #include @helper $getUncDrive ../helpers/get-unc-drive.js
/// #include @helper $getWinDrive ../helpers/get-win-drive.js
/// #include @helper $trimDrive ../helpers/trim-drive.js
/// #include @helper $trimUncDrive ../helpers/trim-unc-drive.js
/// #include @helper $trimWinDrive ../helpers/trim-win-drive.js
/// #include @helper $insHome ../helpers/ins-home.js
/// #include @helper $relPath ../helpers/rel-path.js
/// #include @helper $resolve ../helpers/resolve.js
/// #include @class File ../classes/file.js
/// #include @helper $mkVfc ../helpers/mk-vfc.js
/// #if}}} @scope FS
/// #}}} @core helpers

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
