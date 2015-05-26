  /**
   * -----------------------------------------------------
   * Public Variable (HasFeature)
   * -----------------------------------------------------
   * @desc Holds the results for all browser feature detection.
   * @type {!Object<string, boolean>}
   * @struct
   */
  var HasFeature = {};

  /**
   * -----------------------------------------------------
   * Public Property (HasFeature.freezeRegExpBug)
   * -----------------------------------------------------
   * @desc Indicates whether the browser has a bug when using frozen RegExp.
   * @type {boolean}
   */
  HasFeature.freezeRegExpBug = (function testForFreezeRegExpBug() {

    /** @type {!RegExp} */
    var regex;
    /** @type {string} */
    var orgStr;
    /** @type {string} */
    var newStr;
    /** @type {boolean} */
    var pass;

    regex = /0/g;
    Object.freeze(regex);

    orgStr = 'T00 many zer0s... replace them.';
    pass = true;

    try {
      newStr = orgStr.replace(regex, 'o');
    }
    catch(e){
      pass = false;
    }

    return !pass;
  })();

  /**
   * -----------------------------------------------------
   * Public Property (HasFeature.textContent)
   * -----------------------------------------------------
   * @desc Indicates whether the browser supports the DOM property,
   *   [Node.textContent]{@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}.
   * @type {boolean}
   */
  HasFeature.textContent = (function testForTextContent() {

    /** @type {!Element} */
    var elem;
    /** @type {boolean} */
    var pass;

    elem = document.createElement('div');
    elem.id = 'aIV-utils-test-elem';
    elem.innerHTML = 'Test Elem';
    elem.style.opacity = '0';
    document.body.appendChild(elem);

    pass = !!elem.textContent;

    document.body.removeChild(elem);

    return pass;
  })();

  Object.freeze(HasFeature);
