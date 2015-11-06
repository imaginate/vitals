/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY - THE SHELL SHORTCUTS
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [ShellJS]{@link https://github.com/shelljs/shelljs}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object} */
var shell = require('shelljs');


////////////////////////////////////////////////////////////////////////////////
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @see https://github.com/shelljs/shelljs#execcommand--options--callback
 * @param {string} command
 * @param {Object=} options
 * @param {boolean=} options.async [default= callback ? true : false]
 * @param {boolean=} options.silent [default= false]
 * @param {function=} callback
 */
global.exec = shell.exec;
