/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.has
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.has docs](https://github.com/imaginate/vitals/wiki/vitals.has)
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

method('has', function() {

  should('return true', function() {

    test('<object>', 'a', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var result = vitals.has(obj, 'a');
      assert( result === true );
    });

    test('<object>', 1, function() {
      var obj = { '1': 'a', '2': 'b', '3': 'c' };
      var result = vitals.has(obj, 1);
      assert( result === true );
    });

    test('<array>', 'a', function() {
      var arr = [ 'a', 'b', 'c' ];
      var result = vitals.has(arr, 'a');
      assert( result === true );
    });

    test('<array>', 3, function() {
      var arr = [ 1, 2, 3 ];
      var result = vitals.has(arr, 3);
      assert( result === true );
    });

    test('abc123', /[a-z]/, function() {
      var result = vitals.has('abc123', /[a-z]/);
      assert( result === true );
    });

    test('abc123', 'a', function() {
      var result = vitals.has('abc123', 'a');
      assert( result === true );
    });

    test('abc123', 3, function() {
      var result = vitals.has('abc123', 3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, 'a', function() {
      var result = vitals.has(null, 'a');
      assert( result === false );
    });

    test('<object>', 'd', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var result = vitals.has(obj, 'd');
      assert( result === false );
    });

    test('<array>', 5, function() {
      var arr = [ 1, 2, 3 ];
      var result = vitals.has(arr, 5);
      assert( result === false );
    });

    test('abc123', /[a-z]$/, function() {
      var result = vitals.has('abc123', /[a-z]$/);
      assert( result === false );
    });

    test('abc123', 5, function() {
      var result = vitals.has('abc123', 5);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.has();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.has({});
      }, validErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.has('str');
      }, validErr);
    });
  });
});
