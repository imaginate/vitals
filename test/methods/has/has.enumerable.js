/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.has.enumerable
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.has docs](https://github.com/imaginate/vitals/wiki/vitals.has)
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

method('has.enumerable', 'has.enum', function() {

  should('return true', function() {

    test('<object>', 'a', function() {
      var result = vitals.has.enum({ a: 1 }, 'a');
      assert( result === true );
    });

    test('<object>', 1, function() {
      var result = vitals.has.enum({ '1': 'a' }, 1);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, 'a', function() {
      var result = vitals.has.enum(null, 'a');
      assert( result === false );
    });

    test('<object>', 'a', function() {
      var obj = Object.defineProperty({ a: 1 }, 'a', { enumerable: false });
      var result = vitals.has.enum(obj, 'a');
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.has.enum();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.has.enum({});
      }, validErr);
    });

    test('str', 'key', function() {
      assert.throws(function() {
        vitals.has.enum('str', 'key');
      }, validTypeErr);
    });
  });
});
