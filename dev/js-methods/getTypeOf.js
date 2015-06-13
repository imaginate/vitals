  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  Vitals.getTypeOf = (function setup_getTypeOf(checkType, isArray) {

    return function getTypeOf(val) {

      /** @type {string} */
      var type;

      type = typeof val;

      if (type === 'object' && checkType(val, 'document|element|array')) {
        type = ( (val === null) ?
          'null' : (isArray(val)) ?
            'array' : (val.nodeType === 1) ?
              'element' : 'document'
        );
      }

      return type;
    };
  })(Vitals.checkType, Array.isArray);
