/**
 * -----------------------------------------------------------------------------
 * FILE SYSTEM HELPER - STRING.PROTOTYPE.TO-FILE
 * -----------------------------------------------------------------------------
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

// append global helpers if they do not exist
if (!global.__basics) require('./basics');

/** @type {!Object} */
var fs = require('fs');

/**
 * @global
 * @param {string} filepath
 * @param {string=} encoding - [default= 'utf8']
 */
String.prototype.toFile = function(filepath, encoding) {
  
  if ( !is.str(filepath) ) log.error(
    'Invalid `String.prototype.toFile` Call',
    'invalid type for the `filepath` param',
    { argMap: true, filepath: filepath }
  );
  
  if ( !is('str=', encoding) ) log.error(
    'Invalid `String.prototype.toFile` Call',
    'invalid type for the `encoding` param',
    { argMap: true, filepath: filepath, encoding: encoding }
  );

  encoding = encoding || 'utf8';

  try {
    fs.writeFileSync(filepath, this.toString(), encoding);
  }
  catch (err) {
    log.error(
      'Failed `String.prototype.toFile` Call',
      'error occurred within `fs.writeFileSync`',
      err.stack
    );
  }
};
