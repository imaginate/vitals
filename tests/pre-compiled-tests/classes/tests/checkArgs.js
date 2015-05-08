  /**
   * -------------------------------------------------
   * Public Method (Tests.checkArgs)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.checkArgs method.
   * @type {function}
   */
  Tests.checkArgs = (function setupTests_checkArgs() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private checkArgs Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('checkArgs', 3);

    /** @type {!RegExp} */
    var checkErrorMsg = /aIV\.utils\.checkArgs/;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public checkArgs Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (checkArgs)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.checkArgs method.
     * @type {function}
     */
    var checkArgs = function() {

      testOnePair();
      testTwoPair();
      testOneArg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private checkArgs Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testOnePair)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOnePair = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.checkArgs(3, 'number');
      }
      catch (error) {
        errorMsg = 'checkArgs(3, \'number\') failed. ';
        errorMsg += error.toString();
        results.addError(errorMsg);
      }

      try {
        aIV.utils.checkArgs(3, 'string');
      }
      catch (error) {
        if ( checkErrorMsg.test(error.message) ) {
          errorMsg = 'checkArgs(3, \'string\') failed. ';
          errorMsg += error.toString();
          results.addError(errorMsg);
        }
        else {
          console.log( error.toString() );
        }
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTwoPair)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTwoPair = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.checkArgs(3, 'number', true, 'boolean');
      }
      catch (error) {
        errorMsg = 'checkArgs(3, \'number\', true, \'boolean\') failed. ';
        errorMsg += error.toString();
        results.addError(errorMsg);
      }

      try {
        aIV.utils.checkArgs(3, 'number', true, 'string');
      }
      catch (error) {
        if ( checkErrorMsg.test(error.message) ) {
          errorMsg = 'checkArgs(3, \'number\', true, \'string\') failed. ';
          errorMsg += error.toString();
          results.addError(errorMsg);
        }
        else {
          console.log( error.message );
        }
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOneArg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOneArg = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.utils.checkArgs call was missing parameters.';

      try {
        aIV.utils.checkArgs(3);
      }
      catch (error) {
        if (error.message === errorMsg) {
          pass = true;
        }
      }

      if (!pass) {
        errorMsg = 'checkArgs(3) failed to throw a valid error.';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkArgs Module
    ////////////////////////////////////////////////////////////////////////////

    return checkArgs;

  })();
