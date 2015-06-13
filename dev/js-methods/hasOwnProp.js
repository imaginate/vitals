
  /**
   * ---------------------------------------------------
   * Public Method (Vitals.hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method that does
   *   not throw errors for null values.
   * @param {(Object|?function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  Vitals.hasOwnProp = (function setup_hasOwnProp(checkType) {

    return function hasOwnProp(obj, prop) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(obj, 'object|function') ) {
        errorMsg = 'A Vitals.hasOwnProp call received an invalid obj param.';
        throw new TypeError(errorMsg);
      }

      if (!checkType(prop, 'string|number') || prop === '') {
        errorMsg = 'A Vitals.hasOwnProp call received an invalid prop param.';
        throw new TypeError(errorMsg);
      }

      return !!obj && obj.hasOwnProperty(prop);
    };
  })(Vitals.checkType);
