  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  vitalsModuleAPI.getTypeOf = (function setup_getTypeOf() {

    ////////////////////////////////////////////////////////////////////////////
    // The Public Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (getTypeOf)
     * ---------------------------------------------------
     * @desc A shortcut for the native typeof operator that additionally
     *   distinguishes null, array, document, and element types from an
     *   object type.
     * @param {*} val - The value to get the typeof.
     * @return {string} The value's type.
     */
    var getTypeOf = function(val) {

      /** @type {string} */
      var type;

      type = typeof val;

      if (type === 'object' && checkType(val, 'document|element|array')) {
        type = ( (val === null) ?
          'null' : (Array.isArray(val)) ?
            'array' : (val.nodeType === 1) ?
              'element' : 'document'
        );
      }

      return type;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (checkType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given optional types.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - A string of the data types to evaluate against.
     * @param {boolean=} noTypeValCheck - If true this method does not check
     *   the data type string for correctness. By default this is set to false.
     * @return {boolean} The evaluation result.
     */
    var checkType = vitalsModuleAPI.checkType;

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getTypeOf Module
    ////////////////////////////////////////////////////////////////////////////

    return getTypeOf;

  })();
