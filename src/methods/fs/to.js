/**
 * -----------------------------------------------------------------------------
 * VITALS - FILE SYSTEM METHODS - TO
 * -----------------------------------------------------------------------------
 * @version 2.3.0
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/to.js}
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

var newErrorAid = require('../_helpers/errorAid.js');
var is = require('node-are').is;
var fs = require('fs');

var to = {};


////////////////////////////////////////////////////////////////////////////////
// TO
////////////////////////////////////////////////////////////////////////////////

(function fsToPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.file
  //////////////////////////////////////////////////////////

  /**
   * Move the contents of a file to a new or existing file.
   * @public
   * @param {(string|!Buffer)} contents
   * @param {string} filepath
   * @param {?string=} encoding - [default= 'utf8'] If null no encoding is set.
   * @return {string} The contents.
   */
  to.file = function toFile(contents, filepath, encoding) {

    if ( !is.str(filepath) ) throw _error.type('filepath', 'file');

    if ( is.buffer(contents) ) {
      fs.writeFileSync(filepath, contents);
      return contents;
    }

    if ( !is.str(contents)      ) throw _error.type('contents', 'file');
    if ( !is('?str=', encoding) ) throw _error.type('encoding', 'file');

    encoding = is.undefined(encoding) ? 'utf8' : encoding;
    return encoding
      ? fs.writeFileSync(filepath, contents, encoding)
      : fs.writeFileSync(filepath, contents);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('to');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR TO
})();


module.exports = to;
