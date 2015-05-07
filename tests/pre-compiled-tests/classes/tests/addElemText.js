  /**
   * -------------------------------------------------
   * Public Method (Tests.addElemText)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.addElemText method.
   * @type {function}
   */
  Tests.addElemText = (function setupTests_addElemText() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private addElemText Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('addElemText', 1);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public addElemText Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (addElemText)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.addElemText method.
     * @type {function}
     */
    var addElemText = function() {

      testBasicUse();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private addElemText Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testBasicUse)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBasicUse = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var text;
      /** @type {string} */
      var errorMsg;

      elem = document.createElement('test');

      aIV.utils.addElemText(elem, 'Pass');

      text = (!!elem.textContent) ? elem.textContent : elem.innerText;

      pass = (text === 'Pass');

      if (!pass) {
        errorMsg = 'addElemText failed to update an element\'s innerText';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The addElemText Module
    ////////////////////////////////////////////////////////////////////////////

    return addElemText;

  })();
