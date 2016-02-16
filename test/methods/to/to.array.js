/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.ARRAY
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
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.to.array (section:base)', function() {
  var title;

  title = titleStr('should make new array with set length');
  describe(title, function() {

    title = callStr(10);
    it(title, function() {
      var result = vitals.to.arr(10);
      assert( is.arr(result) );
      assert( result.length === 10 );
    });

  });

  title = titleStr('should validly split the string');
  describe(title, function() {

    title = callStr('123');
    it(title, function() {
      var result = vitals.to.arr('123');
      assert( is.arr(result) );
      assert( result[0] === '123' );
      assert( result.length === 1 );
    });

    title = callStr('1,2,3');
    it(title, function() {
      var result = vitals.to.arr('1,2,3');
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    title = callStr('1|2|3');
    it(title, function() {
      var result = vitals.to.arr('1|2|3');
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    title = callStr('1--2--3', '--');
    it(title, function() {
      var result = vitals.to.arr('1--2--3', '--');
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    title = callStr('1--2--3', /-+/);
    it(title, function() {
      var result = vitals.to.arr('1--2--3', /-+/);
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    title = callStr('10203', 0);
    it(title, function() {
      var result = vitals.to.arr('10203', 0);
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.arr();
      });
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.to.arr(null);
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
  return testCall('to.arr', arguments, 3);
}
