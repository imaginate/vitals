/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: is
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: is
////////////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ARE
  //////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - IS
  //////////////////////////////////////////////////////////

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

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'whole');

    return _is.whole(val);
  }

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - CHECKS
  //////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - TYPES
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!Object<string, function(*, boolean=): boolean>} DataTypes
   */

  /**
   * @private
   * @type {DataTypes}
   */
  var TYPES = (function() {

    /**
     * @type {DataTypes}
     */
    var _types = {};

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

    _types = addTypes('primitives', {
      'undefined': _is.undefined,
      'boolean':   _is.bool,
      'string':    _is.str,
      'number':    _is.num,
      'nan':       _is.nan
    }, false);
    _types = addType('primitives', 'null', _is.nil);

    _types = addTypes('js_objects', {
      'object': _is.obj,
      'regexp': _is.regex,
      'array':  _is.arr,
      'date':   _is.date,
      'error':  _is.err
    });
    _types = addType('js_objects', 'arguments', _is.args);
    _types = addType('js_objects', 'function', _is.func, false);

    _types = addTypes('dom_objects', {
      'element':  _is.elem,
      'document': _is.doc
    });

    _types = addType('others', 'empty', _is.empty);

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

    _types = addShortcuts({
      // primitives
      nil:  'null',
      bool: 'boolean',
      str:  'string',
      num:  'number',

      // js objects
      obj:   'object',
      func:  'function',
      fn:    'function',
      regex: 'regexp',
      re:    'regexp',
      arr:   'array',
      err:   'error',
      args:  'arguments',

      // dom objects
      elem: 'element',
      doc:  'document',

      // arrays
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

      // maps
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

    return _types;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!RegExp}
   */
  var ALL_SPECIALS = /[^a-z\|]/g;

  /**
   * @private
   * @type {!Object<string, function(string): boolean>}
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

  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return SPECIALS[special](types);
  }

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('is');

  /**
   * @private
   * @type {string}
   */
  var DOCS = 'https://github.com/imaginate/vitals/wiki/vitals.is-types';

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
  return is;
})();


module.exports = is;
