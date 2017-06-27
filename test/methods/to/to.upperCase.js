/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.upperCase
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.to docs](https://github.com/imaginate/vitals/wiki/vitals.to)
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

method('to.upperCase', 'to.upper', function() {

  should('convert string to upper case', function() {

    test('string', function() {
      var result = vitals.to.upper('string');
      assert( result === 'STRING' );
    });

    test('String', function() {
      var result = vitals.to.upper('String');
      assert( result === 'STRING' );
    });

    test('STRING', function() {
      var result = vitals.to.upper('STRING');
      assert( result === 'STRING' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.upper();
      }, validErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.to.upper(null);
      }, validTypeErr);
    });
  });
});
