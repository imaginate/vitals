/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.get docs](https://github.com/imaginate/vitals/wiki/vitals.get)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('get', function() {

  should('return array of all keys', function() {

    test('<object>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = vitals.get(obj);
      assert( is.arr(keys) );
      assert( hasVal(keys, 'a') );
      assert( hasVal(keys, 'b') );
      assert( hasVal(keys, 'c') );
      assert( keys.length === 3 );
    });
  });

  should('return array of values where key matches val', function() {

    test('<object>', /^[0-9]$/, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var vals = vitals.get(obj, /^[0-9]$/);
      assert( is.arr(vals) );
      assert( hasVal(vals, 'c') );
      assert( hasVal(vals, 'd') );
      assert( vals.length === 2 );
    });
  });

  should('return array of keys where value === val', function() {

    test('<object>', 2, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = vitals.get(obj, 2);
      assert( is.arr(keys) );
      assert( keys[0] === 'b' );
      assert( keys.length === 1 );
    });
  });

  should('return array of all indexes', function() {

    test('<array>', function() {
      var arr = [ 'a', 'b', 'c' ];
      var keys = vitals.get(arr);
      assert( is.arr(keys) );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  should('return array of indexes where value === val', function() {

    test('<array>', 2, function() {
      var arr = [ 1, 2, 1, 2 ];
      var keys = vitals.get(arr, 2);
      assert( is.arr(keys) );
      assert( keys[0] === 1 );
      assert( keys[1] === 3 );
      assert( keys.length === 2 );
    });
  });

  should('return array of strings where substring matches val', function() {

    test('abc123', /[a-z]/, function() {
      var vals = vitals.get('abc123', /[a-z]/);
      assert( is.arr(vals) );
      assert( vals[0] === 'a' );
      assert( vals[1] === 'b' );
      assert( vals[2] === 'c' );
      assert( vals.length === 3 );
    });
  });

  should('return an array of indexes where substring matches val', function() {

    test('abc123', 1, function() {
      var keys = vitals.get('abc123', 1);
      assert( is.arr(keys) );
      assert( keys[0] === 3 );
      assert( keys.length === 1 );
    });

    test('abc123abc123', 1, function() {
      var keys = vitals.get('abc123abc123', 1);
      assert( is.arr(keys) );
      assert( keys[0] === 3 );
      assert( keys[1] === 9 );
      assert( keys.length === 2 );
    });

    test('abc123', 5, function() {
      var keys = vitals.get('abc123', 5);
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });

    test('abc123abc123', 'a', function() {
      var keys = vitals.get('abc123abc123', 'a');
      assert( is.arr(keys) );
      assert( keys[0] === 0 );
      assert( keys[1] === 6 );
      assert( keys.length === 2 );
    });

    test('abc*123', '*', function() {
      var keys = vitals.get('abc*123', '*');
      assert( is.arr(keys) );
      assert( keys[0] === 3 );
      assert( keys.length === 1 );
    });

    test('abc*123', '.*', function() {
      var keys = vitals.get('abc*123', '.*');
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.get(null);
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.get('str');
      }, validErr);
    });
  });
});
