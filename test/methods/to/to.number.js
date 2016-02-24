/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.NUMBER
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/wiki/vitals.to}
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

describe('vitals.to.number (section:base)', function() {
  var title;

  title = titleStr('should convert value to number or NaN');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.to.num(null);
      assert( result === 0 );
    });

    title = callStr(true);
    it(title, function() {
      var result = vitals.to.num(true);
      assert( result === 1 );
    });

    title = callStr(false);
    it(title, function() {
      var result = vitals.to.num(false);
      assert( result === 0 );
    });

    title = callStr('10');
    it(title, function() {
      var result = vitals.to.num('10');
      assert( result === 10 );
    });

    title = callStr(10);
    it(title, function() {
      var result = vitals.to.num(10);
      assert( result === 10 );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.num();
      });
    });

    title = callStr(undefined);
    it(title, function() {
      assert.throws(function() {
        vitals.to.num(undefined);
      });
    });

    title = callStr('invalid');
    it(title, function() {
      assert.throws(function() {
        vitals.to.num('invalid');
      });
    });

    title = callStr([ 1, 2, 3 ]);
    it(title, function() {
      assert.throws(function() {
        vitals.to.num([ 1, 2, 3 ]);
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('to.num', arguments, 3);
}
