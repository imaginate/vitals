
  /**
   * -----------------------------------------------------
   * Public Variable (JsFeatures)
   * -----------------------------------------------------
   * @desc Holds the results for JS feature detection.
   * @type {!Object<string, boolean>}
   * @struct
   */
  var JsFeatures = {};

  /**
   * -----------------------------------------------------
   * Public Property (JsFeatures.freezeRegExpBug)
   * -----------------------------------------------------
   * @desc Indicates whether the browser has a bug when using frozen RegExp.
   * @type {boolean}
   */
  JsFeatures.freezeRegExpBug = (function testForFreezeRegExpBug() {

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
    catch(e) {
      pass = false;
    }

    return !pass;
  })();

  Object.freeze(JsFeatures);
