/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - ALL JS METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


;(function(/** Object */ root, /** !Object */ vitals) {

  /** @type {!Object} */
  var checks = {
    exp: isObj(typeof exports) && getObj(exports, true),
    mod: isObj(typeof module) && getObj(module, true),
    glo: isObj(typeof global, true) && getObj(global),
    win: isObj(typeof window) && getObj(window),
    sel: isObj(typeof self) && getObj(self),
    roo: isObj(typeof root) && getObj(root)
  };
  checks.glo = checks.exp && checks.mod && checks.glo;

  root = ( checks.glo ?
    global : checks.win && window !== (root && root.window) ?
      window : checks.sel ?
        self : checks.roo ?
          root : Function('return this')()
  );

  // window | self | global | this
  checks.win && setVitals(window);
  checks.sel && setVitals(self);
  setVitals(root);

  // exports
  if (checks.exp && checks.mod) {
    if (module.exports === exports) {
      module.exports = vitals;
    }
    else {
      setVitals(exports);
    }
  }

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define(function() {
      return vitals;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function');
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? false : obj;
    return obj && !testNodeType && obj.Object !== Object ? false : !!obj;
  }

  /**
   * @private
   * @param {!Object} obj
   */
  function setVitals(obj) {
    obj.vitals = vitals;
    obj.Vitals = vitals;
  }

})(this, (function(undefined) {

  'use strict';


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************

  // INSERT _helpers/own.js
  // INSERT _helpers/inObj.js
  // INSERT _helpers/inArr.js
  // INSERT _helpers/inStr.js
  // INSERT _helpers/match.js
  // INSERT _helpers/merge.js
  // INSERT _helpers/cloneObj.js
  // INSERT _helpers/errorAid.js
  // INSERT _helpers/splitKeys.js


// *****************************************************************************
// SECTION: BASE JS METHODS
// *****************************************************************************

  // INSERT methods/slice.js
  // INSERT methods/clone.js
  // INSERT methods/cut.js
  // INSERT methods/each.js
  // INSERT methods/fill.js
  // INSERT methods/fuse.js
  // INSERT methods/get.js
  // INSERT methods/has.js
  // INSERT methods/remap.js
  // INSERT methods/until.js


// *****************************************************************************
// SECTION: CONFIGURE JS METHODS
// *****************************************************************************

  // INSERT methods/amend.js
  // INSERT methods/create.js
  // INSERT methods/freeze.js
  // INSERT methods/seal.js


// *****************************************************************************
// SECTION: END
// *****************************************************************************

  return {
    amend:  amend,
    clone:  clone,
    create: create,
    cut:    cut,
    each:   each,
    fill:   fill,
    freeze: freeze,
    fuse:   fuse,
    get:    get,
    has:    has,
    remap:  remap,
    seal:   seal,
    slice:  slice,
    until:  until
  };
})());
