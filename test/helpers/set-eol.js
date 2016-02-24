/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: setEol
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = setEol;

var own = require('./has-own');

var EOL = {
  'CR':   '\r',
  'LF':   '\n',
  'CRLF': '\r\n'
};

var FIND_EOL = {
  'CR':   /\r?\n/g,
  'LF':   /\r\n?/g,
  'CRLF': /\r?\n|\r\n?/g
};

/**
 * @global
 * @param {string} str
 * @param {string} eol
 * @return {string}
 */
function setEol(str, eol) {

  if (typeof str !== 'string') throw TypeError('invalid str');
  if (typeof eol !== 'string') throw TypeError('invalid eol');

  eol = eol.toUpperCase();

  if ( !own(EOL, eol) ) throw RangeError('invalid eol (opts: LF, CR, CRLF)');

  return str.replace(FIND_EOL[eol], EOL[eol]);
}
