/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.slice.string
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.slice docs](https://github.com/imaginate/vitals/wiki/vitals.slice)
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

method('slice.string', 'slice.str', function() {

  should('return valid string', function() {

    test('abc123', function() {
      var str = vitals.slice.str('abc123');
      assert( str === 'abc123' );
    });

    test('abc123', 1, function() {
      var str = vitals.slice.str('abc123', 1);
      assert( str === 'bc123' );
    });

    test('abc123', -1, function() {
      var str = vitals.slice.str('abc123', -1);
      assert( str === '3' );
    });

    test('abc123', 1, 3, function() {
      var str = vitals.slice.str('abc123', 1, 3);
      assert( str === 'bc' );
    });

    test('abc123', 1, -3, function() {
      var str = vitals.slice.str('abc123', 1, -3);
      assert( str === 'bc' );
    });

    test('abc123', -3, -1, function() {
      var str = vitals.slice.str('abc123', -3, -1);
      assert( str === '12' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.slice.str();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.slice.str({});
      }, validTypeErr);
    });

    test('str', 'fail', function() {
      assert.throws(function() {
        vitals.slice.str('str', 'fail');
      }, validTypeErr);
    });

    test('str', 1, 'fail', function() {
      assert.throws(function() {
        vitals.slice.str('str', 1, 'fail');
      }, validTypeErr);
    });
  });
});
