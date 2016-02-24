/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.index
 * -----------------------------------------------------------------------------
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.cut.index (section:base)', function() {
  var title;

  title = titleStr('should splice array indexes from start to end');
  describe(title, function() {

    title = callStr('<array>', 1);
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.i(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    title = callStr('<array>', -1);
    it(title, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.i(arr1, -1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2.length === 2 );
    });

    title = callStr('<array>', 1, 3);
    it(title, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 4 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    title = callStr('<array>', 1, -2);
    it(title, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, 1, -2);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 4 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    title = callStr('<array>', -1, -3);
    it(title, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, -1, -3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 3 );
      assert( arr2[3] === 4 );
      assert( arr2[4] === 5 );
      assert( arr2.length === 5 );
    });

    title = callStr('<array>', -3, -1);
    it(title, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, -3, -1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });
  });


  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.i();
      }, validTypeErr);
    });

    title = callStr([]);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.i([]);
      }, validTypeErr);
    });

    title = callStr([], 'a');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.i([], 'a');
      }, validTypeErr);
    });

    title = callStr({}, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.i({}, 1);
      }, validTypeErr);
    });

    title = callStr(null, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.i(null, 1);
      }, validTypeErr);
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
  return testCall('cut.i', arguments, 3);
}
