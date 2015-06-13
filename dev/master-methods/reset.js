
  /**
   * -----------------------------------------------------
   * Public Method (Vitals.reset)
   * -----------------------------------------------------
   * @desc Allows you to reset the default settings for each Vitals method.
   * @param {...(string|!Array<string>)=} setting - The setting(s) to reset
   *   to the on-load default. If undefined then all settings are reset.
   * @return {boolean} The success of the new settings update.
   */
  Vitals.reset = (function setup_reset(checkType, hasOwnProp,
                                                getObjKeys, sliceArr) {

    /** @type {function(...(string|!Array<string>)=): boolean} */
    return function reset() {

      // Public vitals module vars used in this method:
      // var defaults;
      // var DEFAULTS;

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

      len = arguments.length;
      args = ( (!len) ?
        getObjKeys(defaults) : (len > 1) ?
          sliceArr.call(arguments, 0) : ( checkType(arguments[0], '!array') ) ?
            arguments[0] : [ arguments[0] ]
      );

      if ( !checkType(args, '!strings') ) {
        errorMsg = 'A Vitals.reset call received an invalid setting param ';
        errorMsg += '(should be a string or array of strings).';
        throw new TypeError(errorMsg);
      }

      i = args.length;
      while (i--) {
        prop = args[i];
        if ( hasOwnProp(defaults, prop) ) {
          defaults[ prop ] = DEFAULTS[ prop ];
        }
      }

      return true;
    };

  })(Vitals.checkType, Vitals.hasOwnProp,
     Object.keys, Array.prototype.slice);
