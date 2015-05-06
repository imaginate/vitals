/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (v1.0.1)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's JavaScript shortcuts are a collection of methods that
 *   make programming in JavaScript easier. With an intuitive API and clear
 *   documentation we are sure you will appreciate the time you save using our
 *   shortcuts!
 * @module aIVUtils
 * @version 1.0.1
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The Apache License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about the code base for aIV.utils:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See our guideline]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 * @typedef {Array<boolean>} booleans
 */

////////////////////////////////////////////////////////////////////////////////
// The Dependencies
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Polyfills (dependencies/algorithmIV-polyfills.min.js)
 * -------------------------------------------------------------------------- */
// insert-aIV-polyfills

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function setupTheUtilsPublicAPI(window, utilsModuleAPI) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */
// insert-public-api

})(window,

////////////////////////////////////////////////////////////////////////////////
// The Utils Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheUtilsModule(window, document, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */
// insert-module-vars

/* -----------------------------------------------------------------------------
 * The Set Method Defaults Method (set-defaults.js)
 * -------------------------------------------------------------------------- */
// insert-set-defaults

/* -----------------------------------------------------------------------------
 * The checkType Method (methods/checkType.js)
 * -------------------------------------------------------------------------- */
// insert-methods-checkType

/* -----------------------------------------------------------------------------
 * The isValidTypeString Method (methods/isValidTypeString.js)
 * -------------------------------------------------------------------------- */
// insert-methods-isValidTypeString

/* -----------------------------------------------------------------------------
 * The freezeObj Method (methods/freezeObj.js)
 * -------------------------------------------------------------------------- */
// insert-methods-freezeObj

/* -----------------------------------------------------------------------------
 * The hasOwnProp Method (methods/hasOwnProp.js)
 * -------------------------------------------------------------------------- */
// insert-methods-hasOwnProp

/* -----------------------------------------------------------------------------
 * The getElemById Method (methods/getElemById.js)
 * -------------------------------------------------------------------------- */
// insert-methods-getElemById

/* -----------------------------------------------------------------------------
 * The getElemByClass Method (methods/getElemByClass.js)
 * -------------------------------------------------------------------------- */
// insert-methods-getElemByClass

/* -----------------------------------------------------------------------------
 * The getElemsByClass Method (methods/getElemsByClass.js)
 * -------------------------------------------------------------------------- */
// insert-methods-getElemsByClass

/* -----------------------------------------------------------------------------
 * The getElemByTag Method (methods/getElemByTag.js)
 * -------------------------------------------------------------------------- */
// insert-methods-getElemByTag

/* -----------------------------------------------------------------------------
 * The getElemsByTag Method (methods/getElemsByTag.js)
 * -------------------------------------------------------------------------- */
// insert-methods-getElemsByTag

/* -----------------------------------------------------------------------------
 * The RegExps Class (reg-exps.js)
 * -------------------------------------------------------------------------- */
// insert-reg-exps

/* -----------------------------------------------------------------------------
 * Deep Freeze The Utils Module API
 * -------------------------------------------------------------------------- */

  (function(utilsModuleAPI) {

    /** @type {string} */
    var prop;

    Object.freeze(utilsModuleAPI);

    for (prop in utilsModuleAPI) {
      if (utilsModuleAPI.hasOwnProperty(prop) && utilsModuleAPI[ prop ] &&
          (typeof utilsModuleAPI[ prop ] === 'object' ||
           typeof utilsModuleAPI[ prop ] === 'function')) {
        Object.freeze(utilsModuleAPI[ prop ]);
      }
    }
  })(utilsModuleAPI);

////////////////////////////////////////////////////////////////////////////////
// The Utils Module End
////////////////////////////////////////////////////////////////////////////////

  return utilsModuleAPI;

})(window, document));