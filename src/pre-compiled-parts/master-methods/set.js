  /**
   * -----------------------------------------------------
   * Public Method (vitalsModuleAPI.set)
   * -----------------------------------------------------
   * @desc Allows you to set the default settings for each Vitals method.
   * @param {!Object} settings - The default settings.
   * @param {(string|function)=} settings.checkArgsErrorMsg
   * @param {!(Document|Element)=} settings.getElemByClassRoot
   * @param {!(Document|Element)=} settings.getElemsByClassRoot
   * @param {!(Document|Element)=} settings.getElemByTagRoot
   * @param {!(Document|Element)=} settings.getElemsByTagRoot
   * @return {boolean} The success of the new settings update.
   */
  vitalsModuleAPI.set = (function setup_set(checkType, hasOwnProp,
                                            throwPropError, types) {

    return function set(settings) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var propName;

      if ( !checkType(settings, '!object') ) {
        errorMsg = 'A Vitals.set call received an invalid settings ';
        errorMsg += 'param (should be an object).';
        throw new TypeError(errorMsg);
      }

      for (propName in defaults) {
        if (hasOwnProp(defaults, propName) && hasOwnProp(settings, propName)) {
          if ( checkType(settings[ propName ], types[ propName ]) ) {
            defaults[ propName ] = settings[ propName ];
          }
          else {
            throwPropError(propName);
          }
        }
      }

      return true;
    };
  })(vitalsModuleAPI.checkType, vitalsModuleAPI.hasOwnProp, function(propName) {
    var errorMsg = 'A Vitals.set call received an invalid ' + propName + ' ';
    errorMsg += 'property for the settings param (the prop should be a ';
    errorMsg += DEFAULTS.types[ propName ] + ').';
    throw new TypeError(errorMsg);
  }, DEFAULTS.types);
