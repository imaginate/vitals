  /**
   * -----------------------------------------------------
   * Public Variable (DomFeatures)
   * -----------------------------------------------------
   * @desc Holds the results for DOM feature detection.
   * @type {!Object<string, boolean>}
   * @struct
   */
  var DomFeatures = {};

  /**
   * -----------------------------------------------------
   * Public Property (HasFeature.textContent)
   * -----------------------------------------------------
   * @desc Indicates whether the browser supports the DOM property,
   *   [Node.textContent]{@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}.
   * @type {boolean}
   */
  DomFeatures.textContent = ('textContent' in document);

  Object.freeze(DomFeatures);
