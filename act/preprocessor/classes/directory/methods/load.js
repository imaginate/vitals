/**
 * ---------------------------------------------------------------------------
 * LOAD METHOD
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

/// #{{{ @func Dir.prototype.load
/**
 * @public
 * @this {!Dir}
 * @return {!Dir}
 */
function load() {

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

  /// #{{{ @step load-files

  for (name in files) {
    file = files[name];
    if (file.lines.length === 0) {
      file.load();
    }
  }

  /// #}}} @step load-files

  /// #{{{ @step load-dirs

  for (name in dirs) {
    dirs[name].load();
  }

  /// #}}} @step load-dirs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Dir.prototype.load

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = load;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
