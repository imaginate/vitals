/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.indexes
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
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

method('cut.indexes', 'cut.ii', function() {

  should('splice indexes from array', function() {

    test('<array>', 1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.ii(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    test('<array>', -1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.ii(arr1, -1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2.length === 2 );
    });

    test('<array>', 1, 3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.ii(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    test('<array>', 2, -1, 0, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.ii(arr1, 2, -1, 0);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 4 );
      assert( arr2.length === 2 );
    });

    test('<array>', [ 2, -1, 0 ], function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.ii(arr1, [ 2, -1, 0 ]);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 2 );
      assert( arr2[1] === 4 );
      assert( arr2.length === 2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.ii();
      }, validTypeErr);
    });

    test([], function() {
      assert.throws(function() {
        vitals.cut.ii([]);
      }, validErr);
    });

    test([], 'a', function() {
      assert.throws(function() {
        vitals.cut.ii([], 'a');
      }, validTypeErr);
    });

    test({}, 1, function() {
      assert.throws(function() {
        vitals.cut.ii({}, 1);
      }, validTypeErr);
    });

    test(null, 1, function() {
      assert.throws(function() {
        vitals.cut.ii(null, 1);
      }, validTypeErr);
    });
  });
});
