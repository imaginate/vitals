/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.values
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

method('get.values', 'get.vals', function() {

  should('return array of all values', function() {

    test('<object>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var vals = vitals.get.vals(obj);
      assert( is.arr(vals) );
      assert( hasVal(vals, 1) );
      assert( hasVal(vals, 2) );
      assert( hasVal(vals, 3) );
      assert( vals.length === 3 );
    });
  });

  should('return array of values where key matches val', function() {

    test('<object>', /^[0-9]$/, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var vals = vitals.get.vals(obj, /^[0-9]$/);
      assert( is.arr(vals) );
      assert( hasVal(vals, 'c') );
      assert( hasVal(vals, 'd') );
      assert( vals.length === 2 );
    });

    test('<object>', 1, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var vals = vitals.get.vals(obj, 1);
      assert( is.arr(vals) );
      assert( vals.length === 0 );
    });

    test('<object>', 'a', function() {
      var obj = {
        'a': 'c', 'b': 'd',
        'a1': 3,  'b2': 4
      };
      var vals = vitals.get.vals(obj, 'a');
      assert( is.arr(vals) );
      assert( hasVal(vals, 'c') );
      assert( hasVal(vals, 3) );
      assert( vals.length === 2 );
    });
  });

  should('return array of strings where substring matches val', function() {

    test('abc123', /[a-z]/, function() {
      var vals = vitals.get.vals('abc123', /[a-z]/);
      assert( is.arr(vals) );
      assert( vals[0] === 'a' );
      assert( vals[1] === 'b' );
      assert( vals[2] === 'c' );
      assert( vals.length === 3 );
    });

    test('abc123', 3, function() {
      var vals = vitals.get.vals('abc123', 3);
      assert( is.arr(vals) );
      assert( vals[0] === '3' );
      assert( vals.length === 1 );
    });

    test('abc123', 4, function() {
      var vals = vitals.get.vals('abc123', 4);
      assert( is.arr(vals) );
      assert( vals.length === 0 );
    });

    test('abc123abc123', 'a', function() {
      var vals = vitals.get.vals('abc123abc123', 'a');
      assert( is.arr(vals) );
      assert( vals[0] === 'a' );
      assert( vals[1] === 'a' );
      assert( vals.length === 2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.vals();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.get.vals(null);
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.get.vals('str');
      }, validErr);
    });
  });
});
