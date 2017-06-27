/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.nan
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.nan', function() {

  should('return true', function() {

    test(NaN, function() {
      var result = vitals.is.nan(NaN);
      assert( result === true );
    });

    test(NaN, NaN, NaN, function() {
      var result = vitals.is.nan(NaN, NaN, NaN);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(0, function() {
      var result = vitals.is.nan(0);
      assert( result === false );
    });

    test(NaN, NaN, null, function() {
      var result = vitals.is.nan(NaN, NaN, null);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.nan();
      }, validErr);
    });
  });
});
