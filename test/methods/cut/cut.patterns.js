/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT.PATTERNS
 * -----------------------------------------------------------------------------
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/wiki/vitals.cut}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.cut.patterns (section:base)', function() {
  var title;

  title = 'should remove all substring patterns from string';
  title = titleStr('basic', title);
  describe(title, function() {

    // newStr()= "abc123a1b2c3"

    title = callStr(newStr(), 'a');
    it(title, function() {
      var str = vitals.cut.patterns(newStr(), 'a');
      var be = 'bc1231b2c3';
      assert(str === be);
    });

    title = callStr(newStr(), 1);
    it(title, function() {
      var str = vitals.cut.patterns(newStr(), 1);
      var be = 'abc23ab2c3';
      assert(str === be);
    });

    title = callStr(newStr(), /[a-z]/);
    it(title, function() {
      var str = vitals.cut.patterns(newStr(), /[a-z]/);
      var be = 'bc123a1b2c3';
      assert(str === be);
    });

    title = callStr(newStr(), /[a-z]/g);
    it(title, function() {
      var str = vitals.cut.patterns(newStr(), /[a-z]/g);
      var be = '123123';
      assert(str === be);
    });

    title = callStr(newStr(), 1, /[a-z]/);
    it(title, function() {
      var str = vitals.cut.patterns(newStr(), 1, /[a-z]/);
      var be = 'bc23ab2c3';
      assert(str === be);
    });

    title = callStr(newStr(), [ 1, /[a-z]/ ]);
    it(title, function() {
      var str = vitals.cut.patterns(newStr(), [ 1, /[a-z]/ ]);
      var be = 'bc23ab2c3';
      assert(str === be);
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.patterns();
      });
    });

    title = callStr('str');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.patterns('str');
      });
    });

    title = callStr(1, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.patterns(1, 1);
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
  return testTitle(section, shouldMsg, 1);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('cut.patterns', arguments, 3);
}

/**
 * @private
 * @return {string}
 */
function newStr() {
  return 'abc123a1b2c3';
}
