/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseInlineElements
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var ASTERISK = '*';

/**
 * @private
 * @const {!Object<string, string>}
 */
var ENTITY = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

/**
 * @private
 * @const {string}
 */
var ESC = '\\';

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../../is.js');

/**
 * @private
 * @const {string}
 */
var TICK = '`';

/**
 * @private
 * @const {string}
 */
var TILDE = '~';

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasProp = require('../../../has-own-property.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isEQ = IS.equalTo;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} source
 * @return {string}
 */
var trimSpace = require('./trim-space.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} _source
 * @return {string}
 */
function parseInline(_source) {

  /**
   * @private
   * @const {!Object<string, function>}
   */
  var SPECIAL = {
    '*':  parseAsterisk,
    '~':  parseTilde,
    '`':  parseTick,
    '!':  parseExclamation,
    '[':  parseBracket,
    '#':  parseHash,
    '@':  parseAt,
    '<':  parseLess,
    '\\': parseEscape
  };

  /**
   * @private
   * @const {string}
   */
  var SOURCE = _source;

  /**
   * @private
   * @const {number}
   */
  var LEN = SOURCE.length;

  /**
   * @private
   * @const {number}
   */
  var LAST = LEN - 1;

  /**
   * @private
   * @type {number}
   */
  var $i = 0;

  /**
   * This stack manages all open elements. See the following list for the valid
   * IDs and their corresponding tags.
   * - `B`: `<strong>|<em>`
   * - `D`: `<del>|<u>`
   * - `b`: `<strong>`
   * - `d`: `<del>`
   * - `i`: `<em>`
   * - `u`: `<u>`
   *
   * @private
   * @type {!Array<string>}
   */
  var $stack = [];

  /**
   * @private
   * @type {string}
   */
  var $result = '';

  /**
   * @private
   * @type {!Array<string>}
   */
  var $reserve = [];

  /**
   * @private
   * @type {function}
   */
  function parseSource() {

    /** @type {string} */
    var ch;

    while ( isLT($i, LEN) ) {
      ch = SOURCE[$i];
      if ( hasProp(SPECIAL, ch) )
        SPECIAL[ch]();
      else {
        $result += hasProp(ENTITY, ch)
          ? ENTITY[ch]
          : ch;
        ++$i;
      }
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseAsterisk() {

    /** @type {number} */
    var count;

    count = 1;
    while ( isLT(++$i, LEN) && (SOURCE[$i] === ASTERISK) )
      ++count;

    switch (count) {
      case 1:
        parseItalics();
        break;
      case 2:
        parseBold();
        break;
      case 3:
        parseBoldItalics();
        break;
      default:
        throw new Error('invalid asterisks in `' + SOURCE + '`');
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseItalics() {

    /** @type {string} */
    var id;

    id = getLastID();

    switch (id) {
      case 'i':
        $result += '</em>';
        $stack.pop();
        break;
      case 'B':
        $result = $reserve.pop() + '<em>' + $result + '</em>';
        $stack.pop();
        $stack.push('b');
        break;
      default:
        $result += '<em>';
        $stack.push('i');
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseBold() {

    /** @type {string} */
    var id;

    id = getLastID();

    switch (id) {
      case 'b':
        $result += '</strong>';
        $stack.pop();
        break;
      case 'B':
        $result = $reserve.pop() + '<strong>' + $result + '</strong>';
        $stack.pop();
        $stack.push('i');
        break;
      default:
        $result += '<strong>';
        $stack.push('b');
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseBoldItalics() {

    /** @type {string} */
    var id;

    id = getLastID();

    switch (id) {
      case 'b':
        $result += '</strong>';
        $stack.pop();
        if ( !isLastID('i') )
          $stack.push('i');
        else {
          $result += '</em>';
          $stack.pop();
        }
        break;
      case 'i':
        $result += '</em>';
        $stack.pop();
        if ( !isLastID('b') ) 
          $stack.push('b');
        else {
          $result += '</strong>';
          $stack.pop();
        }
        break;
      case 'B':
        $result = $reserve.pop() + '<strong><em>' + $result + '</em></strong>';
        $stack.pop();
        break;
      default:
        $reserve.push($result);
        $result = '';
        $stack.push('B');
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseTilde() {

    /** @type {number} */
    var count;

    count = 1;
    while ( isLT(++$i, LEN) && (SOURCE[$i] === TILDE) )
      ++count;

    switch (count) {
      case 1:
        parseLow();
        break;
      case 2:
        parseDel();
        break;
      case 3:
        parseDelLow();
        break;
      default:
        throw new Error('invalid asterisks in `' + SOURCE + '`');
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseLow() {

    /** @type {string} */
    var id;

    id = getLastID();

    switch (id) {
      case 'u':
        $result += '</u>';
        $stack.pop();
        break;
      case 'D':
        $result = $reserve.pop() + '<u>' + $result + '</u>';
        $stack.pop();
        $stack.push('d');
        break;
      default:
        $result += '<u>';
        $stack.push('u');
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseDel() {

    /** @type {string} */
    var id;

    id = getLastID();

    switch (id) {
      case 'd':
        $result += '</del>';
        $stack.pop();
        break;
      case 'D':
        $result = $reserve.pop() + '<del>' + $result + '</del>';
        $stack.pop();
        $stack.push('u');
        break;
      default:
        $result += '<del>';
        $stack.push('d');
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseDelLow() {

    /** @type {string} */
    var id;

    id = getLastID();

    switch (id) {
      case 'd':
        $result += '</del>';
        $stack.pop();
        if ( !isLastID('u') )
          $stack.push('u');
        else {
          $result += '</u>';
          $stack.pop();
        }
        break;
      case 'u':
        $result += '</u>';
        $stack.pop();
        if ( !isLastID('d') )
          $stack.push('d');
        else {
          $result += '</del>';
          $stack.pop();
        }
        break;
      case 'D':
        $result = $reserve.pop() + '<del><u>' + $result + '</u></del>';
        $stack.pop();
        break;
      default:
        $reserve.push($result);
        $result = '';
        $stack.push('D');
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseTick() {

    /** @type {string} */
    var ch;

    ch = getNextChar();
    if (ch === TICK)
      throw new Error('invalid backticks in `' + SOURCE + '`');

    $result += '<code>';
    loop:
    while ( isLT(++$i, LEN) ) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC:
          ch = getNextChar();
          if (!!ch)
            ++$i;
          if (ch !== TICK)
            $result += ESC;
          $result += ch;
          break;
        case TICK:
          break loop;
        default:
          $result += hasProp(ENTITY, ch)
            ? ENTITY[ch]
            : ch;
          break;
      }
    }
    $result += '</code>';

    if ( isEQ($i, LEN) )
      throw new Error('invalid `code` in `' + SOURCE + '` (missing a closing backtick)');

    if ( isLT(++$i, LEN) && (SOURCE[$i] === TICK) )
      throw new Error('invalid backticks in `' + SOURCE + '`');
  }

  /**
   * @private
   * @type {function}
   */
  function parseExclamation() {

    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

  }

  /**
   * @private
   * @type {function}
   */
  function parseBracket() {

    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

  }

  /**
   * @private
   * @type {function}
   */
  function parseAt() {

    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

  }

  /**
   * @private
   * @type {function}
   */
  function parseHash() {

    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

  }

  /**
   * @private
   * @type {function}
   */
  function parseLess() {

    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

  }

  /**
   * @private
   * @type {function}
   */
  function parseEscape() {

    /** @type {string} */
    var ch;

    ch = SOURCE[$i + 1];

    if ( hasProp(SPECIAL, ch) ) {
      $result += ch;
      ++$i;
    }
    else
      $result += ESC;

    ++$i;
  }

  /**
   * @private
   * @return {string}
   */
  function getLastID() {

    /** @type {number} */
    var last;

    last = $stack.length - 1;
    return isGT(last, 0)
      ? $stack[last]
      : '';
  }

  /**
   * @private
   * @return {string}
   */
  function getNextChar() {

    /** @type {number} */
    var next;

    next = $i + 1;
    return isLT(next, LEN)
      ? SOURCE[next]
      : '';
  }

  /**
   * @private
   * @return {boolean}
   */
  function isEscaped() {
    return isGT($i, 0) && (SOURCE[$i - 1] === ESC);
  }

  /**
   * @private
   * @param {string} id
   * @return {boolean}
   */
  function isLastID(id) {

    /** @type {number} */
    var last;

    last = $stack.length - 1;
    return isGT(last, 0) && ($stack[last] === id);
  }

  parseSource();
  return $result;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} source
 * @return {string}
 */
module.exports = function parseInlineElements(source) {

  if ( !isString(source) )
    throw new TypeError('invalid `source` type (must be a string)');

  source = trimSpace(source);
  return !!source
    ? parseInline(source)
    : source;
};
