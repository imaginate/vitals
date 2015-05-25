  /**
   * -----------------------------------------------------
   * Public Variable (JsHelpers)
   * -----------------------------------------------------
   * @desc Holds helpers for the DOM shortcut methods.
   * @type {!Object<string, RegExp>}
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
    '^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'    +
    '^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|'  +
    '^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|'           +
    '^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|' +
    '^elementmap$';

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
