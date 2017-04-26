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
 * @const {!RegExp}
 */
var BREAK = /^[ \t\r\n)\]}]$/

/**
 * @private
 * @const {string}
 */
var ESC = '\\';

/**
 * @private
 * @const {string}
 */
var HASH = '#';

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
 * @param {string} src
 * @return {string}
 */
var cleanHtmlAttr = require('./clean-html-attr.js');

/**
 * @private
 * @param {string} ch
 * @return {string}
 */
var cleanHtmlChar = require('./clean-html-char.js');

/**
 * @private
 * @param {string} src
 * @return {string}
 */
var cleanHttpLink = require('./clean-http-link.js');

/**
 * @private
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasProp = require('../../../has-own-property.js');

/**
 * @private
 * @param {string} ch
 * @return {boolean}
 */
var isBreakChar = require('./is-word-break.js');

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
 * @param {string} src
 * @return {boolean}
 */
var isHttpLink = require('./is-http-link.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var isRefID = require('./is-ref-id.js');

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
// MAIN METHOD
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} _source
 * @param {boolean=} _link
 *   When defined as `true`, this parameter indicates that #_source is the
 *   content for an anchor tag (i.e. disables nested anchor and image tags).
 * @return {string}
 */
function parseInline(_source, _link) {

  //////////////////////////////////////////////////////////////////////////////
  // CONSTANTS
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @private
   * @const {boolean}
   */
  var NESTING = !_link;

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

  //////////////////////////////////////////////////////////////////////////////
  // EXTERNALS
  //////////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////
  // MAIN PARSE METHOD
  //////////////////////////////////////////////////////////////////////////////

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
        $result += cleanHtmlChar(ch);
        ++$i;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // SPECIAL CHARACTER PARSE METHODS
  //////////////////////////////////////////////////////////////////////////////

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
  function parseTick() {

    /** @type {string} */
    var ch;

    ch = getNextChar();
    if (ch === TICK)
      throw new Error('invalid backticks in `' + SOURCE + '`');

    parseCode();

    if ( isGT($i, LAST) )
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

    ch = getNextChar();
    switch (ch) {
      case '&':
        $result += '<br>';
        $i += 2;
        break;
      case '$':
        $result += '</p><p>';
        $i += 2;
        break;
      case '[':
        if (NESTING) {
          parseImg();
          break;
        }
      default:
        $result += cleanHtmlChar('!');
        ++$i;
        if (!!ch) {
          $result += cleanHtmlChar(ch);
          ++$i;
        }
        break;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseBracket() {

    if (NESTING)
      parseAnchor();
    else {
      $result += cleanHtmlChar('[');
      ++$i;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseAt() {

    if (NESTING)
      parseMentions();
    else {
      $result = cleanHtmlChar('@');
      ++$i;
    }
  }

  /**
   * @private
   * @type {function}
   */
  function parseHash() {

    if (NESTING)
      parseParamTag();
    else {
      $result = cleanHtmlChar('#');
      ++$i;
    }
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

    if ( !hasProp(SPECIAL, ch) )
      $result += cleanHtmlChar(ESC);
    else {
      $result += cleanHtmlChar(ch);
      ++$i;
    }

    ++$i;
  }

  //////////////////////////////////////////////////////////////////////////////
  // HTML ELEMENT PARSE METHODS
  //////////////////////////////////////////////////////////////////////////////

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
  function parseCode() {

    /** @type {string} */
    var ch;

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
            $result += cleanHtmlChar(ESC);
          $result += cleanHtmlChar(ch);
          break;
        case TICK:
          break loop;
        default:
          $result += cleanHtmlChar(ch);
          break;
      }
    }

    $result += '</code>';
  }

  /**
   * @private
   * @type {function}
   */
  function parseImg() {

    /** @type {string} */
    var alt;
    /** @type {string} */
    var src;
    /** @type {string} */
    var ch;

    alt = '';
    src = '';

    ++$i;

    loop:
    while ( isLT(++$i, LEN) ) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC:
          ch = getNextChar();
          if (!!ch)
            ++$i;
          if ( !hasProp(SPECIAL, ch) && (ch !== ']') )
            alt += ESC;
          alt += ch;
          break;
        case ']':
          break loop;
        default:
          alt += ch;
          break;
      }
    }

    alt = cleanHtmlAttr(alt);

    if ( isGT($i, LAST) )
      throw new Error('invalid `img` in `' + SOURCE + '` (missing the closing bracket & src)');
    if ( isGT(++$i, LAST) )
      throw new Error('invalid `img` in `' + SOURCE + '` (missing the src)');

    if (SOURCE[$i] === '(') {
      loop:
      while ( isLT(++$i, LEN) ) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC:
            ch = getNextChar();
            if (!!ch)
              ++$i;
            if ( !hasProp(SPECIAL, ch) && (ch !== ')') )
              src += ESC;
            src += ch;
            break;
          case ')':
            break loop;
          default:
            src += ch;
            break;
        }
      }
      if ( isGT($i, LAST) )
        throw new Error('invalid `img` in `' + SOURCE + '` (missing the closing parenthesis)');
      if ( !isHttpLink(src) )
        throw new Error('invalid `src` http link for `img` in `' + SOURCE + '`');
      src = cleanHttpLink(src);
    }
    else if (SOURCE[$i] !== '[')
      throw new Error('invalid `img` in `' + SOURCE + '` (missing the src)');
    else {
      loop:
      while ( isLT(++$i, LEN) ) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC:
            ch = getNextChar();
            if (!!ch)
              ++$i;
            if ( !hasProp(SPECIAL, ch) && (ch !== ']') )
              src += ESC;
            src += ch;
            break;
          case ']':
            break loop;
          default:
            src += ch;
            break;
        }
      }
      if ( isGT($i, LAST) )
        throw new Error('invalid `img` in `' + SOURCE + '` (missing the closing bracket)');
      if ( !isRefID(src) )
        throw new Error('invalid `src` reference ID for `img` in `' + SOURCE + '`');
      src = '${' + src + '}';
    }

    $result += '<img src="' + src + '" alt="' + alt + '"/>';
    ++$i;
  }

  /**
   * @private
   * @type {function}
   */
  function parseAnchor() {

    /** @type {string} */
    var html;
    /** @type {string} */
    var href;
    /** @type {string} */
    var ch;

    html = '';
    href = '';

    loop:
    while ( isLT(++$i, LEN) ) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC:
          ch = getNextChar();
          if (!!ch)
            ++$i;
          if (ch !== ']')
            html += ESC;
          html += ch;
          break;
        case ']':
          break loop;
        default:
          html += ch;
          break;
      }
    }

    html = parseInline(html, true);

    if ( isGT($i, LAST) )
      throw new Error('invalid `a` in `' + SOURCE + '` (missing the closing bracket & href)');
    if ( isGT(++$i, LAST) )
      throw new Error('invalid `a` in `' + SOURCE + '` (missing the href)');

    if (SOURCE[$i] === '(') {
      loop:
      while ( isLT(++$i, LEN) ) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC:
            ch = getNextChar();
            if (!!ch)
              ++$i;
            if ( !hasProp(SPECIAL, ch) && (ch !== ')') )
              href += ESC;
            href += ch;
            break;
          case ')':
            break loop;
          default:
            href += ch;
            break;
        }
      }
      if ( isGT($i, LAST) )
        throw new Error('invalid `a` in `' + SOURCE + '` (missing the closing parenthesis)');
      if ( !isHttpLink(href) )
        throw new Error('invalid `href` http link for `a` in `' + SOURCE + '`');
      href = cleanHttpLink(href);
    }
    else if (SOURCE[$i] !== '[')
      throw new Error('invalid `a` in `' + SOURCE + '` (missing the href)');
    else {
      loop:
      while ( isLT(++$i, LEN) ) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC:
            ch = getNextChar();
            if (!!ch)
              ++$i;
            if ( !hasProp(SPECIAL, ch) && (ch !== ']') )
              href += ESC;
            href += ch;
            break;
          case ']':
            break loop;
          default:
            href += ch;
            break;
        }
      }
      if ( isGT($i, LAST) )
        throw new Error('invalid `a` in `' + SOURCE + '` (missing the closing bracket)');
      if ( !isRefID(href) )
        throw new Error('invalid `href` reference ID for `a` in `' + SOURCE + '`');
      href = '${' + href + '}';
    }

    $result += '<a href="' + href  + '">' + html + '</a>';
    ++$i;
  }

  /**
   * @private
   * @type {function}
   */
  function parseMentions() {

    /** @type {string} */
    var ref;
    /** @type {string} */
    var ch;

    ref = '';

    while ( isLT(++$i, LEN) ) {
      ch = SOURCE[$i];
      if ( isWordBreak(ch) || (ch === HASH) )
        break;
      ref += ch;
    }

    if ( !isRefID(ref) )
      throw new Error('invalid `mentions` reference ID in `' + SOURCE + '`');

    ref = '@{' + ref + '}';

    if ( isLT($i, LEN) && (SOURCE[$i] === HASH) )
      ref += parseMentionsTag();

    $result += '<a href="' + ref + '">' + ref + '</a>';
  }

  /**
   * @private
   * @return {string}
   */
  function parseMentionsTag() {

    /** @type {string} */
    var ref;
    /** @type {string} */
    var ch;

    ref = '';

    while ( isLT(++$i, LEN) ) {
      ch = SOURCE[$i]; 
      if ( isWordBreak(ch) )
        break;
      ref += ch;
    }

    if ( !isRefID(ref) )
      throw new Error('invalid `mentions` reference ID in `' + SOURCE + '`');

    return '#{' + ref + '}';
  }

  /**
   * @private
   * @type {function}
   */
  function parseParamTag() {

    /** @type {string} */
    var ref;
    /** @type {string} */
    var ch;

    ref = '';

    while ( isLT(++$i, LEN) ) {
      ch = SOURCE[$i];
      if ( isWordBreak(ch) )
        break;
      ref += ch;
    }

    if ( !isRefID(ref) )
      throw new Error('invalid `hashtag` reference ID in `' + SOURCE + '`');

    ref = '#{' + ref + '}';

    $result += '<a href="' + ref + '">' + ref + '</a>';
  }

  /**
   * @private
   * @type {function}
   */
  function parseEmail() {

    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

  }

  //////////////////////////////////////////////////////////////////////////////
  // HELPER METHODS
  //////////////////////////////////////////////////////////////////////////////

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

  /**
   * @private
   * @param {string} ch
   * @return {boolean}
   */
  function isWordBreak(ch) {

    if (ch !== '.')
      return isBreakChar(ch);

    if ( isGE($i, LAST) )
      return true;

    ch = SOURCE[$i + 1];
    return BREAK.test(ch);
  }

  //////////////////////////////////////////////////////////////////////////////
  // MAIN METHOD INIT & RETURN
  //////////////////////////////////////////////////////////////////////////////

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
