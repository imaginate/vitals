/**
 * -----------------------------------------------------------------------------
 * VITALS FS METHOD: to
 * -----------------------------------------------------------------------------
 * @section fs
 * @version 4.1.3
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/wiki/vitals.to}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('../helpers/new-error-maker.js');
var _is = require('./helpers/is.js');
var fs = require('fs');

var to = {};


////////////////////////////////////////////////////////////////////////////////
// VITALS FS METHOD: to
////////////////////////////////////////////////////////////////////////////////

(function fsToPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.file
  //////////////////////////////////////////////////////////

  /**
   * Move the contents of a file to a new or existing file.
   *
   * @public
   * @param {(!Buffer|string)} contents
   * @param {string} filepath
   * @param {?string=} encoding - [default= 'utf8'] If `null` no encoding is set.
   * @return {(!Buffer|string)} The contents.
   */
  to.file = function toFile(contents, filepath, encoding) {

    if ( !_is.str(filepath)        ) throw _error.type('filepath', 'file');
    if ( !_is.nil.un.str(encoding) ) throw _error.type('encoding', 'file');

    if ( _is.buffer(contents) ) {
      encoding = encoding || null;
    }
    else if ( !_is.str(contents) ) throw _error.type('contents', 'file');

    encoding = _is.undefined(encoding) ? 'utf8' : encoding;
    if (encoding) fs.writeFileSync(filepath, contents, encoding);
    else fs.writeFileSync(filepath, contents);
    return contents;
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('to');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR TO
})();


module.exports = to;
