/**
 * -----------------------------------------------------------------------------
 * SETUP THE TASK HELPERS
 * -----------------------------------------------------------------------------
 * @file Libraries, functional shortcuts, and other helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE FACTORY METHOD
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {...string=} sections - The additional helpers to append to the global
 *   (the basic helpers are automatically appended if this method is called).
 *   All sections are appended if sections is "all".
 */
module.exports = function setupHelpers(sections) {

  require('./basics');

  if (!arguments.length) return;

  if (sections === 'all') {
    setupAllHelpers();
    return;
  }

  sections = slice(arguments);
  each(sections, function(section) {

    if ( !is.str(section) ) log.error(
      'Invalid `setupHelpers` Call',
      'invalid type for a `section` param (i.e. the section was not a string)',
      { argMap: true, invalidSection: section }
    );

    if ( !has(HELPERS, section) ) log.error(
      'Invalid `setupHelpers` Call',
      'invalid `section` param (i.e. the section did not exist)',
      { argMap: true, invalidSection: section }
    );

    setupHelper(HELPERS[section], section);
  });
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object}
 * @const
 */
var HELPERS = {
  'retrieve': 'retrieve',
  'toFile':   '',
  'copy':     'copy',
  'task':     'newTask',
  'exec':     'exec'
};

/**
 * @private
 * @param {string} key
 * @param {string} section
 */
function setupHelper(key, section) {

  /** @type {!(Object|function)} */
  var exported;

  exported = require('./' + section);
  if (key) {
    global[key] = exported;
  }
}

/**
 * @private
 * @type {function}
 */
function setupAllHelpers() {
  each(HELPERS, function(key, section) {
    setupHelper(key, section);
  });
}
