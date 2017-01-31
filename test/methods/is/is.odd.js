/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.odd
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.odd', function() {

  should('return true', function() {

    test(5, function() {
      var result = vitals.is.odd(5);
      assert( result === true );
    });

    test(-5, 1, 5, function() {
      var result = vitals.is.odd(-5, 1, 5);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(2, function() {
      var result = vitals.is.odd(2);
      assert( result === false );
    });

    test(-5, 0, 5, function() {
      var result = vitals.is.odd(-5, 0, 5);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.odd();
      }, validErr);
    });

    test(NaN, function() {
      assert.throws(function() {
        vitals.is.odd(NaN);
      }, validTypeErr);
    });

    test('fail', function() {
      assert.throws(function() {
        vitals.is.odd('fail');
      }, validTypeErr);
    });

    test(1.5, function() {
      assert.throws(function() {
        vitals.is.odd(1.5);
      }, validRangeErr);
    });
  });
});
