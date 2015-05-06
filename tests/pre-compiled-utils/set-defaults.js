  /**
   * -----------------------------------------------------
   * Public Method (utilsModuleAPI.set)
   * -----------------------------------------------------
   * @desc Allows you to set the default settings for each aIV.utils method.
   * @param {!Object} settings - The default settings.
   * @param {!(Document|Element)=} settings.getElemByClassRoot
   * @param {!(Document|Element)=} settings.getElemsByClassRoot
   * @param {!(Document|Element)=} settings.getElemByTagRoot
   * @param {!(Document|Element)=} settings.getElemsByTagRoot
   */
  utilsModuleAPI.set = function(settings) {

    /** @type {string} */
    var errorMsg;
    /** @type {!(Document|Element)} */
    var elem;

    if (!settings || typeof settings !== 'object') {
      errorMsg = 'An aIV.utils.set call received an invalid settings ';
      errorMsg += 'parameter (should be an object).';
      throw new TypeError(errorMsg);
      return;
    }

    // Set getElemByClassRoot
    if ( settings.hasOwnProperty('getElemByClassRoot') ) {
      elem = settings.getElemByClassRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemByClassRoot = settings.getElemByClassRoot;
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
        defaults.getElemsByClassRoot = settings.getElemsByClassRoot;
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
        defaults.getElemByTagRoot = settings.getElemByTagRoot;
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
        defaults.getElemsByTagRoot = settings.getElemsByTagRoot;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemsByTagRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }
  };
