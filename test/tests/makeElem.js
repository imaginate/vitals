  /**
   * -------------------------------------------------
   * Public Method (Tests.makeElem)
   * -------------------------------------------------
   * @desc Tests the Vitals.makeElem method.
   * @type {function}
   */
  Tests.makeElem = (function setupTests_makeElem() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private makeElem Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('makeElem', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public makeElem Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (makeElem)
     * -------------------------------------------------
     * @desc Tests the Vitals.makeElem method.
     * @type {function}
     */
    var makeElem = function() {

      testNoTag();
      testOnlyTag();
      testSettings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private makeElem Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testNoTag)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNoTag = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      elem = Vitals.makeElem();

      pass = (elem instanceof HTMLDivElement);

      if (!pass) {
        errorMsg = 'makeElem failed to create an element without a tag name';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOnlyTag)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOnlyTag = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      elem = Vitals.makeElem('span');

      pass = (elem instanceof HTMLSpanElement);

      if (!pass) {
        errorMsg = 'makeElem failed to create an element with only a tag name';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testSettings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testSettings = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var text;
      /** @type {string} */
      var errorMsg;

      elem = Vitals.makeElem({
        tag : 'span',
        text: 'makeElemTests',
        id  : 'makeElemTests'
      });
      text = (!!elem.textContent) ? elem.textContent : elem.innerText;

      pass = (elem instanceof HTMLSpanElement);
      pass = pass && (text === 'makeElemTests');
      pass = pass && (elem.id === 'makeElemTests');

      elem = Vitals.makeElem({
        tagName: 'p',
        html   : 'makeElemTests'
      });

      pass = (elem instanceof HTMLParagraphElement);
      pass = pass && (elem.innerHTML === 'makeElemTests');

      elem = Vitals.makeElem({
        className: 'makeElemTests'
      });

      pass = (elem instanceof HTMLDivElement);
      pass = pass && (elem.className === 'makeElemTests');

      if (!pass) {
        errorMsg = 'makeElem failed to create an element with full settings';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The makeElem Module
    ////////////////////////////////////////////////////////////////////////////

    return makeElem;

  })();
