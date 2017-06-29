/**
 * ---------------------------------------------------------------------------
 * PREPARSE METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./.load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Dir.prototype.preparse
/**
 * @public
 * @this {!Dir}
 * @return {!Dir}
 */
function preparse() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !File>} */
  var files;
  /** @type {!Object<string, !Dir>} */
  var dirs;
  /** @type {string} */
  var name;
  /** @type {!File} */
  var file;

  /// #}}} @step declare-variables

  /// #{{{ @step set-member-refs

  files = this.files;
  dirs = this.dirs;

  /// #}}} @step set-member-refs

  /// #{{{ @step preparse-files

  for (name in files) {
    file = files[name];
    if (!file.inserts) {
      file.preparse();
    }
  }

  /// #}}} @step preparse-files

  /// #{{{ @step preparse-dirs

  for (name in dirs) {
    dirs[name].preparse();
  }

  /// #}}} @step preparse-dirs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Dir.prototype.preparse

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = preparse;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
