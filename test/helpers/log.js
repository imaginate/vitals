/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: LOG
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

var log = require('log-ocd')();

module.exports = log;

log.error.setConfig({
  'logger': logError,
  'throw':  false,
  'exit':   false
});

log.error.setFormat({
  'linesAfter': 2
});

log.fail.setFormat({
  'linesAfter': 0,
  'header': {
    'spaceBefore': 0,
    'spaceAfter':  0,
    'accentMark': ''
  }
});

log.fail.setStyle({
  'header': {
    'color': 'red',
    'bg':    ''
  }
});

/**
 * @param {string} result
 */
function logError(result) {
  result = result.replace(/\n/g, '\n    ');
  result = '  ' + result;
  console.log(result);
}
