/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.string
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

method('is.string', 'is.str', function() {

  should('return true', function() {

    test('str', function() {
      var result = vitals.is.str('str');
      assert( result === true );
    });

    test('', 'str', 'str', function() {
      var result = vitals.is.str('', 'str', 'str');
      assert( result === true );
    });
  });

  should('return false', function() {

    test(5, function() {
      var result = vitals.is.str(5);
      assert( result === false );
    });

    test('<String>', 'str', 'str', function() {
      var result = vitals.is.str(new String('str'), 'str', 'str');
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.str();
      }, validErr);
    });
  });
});
