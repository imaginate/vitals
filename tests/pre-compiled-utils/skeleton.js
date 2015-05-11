/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (v1.0.4)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's JavaScript shortcuts are a collection of methods that
 *   make programming in JavaScript easier. With an intuitive API and clear
 *   documentation we are sure you will appreciate the time you save using our
 *   shortcuts!
 * @module aIVUtils
 * @version 1.0.4
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

////////////////////////////////////////////////////////////////////////////////
// The JS Shortcuts
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The checkType Method (js-methods/checkType.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-checkType

/* -----------------------------------------------------------------------------
 * The isValidTypeString Method (js-methods/isValidTypeString.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-isValidTypeString

/* -----------------------------------------------------------------------------
 * The checkArgs Method (js-methods/checkArgs.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-checkArgs

/* -----------------------------------------------------------------------------
 * The getTypeOf Method (js-methods/getTypeOf.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-getTypeOf

/* -----------------------------------------------------------------------------
 * The freezeObj Method (js-methods/freezeObj.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-freezeObj

/* -----------------------------------------------------------------------------
 * The hasOwnProp Method (js-methods/hasOwnProp.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-hasOwnProp

/* -----------------------------------------------------------------------------
 * The JS Helper Methods (js-methods/helpers.js)
 * -------------------------------------------------------------------------- */
// insert-js-methods-helpers

////////////////////////////////////////////////////////////////////////////////
// The DOM Shortcuts
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The getElemById Method (dom-methods/getElemById.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-getElemById

/* -----------------------------------------------------------------------------
 * The getElemByClass Method (dom-methods/getElemByClass.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-getElemByClass

/* -----------------------------------------------------------------------------
 * The getElemsByClass Method (dom-methods/getElemsByClass.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-getElemsByClass

/* -----------------------------------------------------------------------------
 * The getElemByTag Method (dom-methods/getElemByTag.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-getElemByTag

/* -----------------------------------------------------------------------------
 * The getElemsByTag Method (dom-methods/getElemsByTag.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-getElemsByTag

/* -----------------------------------------------------------------------------
 * The makeElem Method (dom-methods/makeElem.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-makeElem

/* -----------------------------------------------------------------------------
 * The setElemText Method (dom-methods/setElemText.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-setElemText

/* -----------------------------------------------------------------------------
 * The addElemText Method (dom-methods/addElemText.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-addElemText

/* -----------------------------------------------------------------------------
 * The DOM Helper Methods (dom-methods/helpers.js)
 * -------------------------------------------------------------------------- */
// insert-dom-methods-helpers

////////////////////////////////////////////////////////////////////////////////
// The Master Methods
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The set Method (master-methods/set.js)
 * -------------------------------------------------------------------------- */
// insert-master-method-set

/* -----------------------------------------------------------------------------
 * The reset Method (master-methods/reset.js)
 * -------------------------------------------------------------------------- */
// insert-master-method-reset

////////////////////////////////////////////////////////////////////////////////
// The Utils Module End
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Deep Freeze The Utils Module API
 * -------------------------------------------------------------------------- */

  utilsModuleAPI.freezeObj(utilsModuleAPI, true);

  return utilsModuleAPI;

})(window, document));