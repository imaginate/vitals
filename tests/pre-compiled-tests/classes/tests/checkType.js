  /**
   * -------------------------------------------------
   * Public Method (Tests.checkType)
   * -------------------------------------------------
   * @desc Tests the Vitals.checkType method.
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
    /** @type {!RegExp} */
    var regex;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Private checkType Variables
    ////////////////////////////////////////////////////////////////////////////

    results = new TestResults('checkType', 32);
    elem = document.createElement('div');
    obj  = {};
    func = function() {};
    arr  = [];
    regex = /test/g;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public checkType Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (checkType)
     * -------------------------------------------------
     * @desc Tests the Vitals.checkType method.
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
      testArray();
      testFunction();
      testRegexp();
      testElement();
      testDocument();

      // Test the arrays
      testStrings();
      testNumbers();
      testBooleans();
      testObjects();
      testFunctions();
      testElements();
      testArrays();
      testRegexps();

      // Test the hash maps
      testStringMap();
      testNumberMap();
      testBooleanMap();
      testObjectMap();
      testFunctionMap();
      testArrayMap();
      testRegexpMap();
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
        pass = Vitals.checkType(null, '*');
        pass = pass && Vitals.checkType(0, '*');
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

      fail = Vitals.checkType(null, '!array');
      fail = fail || Vitals.checkType(null, '!object');

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

      pass = Vitals.checkType(null, '?(string|number)');
      pass = pass && Vitals.checkType(null, '?string');

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

      pass = Vitals.checkType('s', 'string|number');
      pass = pass && Vitals.checkType(1, 'string|number');

      fail = Vitals.checkType(true, 'string|number');
      fail = fail || Vitals.checkType(obj, 'string|number');

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

      pass = Vitals.checkType(undefined, '(object|string)=');
      pass = pass && Vitals.checkType(undefined, 'number=');

      fail = Vitals.checkType(obj, 'number=');
      fail = fail || Vitals.checkType('s', 'boolean=');

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

      pass = Vitals.checkType(undefined, 'string|undefined');
      pass = pass && Vitals.checkType(undefined, 'undefined');

      fail = Vitals.checkType(obj, 'undefined');
      fail = fail || Vitals.checkType('s', 'undefined');

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

      pass = Vitals.checkType(null, 'string|object');
      pass = pass && Vitals.checkType(null, 'array');
      pass = pass && Vitals.checkType(null, 'elem');
      pass = pass && Vitals.checkType(null, 'strings');

      fail = Vitals.checkType(null, 'function');
      fail = fail || Vitals.checkType(null, 'string');

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

      pass = Vitals.checkType('s', 'string|object');
      pass = pass && Vitals.checkType('s', 'string');

      fail = Vitals.checkType(elem, 'string');
      fail = fail || Vitals.checkType(1, 'string');

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

      pass = Vitals.checkType(1, 'string|number');
      pass = pass && Vitals.checkType(20, 'number');

      fail = Vitals.checkType(obj, 'number');
      fail = fail || Vitals.checkType('1', 'number');

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

      pass = Vitals.checkType(true, 'object|boolean');
      pass = pass && Vitals.checkType(false, 'boolean');

      fail = Vitals.checkType('s', 'boolean');
      fail = fail || Vitals.checkType(5, 'boolean');

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

      pass = Vitals.checkType(obj, 'object');
      pass = pass && Vitals.checkType(arr, 'object');
      pass = pass && Vitals.checkType(elem, 'object');

      fail = Vitals.checkType('s', 'object');
      fail = fail || Vitals.checkType(func, 'object');

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

      pass = Vitals.checkType(func, 'string|function');
      pass = pass && Vitals.checkType(func, 'function');

      fail = Vitals.checkType('s', 'function');
      fail = fail || Vitals.checkType(obj, 'function');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: function check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testRegexp)
     * ---------------------------------------------------
     * @type {function}
     */
    var testRegexp = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = Vitals.checkType(regex, 'regexp');
      fail = Vitals.checkType(obj, 'regexp');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: regexp check failed';
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

      pass = Vitals.checkType(elem, 'element');
      pass = pass && Vitals.checkType(elem, 'elem');

      fail = Vitals.checkType(5, 'element');
      fail = fail || Vitals.checkType(obj, 'elem');

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

      pass = Vitals.checkType(tempWindow.document, 'document');
      pass = pass && Vitals.checkType(document, 'document');

      tempWindow.close();

      fail = Vitals.checkType(elem, 'document');

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

      pass = Vitals.checkType([ 3, 4 ], 'array');
      pass = pass && Vitals.checkType(arr, 'array');

      fail = Vitals.checkType(obj, 'array');
      fail = fail || Vitals.checkType(1, 'array');

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

      pass = Vitals.checkType([ 's' ], 'strings');
      pass = pass && Vitals.checkType(arr, 'strings');

      fail = Vitals.checkType([ 1 ], 'strings');
      fail = fail || Vitals.checkType(obj, 'strings');

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

      pass = Vitals.checkType([ 1, 5 ], 'numbers');
      pass = pass && Vitals.checkType(arr, 'numbers');

      fail = Vitals.checkType([ 1, 's' ], 'numbers');
      fail = fail || Vitals.checkType(obj, 'numbers');

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

      pass = Vitals.checkType([ false ], 'booleans');
      pass = pass && Vitals.checkType(arr, 'booleans');

      fail = Vitals.checkType([ 's' ], 'booleans');
      fail = fail || Vitals.checkType(obj, 'booleans');

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

      pass = Vitals.checkType([ obj ], 'objects');
      pass = pass && Vitals.checkType(arr, 'objects');

      fail = Vitals.checkType([ obj, 1 ], 'objects');
      fail = fail || Vitals.checkType(obj, 'objects');

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

      pass = Vitals.checkType([ func ], 'functions');
      pass = pass && Vitals.checkType(arr, 'functions');

      fail = Vitals.checkType([ func, 1 ], 'functions');
      fail = fail || Vitals.checkType([ obj ], 'functions');

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

      pass = Vitals.checkType([ elem ], 'elems');
      pass = pass && Vitals.checkType(arr, 'elems');
      pass = pass && Vitals.checkType([ elem ], 'elements');
      pass = pass && Vitals.checkType(arr, 'elements');

      fail = Vitals.checkType([ obj ], 'elems');
      fail = fail || Vitals.checkType(5, 'elems');
      fail = fail || Vitals.checkType(true, 'elements');

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

      pass = Vitals.checkType([ [ 1 ] ], 'arrays');
      pass = pass && Vitals.checkType([ arr ], 'arrays');
      pass = pass && Vitals.checkType(arr, 'arrays');

      fail = Vitals.checkType([ arr, 1 ], 'arrays');
      fail = fail || Vitals.checkType([ obj ], 'arrays');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: arrays check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testRegexps)
     * ---------------------------------------------------
     * @type {function}
     */
    var testRegexps = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = Vitals.checkType([ regex ], 'regexps');
      pass = pass && Vitals.checkType(arr, 'regexps');
      fail = Vitals.checkType([ obj ], 'regexps');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: regexps check failed';
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

      pass = Vitals.checkType(testMap, 'stringMap');
      pass = pass && Vitals.checkType(obj, 'stringMap');

      testMap = { slot1: 'str', slot2: 1 };

      fail = Vitals.checkType(testMap, 'stringMap');
      fail = fail || Vitals.checkType(5, 'stringMap');

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

      pass = Vitals.checkType(testMap, 'numberMap');
      pass = pass && Vitals.checkType(obj, 'numberMap');

      testMap = { slot1: 5, slot2: 'str' };

      fail = Vitals.checkType(testMap, 'numberMap');
      fail = fail || Vitals.checkType(5, 'numberMap');

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

      pass = Vitals.checkType(testMap, 'booleanMap');
      pass = pass && Vitals.checkType(obj, 'booleanMap');

      testMap = { slot1: true, slot2: 'str' };

      fail = Vitals.checkType(testMap, 'booleanMap');
      fail = fail || Vitals.checkType(5, 'booleanMap');

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

      pass = Vitals.checkType(testMap, 'objectMap');
      pass = pass && Vitals.checkType(obj, 'objectMap');

      testMap = { slot1: obj, slot2: 'str' };

      fail = Vitals.checkType(testMap, 'objectMap');
      fail = fail || Vitals.checkType(5, 'objectMap');

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

      pass = Vitals.checkType(testMap, 'functionMap');
      pass = pass && Vitals.checkType(obj, 'functionMap');

      testMap = { slot1: obj, slot2: func };

      fail = Vitals.checkType(testMap, 'functionMap');
      fail = fail || Vitals.checkType(5, 'functionMap');

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

      pass = Vitals.checkType(testMap, 'arrayMap');
      pass = pass && Vitals.checkType(obj, 'arrayMap');

      testMap = { slot1: obj, slot2: arr };

      fail = Vitals.checkType(testMap, 'arrayMap');
      fail = fail || Vitals.checkType(5, 'arrayMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: arrayMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testRegexpMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testRegexpMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: regex, slot2: regex };
      try {
        pass = Vitals.checkType(testMap, 'regexpMap');
        pass = pass && Vitals.checkType(obj, 'regexpMap');
      }
      catch (error) {
        console.error( error.toString() );
        pass = false;
      }

      testMap = { slot1: regex, slot2: arr };
      try {
        fail = Vitals.checkType(testMap, 'regexpMap');
        fail = fail || Vitals.checkType([ 1 ], 'regexpMap');
      }
      catch (error) {
        console.error( error.toString() );
        fail = true;
      }

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: regexpMap check failed';
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

      pass = Vitals.checkType(testMap, 'elemMap');
      pass = pass && Vitals.checkType(obj, 'elemMap');
      pass = pass && Vitals.checkType(testMap, 'elementMap');

      testMap = { slot1: obj, slot2: elem };

      fail = Vitals.checkType(testMap, 'elemMap');
      fail = fail || Vitals.checkType(5, 'elementMap');

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
