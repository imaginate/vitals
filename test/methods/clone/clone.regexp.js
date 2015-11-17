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

describe('clone.regexp (sections:js,base)', function() {
  var title;

  title = 'basic tests should return a new regex with ';
  title += 'the same source and flags as the input';
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

    title = callStr(newRegex(), false);
    it(title, function() {
      var regex = newRegex();
      var copy = vitals.clone.regex(regex, false);
      assert(regex !== copy);
      assert(regex.source === copy.source);
      assert(regex.global === copy.global);
      assert(regex.ignoreCase === copy.ignoreCase);
    });

  });

  describe('error tests should throw an error', function() {

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
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('clone.regex', arguments, 4, true);
}

/**
 * @private
 * @return {!RegExp}
 */
function newRegex() {
  return freeze( /a/ );
}
