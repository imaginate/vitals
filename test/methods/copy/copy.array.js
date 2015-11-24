/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - COPY.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/copy.js}
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

describe('vitals.copy.array (sections:js,base)', function() {
  var title;

  title = 'should return new array with same values as input';
  title = titleStr('basic', title);
  describe(title, function() {

    title = callStr( newArr() );
    it(title, function() {
      var arr = newArr();
      var copy = vitals.copy.arr(arr);
      assert(arr !== copy);
      each(arr, function(val, i) {
        assert( arr[i] === copy[i] );
      });
    });

    title = callStr(newArr(), true);
    it(title, function() {
      var arr = newArr();
      var copy = vitals.copy.arr(arr, true);
      assert(arr !== copy);
      assert(arr[0] === copy[0]);
      assert(arr[1] !== copy[1]);
      assert(arr[2] === copy[2]);
    });

    title = callStr(newArr(), false);
    it(title, function() {
      var arr = newArr();
      var copy = vitals.copy.arr(arr, false);
      assert(arr !== copy);
      each(arr, function(val, i) {
        assert( arr[i] === copy[i] );
      });
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.copy.arr(null);
      });
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.copy.arr({});
      });
    });

    title = callStr([], 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.arr([], 'fail');
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
  return testCall('copy.arr', arguments, 4, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return freeze([ 1, { b: 2 }, 3 ], true);
}
