/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.regexp
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.to docs](https://github.com/imaginate/vitals/wiki/vitals.to)
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

method('to.regexp', 'to.regex', function() {

  should('convert string to regex', function() {

    test('src', function() {
      var result = vitals.to.regex('src');
      assert( is.regex(result) );
      assert( result.source === 'src' );
      assert( result.global === false );
    });

    test('src', 'g', function() {
      var result = vitals.to.regex('src', 'g');
      assert( is.regex(result) );
      assert( result.source === 'src' );
      assert( result.global === true  );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.regex();
      }, validErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.to.regex(null);
      }, validTypeErr);
    });

    test('src', null, function() {
      assert.throws(function() {
        vitals.to.regex('src', null);
      }, validTypeErr);
    });
  });
});
