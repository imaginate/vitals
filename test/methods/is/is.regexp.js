/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.regexp
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

method('is.regexp', 'is.regex', function() {

  should('return true', function() {

    test(/re/, function() {
      var result = vitals.is.regex(/re/);
      assert( result === true );
    });

    test(/re/, /re/, /re/, function() {
      var result = vitals.is.regex(/re/, /re/, /re/);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.regex(null);
      assert( result === false );
    });

    test(/re/, /re/, {}, function() {
      var result = vitals.is.regex(/re/, /re/, {});
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.regex();
      }, validErr);
    });
  });
});
