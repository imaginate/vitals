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
