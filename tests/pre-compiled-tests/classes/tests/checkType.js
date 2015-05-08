  /**
   * -------------------------------------------------
   * Public Method (Tests.checkType)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.checkType method.
   * @type {function}
   */
  Tests.checkType = (function setupTests_checkType() {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Private checkType Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results;
    /** @type {HTMLElement} */
    var elem;
    /** @type {!Object} */
    var obj;
    /** @type {function} */
    var func;
    /** @type {!Array} */
    var arr;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Private checkType Variables
    ////////////////////////////////////////////////////////////////////////////

    results = new TestResults('checkType', 29);
    elem = document.createElement('div');
    obj  = {};
    func = function() {};
    arr  = [];

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public checkType Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (checkType)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.checkType method.
     * @type {function}
     */
    var checkType = function() {

      // Test the special characters
      testAsterisk();
      testExclamationPoint();
      testQuestionMark();
      testPipe();
      testEqualSign();

      // Test for undefined and null
      testUndefined();
      testNull();

      // Test the primitive values
      testString();
      testNumber();
      testBoolean();

      // Test the basic objects
      testObject();
      testFunction();
      testElement();
      testDocument();

      // Test the arrays
      testArray();
      testStrings();
      testNumbers();
      testBooleans();
      testObjects();
      testFunctions();
      testElements();
      testArrays();

      // Test the hash maps
      testStringMap();
      testNumberMap();
      testBooleanMap();
      testObjectMap();
      testFunctionMap();
      testArrayMap();
      testElementMap();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private checkType Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testAsterisk)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAsterisk = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      try {
        pass = aIV.utils.checkType(null, '*');
        pass = pass && aIV.utils.checkType(0, '*');
      }
      catch (error) {
        pass = false;
      }

      if (!pass) {
        errorMsg = 'Tests.checkType failed: * check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testExclamationPoint)
     * ---------------------------------------------------
     * @type {function}
     */
    var testExclamationPoint = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      fail = aIV.utils.checkType(null, '!array');
      fail = fail || aIV.utils.checkType(null, '!object');

      if (fail) {
        errorMsg = 'Tests.checkType failed: ! check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testQuestionMark)
     * ---------------------------------------------------
     * @type {function}
     */
    var testQuestionMark = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(null, '?(string|number)');
      pass = pass && aIV.utils.checkType(null, '?string');

      if (!pass) {
        errorMsg = 'Tests.checkType failed: ? check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testPipe)
     * ---------------------------------------------------
     * @type {function}
     */
    var testPipe = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType('s', 'string|number');
      pass = pass && aIV.utils.checkType(1, 'string|number');

      fail = aIV.utils.checkType(true, 'string|number');
      fail = fail || aIV.utils.checkType(obj, 'string|number');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: | check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testEqualSign)
     * ---------------------------------------------------
     * @type {function}
     */
    var testEqualSign = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(undefined, '(object|string)=');
      pass = pass && aIV.utils.checkType(undefined, 'number=');

      fail = aIV.utils.checkType(obj, 'number=');
      fail = fail || aIV.utils.checkType('s', 'boolean=');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: = check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testUndefined)
     * ---------------------------------------------------
     * @type {function}
     */
    var testUndefined = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(undefined, 'string|undefined');
      pass = pass && aIV.utils.checkType(undefined, 'undefined');

      fail = aIV.utils.checkType(obj, 'undefined');
      fail = fail || aIV.utils.checkType('s', 'undefined');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: undefined check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(null, 'string|object');
      pass = pass && aIV.utils.checkType(null, 'array');
      pass = pass && aIV.utils.checkType(null, 'elem');
      pass = pass && aIV.utils.checkType(null, 'strings');

      fail = aIV.utils.checkType(null, 'function');
      fail = fail || aIV.utils.checkType(null, 'string');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: null check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType('s', 'string|object');
      pass = pass && aIV.utils.checkType('s', 'string');

      fail = aIV.utils.checkType(elem, 'string');
      fail = fail || aIV.utils.checkType(1, 'string');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: string check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(1, 'string|number');
      pass = pass && aIV.utils.checkType(20, 'number');

      fail = aIV.utils.checkType(obj, 'number');
      fail = fail || aIV.utils.checkType('1', 'number');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: number check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(true, 'object|boolean');
      pass = pass && aIV.utils.checkType(false, 'boolean');

      fail = aIV.utils.checkType('s', 'boolean');
      fail = fail || aIV.utils.checkType(5, 'boolean');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: boolean check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(obj, 'object');
      pass = pass && aIV.utils.checkType(arr, 'object');
      pass = pass && aIV.utils.checkType(elem, 'object');

      fail = aIV.utils.checkType('s', 'object');
      fail = fail || aIV.utils.checkType(func, 'object');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: object check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(func, 'string|function');
      pass = pass && aIV.utils.checkType(func, 'function');

      fail = aIV.utils.checkType('s', 'function');
      fail = fail || aIV.utils.checkType(obj, 'function');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: function check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(elem, 'element');
      pass = pass && aIV.utils.checkType(elem, 'elem');

      fail = aIV.utils.checkType(5, 'element');
      fail = fail || aIV.utils.checkType(obj, 'elem');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: element check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {Window} */
      var tempWindow;

      tempWindow = window.open();

      pass = aIV.utils.checkType(tempWindow.document, 'document');
      pass = pass && aIV.utils.checkType(document, 'document');

      tempWindow.close();

      fail = aIV.utils.checkType(elem, 'document');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: document check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ 3, 4 ], 'array');
      pass = pass && aIV.utils.checkType(arr, 'array');

      fail = aIV.utils.checkType(obj, 'array');
      fail = fail || aIV.utils.checkType(1, 'array');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: array check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStrings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStrings = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ 's' ], 'strings');
      pass = pass && aIV.utils.checkType(arr, 'strings');

      fail = aIV.utils.checkType([ 1 ], 'strings');
      fail = fail || aIV.utils.checkType(obj, 'strings');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: strings check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumbers)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumbers = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ 1, 5 ], 'numbers');
      pass = pass && aIV.utils.checkType(arr, 'numbers');

      fail = aIV.utils.checkType([ 1, 's' ], 'numbers');
      fail = fail || aIV.utils.checkType(obj, 'numbers');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: numbers check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBooleans)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBooleans = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ false ], 'booleans');
      pass = pass && aIV.utils.checkType(arr, 'booleans');

      fail = aIV.utils.checkType([ 's' ], 'booleans');
      fail = fail || aIV.utils.checkType(obj, 'booleans');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: booleans check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObjects)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObjects = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ obj ], 'objects');
      pass = pass && aIV.utils.checkType(arr, 'objects');

      fail = aIV.utils.checkType([ obj, 1 ], 'objects');
      fail = fail || aIV.utils.checkType(obj, 'objects');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: objects check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunctions)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunctions = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ func ], 'functions');
      pass = pass && aIV.utils.checkType(arr, 'functions');

      fail = aIV.utils.checkType([ func, 1 ], 'functions');
      fail = fail || aIV.utils.checkType([ obj ], 'functions');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: functions check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElements)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElements = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ elem ], 'elems');
      pass = pass && aIV.utils.checkType(arr, 'elems');
      pass = pass && aIV.utils.checkType([ elem ], 'elements');
      pass = pass && aIV.utils.checkType(arr, 'elements');

      fail = aIV.utils.checkType([ obj ], 'elems');
      fail = fail || aIV.utils.checkType(5, 'elems');
      fail = fail || aIV.utils.checkType(true, 'elements');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: elements check failed';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ [ 1 ] ], 'arrays');
      pass = pass && aIV.utils.checkType([ arr ], 'arrays');
      pass = pass && aIV.utils.checkType(arr, 'arrays');

      fail = aIV.utils.checkType([ arr, 1 ], 'arrays');
      fail = fail || aIV.utils.checkType([ obj ], 'arrays');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: arrays check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStringMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStringMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: 'str', slot2: 'str' };

      pass = aIV.utils.checkType(testMap, 'stringMap');
      pass = pass && aIV.utils.checkType(obj, 'stringMap');

      testMap = { slot1: 'str', slot2: 1 };

      fail = aIV.utils.checkType(testMap, 'stringMap');
      fail = fail || aIV.utils.checkType(5, 'stringMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: stringMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumberMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumberMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: 1, slot2: 5 };

      pass = aIV.utils.checkType(testMap, 'numberMap');
      pass = pass && aIV.utils.checkType(obj, 'numberMap');

      testMap = { slot1: 5, slot2: 'str' };

      fail = aIV.utils.checkType(testMap, 'numberMap');
      fail = fail || aIV.utils.checkType(5, 'numberMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: numberMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBooleanMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBooleanMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: false, slot2: true };

      pass = aIV.utils.checkType(testMap, 'booleanMap');
      pass = pass && aIV.utils.checkType(obj, 'booleanMap');

      testMap = { slot1: true, slot2: 'str' };

      fail = aIV.utils.checkType(testMap, 'booleanMap');
      fail = fail || aIV.utils.checkType(5, 'booleanMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: booleanMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObjectMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObjectMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: obj, slot2: arr };

      pass = aIV.utils.checkType(testMap, 'objectMap');
      pass = pass && aIV.utils.checkType(obj, 'objectMap');

      testMap = { slot1: obj, slot2: 'str' };

      fail = aIV.utils.checkType(testMap, 'objectMap');
      fail = fail || aIV.utils.checkType(5, 'objectMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: objectMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunctionMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunctionMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: func, slot2: func };

      pass = aIV.utils.checkType(testMap, 'functionMap');
      pass = pass && aIV.utils.checkType(obj, 'functionMap');

      testMap = { slot1: obj, slot2: func };

      fail = aIV.utils.checkType(testMap, 'functionMap');
      fail = fail || aIV.utils.checkType(5, 'functionMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: functionMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrayMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrayMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: [ 1 ], slot2: arr };

      pass = aIV.utils.checkType(testMap, 'arrayMap');
      pass = pass && aIV.utils.checkType(obj, 'arrayMap');

      testMap = { slot1: obj, slot2: arr };

      fail = aIV.utils.checkType(testMap, 'arrayMap');
      fail = fail || aIV.utils.checkType(5, 'arrayMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: arrayMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElementMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElementMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: elem, slot2: elem };

      pass = aIV.utils.checkType(testMap, 'elemMap');
      pass = pass && aIV.utils.checkType(obj, 'elemMap');
      pass = pass && aIV.utils.checkType(testMap, 'elementMap');

      testMap = { slot1: obj, slot2: elem };

      fail = aIV.utils.checkType(testMap, 'elemMap');
      fail = fail || aIV.utils.checkType(5, 'elementMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: elementMap check failed';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkType Module
    ////////////////////////////////////////////////////////////////////////////

    return checkType;

  })();
