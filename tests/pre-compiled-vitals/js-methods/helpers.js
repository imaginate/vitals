  /**
   * -----------------------------------------------------
   * Public Variable (JsHelpers)
   * -----------------------------------------------------
   * @desc Holds helpers for the JS shortcut methods.
   * @type {!Object<string, !RegExp>}
   * @struct
   */
  var JsHelpers = {};

  /**
   * -----------------------------------------------------
   * Public Property (JsHelpers.allDataTypes)
   * -----------------------------------------------------
   * @desc A regex of all of the data types available to checkType.
   * @type {!RegExp}
   */
  JsHelpers.allDataTypes = (function setupJsHelpers_allDataTypes() {

    /** @type {string} */
    var types;

    types = '' +
    '^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^null$|'    +
    '^undefined$|^elem$|^element$|^document$|^regexp$|^strings$|^numbers$|'    +
    '^booleans$|^objects$|^arrays$|^functions$|^elems$|^elements$|^regexps$|'  +
    '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|'             +
    '^functionmap$|^elemmap$|^elementmap$|^regexpMap$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------------
   * Public Property (JsHelpers.exceptLowerAlphaAndPipe)
   * -----------------------------------------------------
   * @desc A regex matching all characters except lowercase letters and the pipe.
   * @type {!RegExp}
   */
  JsHelpers.exceptLowerAlphaAndPipe = /[^a-z\|]/g;

  Object.freeze(JsHelpers);
