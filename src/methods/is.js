/**
 * ---------------------------------------------------------------------------
 * VITALS IS
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS IS
//////////////////////////////////////////////////////////////////////////////

var is = (function isPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is
  // - is.null      (is.nil)
  // - is.undefined
  // - is.boolean   (is.bool)
  // - is.string    (is.str)
  // - is._string   (is._str)
  // - is.number    (is.num)
  // - is._number   (is._num)
  // - is.nan
  // - is.object    (is.obj)
  // - is._object   (is._obj)
  // - is.func      (is.function|is.fn)
  // - is.array     (is.arr)
  // - is._array    (is._arr)
  // - is.regexp    (is.regex|is.re)
  // - is.date
  // - is.error     (is.err)
  // - is.args
  // - is.document  (is.doc)
  // - is.element   (is.elem)
  // - is.empty
  // - is.frozen
  // - is.whole
  // - is.odd
  // - is.even
  //////////////////////////////////////////////////////////

  /* {{{2 Is References
   * @ref [doc]:(https://developer.mozilla.org/en-US/docs/Web/API/Document)
   * @ref [nan]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
   * @ref [args]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
   * @ref [elem]:(https://developer.mozilla.org/en-US/docs/Web/API/Element)
   * @ref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
   * @ref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
   * @ref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
   * @ref [frozen]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
   */

  /// {{{2
  /// @method is
  /**
   * Checks if a value(s) is one of the provided types. See the [type docs](https://github.com/imaginate/vitals/wiki/vitals.is-types)
   *   for all available options. Note that all object types are nullable by
   *   default (i.e. `null` will return `true`).
   *
   * @public
   * @param {string} types - The valid data types. See the [type docs](https://github.com/imaginate/vitals/wiki/vitals.is-types)
   *   for all options.
   * @param {...*} val - The value to evaluate. If multiple values are
   *   provided all must pass the type check to return true.
   * @return {boolean} The evaluation result.
   */
  function is(types, val) {

    /** @type {string} */
    var nullable;
    /** @type {Array<function>} */
    var checks;

    if (arguments.length < 2) throw _error('No type or val');
    if ( !_is._str(types) ) throw _error.type('types');

    if ( _hasSpecial('*', types) ) return true;

    checks = _getChecks(types);

    if (!checks) throw _error.range('types', DOCS);

    nullable = _getNullable(types);
    return arguments.length > 2
      ? _checkVals(checks, arguments, nullable)
      : _checkVal(checks, val, nullable);
  }

  /// {{{2
  /// @method is.null
  /// @alias is.nil
  /**
   * Checks if a value(s) is `null`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is['null'] = function isNull(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'null');
      case 1:  return _is.nil(val);
      default: return _are(arguments, _is.nil);
    }
  };
  // define shorthand
  is.nil = is['null'];

  /// {{{2
  /// @method is.undefined
  /**
   * Checks if a value(s) is `undefined`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.undefined = function isUndefined(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'undefined');
      case 1:  return _is.undefined(val);
      default: return _are(arguments, _is.undefined);
    }
  };

  /// {{{2
  /// @method is.boolean
  /// @alias is.bool
  /**
   * Checks if a value(s) is a boolean.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is['boolean'] = function isBoolean(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'boolean');
      case 1:  return _is.bool(val);
      default: return _are(arguments, _is.bool);
    }
  };
  // define shorthand
  is.bool = is['boolean'];

  /// {{{2
  /// @method is.string
  /// @alias is.str
  /**
   * Checks if a value(s) is a string.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.string = function isString(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'string');
      case 1:  return _is.str(val);
      default: return _are(arguments, _is.str);
    }
  };
  // define shorthand
  is.str = is.string;

  /// {{{2
  /// @method is._string
  /// @alias is._str
  /**
   * Checks if a value(s) is a non-empty string.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._string = function isNonEmptyString(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_string');
      case 1:  return _is._str(val);
      default: return _are(arguments, _is._str);
    }
  };
  // define shorthand
  is._str = is._string;

  /// {{{2
  /// @method is.number
  /// @alias is.num
  /**
   * Checks if a value(s) is a number.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.number = function isNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'number');
      case 1:  return _is.num(val);
      default: return _are(arguments, _is.num);
    }
  };
  // define shorthand
  is.num = is.number;

  /// {{{2
  /// @method is._number
  /// @alias is._num
  /**
   * Checks if a value(s) is a number and not `0`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._number = function isNonZeroNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_number');
      case 1:  return _is._num(val);
      default: return _are(arguments, _is._num);
    }
  };
  // define shorthand
  is._num = is._number;

  /// {{{2
  /// @method is.nan
  /**
   * Checks if a value(s) is `NaN`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.nan = function isNan(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'nan');
      case 1:  return _is.nan(val);
      default: return _are(arguments, _is.nan);
    }
  };

  /// {{{2
  /// @method is.object
  /// @alias is.obj
  /**
   * Checks if a value(s) is an object.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.object = function isObject(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'object');
      case 1:  return _is.obj(val);
      default: return _are(arguments, _is.obj);
    }
  };
  // define shorthand
  is.obj = is.object;

  /// {{{2
  /// @method is._object
  /// @alias is._obj
  /**
   * Checks if a value(s) is an object or function.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._object = function isObjectOrFunction(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_object');
      case 1:  return _is._obj(val);
      default: return _are(arguments, _is._obj);
    }
  };
  // define shorthand
  is._obj = is._object;

  /// {{{2
  /// @method is.func
  /// @alias is.function
  /// @alias is.fn
  /**
   * Checks if a value(s) is a function. Note that `vitals.is.function` is not
   *   valid in ES3 and some ES5 browser environments. Use `vitals.is.func` for
   *   browser safety.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.func = function isFunction(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'function');
      case 1:  return _is.func(val);
      default: return _are(arguments, _is.func);
    }
  };
  // define shorthand
  is.fn = is.func;
  try {
    is['function'] = is.func;
  }
  catch (error) {}

  /// {{{2
  /// @method is.array
  /// @alias is.arr
  /**
   * Checks if a value(s) is an `Array` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.array = function isArray(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'array');
      case 1:  return _is.arr(val);
      default: return _are(arguments, _is.arr);
    }
  };
  // define shorthand
  is.arr = is.array;

  /// {{{2
  /// @method is._array
  /// @alias is._arr
  /**
   * Checks if a value(s) is an `Array` or `Arguments` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._array = function isArrayOrArguments(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_array');
      case 1:  return _is._arr(val);
      default: return _are(arguments, _is._arr);
    }
  };
  // define shorthand
  is._arr = is._array;

  /// {{{2
  /// @method is.regexp
  /// @alias is.regex
  /// @alias is.re
  /**
   * Checks if a value(s) is a `RegExp` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.regexp = function isRegExp(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'regexp');
      case 1:  return _is.regex(val);
      default: return _are(arguments, _is.regex);
    }
  };
  // define shorthand
  is.regex = is.regexp;
  is.re = is.regexp;

  /// {{{2
  /// @method is.date
  /**
   * Checks if a value(s) is a `Date` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.date = function isDate(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'date');
      case 1:  return _is.date(val);
      default: return _are(arguments, _is.date);
    }
  };

  /// {{{2
  /// @method is.error
  /// @alias is.err
  /**
   * Checks if a value(s) is an `Error` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.error = function isError(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'error');
      case 1:  return _is.err(val);
      default: return _are(arguments, _is.err);
    }
  };
  // define shorthand
  is.err = is.error;

  /// {{{2
  /// @method is.args
  /**
   * Checks if a value(s) is an `Arguments` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.args = function isArguments(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'args');
      case 1:  return _is.args(val);
      default: return _are(arguments, _is.args);
    }
  };

  /// {{{2
  /// @method is.document
  /// @alias is.doc
  /**
   * Checks if a value(s) is a DOM `Document` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.document = function isDocument(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'document');
      case 1:  return _is.doc(val);
      default: return _are(arguments, _is.doc);
    }
  };
  // define shorthand
  is.doc = is.document;

  /// {{{2
  /// @method is.element
  /// @alias is.elem
  /**
   * Checks if a value(s) is a DOM `Element` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.element = function isElement(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'element');
      case 1:  return _is.elem(val);
      default: return _are(arguments, _is.elem);
    }
  };
  // define shorthand
  is.elem = is.element;

  /// {{{2
  /// @method is.empty
  /**
   * Checks if a value(s) is considered empty.
   *
   * @public
   * @param {...*} val
   * @return {boolean} Returns `false` if value is one of the following:
   *   ```
   *   0, "", {}, [], null, undefined, false, NaN, function(){...}
   *   ```
   *   Note that for functions this method checks whether it has any defined
   *   params:
   *   ```
   *   function empty(){}
   *   function notEmpty(param){}
   *   ```
   */
  is.empty = function isEmpty(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'empty');
      case 1:  return _is.empty(val);
      default: return _are(arguments, _is.empty);
    }
  };

  /// {{{2
  /// @method is.frozen
  /**
   * Checks if a value(s) is [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen).
   *
   * @public
   * @param {...(Object|?function)} val
   * @return {boolean}
   */
  is.frozen = function isFrozen(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'frozen');
      case 1:  return _isFrozen(val);
      default: return _are(arguments, _isFrozen);
    }
  };

  /// {{{2
  /// @method is.whole
  /**
   * Checks if a number(s) is whole (i.e. has no decimal). Zero and non-decimal
   *   negative numbers will return `true`.
   *
   * @public
   * @param {...number} val
   * @return {boolean}
   */
  is.whole = function isWholeNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'whole');
      case 1:  return _isWhole(val);
      default: return _are(arguments, _isWhole);
    }
  };

  /// {{{2
  /// @method is.odd
  /**
   * Checks if a number(s) is odd.
   *
   * @public
   * @param {...number} val - Each val must be a whole number.
   * @return {boolean}
   */
  is.odd = function isOddNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'odd');
      case 1:  return _isOdd(val);
      default: return _are(arguments, _isOdd);
    }
  };

  /// {{{2
  /// @method is.even
  /**
   * Checks if a number(s) is even.
   *
   * @public
   * @param {...number} val - Each val must be a whole number.
   * @return {boolean}
   */
  is.even = function isEvenNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'even');
      case 1:  return _isEven(val);
      default: return _are(arguments, _isEven);
    }
  };

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - ARE
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _are
  /**
   * @private
   * @param {!Arguments} vals
   * @param {function} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) {
      if ( !check(vals[i]) ) return false;
    }
    return true;
  }

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - IS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _isFrozen
  /**
   * @private
   * @param {(Object|?function)} val
   * @return {boolean}
   */
  function _isFrozen(val) {

    if ( _is.nil(val) ) return false;

    if ( !_is._obj(val) ) throw _error.type('val', 'frozen');

    return _is.frozen(val);
  }

  /// {{{3
  /// @func _isWhole
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'whole');

    return _is.whole(val);
  }

  /// {{{3
  /// @func _isOdd
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isOdd(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'odd');
    if ( !_is.whole(val) ) throw _error.range('val', 'whole numbers', 'odd');

    return _is.odd(val);
  }

  /// {{{3
  /// @func _isEven
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isEven(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'even');
    if ( !_is.whole(val) ) throw _error.range('val', 'whole numbers', 'even');

    return _is.even(val);
  }

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - CHECKS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _checkVal
  /**
   * @private
   * @param {!Array<function>} checks
   * @param {*} val
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVal(checks, val, nullable) {

    /** @type {number} */
    var i;

    i = checks.length;
    while (i--) {
      if ( checks[i](val, nullable) ) return true;
    }
    return false;
  }

  /// {{{3
  /// @func _checkVals
  /**
   * @private
   * @param {!Array<function>} checks
   * @param {!Arguments} vals
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVals(checks, vals, nullable) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (--i) {
      if ( !_checkVal(checks, vals[i], nullable) ) return false;
    }
    return true;
  }

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - TYPES
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!Object<string, function(*, boolean=): boolean>} DataTypes
   */

  /// {{{3
  /// @const TYPES
  /**
   * @private
   * @const {!DataTypes}
   */
  var TYPES = (function() {

    /**
     * @type {DataTypes}
     */
    var _types = {};

    /// {{{4
    /// @func addTypes
    /**
     * Adds types to the _types hash map with a check method that evaluates
     *   nullable properties and invokes their type section's method.
     * @private
     * @param {string} section - The category for the types.
     * @param {!Object<string, function(*): boolean>} types - Each type's
     *   "key => value" pair should be expressed as "typeName => checkMethod".
     * @param {boolean=} nullable - The type's default nullable value. Defaults
     *   to true if not set.
     * @return {DataTypes}
     */
    function addTypes(section, types, nullable) {

      /** @type {string} */
      var type;

      for (type in types) {
        if( own(types, type) ) addType(section, type, types[type], nullable);
      }
      return _types;
    }

    /// {{{4
    /// @func addType
    /**
     * Adds type to the _types hash map with a check method that evaluates
     *   nullable properties and invokes its type section's method.
     * @private
     * @param {string} section - The type's category.
     * @param {string} type - The type's name.
     * @param {function(*): boolean} check - The type's check method.
     * @param {boolean=} nullable - The type's default nullable value. Defaults
     *   to true if not set.
     * @return {DataTypes}
     */
    function addType(section, type, check, nullable) {
      check = own(addType, section) ? addType[section](check) : check;
      nullable = nullable !== false;
      _types['_' + type] = function(val, _nullable) {
        _nullable = _is.bool(_nullable) ? _nullable : nullable;
        return _is.nil(val) ? _nullable : check(val);
      };
      return _types;
    }

    /// {{{4
    /// @func addShortcuts
    /**
     * Adds the type shortcuts to the _types hash map.
     * @private
     * @param {!Object<string, string>} shortcuts
     * @return {DataTypes}
     */
    function addShortcuts(shortcuts) {

      /** @type {string} */
      var shortcut;
      /** @type {string} */
      var type;

      for (shortcut in shortcuts) {
        if( own(shortcuts, shortcut) ) {
          type = '_' + shortcuts[shortcut];
          shortcut = '_' + shortcut;
          _types[shortcut] = _types[type];
        }
      }
      return _types;
    }

    /// {{{4
    /// @func addType.arrays
    /**
     * @private
     * @param {function(*): boolean} eachCheck - The check method for each of
     *   the array's values.
     * @return {function(*): boolean} The array type's check method.
     */
    addType.arrays = function(eachCheck) {

      /** @type {function(*): boolean} */
      return function check(arr) {

        /** @type {number} */
        var i;

        if ( !_is.arr(arr) ) return false;

        i = arr.length;
        while (i--) {
          if ( !eachCheck(arr[i]) ) return false;
        }
        return true;
      };
    };

    /// {{{4
    /// @func addType.maps
    /**
     * @private
     * @param {function(*): boolean} eachCheck - The check method for each of
     *   the hash map's properties.
     * @return {function(*): boolean} The hash map type's check method.
     */
    addType.maps = function(eachCheck) {

      /** @type {function(*): boolean} */
      return function check(obj) {

        /** @type {string} */
        var prop;

        if ( !_is.obj(obj) ) return false;

        for (prop in obj) {
          if( own(obj, prop) && !eachCheck(obj[prop]) ) return false;
        }
        return true;
      };
    };

    ///////////////////////// {{{4
    // ADD TYPES
    //////////////////////////////

    /// {{{5 Add Primitives
    _types = addTypes('primitives', {
      'undefined': _is.undefined,
      'boolean':   _is.bool,
      'string':    _is.str,
      'number':    _is.num,
      'nan':       _is.nan
    }, false);
    _types = addType('primitives', 'null', _is.nil);

    /// {{{5 Add JS Objects
    _types = addTypes('js_objects', {
      'object': _is.obj,
      'regexp': _is.regex,
      'array':  _is.arr,
      'date':   _is.date,
      'error':  _is.err
    });
    _types = addType('js_objects', 'arguments', _is.args);
    _types = addType('js_objects', 'function', _is.func, false);

    /// {{{5 Add DOM Objects
    _types = addTypes('dom_objects', {
      'element':  _is.elem,
      'document': _is.doc
    });

    /// {{{5 Add Others
    _types = addType('others', 'empty', _is.empty);

    /// {{{5 Add Arrays
    _types = addTypes('arrays', {
      'nulls':     _is.nil,
      'booleans':  _is.bool,
      'strings':   _is.str,
      'numbers':   _is.num,
      'nans':      _is.nan,
      'objects':   _is.obj,
      'functions': _is.func,
      'regexps':   _is.regex,
      'arrays':    _is.arr,
      'dates':     _is.date,
      'errors':    _is.err,
      'elements':  _is.elem,
      'documents': _is.doc
    });

    /// {{{5 Add Maps
    _types = addTypes('maps', {
      'nullmap':     _is.nil,
      'booleanmap':  _is.bool,
      'stringmap':   _is.str,
      'numbermap':   _is.num,
      'nanmap':      _is.nan,
      'objectmap':   _is.obj,
      'functionmap': _is.func,
      'regexpmap':   _is.regex,
      'arraymap':    _is.arr,
      'datemap':     _is.date,
      'errormap':    _is.err,
      'elementmap':  _is.elem,
      'documentmap': _is.doc
    });

    ///////////////////////// {{{4
    // ADD SHORTCUTS
    //////////////////////////////

    _types = addShortcuts({

      /// {{{5 Add Primitives
      nil:  'null',
      bool: 'boolean',
      str:  'string',
      num:  'number',

      /// {{{5 Add JS Objects
      obj:   'object',
      func:  'function',
      fn:    'function',
      regex: 'regexp',
      re:    'regexp',
      arr:   'array',
      err:   'error',
      args:  'arguments',

      /// {{{5 Add DOM Objects
      elem: 'element',
      doc:  'document',

      /// {{{5 Add Arrays
      nils:   'nulls',
      strs:   'strings',
      nums:   'numbers',
      bools:  'booleans',
      objs:   'objects',
      funcs:  'functions',
      fns:    'functions',
      regexs: 'regexps',
      res:    'regexps',
      arrs:   'arrays',
      errs:   'errors',
      elems:  'elements',
      docs:   'documents',

      /// {{{5 Add Maps
      nilmap:   'nullmap',
      strmap:   'stringmap',
      nummap:   'numbermap',
      boolmap:  'booleanmap',
      objmap:   'objectmap',
      funcmap:  'functionmap',
      fnmap:    'functionmap',
      regexmap: 'regexpmap',
      remap:    'regexpmap',
      arrmap:   'arraymap',
      errmap:   'errormap',
      elemmap:  'elementmap',
      docmap:   'documentmap'
    });

    /// }}}4
    // END OF TYPES PRIVATE SCOPE
    return _types;
  })();

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - PARSING
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ALL_SPECIALS
  /**
   * @private
   * @type {!RegExp}
   */
  var ALL_SPECIALS = /[^a-z\|]/g;

  /// {{{3
  /// @const SPECIALS
  /**
   * @private
   * @const {!Object<string, function(string): boolean>}
   */
  var SPECIALS = (function(pipe, exPoint, quesMark, equals, asterisk) {
    return {
      '|': function(str) { return pipe.test(str);     },
      '!': function(str) { return exPoint.test(str);  },
      '?': function(str) { return quesMark.test(str); },
      '=': function(str) { return equals.test(str);   },
      '*': function(str) { return asterisk.test(str); }
    };
  })(/\|/, /\!/, /\?/, /\=/, /\*|any/);

  /// {{{3
  /// @func _hasSpecial
  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return SPECIALS[special](types);
  }

  /// {{{3
  /// @func _getChecks
  /**
   * @private
   * @param {string} types
   * @return {Array<function>}
   */
  function _getChecks(types) {

    /** @type {Array<function>} */
    var checks;
    /** @type {string} */
    var type;
    /** @type {number} */
    var i;

    if ( _hasSpecial('=', types) ) types += '|undefined';

    types = types.toLowerCase();
    types = types.replace(ALL_SPECIALS, '');
    checks = types.split('|');

    i = checks.length;
    while (i--) {
      type = '_' + checks[i];
      if ( !own(TYPES, type) ) return null;
      checks[i] = TYPES[type];
    }

    return checks.length ? checks : null;
  }

  /// {{{3
  /// @func _getNullable
  /**
   * Method checks whether "!" or "?" exists in the types.
   * @private
   * @param {string} types
   * @return {(undefined|boolean)} If undefined no override exists.
   */
  function _getNullable(types) {

    /** @type {boolean} */
    var override;
    /** @type {boolean} */
    var ensure;
    /** @type {boolean} */
    var negate;

    ensure = _hasSpecial('?', types);
    negate = _hasSpecial('!', types);
    override = ensure && negate ? false : ensure || negate;
    return override ? !negate && ensure : undefined;
  }

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _error
  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('is');

  /// {{{3
  /// @const DOCS
  /**
   * @private
   * @const {string}
   */
  var DOCS = 'https://github.com/imaginate/vitals/wiki/vitals.is-types';

  /// }}}2
  // END OF PRIVATE SCOPE FOR IS
  return is;
})();
/// }}}1

module.exports = is;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
