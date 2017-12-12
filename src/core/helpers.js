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
/// #include @helper $own ../helpers/own.js
/// #include @helper $enum ../helpers/enum.js
/// #include @helper $enown ../helpers/enown.js
/// #include @helper $instof ../helpers/instof.js
/// #include @helper $typeof ../helpers/typeof.js
/// #include @helper $objStr ../helpers/obj-str.js
/// #include @helper $objStrRef ../helpers/obj-str-ref.js
/// #include @helper $isArgs ../helpers/is-args.js
/// #include @helper $isArr ../helpers/is-arr.js
/// #include @helper $isArrgs ../helpers/is-arrgs.js
/// #include @helper $isBool ../helpers/is-bool.js
/// #include @helper $isChar ../helpers/is-char.js
/// #include @helper $isDate ../helpers/is-date.js
/// #include @helper $isDiff ../helpers/is-diff.js
/// #include @helper $isDomDoc ../helpers/is-dom-doc.js
/// #include @helper $isDomElem ../helpers/is-dom-elem.js
/// #include @helper $isErr ../helpers/is-err.js
/// #include @helper $isFun ../helpers/is-fun.js
/// #include @helper $isFunObj ../helpers/is-fun-obj.js
/// #include @helper $isInst ../helpers/is-inst.js
/// #include @helper $isNan ../helpers/is-nan.js
/// #include @helper $isNoid ../helpers/is-noid.js
/// #include @helper $isNull ../helpers/is-null.js
/// #include @helper $isNum ../helpers/is-num.js
/// #include @helper $isObj ../helpers/is-obj.js
/// #include @helper $isObjInst ../helpers/is-obj-inst.js
/// #include @helper $isPoint ../helpers/is-point.js
/// #include @helper $isRegx ../helpers/is-regx.js
/// #include @helper $isSame ../helpers/is-same.js
/// #include @helper $isStr ../helpers/is-str.js
/// #include @helper $isVoid ../helpers/is-void.js
/// #include @helper $isZeroStr ../helpers/is-zero-str.js
/// #include @helper $isNotArgs ../helpers/is-not-args.js
/// #include @helper $isNotArr ../helpers/is-not-arr.js
/// #include @helper $isNotArrgs ../helpers/is-not-arrgs.js
/// #include @helper $isNotBool ../helpers/is-not-bool.js
/// #include @helper $isNotDate ../helpers/is-not-date.js
/// #include @helper $isNotErr ../helpers/is-not-err.js
/// #include @helper $isNotFun ../helpers/is-not-fun.js
/// #include @helper $isNotFunObj ../helpers/is-not-fun-obj.js
/// #include @helper $isNotInst ../helpers/is-not-inst.js
/// #include @helper $isNotNoid ../helpers/is-not-noid.js
/// #include @helper $isNotNull ../helpers/is-not-null.js
/// #include @helper $isNotNum ../helpers/is-not-num.js
/// #include @helper $isNotObj ../helpers/is-not-obj.js
/// #include @helper $isNotObjInst ../helpers/is-not-obj-inst.js
/// #include @helper $isNotPoint ../helpers/is-not-point.js
/// #include @helper $isNotRegx ../helpers/is-not-regx.js
/// #include @helper $isNotStr ../helpers/is-not-str.js
/// #include @helper $isNotVoid ../helpers/is-not-void.js
/// #include @helper $is ../helpers/is.js
/// #include @helper $mkStr ../helpers/mk-str.js
/// #include @helper $print ../helpers/print.js
/// #include @helper $mkObj ../helpers/mk-obj.js
/// #include @helper $mkErr ../helpers/mk-err.js
/// #include @helper $strIncl ../helpers/str-incl.js
/// #if{{{ @scope FS
/// #include @helper $resolvePath ../helpers/resolve-path.js
/// #include @helper $hasHomeDirMacro ../helpers/has-home-dir-macro.js
/// #include @helper $hasUncDrive ../helpers/has-unc-drive.js
/// #include @helper $hasWinDrive ../helpers/has-win-drive.js
/// #include @helper $hasDrive ../helpers/has-drive.js
/// #include @helper $hasLowerWinDrive ../helpers/has-lower-win-drive.js
/// #include @helper $capitalizeWinDrive ../helpers/capitalize-win-drive.js
/// #include @helper $cleanPath ../helpers/clean-path.js
/// #include @helper $getUncDrive ../helpers/get-unc-drive.js
/// #include @helper $getWinDrive ../helpers/get-win-drive.js
/// #include @helper $getDrive ../helpers/get-drive.js
/// #include @helper $trimDrive ../helpers/trim-drive.js
/// #include @helper $trimUncDrive ../helpers/trim-unc-drive.js
/// #include @helper $trimWinDrive ../helpers/trim-win-drive.js
/// #include @helper $trimRelDirs ../helpers/trim-rel-dirs.js
/// #include @helper $flattenPath ../helpers/flatten-path.js
/// #include @helper $getCwd ../helpers/get-cwd.js
/// #include @helper $getHomeDir ../helpers/get-home-dir.js
/// #include @helper $insHomeDir ../helpers/ins-home-dir.js
/// #include @helper $absPath ../helpers/abs-path.js
/// #include @helper $absPaths ../helpers/abs-paths.js
/// #include @helper $relPath ../helpers/rel-path.js
/// #include @class File ../classes/file.js
/// #include @helper $mkVfc ../helpers/mk-vfc.js
/// #if}}} @scope FS
/// #}}} @core helpers

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
