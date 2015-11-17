/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CLONE.REGEXP
 * -----------------------------------------------------------------------------
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/methods/clone.js}
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

describe('vitals.clone.regexp (sections:js,base)', function() {
  var title;

  title = 'should return new regex with same source and flags as input ';
  title += '(except when global override param is set)';
  title = titleStr('basic', title);
  describe(title, function() {

    title = callStr( newRegex() );
    it(title, function() {
      var regex = newRegex();
      var copy = vitals.clone.regex(regex);
      assert(regex !== copy);
      assert(regex.source === copy.source);
      assert(regex.global === copy.global);
      assert(regex.ignoreCase === copy.ignoreCase);
    });

    title = callStr(newRegex(), true);
    it(title, function() {
      var regex = newRegex();
      var copy = vitals.clone.regex(regex, true);
      assert(regex !== copy);
      assert(regex.source === copy.source);
      assert(regex.global !== copy.global);
      assert(regex.ignoreCase === copy.ignoreCase);
    });

    title = callStr(newRegex(true), false);
    it(title, function() {
      var regex = newRegex(true);
      var copy = vitals.clone.regex(regex, false);
      assert(regex !== copy);
      assert(regex.source === copy.source);
      assert(regex.global !== copy.global);
      assert(regex.ignoreCase === copy.ignoreCase);
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.clone.regex(null);
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.clone.regex({});
      });
    });

    title = callStr(newRegex(), 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.clone.regex(newRegex(), 'fail');
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} section
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(section, shouldMsg) {
  return testTitle(section, shouldMsg, 2, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('clone.regex', arguments, 4, true);
}

/**
 * @private
 * @param {boolean=} makeGlobal
 * @return {!RegExp}
 */
function newRegex(makeGlobal) {
  return freeze( makeGlobal ? /a/gi : /a/i );
}
