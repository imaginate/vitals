/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is._string
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

method('is._string', 'is._str', function() {

  should('return true', function() {

    test('str', function() {
      var result = vitals.is._str('str');
      assert( result === true );
    });

    test('str', 'str', 'str', function() {
      var result = vitals.is._str('str', 'str', 'str');
      assert( result === true );
    });
  });

  should('return false', function() {

    test('', function() {
      var result = vitals.is._str('');
      assert( result === false );
    });

    test('<String>', 'str', 'str', function() {
      var result = vitals.is._str(new String('str'), 'str', 'str');
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is._str();
      }, validErr);
    });
  });
});
