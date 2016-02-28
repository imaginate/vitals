/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.null
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.null', function() {

  should('return true', function() {

    test(null, function() {
      var result = vitals.is.null(null);
      assert( result === true );
    });

    test(null, null, null, function() {
      var result = vitals.is.null(null, null, null);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(undefined, function() {
      var result = vitals.is.null(undefined);
      assert( result === false );
    });

    test(null, null, undefined, function() {
      var result = vitals.is.null(null, null, undefined);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.null();
      }, validErr);
    });
  });
});
