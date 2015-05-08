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
  utilsModuleAPI.set = function(settings) {

    /** @type {string} */
    var errorMsg;
    /** @type {!(Document|Element)} */
    var elem;
    /** @type {(string|function)} */
    var msg;

    if (!settings || typeof settings !== 'object') {
      errorMsg = 'An aIV.utils.set call received an invalid settings ';
      errorMsg += 'parameter (should be an object).';
      throw new TypeError(errorMsg);
      return;
    }

    // Set checkArgsErrorMsg
    if ( settings.hasOwnProperty('checkArgsErrorMsg') ) {
      msg = settings.checkArgsErrorMsg;
      if (typeof msg === 'string' || typeof msg === 'function') {
        defaults.checkArgsErrorMsg = msg;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'checkArgsErrorMsg settings parameter ';
        errorMsg += '(should be a string).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemByClassRoot
    if ( settings.hasOwnProperty('getElemByClassRoot') ) {
      elem = settings.getElemByClassRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemByClassRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemByClassRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemsByClassRoot
    if ( settings.hasOwnProperty('getElemsByClassRoot') ) {
      elem = settings.getElemsByClassRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemsByClassRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemsByClassRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemByTagRoot
    if ( settings.hasOwnProperty('getElemByTagRoot') ) {
      elem = settings.getElemByTagRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemByTagRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemByTagRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemsByTagRoot
    if ( settings.hasOwnProperty('getElemsByTagRoot') ) {
      elem = settings.getElemsByTagRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemsByTagRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemsByTagRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    return true;
  };
