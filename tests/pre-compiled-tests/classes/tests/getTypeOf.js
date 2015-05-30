  /**
   * -------------------------------------------------
   * Public Method (Tests.getTypeOf)
   * -------------------------------------------------
   * @desc Tests the Vitals.getTypeOf method.
   * @type {function}
   */
  Tests.getTypeOf = (function setupTests_getTypeOf() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getTypeOf Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getTypeOf', 10);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getTypeOf Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getTypeOf)
     * -------------------------------------------------
     * @desc Tests the Vitals.getTypeOf method.
     * @type {function}
     */
    var getTypeOf = function() {

      testUndefined();
      testNull();

      testBoolean();
      testNumber();
      testString();
      testFunction();

      testObject();
      testArray();
      testDocument();
      testElement();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getTypeOf Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testUndefined)
     * ---------------------------------------------------
     * @type {function}
     */
    var testUndefined = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf(undefined);
      pass = (type === 'undefined');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: undefined check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNull)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNull = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf(null);
      pass = (type === 'null');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: null check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBoolean)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBoolean = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf(true);
      pass = (type === 'boolean');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: boolean check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumber)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumber = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf(5);
      pass = (type === 'number');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: number check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf('str');
      pass = (type === 'string');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: string check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunction)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunction = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf(function() {});
      pass = (type === 'function');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: function check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObject)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObject = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf({});
      pass = (type === 'object');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: object check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArray)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArray = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf([]);
      pass = (type === 'array');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: array check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testDocument)
     * ---------------------------------------------------
     * @type {function}
     */
    var testDocument = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf(document);
      pass = (type === 'document');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: document check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElement)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElement = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = Vitals.getTypeOf( document.createElement('div') );
      pass = (type === 'element');

      if (!pass) {
        errorMsg = 'Vitals.getTypeOf failed: element check failed';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getTypeOf Module
    ////////////////////////////////////////////////////////////////////////////

    return getTypeOf;

  })();
