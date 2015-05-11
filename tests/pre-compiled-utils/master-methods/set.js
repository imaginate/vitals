  /**
   * -----------------------------------------------------
   * Public Method (utilsModuleAPI.set)
   * -----------------------------------------------------
   * @desc Allows you to set the default settings for each aIV.utils method.
   * @param {!Object} settings - The default settings.
   * @param {(string|function)=} settings.checkArgsErrorMsg
   * @param {!(Document|Element)=} settings.getElemByClassRoot
   * @param {!(Document|Element)=} settings.getElemsByClassRoot
   * @param {!(Document|Element)=} settings.getElemByTagRoot
   * @param {!(Document|Element)=} settings.getElemsByTagRoot
   * @return {boolean} The success of the new settings update.
   */
  utilsModuleAPI.set = (function setup_set() {

    /** @type {function(*, string): boolean} */
    var checkType = utilsModuleAPI.checkType;
    /** @type {function(string)} */
    var throwPropError = function(prop) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.utils.set call received an invalid ' + prop;
      errorMsg += ' settings parameter (should be a ' + DEFAULTS.types[ prop ];
      errorMsg += ').';
      throw new TypeError(errorMsg);
    };

    return function set(settings) {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var prop;

      if (!settings || typeof settings !== 'object') {
        errorMsg = 'An aIV.utils.set call received an invalid settings ';
        errorMsg += 'parameter (should be an object).';
        throw new TypeError(errorMsg);
      }

      for (prop in defaults) {
        if (defaults.hasOwnProperty(prop) && settings.hasOwnProperty(prop)) {
          if ( checkType(settings[ prop ], DEFAULTS.types[ prop ]) ) {
            defaults[ prop ] = settings[ prop ];
          }
          else {
            throwPropError(prop);
          }
        }
      }

      return true;
    };
  })();
