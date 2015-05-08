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

      /** @type {function(*, string): boolean} */
      var checkType = utilsModuleAPI.checkType;
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

  /**
   * -----------------------------------------------------
   * Public Method (utilsModuleAPI.reset)
   * -----------------------------------------------------
   * @desc Allows you to reset the default settings for each aIV.utils method.
   * @param {...(string|strings)=} setting - A setting to reset to the original default.
   * @return {boolean} The success of the new settings update.
   */
  utilsModuleAPI.reset = function() {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<string>} */
    var args;
    /** @type {string} */
    var prop;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len  = arguments.length;
    args = ( (!len) ?
      Object.keys(defaults) : (len > 1) ?
        Array.prototype.slice.call(arguments, 0) : (Array.isArray(arguments[0])) ?
          arguments[0] : [ arguments[0] ]
    );

    if ( !utilsModuleAPI.checkType(args, '!strings') ) {
      errorMsg = 'An aIV.utils.reset call received an invalid setting ';
      errorMsg += 'parameter (should be a string or an array of strings).';
      throw new TypeError(errorMsg);
    }

    i = args.length;
    while (i--) {
      prop = args[i];
      if ( defaults.hasOwnProperty(prop) ) {
        defaults[ prop ] = DEFAULTS[ prop ];
      }
    }

    return true;
  };
