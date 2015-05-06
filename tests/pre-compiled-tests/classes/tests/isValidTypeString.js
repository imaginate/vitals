  /**
   * -------------------------------------------------
   * Public Method (Tests.isValidTypeString)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.isValidTypeString method.
   * @type {function}
   */
  Tests.isValidTypeString = (function setupTests_isValidTypeString() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private isValidTypeString Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('isValidTypeString', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public isValidTypeString Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (isValidTypeString)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.isValidTypeString method.
     * @type {function}
     */
    var isValidTypeString = function() {

      testPrimitives();
      testArrays();
      testHashMaps();
      testSpecialCharacters();
      testInvalids();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private isValidTypeString Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testPrimitives)
     * ---------------------------------------------------
     * @type {function}
     */
    var testPrimitives = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('string');
      pass = pass && aIV.utils.isValidTypeString('number');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid primitive strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrays)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrays = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('array');
      pass = pass && aIV.utils.isValidTypeString('objects');
      pass = pass && aIV.utils.isValidTypeString('elements');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid array strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testHashMaps)
     * ---------------------------------------------------
     * @type {function}
     */
    var testHashMaps = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('stringMap');
      pass = pass && aIV.utils.isValidTypeString('objectMap');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid hash map strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testSpecialCharacters)
     * ---------------------------------------------------
     * @type {function}
     */
    var testSpecialCharacters = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('array|string');
      pass = pass && aIV.utils.isValidTypeString('!objectMap');
      pass = pass && aIV.utils.isValidTypeString('?objects');
      pass = pass && aIV.utils.isValidTypeString('string=');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid strings with ';
        errorMsg += 'special characters';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testInvalids)
     * ---------------------------------------------------
     * @type {function}
     */
    var testInvalids = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      fail = aIV.utils.isValidTypeString('string array');
      fail = fail || aIV.utils.isValidTypeString('num');
      fail = fail || aIV.utils.isValidTypeString('string|object|num');

      if (fail) {
        errorMsg = 'isValidTypeString failed to catch invalid strings';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The isValidTypeString Module
    ////////////////////////////////////////////////////////////////////////////

    return isValidTypeString;

  })();
