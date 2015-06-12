  /** @type {!Object} */
  var Vitals;
  /** @type {(Object|?function)} */
  var exports = isObj(typeof exports) && getObj(exports, true);
  /** @type {(Object|?function)} */
  var module = isObj(typeof module) && getObj(module, true);

  root = (function(root, global, window, self) {

    if ( window && root && (window === root.window) ) {
      window = null;
    }
    return global || window || self || root;

  })(
    root,
    exports && module && isObj(typeof global, true) && getObj(global),
    isObj(typeof window) && getObj(window),
    isObj(typeof self) && getObj(self)
  );

  Vitals = makeVitals(root);

  // AMD
  if (typeof define === 'function' &&
      typeof define.amd === 'object' && define.amd) {
    root.Vitals = Vitals;
    root.V = Vitals;
    define(function() {
      return Vitals;
    });
  }
  // Node.js or CommonJS
  else if (exports && module) {
    if (exports === module.exports) {
      module.exports = Vitals;
    }
    module.exports.Vitals = Vitals;
    module.exports.V = Vitals;
  }
  // Browser
  else {
    root.Vitals = Vitals;
    root.V = Vitals;
  }

  /**
   * ---------------------------------------------------
   * Private Function (isObj)
   * ---------------------------------------------------
   * @desc A helper method that checks if a value is an object.
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {?boolean}
   */
  function isObj(typeOf, noFunc) {
    return (typeOf === 'object') || (!noFunc && typeOf === 'function') || null;
  }

  /**
   * ---------------------------------------------------
   * Private Function (getObj)
   * ---------------------------------------------------
   * @desc A helper method that checks if an object is a valid object and
   *   returns the object or null.
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} checkNode
   * @return {boolean}
   */
  function getObj(obj, checkNode) {
    if (obj && ( (checkNode && obj.nodeType) ||
                 (!checkNode && !obj.Object) )) {
      obj = null;
    }
    return obj;
  }
