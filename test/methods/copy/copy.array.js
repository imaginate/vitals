/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.array
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('copy.array', 'copy.arr', function() {

  should('return a clone of the array', function() {

    test('<array>', function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy.arr(arr);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] === cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });

    test('<array>', true, function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy.arr(arr, true);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] !== cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });

    test('<array>', false, function() {
      var arr = freeze([ 1, { b: 2 }, 3 ], true);
      var cp = vitals.copy.arr(arr, false);
      assert( arr !== cp );
      assert( arr[0] === cp[0] );
      assert( arr[1] === cp[1] );
      assert( arr[2] === cp[2] );
      assert( arr[1].b === cp[1].b );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.copy.arr();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.copy.arr(null);
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.copy.arr({});
      }, validTypeErr);
    });

    test([], 'fail', function() {
      assert.throws(function() {
        vitals.copy.arr([], 'fail');
      }, validTypeErr);
    });
  });
});
