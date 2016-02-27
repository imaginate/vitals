/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fill.array
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fill docs](https://github.com/imaginate/vitals/wiki/vitals.fill)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('fill.array', 'fill.arr', function() {

  should('fill array props with val', function() {

    test('<array>', 5, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.fill.arr(arr1, 5);
      assert( arr2[0] === 5 );
      assert( arr2[1] === 5 );
      assert( arr2[2] === 5 );
      assert( arr2 === arr1 );
      assert( arr2.length === 3 );
    });

    test('<array>', 6, 2, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.fill.arr(arr1, 6, 2);
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 6 );
      assert( arr2[3] === 6 );
      assert( arr2[4] === 6 );
      assert( arr2 === arr1 );
      assert( arr2.length === 5 );
    });

    test('<array>', 6, -2, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.fill.arr(arr1, 6, -2);
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 3 );
      assert( arr2[3] === 6 );
      assert( arr2[4] === 6 );
      assert( arr2 === arr1 );
      assert( arr2.length === 5 );
    });

    test('<array>', 6, 0, 3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.fill.arr(arr1, 6, 0, 3);
      assert( arr2[0] === 6 );
      assert( arr2[1] === 6 );
      assert( arr2[2] === 6 );
      assert( arr2[3] === 4 );
      assert( arr2[4] === 5 );
      assert( arr2 === arr1 );
      assert( arr2.length === 5 );
    });

    test('<array>', 6, 0, -3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.fill.arr(arr1, 6, 0, -3);
      assert( arr2[0] === 6 );
      assert( arr2[1] === 6 );
      assert( arr2[2] === 3 );
      assert( arr2[3] === 4 );
      assert( arr2[4] === 5 );
      assert( arr2 === arr1 );
      assert( arr2.length === 5 );
    });

    test('<array>', 6, -3, -1, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.fill.arr(arr1, 6, -3, -1);
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 6 );
      assert( arr2[3] === 6 );
      assert( arr2[4] === 5 );
      assert( arr2 === arr1 );
      assert( arr2.length === 5 );
    });
  });

  should('make new array with x length and fill it with val', function() {

    test(3, 5, function() {
      var arr = vitals.fill.arr(3, 5);
      assert( arr[0] === 5 );
      assert( arr[1] === 5 );
      assert( arr[2] === 5 );
      assert( arr.length === 3 );
    });

    test(5, 6, 2, function() {
      var arr = vitals.fill.arr(5, 6, 2);
      assert( arr[0] === undefined );
      assert( arr[1] === undefined );
      assert( arr[2] === 6 );
      assert( arr[3] === 6 );
      assert( arr[4] === 6 );
      assert( arr.length === 5 );
    });

    test(5, 6, -2, function() {
      var arr = vitals.fill.arr(5, 6, -2);
      assert( arr[0] === undefined );
      assert( arr[1] === undefined );
      assert( arr[2] === undefined );
      assert( arr[3] === 6 );
      assert( arr[4] === 6 );
      assert( arr.length === 5 );
    });

    test(5, 6, 0, 3, function() {
      var arr = vitals.fill.arr(5, 6, 0, 3);
      assert( arr[0] === 6 );
      assert( arr[1] === 6 );
      assert( arr[2] === 6 );
      assert( arr[3] === undefined );
      assert( arr[4] === undefined );
      assert( arr.length === 5 );
    });

    test(5, 6, 0, -3, function() {
      var arr = vitals.fill.arr(5, 6, 0, -3);
      assert( arr[0] === 6 );
      assert( arr[1] === 6 );
      assert( arr[2] === undefined );
      assert( arr[3] === undefined );
      assert( arr[4] === undefined );
      assert( arr.length === 5 );
    });

    test(5, 6, -3, -1, function() {
      var arr = vitals.fill.arr(5, 6, -3, -1);
      assert( arr[0] === undefined );
      assert( arr[1] === undefined );
      assert( arr[2] === 6 );
      assert( arr[3] === 6 );
      assert( arr[4] === undefined );
      assert( arr.length === 5 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fill.arr();
      }, validErr);
    });

    test([], function() {
      assert.throws(function() {
        vitals.fill.arr([]);
      }, validErr);
    });

    test({}, 5, function() {
      assert.throws(function() {
        vitals.fill.arr({}, 5);
      }, validTypeErr);
    });

    test([], 'val', 'fail', function() {
      assert.throws(function() {
        vitals.fill.arr([], 'val', 'fail');
      }, validTypeErr);
    });

    test([], 'val', 0, 'fail', function() {
      assert.throws(function() {
        vitals.fill.arr([], 'val', 0, 'fail');
      }, validTypeErr);
    });
  });
});
