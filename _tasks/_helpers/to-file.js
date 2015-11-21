/**
 * -----------------------------------------------------------------------------
 * FILE SYSTEM HELPER - TO-FILE
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
 * @param {string} content
 * @param {string} filepath
 * @param {string=} encoding - [default= 'utf8']
 */
module.exports = function toFile(content, filepath, encoding) {
  
  if ( !is.str(content) ) log.error(
    'Invalid `helpers.toFile` Call',
    'invalid type for `content` param',
    { argMap: true, content: content, filepath: filepath }
  );
    
  if ( !is.str(filepath) ) log.error(
    'Invalid `helpers.toFile` Call',
    'invalid type for `filepath` param',
    { argMap: true, filepath: filepath }
  );
  
  if ( !is('str=', encoding) ) log.error(
    'Invalid `helpers.toFile` Call',
    'invalid type for `encoding` param',
    { argMap: true, filepath: filepath, encoding: encoding }
  );

  encoding = encoding || 'utf8';

  try {
    fs.writeFileSync(filepath, content, encoding);
  }
  catch (err) {
    log.error(
      'Failed `String.prototype.toFile` Call',
      'error occurred within `fs.writeFileSync`',
      err.stack
    );
  }
};
