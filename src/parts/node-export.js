/**
 * -----------------------------------------------------------------------------
 * EXPORT NODE-VITALS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
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

/**
 * @private
 * @type {Function<string, function>}
 * @const
 */
const is = require('node-are').is;
/**
 * @private
 * @type {Function<string, function>}
 * @const
 */
const are = require('node-are').are;


////////////////////////////////////////////////////////////////////////////////
// EXPORT VITALS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {number=} setup - [default= 0] options:
 *   0= nothing is appended to the global
 *   1= the vitals object is appended to the global
 *   2= each individual method and component is appended to the global
 * @param {...string=} includes - [default= "all"] The vitals methods and
 *   components to include. Methods may be included by section or individually.
 *   main sections: js-shortcuts dom-shortcuts node-shortcuts
 *   sub sections:
 *   methods:
 *   components:
 */
module.exports = function getVitals(setup, includes) {

  /** @type {!Array} */
  var sections;

  require('./vitals/basics');

  sections = includes === 'all' ? getVitals() : slice(arguments);

  each(sections, section => {
    section = section.replace(/^([^\.]*)(?:\.js)?$/, '$1.js');
    is.file('helpers/vitals/' + section) && require('./vitals/' + section);
  });
};
