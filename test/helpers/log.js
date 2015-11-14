/**
 * -----------------------------------------------------------------------------
 * LOG LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;
/** @type {Function<string, function>} */
var is = require('node-are').is;
/** @type {Function<string, function>} */
var are = require('node-are').are;
/** @type {!Object} */
var colors = require('colors/safe');


////////////////////////////////////////////////////////////////////////////////
// EXPORT LOG-OCD FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Object=} options
 * @return {!LogOCD}
 */
module.exports = function newLogOCD(options) {

  /** @type {!Object} */
  var instance = {};
  /** @type {!LogOCD} */
  var LogOCD = logOCD.bind(instance);

  each(logOCD, function(method, key) {
    LogOCD[key] = method.bind(instance);
  });
  instance._config = clone(CONFIG, true);
  is.obj(options) && setOptions(options, instance);
  return LogOCD;
};

/**
 * @private
 * @param {!Object} options
 * @param {!LogOCD} instance
 */
function setOptions(options, instance) {

  each(options, function(obj, method) {

    if ( !is.obj(obj) ) return;

    if (method === 'all') {
      each(obj, function(val, key) {
        if ( has(CONFIG_PROPS, key) && isConfigProp(key, val) ) {
          each(instance._config, function(_obj, _method) {
            if ( has(CONFIG[_method], key) ) _obj[key] = val;
          });
        }
      });
      return;
    }

    if ( !has(CONFIG, method) ) return;

    each(obj, function(val, key) {
      if ( has(CONFIG[method], key) && isConfigProp(key, val) ) {
        instance._config[method][key] = val;
      }
    });
  });
}


////////////////////////////////////////////////////////////////////////////////
// SET THEMES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!{
 *   error:  (string|!Array<string>),
 *   warn:   (string|!Array<string>),
 *   pass:   (string|!Array<string>),
 *   debug:  (string|!Array<string>),
 *   plain:  (string|!Array<string>),
 *   view:   (string|!Array<string>),
 *   fail:   (string|!Array<string>),
 *   ostack: (string|!Array<string>),
 *   estack: (string|!Array<string>)
 * }}
 * @const
 */
var THEMES = {
  error:  [ 'white', 'bold', 'bgRed'    ],
  warn:   [ 'white', 'bold', 'bgYellow' ],
  pass:   [ 'white', 'bold', 'bgGreen'  ],
  debug:  [ 'white', 'bold', 'bgBlue'   ],
  plain:    'white',
  view:     'cyan',
  fail:     'red',
  ostack:   'white',
  estack: [ 'white', 'bgBlue' ]
};

// accent settings for each theme
colors.setTheme(
  merge(clone(THEMES), {
    aerror: [ 'yellow',  'bold', 'bgRed'    ],
    awarn:  [ 'blue',    'bold', 'bgYellow' ],
    apass:  [ 'yellow',  'bold', 'bgGreen'  ],
    adebug: [ 'magenta', 'bold', 'bgBlue'   ],
    aplain: 'magenta',
    aview:  'magenta',
    afail:  'yellow'
  })
);


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE CONFIG
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object}
 * @const
 */
var CONFIG = {
  log: {
    style: 'plain',
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: true
  },
  pass: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: true,
    header: true
  },
  error: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: true,
    header: true,
    stack: true,
    exit: true
  },
  warn: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: true,
    header: true,
    stack: false
  },
  debug: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: true,
    header: true,
    stack: false
  },
  fail: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: true,
    stack: false
  },
  trace: {
    spaceBefore: 1,
    spaceAfter: 1,
    exit: true
  }
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE LOG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @this {!LogOCD}
 * @param {*...} args
 * @return {boolean}
 */
function logOCD() {

  if (!arguments.length) {
    this.error('Invalid `log-ocd` Call', 'no arguments given');
    return false;
  }

  logSpaces(this._config.log.spaceBefore);
  logAny(arguments, this._config.log.style, this._config.log.argMap);
  logSpaces(this._config.log.spaceAfter);

  return true;
}

/**
 * @public
 * @this {!LogOCD}
 * @param {*...} args
 * @return {boolean}
 */
logOCD.log = logOCD;

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.pass = function(header) {

  logSpaces(this._config.pass.spaceBefore);

  if (this._config.pass.header) {

    if ( !is._str(header) ) {
      this.error(
        'Invalid `log-ocd pass` Call',
        'invalid type for `header` param (to disable headers use `setConfig`)',
        { argMap: true, header: header }
      );
      return false;
    }

    logHeader(header, 'pass');

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'plain', this._config.pass.argMap);
    }
  }
  else {
    logHeader('Pass', 'pass');

    if (arguments.length) {
      logSpaces(1);
      logAny(arguments, 'plain', this._config.pass.argMap);
    }
  }

  logSpaces(this._config.pass.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {string} msg
 * @param {...*=} args
 * @return {boolean}
 */
logOCD.error = function(header, msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.error.stack ? newStack(msg) : null;
  msg = is.obj(msg) ? msg.toString && msg.toString() : msg;

  logSpaces(this._config.error.spaceBefore);

  if (this._config.error.header) {

    if ( !are._str(header, msg) ) {
      this.error(
        'Invalid `log-ocd error` Call',
        'invalid type for `header` or `msg` param',
        { argMap: true, header: header, msg: msg }
      );
      return false;
    }

    logHeader(header, 'error');
    logDetails(msg, 'plain');

    if (arguments.length > 2) {
      logSpaces(1);
      logAny(slice(arguments, 2), 'view', this._config.error.argMap);
    }
  }
  else {
    msg = header;

    if ( !is._str(msg) ) {
      this.error(
        'Invalid `log-ocd error` Call',
        'invalid type for `msg` param (an error message is required)',
        { argMap: true, msg: msg }
      );
      return false;
    }

    logHeader('Error', 'error');
    logDetails(msg, 'plain');

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'view', this._config.error.argMap);
    }
  }

  stack && logSpaces(1);
  stack && logStack(stack);
  logSpaces(this._config.error.spaceAfter);
  this._config.error.exit && process.exit(1);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.warn = function(header, msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.warn.stack ? newStack() : null;

  logSpaces(this._config.warn.spaceBefore);

  if (this._config.warn.header) {

    if ( !are._str(header, msg) ) {
      this.error(
        'Invalid `log-ocd warn` Call',
        'invalid type for `header` or `msg` param',
        { argMap: true, header: header, msg: msg }
      );
      return false;
    }

    logHeader(header, 'warn');
    logDetails(msg, 'plain');

    if (arguments.length > 2) {
      logSpaces(1);
      logAny(slice(arguments, 2), 'view', this._config.warn.argMap);
    }
  }
  else {
    msg = header;

    if ( !is._str(msg) ) {
      this.error(
        'Invalid `log-ocd warn` Call',
        'invalid type for `msg` param (a warning message is required)',
        { argMap: true, msg: msg }
      );
      return false;
    }

    logHeader('Warning', 'warn');
    logDetails(msg, 'plain');

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'view', this._config.warn.argMap);
    }
  }

  stack && logSpaces(1);
  stack && logStack(stack);
  logSpaces(this._config.warn.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.debug = function(header) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.debug.stack ? newStack() : null;

  logSpaces(this._config.debug.spaceBefore);

  if (this._config.debug.header) {

    if ( !is._str(header) ) {
      this.error(
        'Invalid `log-ocd debug` Call',
        'invalid type for `header` param (to disable headers use `setConfig`)',
        { argMap: true, header: header }
      );
      return false;
    }

    logHeader(header, 'debug');

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'plain', this._config.debug.argMap);
    }
  }
  else {
    logHeader('Debug', 'debug');

    if (arguments.length) {
      logSpaces(1);
      logAny(arguments, 'plain', this._config.debug.argMap);
    }
  }

  stack && logSpaces(1);
  stack && logStack(stack);
  logSpaces(this._config.debug.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {(!Error|string)} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.fail = function(msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.fail.stack ? newStack(msg) : null;
  msg = is.obj(msg) ? msg.toString && msg.toString() : msg;

  if ( !is._str(msg) ) {
    this.error('Invalid `logOCD.fail` Call',
      'invalid type for `msg` param (a failure message is required)',
      { argMap: true, msg: msg }
    );
    return false;
  }

  logSpaces(this._config.fail.spaceBefore);
  logMsg(msg, 'fail');

  if (arguments.length > 1) {
    logAny(slice(arguments, 1), 'view', this._config.fail.argMap);
  }

  stack && logSpaces(1);
  stack && logStack(stack);
  logSpaces(this._config.fail.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {(!Error|string)=} stack
 * @return {boolean}
 */
logOCD.trace = function(stack) {

  stack = newStack(stack);

  logSpaces(this._config.trace.spaceBefore);
  logStack(stack);
  logSpaces(this._config.trace.spaceAfter);
  this._config.trace.exit && process.exit(1);

  return true;
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * All Methods & Their Config Properties
 * ------------------------------------------------------------------------
 * | Method | Props                                                       |
 * | :----- | :---------------------------------------------------------- |
 * | all    | spaceBefore, spaceAfter, argMap, header, style, stack, exit |
 * | log    | spaceBefore, spaceAfter, argMap, style                      |
 * | pass   | spaceBefore, spaceAfter, argMap, header                     |
 * | error  | spaceBefore, spaceAfter, argMap, header, stack, exit        |
 * | warn   | spaceBefore, spaceAfter, argMap, header, stack              |
 * | debug  | spaceBefore, spaceAfter, argMap, header, stack              |
 * | fail   | spaceBefore, spaceAfter, argMap, stack                      |
 * | trace  | spaceBefore, spaceAfter, exit                               |
 * ------------------------------------------------------------------------
 *
 * @example [logOCDInstance].setConfig("all.argMap", true);
 *
 * @public
 * @this {!LogOCD}
 * @param {string} prop - <method>.<prop> the method, "all", sets all methods
 * @param {(number|string|boolean)} val
 * @return {boolean}
 */
logOCD.setConfig = function(prop, val) {

  /** @type {string} */
  var method;

  if ( !is._str(prop) || !/\./.test(prop) ) return false;

  method = prop.replace(/^([a-z]+)\..*$/, '$1');
  method = has(CONFIG, method) || method === 'all' ? method : '';
  prop = prop.replace(/^[a-z]+\.(.*)$/, '$1');

  if ( !method || !prop || !isConfigProp(prop, val) ) return false;

  if (method === 'all') {
    if ( !has(CONFIG_PROPS, prop) ) return false;
    each(this._config, function(obj) {
      if ( has(obj, prop) ) obj[prop] = val;
    });
  }
  else {
    if ( !has(CONFIG[method], prop) ) return false;
    this._config[method][prop] = val;
  }

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string...=} methods - if left undefined all methods get reset
 */
logOCD.resetConfig = function() {

  /** @type {string} */
  var method;
  /** @type {number} */
  var i;

  if (!arguments.length) {
    this._config = clone(CONFIG, true);
    return true;
  }

  i = arguments.length;
  while (i--) {
    method = arguments[i];
    if ( !is._str(method) || !has(CONFIG, method) ) return false;
    this._config[method] = clone( CONFIG[method] );
  }
  return true;
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - LOG CONFIG
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, function(*): boolean>}
 * @const
 */
var CONFIG_PROPS = {
  spaceBefore: is.num,
  spaceAfter: is.num,
  argMap: is.bool,
  header: is.bool,
  style: function(val) { return is._str(val) && has(THEMES, val); },
  stack: is.bool,
  exit: is.num
};

/**
 * @private
 * @param {string} prop
 * @param {string} val
 * @return {boolean}
 */
function isConfigProp(prop, val) {
  return is._str(prop) && has(CONFIG_PROPS, prop) && CONFIG_PROPS[prop](val);
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - LOG FORMAT
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
function mapArgs(obj) {
  return merge({ argMap: true }, obj);
}

/**
 * @private
 * @param {string} str
 * @param {string} theme
 * @return {string}
 */
function color(str, theme) {
  return colors[theme](str);
}

/**
 * @private
 * @param {string} str
 * @param {string} theme
 * @return {string}
 */
function getAccentStr(str, theme) {
  return /`[^`]+`/.test(str)
    ? remap(str.split(/`+/), function(section, i) {
        return color(section, ( i % 2 ? 'a' : '' ) + theme);
      }).join('')
    : color(str, theme);
}

/**
 * @private
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return is.str(val)
    ? '"'+ val +'"'
    : is.func(val)
      ? '[Function] {'
      : is.arr(val)
        ? '[ '+ val.join(', ') +' ]'
        : is.args(val)
          ? '[ '+ slice(val).join(', ') +' ]'
          : is.regex(val)
            ? val.toString()
            : is.obj(val)
              ? '{'
              : String(val);
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - LOGGERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {...*} vals
 */
var log = global.logOCDLogger ? logOCDLogger : console.log;

/**
 * @private
 * @param {!Array} args
 * @param {string} theme
 * @param {boolean=} argMap
 */
function logAny(args, theme, argMap) {

  each(args, function(val) {

    if ( is._obj(val) && !is('regex|arr', val) ) {

      if (argMap || val.argMap) {
        logArgMap(val)
        return;
      }

      logObj(val, theme);
      return;
    }

    val = makeLogStr(val);
    val = color(val, theme);
    log(val);
  });
}

/**
 * @private
 * @param {number} spaces
 */
function logSpaces(spaces) {
  while (spaces--) log('');
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logHeader(msg, theme) {
  msg = getAccentStr(msg, theme);
  msg = color(' ', theme) + msg + color('        ', theme);
  log(msg);
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logDetails(msg, theme) {
  msg = getAccentStr(msg, theme);
  msg = color('  - ', theme) + msg;
  log(msg);
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logMsg(msg, theme) {
  msg = getAccentStr(msg, theme);
  log(msg);
}

/**
 * @private
 * @param {!Stack} stack
 */
function logStack(stack) {

  /** @type {function} */
  var getSpace;
  /** @type {string} */
  var theme;
  /** @type {string} */
  var str;

  stack.base && log(stack.base);

  getSpace = function(key, minus) {
    minus = minus || 0;
    return fillStr(stack[key] - minus, ' ');
  };
  str = getSpace('event', 10) + '  module' + getSpace('module', 6);
  str += getSpace('line') + 'line' + getSpace('column') + 'column ';
  str = color(' Stacktrace', 'error') + color(str, 'bgRed');
  log(str);

  each(stack, function(trace, i) {
    getSpace = function(key) {
      return fillStr(stack[key] - trace[key].length, ' ');
    };
    str = ' ' + trace.event  + getSpace('event')  + ' ';
    str += ' '+ trace.module + getSpace('module') + '   ';
    str += ' '+ getSpace('line')   + trace.line   + '     ';
    str += ' '+ getSpace('column') + trace.column + ' ';
    theme = i % 2 ? 'estack' : 'ostack';
    str = color(str, theme);
    log(str);
  });
}

/**
 * @private
 * @param {!Object} obj
 */
function logArgMap(obj) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var str;
  /** @type {*} */
  var val;

  if ( has(obj, 'argMap') ) delete obj.argMap;
  keys = objKeys(obj).sort( function(a, b){ return b.length - a.length; } );
  each(keys, function(key) {
    val = obj[key];
    str = makeLogStr(val);
    key = color(key + ': ', 'view') + color(str, 'plain');
    log(key);

    if ( is.func(val) || str === '{' ) logObj(val, 'plain', -1);
  });
}

/**
 * @private
 * @param {!Object} obj
 * @param {string=} theme
 * @param {number=} indent
 */
function logObj(obj, theme, indent) {

  /** @type {string} */
  var spaces;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {string} */
  var str;
  /** * */
  var val;

  theme = theme || 'plain';
  indent = indent || 0;

  str = indent ? '' : color(is.func(obj) ? '[Function] {' : '{', theme);
  str && log(str);

  indent = indent < 0 ? 0 : indent;
  spaces = fillStr(indent, '  ');

  keys = objKeys(obj).sort( function(a, b){ return b.length - a.length; } );
  last = keys.length - 1;
  each(keys, function(key, i) {
    val = obj[key];
    str = makeLogStr(val);
    if ( is.func(val) || str === '{' ) {
      str = '  ' + spaces + key + ': ' + str;
      str = color(str, theme);
      log(str);
      logObj(val, theme, (indent + 1));
    }
    else {
      str = '  ' + spaces + key + ': ' + str + ( i !== last ? ',' : '' );
      str = color(str, theme);
      log(str);
    }
  });

  str = spaces + '}' + ( indent ? ',' : '' );
  str = color(str, theme);
  log(str);
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - GENERAL METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects.
 * @param {?(Object|function)} obj
 * @param {*} key
 * @return {boolean}
 */
function has(obj, key) {
  return is._obj(obj) && hasOwnProperty.call(obj, key);
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start).
 * @param {Object} obj
 * @param {number=} start [default= 0]
 * @return {Array}
 */
function slice(obj, start) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !is.num(obj.length) ) return null;

  len = obj.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  start = start < 0 ? 0 : start;

  if (start > len) return [];

  arr = new Array(len - start);
  ii = 0;
  i = start - 1;
  while (++i < len) {
    arr[ii++] = obj[i];
  }
  return arr;
}

/**
 * A shortcut for Array.prototype.map(obj, iteratee).
 * @global
 * @param {!(Object|Array)} obj
 * @param {function(*, (string|number)): *} iteratee
 * @return {!(Object|Array)}
 */
function remap(obj, iteratee) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is._obj(obj) ) return null;

  if ( is._arr(obj) ) {
    newObj = new Array(obj.length);
    len = obj.length;
    i = -1;
    while (++i < len) {
      newObj[i] = iteratee(obj[i], i);
    }
  }
  else {
    newObj = {};
    for (key in obj) {
      if ( has(obj, key) ) {
        newObj[key] = iteratee(obj[key], key);
      }
    }
  }
  return newObj;
}


/**
 * Creates a new object with the properties of the given object.
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function clone(obj, deep) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  if ( !is.obj(obj) ) return null;

  newObj = {};
  if (deep) {
    for (key in obj) {
      if ( has(obj, key) ) {
        val = obj[key];
        newObj[key] = is.obj(val) ? clone(val, true) : obj[key];
      }
    }
  }
  else {
    for (key in obj) {
      if ( has(obj, key) ) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

/**
 * Appends an object's properties to an existing object.
 * @param {(!Object|function)} dest
 * @param {(!Object|function)} source
 * @return {(!Object|function)}
 */
function merge(dest, source) {

  /** @type {string} */
  var prop;

  for (prop in source) {
    if ( has(source, prop) ) {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=)} iteratee
 * @return {(Object|function|Array)}
 */
function each(val, iteratee) {

  /** @type {(string|number)} */
  var key;
  /** @type {number} */
  var len;

  if ( is._obj(val) ) {
    // iterate over an array or arguments obj
    if ( is._arr(val) ) {
      len = val.length;
      key = -1;
      while (++key < len) iteratee(val[key], key);
      return val;
    }
    // iterate over an object's own keys
    for (key in val) has(val, key) && iteratee(val[key], key);
    return val;
  }
  // iterate specified number of times
  else if ( is.num(val) ) {
    while(val--) iteratee();
  }
  return null;
}

/**
 * Fills a string with specified values.
 * @private
 * @param {number} count
 * @param {string} val
 * @return {string}
 */
function fillStr(count, val) {

  /** @type {string} */
  var str;
  /** @type {number} */
  var i;

  count = count < 0 ? 0 : count;
  str = '';
  while (count--) {
    str += val;
  }
  return str;
}

/**
 * Gets an object's property keys.
 * @private
 * @param {?(Object|function)} obj
 * @return {Array<string>}
 */
function objKeys(obj) {

  /** @type {!Array<string>} */
  var arr;
  /** @type {string} */
  var key;

  if ( !is._obj(obj) ) return null;

  arr = [];
  for (key in obj) has(obj, key) && arr.push(key);
  return arr;
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - STACKTRACE FACTORIES
////////////////////////////////////////////////////////////////////////////////

/** @type {number} */
Error.stackTraceLimit = 16;

/**
 * @private
 * @param {(!Error|string)=} stack
 * @constructor
 */
function StackTrace(stack) {
  this.stack = is._str(stack) ? stack : is.obj(stack) ? stack.stack : undefined;
  is._str(this.stack) || Error.captureStackTrace(this, StackTrace);
  stack = this.stack.replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/\\/g, '/')        // normalize slashes
    .replace(/^.*\n\s+at /, '') // remove message
    .split(/\n\s+at /);
  this.stack = stack[0].includes('log.js')
    ? slice(stack, stack[1].includes('log.js') ? 2 : 1)
    : stack;
}

/**
 * For newTrace & newStack use only.
 * @private
 * @type {!RegExp}
 * @const
 */
var TRACE = /^([^\(]+\()?(.*\/)?([^\/]+\.[a-z]+):([0-9]+):([0-9]+)\)?$/i;

/**
 * For newTrace & newStack use only.
 * @private
 * @type {!RegExp}
 * @const
 */
var NODE_MODULE = /\/node_modules\/([^\/]+)\//;

/**
 * @typedef {!{
 *   pos:    string,
 *   event:  string,
 *   dir:    string,
 *   file:   string,
 *   line:   string,
 *   column: string,
 *   module: string
 * }} Trace
 */

/**
 * @private
 * @param {string} str
 * @param {number} i
 * @param {!Array<string>=} base
 * @return {!Trace}
 */
function newTrace(str, i, base) {

  /** @type {!Trace} */
  var trace;
  /** @type {!Array<string>} */
  var arr;
  /** @type {number} */
  var len;

  arr = TRACE.exec(str);
  arr = slice(arr, 1);
  arr[0] = arr[0] && arr[0].slice(0, -2);

  trace = {
    pos:    ( ++i < 10 ? ' ' : '' ) + i,
    event:  arr.shift() || '(none)',
    dir:    arr.shift() || '',
    file:   arr.shift(),
    line:   arr.shift(),
    column: arr.shift(),
    module: ''
  };

  arr = base && trace.dir && !NODE_MODULE.test(trace.dir);
  arr = arr && trace.dir.split('/');

  if (arr) {
    len = base.length - arr.length;
    trace.module = fillStr(len, '../') || './' + (
      len ? slice(arr, len).join('/') : ''
    );
    trace.module += trace.file;
  }
  else {
    trace.module = trace.dir ? NODE_MODULE.exec(trace.dir)[1] : '(core)';
  }
  return trace;
}

/**
 * @typedef {!Array<!Trace>} Stack
 */

/**
 * @private
 * @param {(!Error|string)=} stack
 * @return {!Stack}
 */
function newStack(stack) {

  /** @type {!Array<string>} */
  var base;
  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var dir;

  // get the stack array
  stack = new StackTrace(stack).stack;

  // set the base path
  stack.some(function(str) {
    dir = TRACE.exec(str)[2];
    if ( !dir || NODE_MODULE.test(dir) ) return false;
    base = dir.split('/');
    return true;
  });

  // setup the stack object
  stack = remap(stack, function(str, i) {
    return newTrace(str, i, base);
  });
  stack.base = base.join('/');
  keys = [ 'event', 'module', 'file', 'line', 'column' ];
  each(keys, function(key) {
    stack[key] = 0;
  });
  each(stack, function(trace) {
    each(keys, function(key) {
      if (trace[key].length > stack[key]) {
        stack[key] = trace[key].length;
      }
    });
  });
  return stack;
}
