  /**
   * -----------------------------------------------------
   * Public Variable (vitalsModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var vitalsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Variable (DEFAULTS)
   * -----------------------------------------------------
   * @desc Holds each method's orginal defaults.
   * @type {!{
   *   checkArgsErrorMsg  : function,
   *   getElemByIdRoot    : !Document,
   *   getElemByClassRoot : !Document,
   *   getElemsByClassRoot: !Document,
   *   getElemByTagRoot   : !Document,
   *   getElemsByTagRoot  : !Document
   * }}
   * @const
   */
  var DEFAULTS = {
    checkArgsErrorMsg  : 'A method call received an invalid parameter type.',
    getElemByIdRoot    : document,
    getElemByClassRoot : document,
    getElemsByClassRoot: document,
    getElemByTagRoot   : document,
    getElemsByTagRoot  : document
  };

  /**
   * -----------------------------------------------------
   * Public Variable (DEFAULTS.types)
   * -----------------------------------------------------
   * @desc Holds the data type options for each default.
   * @type {!Object<string, string>}
   * @const
   */
  DEFAULTS.types = {
    checkArgsErrorMsg  : 'string|function',
    getElemByIdRoot    : '!Document',
    getElemByClassRoot : '!Document|Element',
    getElemsByClassRoot: '!Document|Element',
    getElemByTagRoot   : '!Document|Element',
    getElemsByTagRoot  : '!Document|Element'
  };

  Object.freeze(DEFAULTS);
  Object.freeze(DEFAULTS.types);

  /**
   * -----------------------------------------------------
   * Public Variable (defaults)
   * -----------------------------------------------------
   * @desc Holds each method's defaults.
   * @type {!{
   *   checkArgsErrorMsg  : (string|function),
   *   getElemByIdRoot    : !Document,
   *   getElemByClassRoot : (!Document|!Element),
   *   getElemsByClassRoot: (!Document|!Element),
   *   getElemByTagRoot   : (!Document|!Element),
   *   getElemsByTagRoot  : (!Document|!Element)
   * }}
   */
  var defaults = {
    checkArgsErrorMsg  : DEFAULTS.checkArgsErrorMsg,
    getElemByIdRoot    : DEFAULTS.getElemByIdRoot,
    getElemByClassRoot : DEFAULTS.getElemByClassRoot,
    getElemsByClassRoot: DEFAULTS.getElemsByClassRoot,
    getElemByTagRoot   : DEFAULTS.getElemByTagRoot,
    getElemsByTagRoot  : DEFAULTS.getElemsByTagRoot
  };
