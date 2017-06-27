/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.keys.byValue
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

method('get.keys.byValue', 'get.keys.byVal', function() {

  should('return array of keys where value === val', function() {

    test('<object>', 'a', function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var keys = vitals.get.keys.byVal(obj, 'a');
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });

    test('<object>', 1, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var keys = vitals.get.keys.byVal(obj, 1);
      assert( is.arr(keys) );
      assert( hasVal(keys, 'a') );
      assert( keys.length === 1 );
    });

    test('<object>', '1', function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var keys = vitals.get.keys.byVal(obj, '1');
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });

    test('<object>', null, function() {
      var obj = {
        'a': null, 'b': null,
        'a3': 'c', 'b4': 'd'
      };
      var keys = vitals.get.keys.byVal(obj, null);
      assert( is.arr(keys) );
      assert( hasVal(keys, 'a') );
      assert( hasVal(keys, 'b') );
      assert( keys.length === 2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.keys.byValue();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.get.keys.byValue({});
      }, validErr);
    });

    test(null, 5, function() {
      assert.throws(function() {
        vitals.get.keys.byValue(null, 5);
      }, validTypeErr);
    });

    test('str', 5, function() {
      assert.throws(function() {
        vitals.get.keys.byValue('str', 5);
      }, validTypeErr);
    });
  });
});
