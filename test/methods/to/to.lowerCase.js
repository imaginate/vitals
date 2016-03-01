/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.lowerCase
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

method('to.lowerCase', 'to.lower', function() {

  should('convert string to lower case', function() {

    test('STRING', function() {
      var result = vitals.to.lower('STRING');
      assert( result === 'string' );
    });

    test('String', function() {
      var result = vitals.to.lower('String');
      assert( result === 'string' );
    });

    test('string', function() {
      var result = vitals.to.lower('string');
      assert( result === 'string' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.lower();
      }, validErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.to.lower(null);
      }, validTypeErr);
    });
  });
});
