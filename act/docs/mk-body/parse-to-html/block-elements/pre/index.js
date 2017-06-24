/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: BlockElement
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {{
 *   end:   function(!Array<string>, number): number,
 *   id:    string,
 *   parse: function(!Array<string>, number): string,
 *   test:  function(string): boolean
 * }} BlockElement
 */

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!BlockElement}
 */
module.exports = {
  end:   require('./end.js'),
  id:    'pre',
  parse: require('./parse.js'),
  test:  require('./test.js')
};
