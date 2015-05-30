  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with an optional
   *   deep freeze (i.e. freezes all of an object's object properties).
   * @param {(!Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {(!Object|function)} The frozen object.
   */
  vitalsModuleAPI.freezeObj = (function setup_freezeObj(hasFreezeRegExpBug,
                               checkType, objFreeze) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public freezeObj Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (freezeObj)
     * ---------------------------------------------------
     * @desc A shortcut for the Object.freeze method with an optional
     *   deep freeze (i.e. freezes all of an object's object properties).
     * @param {(!Object|function)} obj - The object to freeze.
     * @param {boolean=} deep - Deep freeze the object. The default is false.
     * @return {(!Object|function)} The frozen object.
     */
    var freezeObj = function(obj, deep) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(obj, '!object|function') ) {
        errorMsg = 'A Vitals.freezeObj call received an invalid obj param.';
        throw new TypeError(errorMsg);
      }

      if (hasFreezeRegExpBug && (obj instanceof RegExp)) {
        return obj;
      }

      if (deep === true) {
        deepFreeze(obj);
      }
      else {
        objFreeze(obj);
      }

      return obj;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private freezeObj Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Private Method (deepFreeze)
     * -------------------------------------------------
     * @desc A helper to freezeObj that recursively freezes all of its
     *   properties.
     * @param {(!Object|function)} obj - The object to freeze.
     */
    var deepFreeze = function(obj) {

      /** @type {string} */
      var prop;

      objFreeze(obj);

      for (prop in obj) {
        if (obj.hasOwnProperty(prop) &&
            checkType(obj[ prop ], '!object|function') &&
            (!hasFreezeRegExpBug || !(obj[ prop ] instanceof RegExp))) {
          deepFreeze(obj[ prop ]);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The freezeObj Module
    ////////////////////////////////////////////////////////////////////////////

    return freezeObj;

  })(JsFeatures.freezeRegExpBug, vitalsModuleAPI.checkType, Object.freeze);
