/**
 * -----------------------------------------------------------------------------
 * SETUP THE VITALS HELPERS
 * -----------------------------------------------------------------------------
 * @file Libraries, functional shortcuts, and other helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [ShellJS]{@link https://github.com/shelljs/shelljs}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {Function<string, function>} */
var is = require('node-are').is;
/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE FACTORY METHOD
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {...string} includes - The vitals sections to append to the global. If
 *   "all" is only given then all sections are appended.
 */
module.exports = function Vitals(includes) {

  /** @type {!Array} */
  var sections;

  require('./vitals/basics');

  sections = includes === 'all' ? getVitals() : slice(arguments);

  each(sections, section => {
    section = section.replace(/^([^\.]*)(?:\.js)?$/, '$1.js');
    is.file('helpers/vitals/' + section) && require('./vitals/' + section);
  });
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER
////////////////////////////////////////////////////////////////////////////////

/**
 * Get all of the filepaths from the Vitals directory.
 * @return {!Array<string>}
 */
function getVitals() {
  return fs.readdirSync('helpers/vitals/')
    .filter( filepath => is.file('helpers/vitals/' + filepath) );
}
