/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.slice
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.slice docs](https://github.com/imaginate/vitals/wiki/vitals.slice)
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

method('slice', function() {

  should('return cloned array', function() {

    test('<object>', function() {
      var obj = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      var arr = vitals.slice(obj);
      assert( is.arr(arr) );
      assert( arr !== obj );
      assert( arr[0] === 'a' );
      assert( arr[1] === 'b' );
      assert( arr[2] === 'c' );
      assert( arr.length === 3 );
    });

    test('<object>', 1, function() {
      var obj = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      var arr = vitals.slice(obj, 1);
      assert( is.arr(arr) );
      assert( arr !== obj );
      assert( arr[0] === 'b' );
      assert( arr[1] === 'c' );
      assert( arr.length === 2 );
    });

    test('<object>', -1, function() {
      var obj = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      var arr = vitals.slice(obj, -1);
      assert( is.arr(arr) );
      assert( arr !== obj );
      assert( arr[0] === 'c' );
      assert( arr.length === 1 );
    });

    test('<object>', 1, 3, function() {
      var obj = { '0': 'a', '1': 'b', '2': 'c', '3': 'd', 'length': 4 };
      var arr = vitals.slice(obj, 1, 3);
      assert( is.arr(arr) );
      assert( arr !== obj );
      assert( arr[0] === 'b' );
      assert( arr[1] === 'c' );
      assert( arr.length === 2 );
    });

    test('<object>', 1, -1, function() {
      var obj = { '0': 'a', '1': 'b', '2': 'c', '3': 'd', 'length': 4 };
      var arr = vitals.slice(obj, 1, -1);
      assert( is.arr(arr) );
      assert( arr !== obj );
      assert( arr[0] === 'b' );
      assert( arr[1] === 'c' );
      assert( arr.length === 2 );
    });

    test('<object>', -3, -1, function() {
      var obj = { '0': 'a', '1': 'b', '2': 'c', '3': 'd', 'length': 4 };
      var arr = vitals.slice(obj, -3, -1);
      assert( is.arr(arr) );
      assert( arr !== obj );
      assert( arr[0] === 'b' );
      assert( arr[1] === 'c' );
      assert( arr.length === 2 );
    });

    test('<array>', function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.slice(arr1);
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 'a' );
      assert( arr2[1] === 'b' );
      assert( arr2[2] === 'c' );
      assert( arr2.length === 3 );
    });

    test('<array>', 1, function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.slice(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    test('<array>', -1, function() {
      var arr1 = [ 'a', 'b', 'c' ];
      var arr2 = vitals.slice(arr1, -1);
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 'c' );
      assert( arr2.length === 1 );
    });

    test('<array>', 1, 3, function() {
      var arr1 = [ 'a', 'b', 'c', 'd' ];
      var arr2 = vitals.slice(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    test('<array>', 1, -1, function() {
      var arr1 = [ 'a', 'b', 'c', 'd' ];
      var arr2 = vitals.slice(arr1, 1, -1);
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });

    test('<array>', -3, -1, function() {
      var arr1 = [ 'a', 'b', 'c', 'd' ];
      var arr2 = vitals.slice(arr1, -3, -1);
      assert( is.arr(arr2) );
      assert( arr2 !== arr1 );
      assert( arr2[0] === 'b' );
      assert( arr2[1] === 'c' );
      assert( arr2.length === 2 );
    });
  });

  should('return valid string', function() {

    test('abc123', function() {
      var str = vitals.slice('abc123');
      assert( str === 'abc123' );
    });

    test('abc123', 1, function() {
      var str = vitals.slice('abc123', 1);
      assert( str === 'bc123' );
    });

    test('abc123', -1, function() {
      var str = vitals.slice('abc123', -1);
      assert( str === '3' );
    });

    test('abc123', 1, 3, function() {
      var str = vitals.slice('abc123', 1, 3);
      assert( str === 'bc' );
    });

    test('abc123', 1, -3, function() {
      var str = vitals.slice('abc123', 1, -3);
      assert( str === 'bc' );
    });

    test('abc123', -3, -1, function() {
      var str = vitals.slice('abc123', -3, -1);
      assert( str === '12' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.slice();
      }, validTypeErr);
    });

    test({}, 'fail', function() {
      assert.throws(function() {
        vitals.slice({}, 'fail');
      }, validTypeErr);
    });

    test({}, 1, 'fail', function() {
      assert.throws(function() {
        vitals.slice({}, 1, 'fail');
      }, validTypeErr);
    });
  });
});
