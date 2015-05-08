  /**
   * -------------------------------------------------
   * Public Method (Tests.reset)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.reset method.
   * @type {function}
   */
  Tests.reset = (function setupTests_reset() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.utils.reset', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public reset Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (reset)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.reset method.
     * @type {function}
     */
    var reset = function() {

      testNoArgs();
      testStringArg();
      testArrArg();
      testStringArgs();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testNoArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNoArgs = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.reset();
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset() ';
        errorMsg += 'failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStringArg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStringArg = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.reset('checkArgsErrorMsg');
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset(\'checkArgsErrorMsg\') ';
        errorMsg += 'failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrArg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrArg = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.reset([ 'checkArgsErrorMsg', 'getElemByTagRoot' ]);
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset([ \'checkArgsErrorMsg\', ';
        errorMsg += '\'getElemByTagRoot\' ]) failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStringArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStringArgs = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.reset('checkArgsErrorMsg', 'getElemByTagRoot');
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset(\'checkArgsErrorMsg\', ';
        errorMsg += '\'getElemByTagRoot\') failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The reset Module
    ////////////////////////////////////////////////////////////////////////////

    return reset;

  })();
